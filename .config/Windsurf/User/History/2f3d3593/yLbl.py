from PIL import Image, ImageSequence

# Input GIF path
gif_path = "arch.gif"
output_path = "arch_gruvbox.gif"

# Define target Gruvbox yellow
GRUVBOX_YELLOW = (250, 189, 47, 255)

# Function to recolor based on similarity instead of exact match
def is_similar(c1, c2, tolerance=30):
    return all(abs(a - b) <= tolerance for a, b in zip(c1[:3], c2[:3]))

def replace_color_fuzzy(frame, source_color, target_color, tolerance=30):
    pixels = frame.load()
    for y in range(frame.height):
        for x in range(frame.width):
            if is_similar(pixels[x, y], source_color, tolerance):
                pixels[x, y] = target_color
    return frame

# Load original GIF
original_gif = Image.open(gif_path)
frames = [frame.convert("RGBA") for frame in ImageSequence.Iterator(original_gif)]

# Guess source color from first frame (first non-transparent pixel)
def guess_main_color(frame):
    pixels = frame.load()
    for y in range(frame.height):
        for x in range(frame.width):
            r, g, b, a = pixels[x, y]
            if a > 100:
                return (r, g, b, a)
    return (126, 198, 221, 255)  # fallback to Arch blue

source_color = guess_main_color(frames[0])

# Recolor each frame using fuzzy match
recolored_frames = [replace_color_fuzzy(frame.copy(), source_color, GRUVBOX_YELLOW) for frame in frames]

# Save new GIF
recolored_frames[0].save(
    output_path,
    save_all=True,
    append_images=recolored_frames[1:],
    loop=0,
    duration=original_gif.info.get("duration", 100),
    transparency=0,
    disposal=2
)

print(f"✅ Recolored and saved to {output_path}")
