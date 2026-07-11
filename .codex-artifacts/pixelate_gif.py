from pathlib import Path
from PIL import Image, ImageFilter, ImageSequence
import json

source = Path(r"C:\Users\24012338\Downloads\b5f079ae83712e5d5ee48aff7f78ab09.gif")
output = Path(r"C:\Portfolio Website\public\images\retro-day-night-toggle.gif")
output.parent.mkdir(parents=True, exist_ok=True)

# Deliberate voxel-game palette: warm background, moon ramp, pink accents,
# blue-purple body ramp, stars, outline, and blocky cast-shadow tones.
colors = [
    (250, 248, 242), (226, 230, 235), (174, 183, 202),
    (255, 252, 229), (255, 214, 65), (224, 151, 42),
    (255, 224, 234), (211, 218, 234),
    (151, 232, 239), (48, 196, 220), (26, 151, 192),
    (98, 118, 166), (66, 66, 125), (38, 31, 91),
    (24, 19, 63), (255, 255, 255),
]
palette_data = [channel for color in colors for channel in color]
palette_data += [channel for _ in range(256 - len(colors)) for channel in colors[0]]
palette = Image.new("P", (1, 1))
palette.putpalette(palette_data)

with Image.open(source) as image:
    loop = image.info.get("loop", 0)
    frames = []
    durations = []

    for frame in ImageSequence.Iterator(image):
        durations.append(frame.info.get("duration", image.info.get("duration", 100)))
        rgba = frame.convert("RGBA")
        # Work on an 80x60 native canvas, then scale exactly 10x. This keeps
        # every displayed pixel square while leaving enough room for a readable
        # stepped silhouette and the original moon movement.
        native = rgba.resize((80, 60), Image.Resampling.BOX).convert("RGB")

        # The reference uses a sun for the cyan/day pose. Detect that pose from
        # the source frame, then replace only the bright moving knob with a
        # compact two-tone sun. Clouds remain white and readable.
        day_pixels = 0
        for y in range(19, 41):
            for x in range(18, 63):
                r, g, b = native.getpixel((x, y))
                if b > 160 and g > 130 and b > r * 1.15:
                    day_pixels += 1
        if day_pixels > 90:
            draw_pixels = native.load()
            cx, cy, radius = 51, 30, 8
            for y in range(cy - radius, cy + radius + 1):
                for x in range(cx - radius, cx + radius + 1):
                    dx, dy = x - cx, y - cy
                    if dx * dx + dy * dy <= radius * radius:
                        draw_pixels[x, y] = colors[4] if (x + y) < (cx + cy + 5) else colors[5]

        indexed = native.quantize(palette=palette, dither=Image.Dither.NONE)
        native = indexed.convert("RGB")

        # Build a stable one-pixel native outline around the switch body only.
        # The crop prevents the soft cast shadow from gaining a muddy border.
        pixels = native.load()
        mask = Image.new("L", native.size, 0)
        mask_pixels = mask.load()
        for y in range(17, 43):
            for x in range(18, 62):
                r, g, b = pixels[x, y]
                if max(r, g, b) - min(r, g, b) > 14 or (r + g + b) < 650:
                    mask_pixels[x, y] = 255

        expanded = mask.filter(ImageFilter.MaxFilter(3))
        outline = Image.new("L", native.size, 0)
        outline_pixels = outline.load()
        expanded_pixels = expanded.load()
        for y in range(native.height):
            for x in range(native.width):
                if expanded_pixels[x, y] and not mask_pixels[x, y]:
                    outline_pixels[x, y] = 255
        native.paste(colors[11], mask=outline)

        pixelated = native.resize(image.size, Image.Resampling.NEAREST)
        frames.append(pixelated.quantize(palette=palette, dither=Image.Dither.NONE))

frames[0].save(
    output,
    save_all=True,
    append_images=frames[1:],
    duration=durations,
    loop=loop,
    disposal=2,
    optimize=False,
)

with Image.open(output) as result:
    result_durations = [
        frame.info.get("duration", result.info.get("duration", 100))
        for frame in ImageSequence.Iterator(result)
    ]
    print(json.dumps({
        "output": str(output),
        "size": result.size,
        "source_frames": len(frames),
        "output_frames": result.n_frames,
        "source_durations": durations,
        "output_durations": result_durations,
        "source_loop": loop,
        "output_loop": result.info.get("loop", 0),
    }))
