"""Extract original illustration regions. No generated or replacement artwork."""
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[2]
source = root / "ui mock ups "
output = root / "mobile/assets/mockups"
output.mkdir(parents=True, exist_ok=True)
regions = {
    "welcome": ("18 PM-1", (101, 290, 841, 1035)),
    "habit": ("19 PM-2", (101, 285, 841, 827)),
    "motivation": ("20 PM-3", (101, 285, 841, 881)),
    "plan": ("21 PM-4", (101, 287, 841, 728)),
    "ready": ("21 PM-5", (101, 275, 841, 864)),
    "home-header": ("27 PM-1", (101, 134, 841, 440)),
    "chat-header": ("27 PM-2", (101, 134, 841, 335)),
    "progress-header": ("28 PM-3", (101, 134, 841, 396)),
    "checkin-header": ("29 PM-4", (101, 134, 841, 430)),
    "journal-header": ("29 PM-5", (101, 134, 841, 387)),
    "community-header": ("30 PM-6", (101, 134, 841, 376)),
    "community-banner": ("30 PM-6", (555, 497, 826, 689)),
    "profile-header": ("30 PM-7", (101, 134, 841, 393)),
    "avatar-cap": ("30 PM-7", (143, 413, 327, 597)),
    "avatar-shades": ("30 PM-7", (249, 1298, 349, 1394)),
    "avatar-beanie": ("30 PM-7", (366, 1298, 465, 1394)),
    "avatar-hearts": ("30 PM-7", (479, 1298, 579, 1394)),
    "avatar-crown": ("30 PM-7", (596, 1298, 696, 1394)),
    "avatar-headphones": ("30 PM-7", (708, 1298, 807, 1394)),
    "puff-avatar": ("27 PM-2", (130, 493, 224, 587)),
    "dog-avatar": ("30 PM-6", (136, 799, 222, 885)),
    "cat-avatar": ("30 PM-6", (136, 1069, 223, 1155)),
    "frog-avatar": ("30 PM-6", (136, 1318, 224, 1406)),
    "streak-art": ("28 PM-3", (532, 1147, 821, 1321)),
    "profile-note": ("30 PM-7", (130, 1417, 314, 1528)),
    "health-icon": ("20 PM-3", (151, 1113, 255, 1219)),
    "money-icon": ("20 PM-3", (501, 1112, 607, 1219)),
    "family-icon": ("20 PM-3", (151, 1261, 277, 1380)),
    "fitness-icon": ("20 PM-3", (505, 1262, 629, 1380)),
    "streak-icon": ("21 PM-5", (193, 1097, 286, 1188)),
    "heart-icon": ("21 PM-5", (402, 1100, 540, 1183)),
    "coins-icon": ("21 PM-5", (633, 1100, 775, 1184)),
    "bell-icon": ("21 PM-5", (191, 1300, 279, 1393)),
    "chat-icon": ("27 PM-1", (164, 1376, 281, 1451)),
    "rocket-icon": ("21 PM-4", (179, 1111, 252, 1197)),
    "trophy-icon": ("30 PM-7", (385, 686, 465, 771)),
}
for name, (suffix, box) in regions.items():
    matches = list(source.glob(f"ChatGPT*11_54_{suffix}.png"))
    assert len(matches) == 1, (name, matches)
    with Image.open(matches[0]) as im:
        assert 0 <= box[0] < box[2] <= im.width
        assert 0 <= box[1] < box[3] <= im.height
        cropped = im.crop(box).convert("RGBA")
        if name.endswith("-header"):
            # Mask screenshot lettering; keep the original scene at its full scale.
            cutoff = {"home-header": 350, "chat-header": 455,
                      "progress-header": 410, "checkin-header": 410,
                      "journal-header": 445, "community-header": 390,
                      "profile-header": 390}[name]
            mask = Image.new("L", cropped.size, 255)
            draw = ImageDraw.Draw(mask)
            draw.rectangle((0, 0, cutoff, cropped.height), fill=0)
            for x in range(40):
                draw.line((cutoff+x, 0, cutoff+x, cropped.height), fill=int(x/39*255))
            cropped.putalpha(mask)
        temporary = output / f".{name}.tmp.png"
        cropped.save(temporary)
        temporary.replace(output / f"{name}.png")
print(f"Extracted {len(regions)} original artwork regions.")
