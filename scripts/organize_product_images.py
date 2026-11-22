from PIL import Image
import os

# Inspect and split page 10
im10 = Image.open('public/images/products/page_10_img_1.jpeg')
w, h = im10.size
print(f'Page 10 size: {w}x{h}')

# Left side is Chrome, Right side is Brushed Brass
# Let's crop with a small margin
left_spray = im10.crop((0, 0, int(w * 0.52), h))
right_spray = im10.crop((int(w * 0.48), 0, w, h))

left_spray.save('public/images/products/spray_chrome.jpg', quality=95)
right_spray.save('public/images/products/spray_brass.jpg', quality=95)
print('Saved spray_chrome.jpg and spray_brass.jpg')

# Let's map all images to semantic names
naming_map = {
    'page_3_img_1.jpeg': 'basin_mahogany_curved.jpg',
    'page_3_img_2.jpeg': 'basin_teak_stepped_ripple.jpg',
    'page_4_img_1.jpeg': 'basin_teak_live_edge.jpg',
    'page_4_img_2.jpeg': 'basin_emerald_jade_wave.jpg',
    'page_5_img_1.jpeg': 'basin_fluted_scallop_teak.jpg',
    'page_5_img_2.jpeg': 'basin_honey_teak_oval.jpg',
    'page_6_img_1.jpeg': 'basin_blonde_bamboo_cylindrical.jpg',
    'page_6_img_2.jpeg': 'basin_satin_brass_pill.jpg',
    'page_7_img_1.jpeg': 'basin_root_freestanding_pedestal.jpg',
    'page_8_img_1.jpeg': 'tap_waterfall_spout_gold.jpg',
    'page_8_img_2.jpeg': 'tap_monolith_angular_facet.jpg',
    'page_8_img_3.jpeg': 'tap_bamboo_architectural_antique.jpg',
    'page_8_img_4.jpeg': 'tap_baroque_classic_gold.jpg',
    'page_9_img_1.jpeg': 'tap_golden_swan_sculptural.jpg',
    'page_9_img_2.jpeg': 'tap_twisted_prism_gold.jpg',
    'page_9_img_3.jpeg': 'tap_ribbon_blade_minimalist.jpg',
    'page_9_img_4.jpeg': 'tap_knurled_cylinder_tall.jpg',
    'page_11_img_1.jpeg': 'acc_classical_towel_rail.jpg',
    'page_11_img_2.jpeg': 'acc_classical_robe_hook.jpg',
    'page_11_img_3.jpeg': 'acc_classical_paper_holder.jpg',
    'page_11_img_4.jpeg': 'acc_classical_oval_towel_ring.jpg',
}

for src_name, dst_name in naming_map.items():
    src_path = os.path.join('public/images/products', src_name)
    dst_path = os.path.join('public/images/products', dst_name)
    im = Image.open(src_path)
    im.save(dst_path, quality=95)
    print(f'Converted {src_name} -> {dst_name}')

