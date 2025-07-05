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


def get_union_bbox(frames):
    """
    Compute a bounding box that encloses the visible pixels of **all** frames.
    Using a single bounding box for every frame ensures the animation does not
    jitter because each frame is cropped in exactly the same way.
    """
    boxes = [f.getbbox() for f in frames]
    min_l = min(b[0] for b in boxes)
    min_t = min(b[1] for b in boxes)
    max_r = max(b[2] for b in boxes)
    max_b = max(b[3] for b in boxes)
    return (min_l, min_t, max_r, max_b)

def align_frame_to_union(frame, union_bbox):
    """Return *frame* placed on a transparent canvas whose size equals the
    *union_bbox* covering all frames.  The original spatial offset of *frame*
    inside the union bounding box is preserved, avoiding any recentring that
    could introduce shaking in some renderers (e.g. terminals).
    """
    lmin, tmin, rmax, bmax = union_bbox
    canvas_w = rmax - lmin
    canvas_h = bmax - tmin

    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    frame_bbox = get_bounding_box(frame)
    cropped = frame.crop(frame_bbox)

    # Position the cropped frame at the same offset it had inside the union box
    offset_x = frame_bbox[0] - lmin
    offset_y = frame_bbox[1] - tmin
    canvas.paste(cropped, (offset_x, offset_y), cropped)
    return canvas
    """Center a frame on a transparent canvas.

    If *crop_box* is provided, the frame is cropped to that box before being
    centered; otherwise the frame's own bounding box is used. Supplying the
    same crop_box for every frame avoids the subtle up-and-down movement that
    can occur when each frame is cropped differently.
    """
    canvas = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    if crop_box is None:
        crop_box = get_bounding_box(frame)
    cropped = frame.crop(crop_box)
    x = (canvas.width - cropped.width) // 2
    y = (canvas.height - cropped.height) // 2
    canvas.paste(cropped, (x, y), cropped)
    return canvas

original = Image.open(input_gif)
frames = [frame.convert("RGBA") for frame in ImageSequence.Iterator(original)]
source_color = guess_color(frames[0])
# Use a single bounding box for all frames to ensure perfect alignment
union_bbox = get_union_bbox(frames)

aligned_frames = []
for f in frames:
    recolored = replace_color_fuzzy(f.copy(), source_color, gruvbox_yellow)
    aligned = align_frame_to_union(recolored, union_bbox)
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
