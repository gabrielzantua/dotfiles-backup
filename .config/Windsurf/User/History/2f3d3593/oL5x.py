from PIL import Image, ImageSequence
import os

input_gif = "arch.gif"
output_gif = "arch_gruvbox_aligned.gif"
gruvbox_yellow = (250, 189, 47, 255)

def is_similar(c1, c2, tol=30):
    return all(abs(a - b) <= tol for a, b in zip(c1[:3], c2[:3]))

def guess_color(frame):
    pixels = frame.load()
    for y in range(frame.height):
        for x in range(frame.width):
            r, g, b, a = pixels[x, y]
            if a > 100:
                return (r, g, b, a)
    return (126, 198, 221, 255)

def replace_color_fuzzy(frame, source, target, tol=30):
    pixels = frame.load()
    for y in range(frame.height):
        for x in range(frame.width):
            if is_similar(pixels[x, y], source, tol):
                pixels[x, y] = target
    return frame

def get_bounding_box(frame):
    bbox = frame.getbbox()
    return bbox

def center_frame_on_canvas(frame, canvas_size=(1080, 1080)):
    canvas = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    frame_bbox = get_bounding_box(frame)
    cropped = frame.crop(frame_bbox)
    x = (canvas.width - cropped.width) // 2
    y = (canvas.height - cropped.height) // 2
    canvas.paste(cropped, (x, y), cropped)
    return canvas

original = Image.open(input_gif)
frames = [frame.convert("RGBA") for frame in ImageSequence.Iterator(original)]
source_color = guess_color(frames[0])

aligned_frames = []
for f in frames:
    recolored = replace_color_fuzzy(f.copy(), source_color, gruvbox_yellow)
    aligned = center_frame_on_canvas(recolored)
    aligned_frames.append(aligned)

aligned_frames[0].save(
    output_gif,
    save_all=True,
    append_images=aligned_frames[1:],
    loop=0,
    duration=original.info.get("duration", 100),
    disposal=2,
    transparency=0,
    optimize=False
)

print("✅ Re-centered GIF saved as:", output_gif)
