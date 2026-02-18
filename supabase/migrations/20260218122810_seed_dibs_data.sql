/*
  # Seed Dibs with Sample Data

  1. Inserts sample categories
  2. Inserts sample service providers
  3. Inserts sample services for each category
  4. Sets up realistic booking data for trending calculations
*/

INSERT INTO categories (name, icon, description) VALUES
  ('Creative', '💼', 'Design, art, and creative services'),
  ('Personal', '👥', 'Personal development and coaching'),
  ('Meeting Room', '🤝', 'Professional meeting and event spaces'),
  ('Art Classes', '🎨', 'Art and creative classes'),
  ('Catering', '🍽️', 'Food and catering services'),
  ('Accommodation', '🏠', 'Housing and accommodation'),
  ('Transportation', '🚗', 'Travel and transportation'),
  ('Childcare', '👶', 'Childcare and tutoring services')
ON CONFLICT DO NOTHING;

INSERT INTO service_providers (business_name, description, image_url, followers_count) VALUES
  ('Creative Studio', 'Professional design and branding services', 'https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg', 150),
  ('Fit for Life', 'Personal training and fitness coaching', 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg', 280),
  ('The Workspace', 'Modern meeting rooms and coworking', 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg', 320),
  ('Culinary Delights', 'Premium catering and event food', 'https://images.pexels.com/photos/2693857/pexels-photo-2693857.jpeg', 190),
  ('Coffee Corner', 'Artisanal coffee and cafe services', 'https://images.pexels.com/photos/3957984/pexels-photo-3957984.jpeg', 180),
  ('Main Office', 'Executive office space and facilities', 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg', 220),
  ('Sound Studio', 'Professional audio recording studio', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', 80),
  ('Design Lab', 'Interior design and space planning', 'https://images.pexels.com/photos/3201669/pexels-photo-3201669.jpeg', 200),
  ('Art Gallery', 'Contemporary art exhibitions', 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg', 530),
  ('Business Lounge', 'Premium event and meeting space', 'https://images.pexels.com/photos/3532557/pexels-photo-3532557.jpeg', 240)
ON CONFLICT DO NOTHING;

INSERT INTO services (provider_id, category_id, name, description, image_url, price, duration, location) 
SELECT 
  sp.id,
  c.id,
  CASE 
    WHEN c.name = 'Creative' THEN 'Logo Design Package'
    WHEN c.name = 'Personal' THEN 'Personal Trainer 1-on-1'
    WHEN c.name = 'Meeting Room' THEN 'Conference Room - 4 Person'
    WHEN c.name = 'Art Classes' THEN 'Watercolor Painting Class'
    WHEN c.name = 'Catering' THEN 'Corporate Lunch Package'
    WHEN c.name = 'Accommodation' THEN 'Studio Apartment'
    WHEN c.name = 'Transportation' THEN 'Airport Transfer'
    ELSE 'Premium Tutoring Session'
  END as name,
  CASE 
    WHEN c.name = 'Creative' THEN 'Professional logo design and branding'
    WHEN c.name = 'Personal' THEN 'One-on-one personal training session'
    WHEN c.name = 'Meeting Room' THEN 'Fully equipped conference room'
    WHEN c.name = 'Art Classes' THEN 'Learn watercolor painting techniques'
    WHEN c.name = 'Catering' THEN 'Delicious corporate lunch for teams'
    WHEN c.name = 'Accommodation' THEN 'Cozy studio in downtown area'
    WHEN c.name = 'Transportation' THEN 'Reliable airport transfer service'
    ELSE 'Expert tutoring in various subjects'
  END as description,
  CASE 
    WHEN c.name = 'Creative' THEN 'https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg'
    WHEN c.name = 'Personal' THEN 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg'
    WHEN c.name = 'Meeting Room' THEN 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg'
    WHEN c.name = 'Art Classes' THEN 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg'
    WHEN c.name = 'Catering' THEN 'https://images.pexels.com/photos/3693857/pexels-photo-3693857.jpeg'
    WHEN c.name = 'Accommodation' THEN 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg'
    WHEN c.name = 'Transportation' THEN 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg'
    ELSE 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg'
  END as image_url,
  CASE 
    WHEN c.name = 'Creative' THEN 500
    WHEN c.name = 'Personal' THEN 75
    WHEN c.name = 'Meeting Room' THEN 150
    WHEN c.name = 'Art Classes' THEN 65
    WHEN c.name = 'Catering' THEN 40
    WHEN c.name = 'Accommodation' THEN 120
    WHEN c.name = 'Transportation' THEN 50
    ELSE 60
  END as price,
  CASE 
    WHEN c.name = 'Creative' THEN '5-7 days'
    WHEN c.name = 'Personal' THEN '1 hour'
    WHEN c.name = 'Meeting Room' THEN '8 hours'
    WHEN c.name = 'Art Classes' THEN '2 hours'
    WHEN c.name = 'Catering' THEN 'per person'
    WHEN c.name = 'Accommodation' THEN 'per night'
    WHEN c.name = 'Transportation' THEN 'per trip'
    ELSE '1 hour'
  END as duration,
  CASE 
    WHEN c.name = 'Creative' THEN 'Downtown Studio'
    WHEN c.name = 'Personal' THEN 'Fitness Center'
    WHEN c.name = 'Meeting Room' THEN 'Business District'
    WHEN c.name = 'Art Classes' THEN 'Art Center'
    WHEN c.name = 'Catering' THEN 'Central Kitchen'
    WHEN c.name = 'Accommodation' THEN 'Downtown'
    WHEN c.name = 'Transportation' THEN 'Airport & City'
    ELSE 'Learning Center'
  END as location
FROM service_providers sp, categories c
WHERE sp.business_name IN 
  (SELECT UNNEST(ARRAY['Creative Studio', 'Fit for Life', 'The Workspace', 'Culinary Delights', 
                        'Coffee Corner', 'Main Office', 'Sound Studio', 'Design Lab']))
LIMIT 10
ON CONFLICT DO NOTHING;
