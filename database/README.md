# Database Setup Guide

This directory contains the database schema, migrations, and seed data for the ELITE Gym Management System.

## 📁 Structure

```
database/
├── migrations/         # SQL migration files
│   └── 001_initial_schema.sql
├── seeds/             # Seed data files
│   └── 001_initial_data.sql
├── connection.js      # Database connection module
├── migrate.js         # Migration runner
└── test-connection.js # Connection test utility
```

## 🚀 Quick Start

### 1. Set up Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=elite_gym
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start PostgreSQL

**Option A: Using Docker (Recommended)**
```bash
docker-compose up -d postgres
```

**Option B: Local PostgreSQL**
Make sure PostgreSQL is running on your system.

### 4. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE elite_gym;

# Exit psql
\q
```

### 5. Run Migrations

```bash
npm run db:migrate
```

### 6. (Optional) Seed Data

```bash
npm run db:seed
```

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run db:test` | Test database connection |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:seed` | Insert seed data |
| `npm run db:reset` | Drop all tables and re-run migrations |
| `npm run db:fresh` | Reset database + run migrations + seed data |

## 📊 Database Schema

The database includes 18 tables organized into the following categories:

### Core Entities
- **gyms** - Gym locations and settings
- **users** - User accounts (admins, trainers, members)
- **members** - Member profiles and membership details

### Operations
- **check_ins** - Member check-in/check-out records
- **workout_logs** - Detailed workout tracking
- **occupancy** - Real-time gym occupancy data

### Staff & Resources
- **trainers** - Trainer profiles
- **certifications** - Trainer certifications
- **equipment** - Gym equipment inventory

### Scheduling
- **calendar_events** - Gym hours and events
- **notifications** - Push/SMS/Email notifications

### Gamification
- **badges** - Achievement badges
- **member_badges** - Member badge awards
- **leaderboard** - Member rankings

### Revenue Intelligence
- **revenue_config** - Financial configuration
- **financial_snapshots** - Historical financial data
- **scenario_models** - "What-if" scenario planning
- **revenue_recommendations** - AI-generated suggestions

### Security
- **audit_logs** - Action audit trail

## 🔍 Verifying Setup

After running migrations, verify your setup:

```bash
# Test connection
npm run db:test

# Check tables (using psql)
psql -U postgres -d elite_gym -c "\dt"

# Count records
psql -U postgres -d elite_gym -c "SELECT COUNT(*) FROM gyms;"
```

## 🧪 Sample Data

The seed file (`001_initial_data.sql`) includes:
- 1 sample gym (ELITE Fitness Center)
- 1 admin user (admin@elitegym.com)
- 1 trainer user (trainer@elitegym.com)
- 2 member users
- 7 achievement badges
- 5 equipment items
- 1 revenue configuration

**Default password for all users: `password123`** (Update in production!)

## 🔧 Troubleshooting

### Connection Refused
- Ensure PostgreSQL is running: `docker ps` or `systemctl status postgresql`
- Check `.env` file has correct credentials
- Verify port 5432 is not blocked

### Permission Denied
- Ensure user has CREATE DATABASE permission
- Grant privileges: `GRANT ALL PRIVILEGES ON DATABASE elite_gym TO your_user;`

### Migration Already Executed
- Migrations are tracked in the `migrations` table
- To re-run: `npm run db:reset`

## 📝 Adding New Migrations

1. Create a new file in `database/migrations/` with format: `XXX_description.sql`
2. Write your SQL (CREATE, ALTER, etc.)
3. Run: `npm run db:migrate`

Example:
```sql
-- 002_add_booking_system.sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES members(member_id),
    ...
);
```

## 🔐 Production Checklist

- [ ] Change all default passwords
- [ ] Enable SSL for database connections
- [ ] Set up automated backups
- [ ] Configure connection pooling limits
- [ ] Enable query logging for monitoring
- [ ] Restrict database user permissions
- [ ] Set up read replicas for scaling

## 📚 Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres (pg) Guide](https://node-postgres.com/)
- [ELITE PRD](../ELITE_PRD.md)
