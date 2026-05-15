from PIL import Image
import sys

img_path = sys.argv[1]
img = Image.open(img_path).convert("RGB")
width, height = img.size

# Find rows that have non-black pixels
rows = []
for y in range(height):
    has_color = False
    for x in range(width):
        r, g, b = img.getpixel((x, y))
        if r > 30 or g > 30 or b > 30:
            has_color = True
            break
    rows.append(has_color)

# Find the largest gap of empty space between non-empty rows in the lower half
empty_gaps = []
current_gap_start = -1
for y in range(height):
    if not rows[y]:
        if current_gap_start == -1:
            current_gap_start = y
    else:
        if current_gap_start != -1:
            empty_gaps.append((current_gap_start, y))
            current_gap_start = -1

print("Height:", height)
print("Empty gaps:", empty_gaps)
