import fitz
import os

doc = fitz.open('MOSAKA Catalogue Guidance - Copy.pdf')
os.makedirs('public/images/products', exist_ok=True)

img_count = 0
for page_num in range(2, len(doc)):
    page = doc[page_num]
    image_list = page.get_images(full=True)
    print(f'Page {page_num + 1}: {len(image_list)} images')
    for idx, item in enumerate(image_list):
        xref = item[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image['image']
        ext = base_image['ext']
        w = base_image['width']
        h = base_image['height']
        filename = f'public/images/products/page_{page_num + 1}_img_{idx + 1}.{ext}'
        with open(filename, 'wb') as f:
            f.write(image_bytes)
        print(f'  -> {filename}: {w}x{h}, {len(image_bytes)} bytes')
        img_count += 1

print(f'Total extracted: {img_count}')

