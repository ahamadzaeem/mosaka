from PIL import Image
import os

ref = Image.open('C:/Users/user/.gemini/antigravity/brain/00dc7e1c-51b1-476a-87b3-9ab7f2d8bf96/.user_uploaded/media_1795341134035_fc316e61.jpg')
W, H = ref.size
print('Reference dimensions:', W, H)

os.makedirs('public/images', exist_ok=True)

# 1. Shop Hero (The vanity with emerald basin and swan tap, plus ambient background)
# Hero section is roughly top right
hero_crop = ref.crop((0, 0, W, int(H * 0.268)))
hero_crop.save('public/images/shop-hero.jpg', quality=95)
print('Saved shop-hero.jpg')

# 2. Product cards inside the grid:
# In the reference:
# Grid bounding box:
# Left column card image: x: 160 to 405 (approx)
# Right column card image: x: 412 to 658 (approx)

# Let's crop cards precisely
cards = [
    ('emerald-basin.jpg', (160, 375, 404, 542)),
    ('copper-basin.jpg', (412, 375, 656, 542)),
    ('wood-basin.jpg', (160, 565, 404, 732)),
    ('ivory-basin.jpg', (412, 565, 656, 732)),
    ('noir-basin.jpg', (160, 755, 404, 922)),
    ('earth-basin.jpg', (412, 755, 656, 922)),
]

for name, bbox in cards:
    cropped = ref.crop(bbox)
    # resize up slightly with Lanczos for crisp display
    cropped_hires = cropped.resize((cropped.width * 2, cropped.height * 2), Image.Resampling.LANCZOS)
    cropped_hires.save(f'public/images/{name}', quality=95)
    print(f'Saved {name} ({cropped_hires.size})')

# For golden swan tap and arc tap and accessory:
# We have high-res golden swan tap in public/images/products/tap_golden_swan_sculptural.jpg
# and arc gold tap in public/images/products/tap_waterfall_spout_gold.jpg
# and accessory in public/images/products/acc_classical_oval_towel_ring.jpg
# Let's ensure those files exist and can be linked or copied
if os.path.exists('public/images/products/tap_golden_swan_sculptural.jpg'):
    Image.open('public/images/products/tap_golden_swan_sculptural.jpg').save('public/images/golden-swan-tap.jpg')
    print('Saved golden-swan-tap.jpg')

if os.path.exists('public/images/products/tap_waterfall_spout_gold.jpg'):
    Image.open('public/images/products/tap_waterfall_spout_gold.jpg').save('public/images/arc-gold-tap.jpg')
    print('Saved arc-gold-tap.jpg')

if os.path.exists('public/images/products/acc_classical_oval_towel_ring.jpg'):
    Image.open('public/images/products/acc_classical_oval_towel_ring.jpg').save('public/images/stone-accessory.jpg')
    print('Saved stone-accessory.jpg')
