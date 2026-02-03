-- ============================================================================
-- ELITE Gym Management System - Seed Data
-- Initial data for development and testing
-- ============================================================================

-- Sample Gym
INSERT INTO gyms (id, name, address, timezone, capacity, settings) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'ELITE Fitness Center', '123 Main Street, New York, NY 10001', 'America/New_York', 150, 
'{"operating_hours": {"monday": "05:00-22:00", "tuesday": "05:00-22:00", "wednesday": "05:00-22:00", "thursday": "05:00-22:00", "friday": "05:00-22:00", "saturday": "07:00-20:00", "sunday": "08:00-18:00"}, "features": ["sauna", "pool", "parking", "wifi"]}');

-- Sample Admin User
INSERT INTO users (id, gym_id, email, password_hash, full_name, role, status) VALUES
('223e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000', 'admin@elitegym.com', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 'Admin User', 'admin', 'active');

-- Sample Trainer User
INSERT INTO users (id, gym_id, email, password_hash, full_name, role, status, phone) VALUES
('323e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000', 'trainer@elitegym.com', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 'John Smith', 'trainer', 'active', '+1234567890');

-- Sample Member Users
INSERT INTO users (id, gym_id, email, password_hash, full_name, role, status, phone) VALUES
('423e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000', 'member1@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 'Jane Doe', 'member', 'active', '+1234567891'),
('523e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000', 'member2@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 'Mike Johnson', 'member', 'active', '+1234567892');

-- Sample Trainer Profile
INSERT INTO trainers (trainer_id, user_id, gym_id, bio, specializations, experience_years, rating) VALUES
('623e4567-e89b-12d3-a456-426614174000', '323e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000', 
'Certified personal trainer with 10 years of experience in strength training and nutrition.',
'["strength_training", "weight_loss", "nutrition", "HIIT"]', 10, 4.8);

-- Sample Member Profiles
INSERT INTO members (member_id, user_id, gym_id, current_tier, join_date, membership_expiry, qr_code_hash, current_streak, total_visits, badge_level, height_cm, weight_kg, gender, dob) VALUES
('723e4567-e89b-12d3-a456-426614174000', '423e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000', 
'premium', '2024-01-15', '2024-12-31', 'qr_member1_hash', 15, 45, 'gold', 165, 60, 'female', '1990-05-20'),
('823e4567-e89b-12d3-a456-426614174000', '523e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000', 
'basic', '2024-02-01', '2024-12-31', 'qr_member2_hash', 7, 22, 'silver', 180, 85, 'male', '1988-11-10');

-- Sample Badges
INSERT INTO badges (id, name, description, criteria_type, required_value, level) VALUES
('923e4567-e89b-12d3-a456-426614174000', 'First Timer', 'Completed your first workout', 'visits', 1, 1),
('a23e4567-e89b-12d3-a456-426614174000', 'Bronze Member', 'Reached 10 check-ins', 'visits', 10, 2),
('b23e4567-e89b-12d3-a456-426614174000', 'Silver Member', 'Reached 25 check-ins', 'visits', 25, 3),
('c23e4567-e89b-12d3-a456-426614174000', 'Gold Member', 'Reached 50 check-ins', 'visits', 50, 4),
('d23e4567-e89b-12d3-a456-426614174000', 'Platinum Member', 'Reached 100 check-ins', 'visits', 100, 5),
('e23e4567-e89b-12d3-a456-426614174000', 'Week Warrior', 'Maintained 7-day streak', 'streak', 7, 2),
('f23e4567-e89b-12d3-a456-426614174000', 'Month Master', 'Maintained 30-day streak', 'streak', 30, 4);

-- Sample Equipment
INSERT INTO equipment (gym_id, name, section, quantity, status, purchase_date) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Treadmill', 'Cardio', 10, 'operational', '2023-06-01'),
('123e4567-e89b-12d3-a456-426614174000', 'Elliptical', 'Cardio', 5, 'operational', '2023-06-01'),
('123e4567-e89b-12d3-a456-426614174000', 'Bench Press', 'Strength', 3, 'operational', '2023-06-01'),
('123e4567-e89b-12d3-a456-426614174000', 'Squat Rack', 'Strength', 2, 'operational', '2023-06-01'),
('123e4567-e89b-12d3-a456-426614174000', 'Dumbbells Set', 'Free Weights', 1, 'operational', '2023-06-01');

-- Sample Revenue Configuration
INSERT INTO revenue_config (gym_id, membership_tiers, additional_revenue, fixed_costs, variable_costs) VALUES
('123e4567-e89b-12d3-a456-426614174000',
'{"basic": {"price": 49.99, "name": "Basic", "features": ["gym_access"]}, "premium": {"price": 89.99, "name": "Premium", "features": ["gym_access", "classes", "pool"]}, "vip": {"price": 149.99, "name": "VIP", "features": ["gym_access", "classes", "pool", "personal_trainer"]}}',
'{"personal_training": 50, "lockers": 10, "merchandise": 20}',
'{"rent": 5000, "utilities": 1200, "insurance": 800, "software": 300}',
'{"cleaning": 500, "maintenance": 400, "supplies": 300}');

-- ============================================================================
-- NOTES
-- ============================================================================
-- Password hash above is a placeholder bcrypt hash for 'password123'
-- In production, use proper password hashing with bcrypt
-- UUIDs are hardcoded for consistency in seed data
-- ============================================================================
