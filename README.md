# ELITE Gym Management System

<div align="center">

![ELITE Logo](https://via.placeholder.com/200x80/6366f1/ffffff?text=ELITE)

**Premium Gym Management SaaS Platform**

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-14+-blue.svg)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/react-18+-blue.svg)](https://reactjs.org/)

[Features](#features) •
[Quick Start](#quick-start) •
[Documentation](#documentation) •
[API](#api-documentation) •
[Contributing](#contributing)

</div>

---

## 📖 Overview

**ELITE** is a comprehensive gym management platform designed to streamline operations, enhance member experience, and maximize revenue. Built with modern technologies and scalable architecture, ELITE provides everything from member check-ins to AI-powered revenue recommendations.

### Key Highlights
- 🏋️ **Member Management** - Complete member lifecycle management
- 📊 **Revenue Intelligence** - AI-powered financial insights and scenario modeling
- 🎮 **Gamification** - Badges, leaderboards, and streak tracking
- 📱 **Multi-channel Notifications** - Push, SMS, and Email support
- 🔐 **Role-based Access Control** - Secure multi-tenant architecture
- 📈 **Real-time Analytics** - Occupancy tracking and performance metrics

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)
- Redis (v7+)
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/princeyadav308/Elite.git
   cd Elite
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start database with Docker**
   ```bash
   docker-compose up -d postgres redis
   ```

5. **Run database migrations**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

6. **Start development servers**
   ```bash
   npm run dev
   ```

   - Backend API: http://localhost:3000
   - Frontend: http://localhost:5173

---

## 📁 Project Structure

```
Elite/
├── server/                 # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── api/           # Routes, controllers, middlewares
│   │   ├── services/      # Business logic
│   │   ├── models/        # Database models
│   │   ├── config/        # Configuration
│   │   └── utils/         # Utilities
│   └── tests/             # Backend tests
│
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── store/         # State management
│   └── public/            # Static assets
│
├── database/              # Database migrations & seeds
│   ├── migrations/        # SQL migration files
│   └── seeds/             # Seed data
│
├── shared/                # Shared code
│   └── constants/         # Shared constants
│
├── docs/                  # Documentation
│   ├── api/               # API documentation
│   └── guides/            # Development guides
│
├── docker/                # Docker configurations
│   ├── development/       # Dev Dockerfiles
│   └── production/        # Prod Dockerfiles
│
└── .github/               # CI/CD workflows
```

---

## ✨ Features

### Core Platform
- **Multi-tenant Architecture** - Support for multiple gym locations
- **Member Management** - QR code check-ins, profile management, membership tracking
- **Staff Management** - Trainers, certifications, scheduling
- **Equipment Tracking** - Inventory and maintenance logs

### Operations
- **Check-in System** - QR code scanning, duration tracking
- **Occupancy Monitoring** - Real-time capacity tracking
- **Workout Logs** - Detailed exercise tracking

### Gamification
- **Badges & Achievements** - 7 badge types (Bronze, Silver, Gold, etc.)
- **Leaderboard** - Member rankings and stats
- **Streak Tracking** - Consecutive check-in rewards

### Revenue Intelligence
- **Financial Dashboard** - MRR, ARR, churn rate tracking
- **Scenario Modeling** - "What-if" planning for pricing changes
- **AI Recommendations** - Automated revenue optimization suggestions
- **Benchmarking** - Industry comparison metrics

### Notifications
- **Multi-channel** - Push, SMS, Email
- **Automated Triggers** - Membership expiry, payment reminders
- **Customizable Templates** - Personalized messaging

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Database**: PostgreSQL 14
- **Cache**: Redis 7
- **Authentication**: JWT
- **Logging**: Winston
- **Validation**: Express Validator

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router
- **State**: Context API / Redux
- **HTTP Client**: Axios
- **UI**: Custom components

### DevOps
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Testing**: Jest, Supertest, Vitest
- **Code Quality**: ESLint, Prettier

---

## 📚 Documentation

### Quick Links
- [API Documentation](docs/api/README.md)
- [Database Schema](database/README.md)
- [Development Guide](docs/guides/DEVELOPMENT.md)
- [Deployment Guide](docs/guides/DEPLOYMENT.md)

### Database Schema
The platform uses **18 tables** organized into:
- Core Entities (gyms, users, members)
- Operations (check_ins, workout_logs, occupancy)
- Staff & Resources (trainers, certifications, equipment)
- Scheduling (calendar_events, notifications)
- Gamification (badges, member_badges, leaderboard)
- Revenue Intelligence (financial_snapshots, scenario_models, recommendations)
- Security (audit_logs)

See [database/README.md](database/README.md) for complete schema details.

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Core Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout

#### Gyms
- `GET /gyms` - List all gyms
- `POST /gyms` - Create gym (admin only)
- `GET /gyms/:id` - Get gym details
- `PATCH /gyms/:id` - Update gym (admin only)
- `GET /gyms/:id/stats` - Get gym statistics

#### Members
- `GET /members` - List members
- `POST /members` - Create member
- `GET /members/:id` - Get member details
- `POST /members/:id/check-in` - Check in member
- `POST /members/:id/check-out` - Check out member
- `GET /members/:id/badges` - Get member badges

See [docs/api/README.md](docs/api/README.md) for complete API reference.

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run backend tests
npm run test:server

# Run frontend tests
npm run test:client

# Run with coverage
cd server && npm test -- --coverage
```

---

## 🐳 Docker

### Development
```bash
# Start all services
docker-compose up -d

# View logs
npm run docker:logs

# Stop all services
npm run docker:down
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 📊 Database Commands

```bash
# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Reset database
npm run db:reset

# Fresh database (reset + migrate + seed)
npm run db:fresh
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Team

- **Author**: princeyadav308
- **Repository**: [Elite](https://github.com/princeyadav308/Elite)

---

## 🙏 Acknowledgments

- PostgreSQL for robust database management
- Express.js for backend framework
- React and Vite for modern frontend development
- All open-source contributors

---

<div align="center">

**Built with ❤️ by the ELITE team**

[Report Bug](https://github.com/princeyadav308/Elite/issues) •
[Request Feature](https://github.com/princeyadav308/Elite/issues)

</div>
