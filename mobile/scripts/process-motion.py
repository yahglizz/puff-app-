"""Crop the verified Higgsfield source clips and make silent reversible loops."""
import json
import subprocess
from PIL import Image, ImageChops, ImageStat
from pathlib import Path

root = Path(__file__).resolve().parents[1]
assets = root / "assets/motion"
manifest = json.loads((assets / "manifest.json").read_text())
regions = json.loads((assets / "references/crop-regions.json").read_text())
allowed = {"welcome", "habit", "motivation", "plan", "ready", "home", "chat",
           "progress", "checkin", "journal", "community", "profile"}

for record in manifest["records"]:
    if record["status"] != "completed":
        continue
    name = record["screen"]
    assert name in allowed, name
    source = assets / f"{name}-original.mp4"
    target = assets / f"{name}.mp4"
    assert source.is_file() and source.stat().st_size > 0, source
    if target.exists() and target.stat().st_mtime >= source.stat().st_mtime:
        continue
    probe = json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_streams", "-of", "json", str(source)
    ]))
    video = next(stream for stream in probe["streams"] if stream["codec_type"] == "video")
    width, height = video["width"], video["height"]
    crop = ""
    if name in regions:
        reference = regions[name]
        x, y, w, h = reference["region"]
        canvas_w, canvas_h = reference["canvas"]
        x, w = [round(value * width / canvas_w / 2) * 2 for value in (x, w)]
        y, h = [round(value * height / canvas_h / 2) * 2 for value in (y, h)]
        assert 0 <= x < x+w <= width and 0 <= y < y+h <= height
        crop = f"crop={w}:{h}:{x}:{y},"
    # Small gestures play forward then backward so loop endpoints match exactly.
    headers = {"home": 350, "chat": 455, "progress": 410, "checkin": 410,
               "journal": 445, "community": 390, "profile": 390}
    duration = 1.6 if name in headers else 1.8 if name == "habit" else 2.5
    mask = ""
    tail = "[forward][backward]concat=n=2:v=1:a=0,format=yuv420p[out]"
    if name in headers:
        cutoff = headers[name] * 720 / 740
        fade = 40 * 720 / 740
        out_height = round(h * 720 / w / 2) * 2
        # Keep the label region cream even when the model invents stray lettering.
        mask = (f"format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':"
                f"a='clip((X-{cutoff})/{fade},0,1)*255',")
        tail = ("[forward][backward]concat=n=2:v=1:a=0,format=rgba[scene];"
                f"color=c=0xfffaf4:s=720x{out_height}:r=24[cream];"
                "[cream][scene]overlay=shortest=1,format=yuv420p[out]")
    graph = (f"[0:v]trim=duration={duration},setpts=PTS-STARTPTS,{crop}scale=720:-2,fps=24,{mask}split[a][b];"
             "[a]setpts=PTS-STARTPTS[forward];"
             "[b]reverse,setpts=PTS-STARTPTS[backward];"
             f"{tail}")
    subprocess.run([
        "ffmpeg", "-y", "-v", "error", "-i", str(source), "-filter_complex", graph,
        "-map", "[out]", "-an", "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-movflags", "+faststart", str(target)
    ], check=True)
    checked = json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(target)
    ]))
    assert target.stat().st_size > 0
    assert all(s["codec_type"] != "audio" for s in checked["streams"])
    assert 3 <= float(checked["format"]["duration"]) <= 6
    stream = next(s for s in checked["streams"] if s["codec_type"] == "video")
    frames = []
    for index in (0, int(stream["nb_frames"]) - 1):
        raw = subprocess.check_output(["ffmpeg", "-v", "error", "-i", str(target),
            "-vf", f"select=eq(n\\,{index})", "-frames:v", "1", "-f", "rawvideo",
            "-pix_fmt", "rgb24", "-"])
        frames.append(Image.frombytes("RGB", (stream["width"], stream["height"]), raw))
    seam = sum(ImageStat.Stat(ImageChops.difference(*frames)).mean) / 3
    assert seam < 4, (name, "loop seam mismatch", seam)
    print(f"{name}: silent loop verified ({target.stat().st_size} bytes)")
