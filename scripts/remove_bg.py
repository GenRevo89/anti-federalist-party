from PIL import Image
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

img = Image.open(input_path).convert("RGBA")
datas = img.getdata()

newData = []
# Threshold for "black"
for item in datas:
    # item is (R, G, B, A)
    if item[0] < 30 and item[1] < 30 and item[2] < 30:
        newData.append((0, 0, 0, 0)) # transparent
    else:
        newData.append(item)

img.putdata(newData)
img.save(output_path, "PNG")
print("Background removed.")
