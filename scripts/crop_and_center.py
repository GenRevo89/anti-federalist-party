from PIL import Image
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

img = Image.open(input_path).convert("RGBA")

# getbbox works on the non-zero boundaries. 
# Since our background is purely transparent (alpha=0), this perfectly bounds the logo.
bbox = img.getbbox()

if bbox:
    # Crop to exact bounding box of the symbol
    cropped = img.crop(bbox)
    
    w, h = cropped.size
    # Make a square canvas with some padding (e.g. + 40 pixels)
    size = max(w, h) + 40
    
    # Create new transparent square image
    square_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    
    # Calculate center position
    x = (size - w) // 2
    y = (size - h) // 2
    
    # Paste the cropped image into the center
    square_img.paste(cropped, (x, y))
    
    square_img.save(output_path, "PNG")
    print("Cropped and centered successfully.")
else:
    print("Error: Image is completely transparent.")
