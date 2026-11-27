import csv
import re
import json

# Read data/products.js and extract the products array
with open('data/products.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse product objects using regex for key fields
# Or define exact 23 products matching data/products.js
products = [
    ("mahogany-organic-curved-basin", "Mahogany Contour Vessel", "Basins", "Wooden Basins, African Mahogany, Natural Matte Silk Hydro-Seal", 6200, "MOS-BSN-001", 9200, "Sculptural warmth carved from aged heartwood African mahogany."),
    ("teak-stepped-ripple-basin", "Teak Stepped Ripple Basin", "Basins", "Wooden Basins, Burmese Solid Teak, Warm Satin Oiled Teak, featured", 6850, "MOS-BSN-002", 11000, "Cascading concentric terraces inspired by desert sand dunes."),
    ("tectona-raw-live-edge-basin", "Amezon Live-Edge Burl Basin", "Basins", "Wooden Basins, Burmese Solid Teak, Natural Organic Matte, featured", 7400, "MOS-BSN-003", 14500, "Wild, unbridled natural bark contours sculpted into luxury sanctuary art."),
    ("emerald-jade-wave-basin", "Emerald Jade Leaf Wave Basin", "Basins", "Statement Basins, Emerald Mineral Resin, Emerald Translucent, featured", 7800, "MOS-BSN-004", 13200, "Deep mineral jade hues frozen in an undulating sculptural wave."),
    ("fluted-scallop-teak-basin", "Fluted Scallop Teak Basin", "Basins", "Wooden Basins, Burmese Solid Teak, Natural Oiled Teak", 6400, "MOS-BSN-005", 8800, "Classical Greco-Roman fluting reinterpreted in architectural solid teak."),
    ("honey-teak-elliptical-basin", "Honey Teak Elliptical Basin", "Basins", "Wooden Basins, Burmese Solid Teak, Natural Oiled Teak", 5750, "MOS-BSN-006", 9500, "Pure streamlined minimalism with softened organic oval curves."),
    ("blonde-bamboo-cylindrical-basin", "Nordic Blonde Bamboo Basin", "Basins", "Wooden Basins, Moso Bamboo, Pale Blonde Bamboo", 5200, "MOS-BSN-007", 7800, "Light, ethereal timber aesthetics for bright Japandi & Nordic sanctuaries."),
    ("satin-brass-pill-vessel-basin", "Satin Brass Pill Vessel Basin", "Basins", "Statement Basins, Solid Forged Brass, Brushed Champagne Gold, featured", 8900, "MOS-BSN-008", 16800, "Hand-spun solid brass with a luminous brushed champagne glow."),
    ("majestic-root-freestanding-pedestal", "Majestic Root Freestanding Pedestal", "Basins", "Pedestal Basins, Burmese Solid Teak, Natural Oiled Teak, featured", 18500, "MOS-BSN-009", 58000, "Monumental architectural sculpture carved from an entire ancient root trunk."),
    ("curved-waterfall-spout-mixer-gold", "Aura Waterfall Spout Mixer", "Taps", "Waterfall & Flow, Solid Forged Brass, Brushed Champagne Gold, featured", 3400, "MOS-TAP-001", 3200, "A gentle cascading sheet of water echoing mountain streams."),
    ("monolith-angular-facet-tap", "Monolith Angular Facet Tap", "Taps", "Architectural Monolith, Solid Forged Brass, Mirror Polished Gold", 3200, "MOS-TAP-002", 3100, "Chiseled geometric facets finished in mirror-polished brass."),
    ("bamboo-architectural-antique-mixer", "Zen Bamboo Architectural Mixer", "Taps", "Sculptural & Classic, Solid Forged Brass, Antique Patina Brass", 3100, "MOS-TAP-003", 3000, "Sculpted botanical bamboo nodes in rich antique patinated brass."),
    ("baroque-classic-gold-mixer", "Versailles Baroque Classic Mixer", "Taps", "Sculptural & Classic, Solid Forged Brass, Mirror Polished Gold", 2950, "MOS-TAP-004", 3300, "Regal baluster curves and royal crest detailing in 24k polished gold."),
    ("golden-swan-sculptural-tap", "Imperial Golden Swan Tap", "Taps", "Sculptural & Classic, Solid Forged Brass, Mirror Polished Gold, featured", 4800, "MOS-TAP-005", 4200, "The iconic Mosaka showpiece: Hand-engraved feather wings and graceful arching swan neck."),
    ("twisted-prism-gold-mixer", "Prism Kinetic Twisted Mixer", "Taps", "Architectural Monolith, Solid Forged Brass, Mirror Polished Gold", 3300, "MOS-TAP-006", 3100, "A sculptural torque twist frozen in high-gloss brass."),
    ("ribbon-blade-minimalist-mixer", "Aero Ribbon Blade Mixer", "Taps", "Waterfall & Flow, Solid Forged Brass, Brushed Champagne Gold", 3150, "MOS-TAP-007", 2900, "An ultra-slim horizontal blade delivering whisper-quiet precision."),
    ("knurled-cylinder-tall-basin-mixer", "Atelier Knurled Tall Vessel Mixer", "Taps", "Architectural Monolith, Solid Forged Brass, Brushed Champagne Gold, featured", 3600, "MOS-TAP-008", 3400, "Diamond cross-hatch industrial knurling with tall countertop clearance."),
    ("luxury-square-bidet-spray-chrome", "Square Architectural Bidet Spray (Chrome)", "Accessories", "Bidet Systems, Polished Chrome Brass, Mirror Polished Chrome", 950, "MOS-ACC-001", 1200, "Mirror-finish polished chrome with cubic architectural lines."),
    ("luxury-square-bidet-spray-brass", "Square Architectural Bidet Spray (Brushed Brass)", "Accessories", "Bidet Systems, Solid Forged Brass, Brushed Champagne Gold, featured", 1100, "MOS-ACC-002", 1200, "Architectural cubic hand shower and health faucet in brushed champagne gold."),
    ("classical-brass-towel-rail", "Classical Fluted Towel Rail (600mm)", "Accessories", "Classical Brass Suite, Solid Forged Brass, Antique Patina Brass", 1250, "MOS-ACC-003", 1800, "Finely turned classical rosettes and fluted end finials in antique brass."),
    ("classical-brass-double-robe-hook", "Classical Double Robe Hook", "Accessories", "Classical Brass Suite, Solid Forged Brass, Antique Patina Brass", 550, "MOS-ACC-004", 650, "Dual curved hanging prongs with architectural ball finials."),
    ("classical-brass-covered-toilet-paper-holder", "Classical Covered Paper Holder", "Accessories", "Classical Brass Suite, Solid Forged Brass, Antique Patina Brass", 850, "MOS-ACC-005", 950, "Hinged solid brass flap cover with silent damper action."),
    ("classical-brass-oval-towel-ring", "Classical Oval Towel Ring", "Accessories", "Classical Brass Suite, Solid Forged Brass, Antique Patina Brass", 750, "MOS-ACC-006", 850, "An elongated oval loop designed for vanity hand towels."),
]

headers = [
    "Handle", "Title", "Body (HTML)", "Vendor", "Type", "Tags", "Published",
    "Option1 Name", "Option1 Value", "Variant SKU", "Variant Grams",
    "Variant Inventory Tracker", "Variant Inventory Qty", "Variant Inventory Policy",
    "Variant Fulfillment Service", "Variant Price", "Variant Requires Shipping",
    "Variant Taxable", "Status"
]

with open('scripts/mosaka_shopify_products.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    for handle, title, ptype, tags, price, sku, grams, desc in products:
        writer.writerow([
            handle, title, f"<p>{desc}</p>", "MOSAKA BATHWARE", ptype, tags, "TRUE",
            "Title", "Default Title", sku, grams,
            "shopify", 10, "continue", "manual", price, "TRUE", "TRUE", "active"
        ])

print(f"Generated scripts/mosaka_shopify_products.csv with {len(products)} products.")

