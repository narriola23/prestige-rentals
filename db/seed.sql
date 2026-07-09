-- Prestige Rentals - Sample Products

INSERT INTO products (name, slug, description, base_price, deposit_amount, category, is_active, image_url, setup_time_minutes, teardown_time_minutes, capacity, length_ft, width_ft, height_ft)
VALUES
  ('Classic Castle Bouncer', 'classic-castle-bouncer', 'Our most popular bounce house — a timeless castle design that kids absolutely love. Features a large jumping area, netted walls for safety, and a slide. Perfect for birthdays and backyard parties for kids ages 2–12.', 17500, 5000, 'Bounce House', true, 'https://picsum.photos/seed/bounce1/800/500', 30, 30, 8, 15.0, 15.0, 13.0),
  ('Tropical Splash Combo', 'tropical-splash-combo', 'Beat the Houston heat with our fan-favorite water combo unit! Features a bounce area, a climbing wall, a water slide, and a splash pool at the bottom. Great for summer parties. Connects to a standard garden hose. Kids ages 3–12 will have a blast!', 27500, 7500, 'Water Combo', true, 'https://picsum.photos/seed/bounce2/800/500', 45, 45, 10, 24.0, 14.0, 16.0),
  ('Princess Palace Jumper', 'princess-palace-jumper', 'A magical pink and purple palace fit for royalty! Themed with princess crowns and fairy-tale towers — perfect for princess-themed birthday parties. Features a spacious jumping area, dual slides, and a pop-up obstacle section.', 19900, 5000, 'Bounce House', true, 'https://picsum.photos/seed/bounce3/800/500', 30, 30, 8, 16.0, 16.0, 14.0),
  ('Superhero Obstacle Course', 'superhero-obstacle-course', 'A full obstacle course experience for the ultimate superhero party! Kids race through pop-up obstacles, climb a wall, crawl through tunnels, and finish with a giant slide. Great for larger events, school field days, and corporate family nights. Ages 4+.', 34900, 10000, 'Obstacle Course', true, 'https://picsum.photos/seed/bounce4/800/500', 60, 45, 15, 35.0, 10.0, 12.0),
  ('Toddler Town Soft Play', 'toddler-town-soft-play', 'Designed specifically for the littlest guests! Our Toddler Town soft play area features a small bounce house, foam-padded shapes, a ball pit, and a mini slide — all sized perfectly for children ages 1–5. A must-have for first birthdays and baby showers.', 14900, 4000, 'Toddler', true, 'https://picsum.photos/seed/bounce5/800/500', 25, 25, 12, 20.0, 12.0, 8.0)
ON CONFLICT (slug) DO NOTHING;

-- Starter delivery ZIP whitelist covering the 12 existing service-area
-- cities. NOT a complete list — this is a starting point to expand from
-- real delivery-radius data; edit directly in the DB as coverage grows.
INSERT INTO service_zip_codes (zip_code, city) VALUES
  ('77002', 'Houston'), ('77003', 'Houston'), ('77004', 'Houston'), ('77005', 'Houston'),
  ('77006', 'Houston'), ('77007', 'Houston'), ('77008', 'Houston'), ('77009', 'Houston'),
  ('77018', 'Houston'), ('77019', 'Houston'), ('77024', 'Houston'), ('77027', 'Houston'),
  ('77056', 'Houston'), ('77057', 'Houston'), ('77074', 'Houston'), ('77081', 'Houston'),
  ('77429', 'Cypress'), ('77433', 'Cypress'),
  ('77373', 'Spring'), ('77379', 'Spring'), ('77386', 'Spring'), ('77388', 'Spring'), ('77389', 'Spring'),
  ('77375', 'Tomball'), ('77377', 'Tomball'),
  ('77449', 'Katy'), ('77450', 'Katy'), ('77494', 'Katy'),
  ('77380', 'The Woodlands'), ('77381', 'The Woodlands'), ('77382', 'The Woodlands'), ('77384', 'The Woodlands'), ('77385', 'The Woodlands'),
  ('77338', 'Humble'), ('77339', 'Humble'), ('77346', 'Humble'), ('77396', 'Humble'),
  ('77301', 'Conroe'), ('77302', 'Conroe'), ('77303', 'Conroe'), ('77304', 'Conroe'), ('77306', 'Conroe'),
  ('77478', 'Sugar Land'), ('77479', 'Sugar Land'), ('77496', 'Sugar Land'),
  ('77581', 'Pearland'), ('77584', 'Pearland'), ('77588', 'Pearland'),
  ('77040', 'Jersey Village'), ('77041', 'Jersey Village'), ('77065', 'Jersey Village')
ON CONFLICT (zip_code) DO NOTHING;

-- ============================================================
-- Real inventory import (replaces the 5 placeholder products above)
-- ============================================================

-- Retire the placeholder products rather than deleting them, so any
-- existing bookings/FKs referencing them stay intact.
UPDATE products SET is_active = false
WHERE slug IN (
  'classic-castle-bouncer', 'tropical-splash-combo', 'princess-palace-jumper',
  'superhero-obstacle-course', 'toddler-town-soft-play'
);

INSERT INTO products (
  name, slug, description, base_price, deposit_amount, category, is_active, image_url,
  setup_time_minutes, teardown_time_minutes, capacity, length_ft, width_ft, height_ft,
  wet_dry, special_requirements
)
VALUES
  ('Marvel Adventures', 'marvel-adventures',
   'A superhero-themed bounce house with a rock wall climb, slide, and pop-up obstacles inside — a high-energy pick for action-loving kids.',
   25500, 12750, 'Bounce House', true, '/images/products/marvel-adventures/1.jpg',
   25, 20, 20, 23.0, 23.0, 15.0, 'Dry', 'No food, drinks, or shoes inside.'),

  ('The Astronaut', 'the-astronaut',
   'A space-themed combo unit with a bounce area and slide that can run wet or dry — great for both birthday parties and summer cool-downs.',
   19000, 9500, 'Bounce House', true, '/images/products/the-astronaut/1.jpg',
   25, 20, 20, 26.0, 15.0, 15.0, 'Both', 'No food, drinks, or shoes inside. Additional $20 charge if used wet.'),

  ('Single Princess Waterslide', 'single-princess-waterslide',
   'A pink princess-themed waterslide, perfect for hot Houston days — can also be run dry for a standard slide experience.',
   18500, 9250, 'Water Slide', true, '/images/products/single-princess-waterslide/1.jpg',
   26, 20, 20, 25.0, 14.0, 15.0, 'Both', 'No food, drinks, or shoes inside. Additional $20 charge if used wet.'),

  ('Double Princess Waterslide', 'double-princess-waterslide',
   'Our larger princess-themed waterslide with dual slide lanes for double the fun — can also be run dry.',
   19500, 9750, 'Water Slide', true, '/images/products/double-princess-waterslide/1.jpg',
   25, 20, 20, 23.0, 14.0, 15.0, 'Both', 'No food, drinks, or shoes inside. Additional $20 charge if used wet.'),

  ('The Sun', 'the-sun',
   'A bright, sunshine-themed dry bounce house — a cheerful, compact option for backyard birthday parties.',
   14500, 7250, 'Bounce House', true, '/images/products/the-sun/1.jpg',
   25, 20, 20, 20.0, 14.0, 15.0, 'Dry', 'No food, drinks, or shoes inside.'),

  ('The Sunny Slide', 'the-sunny-slide',
   'A sunshine-themed water slide, perfect for beating the Houston heat at summer parties.',
   18000, 9000, 'Water Slide', true, '/images/products/the-sunny-slide/1.jpg',
   25, 20, 20, 23.0, 14.0, 15.0, 'Wet', 'No food, drinks, or shoes inside.'),

  ('The Tropical', 'the-tropical',
   'A vibrant tropical-themed dry bounce house, sized well for smaller yards.',
   11000, 5500, 'Bounce House', true, '/images/products/the-tropical/1.jpg',
   25, 20, 20, 13.0, 13.0, 15.0, 'Dry', 'No food, drinks, or shoes inside.'),

  ('The Castle', 'the-castle',
   'A classic castle-themed dry bounce house — a party favorite for all ages.',
   11000, 5500, 'Bounce House', true, '/images/products/the-castle/1.jpg',
   25, 20, 20, 13.0, 13.0, 15.0, 'Dry', 'No food, drinks, or shoes inside.'),

  ('The White Castle', 'the-white-castle',
   'A compact castle-themed bounce house sized perfectly for toddlers and smaller spaces.',
   10000, 5000, 'Bounce House', true, NULL,
   25, 20, 10, 8.0, 10.0, 8.0, 'Dry', 'No food, drinks, or shoes inside.'),

  ('Tables', 'tables',
   'Plastic folding tables available to add to any rental.',
   800, 0, 'Tables & Chairs', true, NULL,
   25, 20, NULL, NULL, NULL, NULL, NULL, NULL),

  ('Chairs', 'chairs',
   'Plastic folding chairs available to add to any rental.',
   200, 0, 'Tables & Chairs', true, NULL,
   25, 20, NULL, NULL, NULL, NULL, NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  base_price = EXCLUDED.base_price,
  deposit_amount = EXCLUDED.deposit_amount,
  category = EXCLUDED.category,
  is_active = EXCLUDED.is_active,
  image_url = EXCLUDED.image_url,
  setup_time_minutes = EXCLUDED.setup_time_minutes,
  teardown_time_minutes = EXCLUDED.teardown_time_minutes,
  capacity = EXCLUDED.capacity,
  length_ft = EXCLUDED.length_ft,
  width_ft = EXCLUDED.width_ft,
  height_ft = EXCLUDED.height_ft,
  wet_dry = EXCLUDED.wet_dry,
  special_requirements = EXCLUDED.special_requirements;

-- Real photo galleries for the 8 products with real photos on hand.
-- (The White Castle has no photos yet — it falls back to a placeholder
-- image in the UI until photos arrive.)
INSERT INTO product_images (product_id, image_url, sort_order)
SELECT p.id, v.image_url, v.sort_order
FROM (VALUES
  ('marvel-adventures', '/images/products/marvel-adventures/1.jpg', 1),
  ('marvel-adventures', '/images/products/marvel-adventures/2.jpg', 2),
  ('marvel-adventures', '/images/products/marvel-adventures/3.jpg', 3),
  ('marvel-adventures', '/images/products/marvel-adventures/4.jpg', 4),
  ('marvel-adventures', '/images/products/marvel-adventures/5.jpg', 5),
  ('marvel-adventures', '/images/products/marvel-adventures/6.jpg', 6),
  ('marvel-adventures', '/images/products/marvel-adventures/7.jpg', 7),
  ('the-astronaut', '/images/products/the-astronaut/1.jpg', 1),
  ('the-astronaut', '/images/products/the-astronaut/2.jpg', 2),
  ('the-astronaut', '/images/products/the-astronaut/3.jpg', 3),
  ('single-princess-waterslide', '/images/products/single-princess-waterslide/1.jpg', 1),
  ('single-princess-waterslide', '/images/products/single-princess-waterslide/2.jpg', 2),
  ('single-princess-waterslide', '/images/products/single-princess-waterslide/3.jpg', 3),
  ('single-princess-waterslide', '/images/products/single-princess-waterslide/4.jpg', 4),
  ('double-princess-waterslide', '/images/products/double-princess-waterslide/1.jpg', 1),
  ('double-princess-waterslide', '/images/products/double-princess-waterslide/2.jpg', 2),
  ('the-tropical', '/images/products/the-tropical/1.jpg', 1),
  ('the-castle', '/images/products/the-castle/1.jpg', 1),
  ('the-sun', '/images/products/the-sun/1.jpg', 1),
  ('the-sunny-slide', '/images/products/the-sunny-slide/1.jpg', 1)
) AS v(slug, image_url, sort_order)
JOIN products p ON p.slug = v.slug
WHERE NOT EXISTS (
  SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.image_url = v.image_url
);

INSERT INTO add_ons (name, price, description) VALUES
  ('Generator Rental', 7500, 'Required if no outdoor outlet within 100ft'),
  ('Extra Hour', 5000, 'Extends rental by 1 hour'),
  ('Concession Machine (Snow Cone)', 6000, 'Includes supplies for ~50 servings'),
  ('Tables & Chairs (Set of 6)', 4000, 'Plastic folding tables and chairs'),
  ('Attendant / Staff', 10000, 'Trained staff member for duration of rental')
ON CONFLICT (name) DO NOTHING;

-- Full delivery ZIP list from the client's intake form (additive only —
-- does not remove any ZIPs already whitelisted above).
INSERT INTO service_zip_codes (zip_code) VALUES
  ('77002'), ('77003'), ('77004'), ('77005'), ('77006'), ('77007'), ('77008'), ('77009'),
  ('77014'), ('77016'), ('77018'), ('77022'), ('77024'), ('77027'), ('77032'), ('77037'),
  ('77038'), ('77039'), ('77040'), ('77041'), ('77043'), ('77055'), ('77057'), ('77064'),
  ('77065'), ('77066'), ('77067'), ('77068'), ('77069'), ('77070'), ('77073'), ('77080'),
  ('77084'), ('77086'), ('77088'), ('77090'), ('77091'), ('77092'), ('77095'), ('77096'),
  ('77098'), ('77336'), ('77338'), ('77339'), ('77345'), ('77346'), ('77354'), ('77355'),
  ('77357'), ('77362'), ('77373'), ('77375'), ('77377'), ('77379'), ('77380'), ('77381'),
  ('77382'), ('77384'), ('77385'), ('77386'), ('77388'), ('77389'), ('77396'), ('77401'),
  ('77406'), ('77407'), ('77429'), ('77433'), ('77441'), ('77447'), ('77449'), ('77450'),
  ('77459'), ('77469'), ('77477'), ('77478'), ('77479'), ('77484'), ('77489'), ('77493'),
  ('77494'), ('77532'), ('77547'), ('77562'), ('77573'), ('77584'), ('77598')
ON CONFLICT (zip_code) DO NOTHING;
