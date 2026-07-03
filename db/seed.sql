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
