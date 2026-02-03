-- ============================================================================
-- ELITE Gym Management System - Database Schema
-- Generated from: elite_schema_diagram (1).jsx
-- Database: PostgreSQL 14+
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- CORE ENTITIES
-- ============================================================================

-- Gyms table
CREATE TABLE gyms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    timezone VARCHAR(50),
    capacity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    settings JSONB
);

CREATE INDEX idx_gyms_timezone ON gyms(timezone);
CREATE INDEX idx_gyms_created_at ON gyms(created_at);

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    status VARCHAR(50),
    profile_photo_url VARCHAR(500),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE INDEX idx_users_gym_id ON users(gym_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Members table
CREATE TABLE members (
    member_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    current_tier VARCHAR(50),
    join_date DATE,
    membership_expiry DATE,
    qr_code_hash VARCHAR(255) UNIQUE,
    emergency_contact JSONB,
    current_streak INT DEFAULT 0,
    total_visits INT DEFAULT 0,
    last_check_in TIMESTAMP,
    badge_level VARCHAR(50),
    height_cm FLOAT,
    weight_kg FLOAT,
    gender VARCHAR(20),
    dob DATE
);

CREATE INDEX idx_members_user_id ON members(user_id);
CREATE INDEX idx_members_gym_id ON members(gym_id);
CREATE INDEX idx_members_current_tier ON members(current_tier);
CREATE INDEX idx_members_membership_expiry ON members(membership_expiry);
CREATE INDEX idx_members_current_streak ON members(current_streak);
CREATE INDEX idx_members_total_visits ON members(total_visits);
CREATE INDEX idx_members_badge_level ON members(badge_level);

-- ============================================================================
-- OPERATIONS & TRACKING
-- ============================================================================

-- Check-ins table
CREATE TABLE check_ins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES members(member_id) ON DELETE CASCADE,
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    check_in_time TIMESTAMP NOT NULL,
    check_out_time TIMESTAMP,
    duration_minutes INT,
    body_parts_trained JSONB,
    calories_burned FLOAT,
    notes TEXT,
    status VARCHAR(50)
);

CREATE INDEX idx_check_ins_member_id ON check_ins(member_id);
CREATE INDEX idx_check_ins_gym_id ON check_ins(gym_id);
CREATE INDEX idx_check_ins_check_in_time ON check_ins(check_in_time);
CREATE INDEX idx_check_ins_status ON check_ins(status);

-- Workout logs table
CREATE TABLE workout_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    check_in_id UUID REFERENCES check_ins(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(member_id) ON DELETE CASCADE,
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    workout_date DATE,
    exercises JSONB,
    total_duration_min INT,
    calories_est FLOAT,
    intensity_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workout_logs_check_in_id ON workout_logs(check_in_id);
CREATE INDEX idx_workout_logs_member_id ON workout_logs(member_id);
CREATE INDEX idx_workout_logs_gym_id ON workout_logs(gym_id);
CREATE INDEX idx_workout_logs_workout_date ON workout_logs(workout_date);
CREATE INDEX idx_workout_logs_created_at ON workout_logs(created_at);

-- Occupancy table
CREATE TABLE occupancy (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    recorded_at TIMESTAMP NOT NULL,
    current_count INT NOT NULL,
    capacity INT,
    percentage FLOAT,
    status_level VARCHAR(50)
);

CREATE INDEX idx_occupancy_gym_id ON occupancy(gym_id);
CREATE INDEX idx_occupancy_recorded_at ON occupancy(recorded_at);

-- ============================================================================
-- STAFF & RESOURCES
-- ============================================================================

-- Trainers table
CREATE TABLE trainers (
    trainer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    bio TEXT,
    specializations JSONB,
    experience_years INT,
    rating FLOAT,
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_trainers_user_id ON trainers(user_id);
CREATE INDEX idx_trainers_gym_id ON trainers(gym_id);

-- Certifications table
CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainer_id UUID REFERENCES trainers(trainer_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    issuing_org VARCHAR(255),
    issue_date DATE,
    expiry_date DATE,
    document_url VARCHAR(500),
    status VARCHAR(50)
);

CREATE INDEX idx_certifications_trainer_id ON certifications(trainer_id);
CREATE INDEX idx_certifications_expiry_date ON certifications(expiry_date);
CREATE INDEX idx_certifications_status ON certifications(status);

-- Equipment table
CREATE TABLE equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    section VARCHAR(100),
    quantity INT,
    status VARCHAR(50),
    purchase_date DATE,
    warranty_expiry DATE,
    last_maintenance DATE,
    next_maintenance DATE
);

CREATE INDEX idx_equipment_gym_id ON equipment(gym_id);
CREATE INDEX idx_equipment_section ON equipment(section);
CREATE INDEX idx_equipment_status ON equipment(status);

-- ============================================================================
-- SCHEDULING & NOTIFICATIONS
-- ============================================================================

-- Calendar events table
CREATE TABLE calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(50),
    open_time TIME,
    close_time TIME,
    notes TEXT,
    is_recurring BOOLEAN DEFAULT false,
    recurrence_pattern VARCHAR(100)
);

CREATE INDEX idx_calendar_events_gym_id ON calendar_events(gym_id);
CREATE INDEX idx_calendar_events_date ON calendar_events(date);
CREATE INDEX idx_calendar_events_status ON calendar_events(status);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES members(member_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    channel VARCHAR(50),
    status VARCHAR(50),
    scheduled_at TIMESTAMP,
    sent_at TIMESTAMP,
    read_at TIMESTAMP,
    type VARCHAR(50)
);

CREATE INDEX idx_notifications_gym_id ON notifications(gym_id);
CREATE INDEX idx_notifications_recipient_id ON notifications(recipient_id);
CREATE INDEX idx_notifications_channel ON notifications(channel);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_type ON notifications(type);

-- ============================================================================
-- GAMIFICATION
-- ============================================================================

-- Badges table
CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    icon_url VARCHAR(500),
    criteria_type VARCHAR(50),
    required_value INT,
    level INT
);

CREATE INDEX idx_badges_criteria_type ON badges(criteria_type);

-- Member badges junction table
CREATE TABLE member_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES members(member_id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP NOT NULL,
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE
);

CREATE INDEX idx_member_badges_member_id ON member_badges(member_id);
CREATE INDEX idx_member_badges_badge_id ON member_badges(badge_id);
CREATE INDEX idx_member_badges_gym_id ON member_badges(gym_id);

-- Leaderboard table
CREATE TABLE leaderboard (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES members(member_id) ON DELETE CASCADE,
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    period_type VARCHAR(50),
    period_label VARCHAR(100),
    score FLOAT,
    rank INT,
    attendance_pct FLOAT,
    total_time_min INT,
    streak_days INT,
    calculated_at TIMESTAMP
);

CREATE INDEX idx_leaderboard_member_id ON leaderboard(member_id);
CREATE INDEX idx_leaderboard_gym_id ON leaderboard(gym_id);
CREATE INDEX idx_leaderboard_period_type ON leaderboard(period_type);
CREATE INDEX idx_leaderboard_rank ON leaderboard(rank);
CREATE INDEX idx_leaderboard_calculated_at ON leaderboard(calculated_at);

-- ============================================================================
-- REVENUE INTELLIGENCE
-- ============================================================================

-- Revenue configuration table
CREATE TABLE revenue_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    membership_tiers JSONB,
    additional_revenue JSONB,
    trainer_costs JSONB,
    fixed_costs JSONB,
    variable_costs JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_revenue_config_gym_id ON revenue_config(gym_id);
CREATE INDEX idx_revenue_config_created_at ON revenue_config(created_at);

-- Financial snapshots table
CREATE TABLE financial_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    revenue_config_id UUID REFERENCES revenue_config(id) ON DELETE SET NULL,
    snapshot_date DATE,
    mrr FLOAT,
    arr FLOAT,
    arpu FLOAT,
    gross_profit FLOAT,
    net_profit FLOAT,
    net_margin_pct FLOAT,
    health_score FLOAT
);

CREATE INDEX idx_financial_snapshots_gym_id ON financial_snapshots(gym_id);
CREATE INDEX idx_financial_snapshots_revenue_config_id ON financial_snapshots(revenue_config_id);
CREATE INDEX idx_financial_snapshots_snapshot_date ON financial_snapshots(snapshot_date);

-- Scenario models table
CREATE TABLE scenario_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    base_config_id UUID REFERENCES revenue_config(id) ON DELETE SET NULL,
    changes JSONB,
    projections JSONB,
    roi_pct FLOAT,
    payback_month INT,
    recommendation VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scenario_models_gym_id ON scenario_models(gym_id);
CREATE INDEX idx_scenario_models_base_config_id ON scenario_models(base_config_id);
CREATE INDEX idx_scenario_models_created_at ON scenario_models(created_at);

-- Revenue recommendations table
CREATE TABLE revenue_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    revenue_config_id UUID REFERENCES revenue_config(id) ON DELETE SET NULL,
    generated_at TIMESTAMP NOT NULL,
    category VARCHAR(50),
    priority VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    suggestion TEXT,
    current_state JSONB,
    proposed_change JSONB,
    projected_impact JSONB,
    risk_level VARCHAR(50),
    impact_score FLOAT,
    status VARCHAR(50)
);

CREATE INDEX idx_revenue_recommendations_gym_id ON revenue_recommendations(gym_id);
CREATE INDEX idx_revenue_recommendations_revenue_config_id ON revenue_recommendations(revenue_config_id);
CREATE INDEX idx_revenue_recommendations_generated_at ON revenue_recommendations(generated_at);
CREATE INDEX idx_revenue_recommendations_category ON revenue_recommendations(category);
CREATE INDEX idx_revenue_recommendations_priority ON revenue_recommendations(priority);
CREATE INDEX idx_revenue_recommendations_status ON revenue_recommendations(status);

-- ============================================================================
-- AUDIT & SECURITY
-- ============================================================================

-- Audit logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_gym_id ON audit_logs(gym_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to revenue_config
CREATE TRIGGER update_revenue_config_updated_at BEFORE UPDATE ON revenue_config
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
