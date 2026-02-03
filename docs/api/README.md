# ELITE API Documentation

## Overview
RESTful API for the ELITE Gym Management System.

**Base URL**: `http://localhost:3000/api/v1`

**Authentication**: Bearer JWT Token

---

## Authentication

### Register
Create a new user account.

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": "John Doe",
  "gymId": "uuid-gym-id",
  "role": "member"
}
```

**Response** (201):
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "full_name": "John Doe",
      "role": "member",
      "gym_id": "uuid-gym-id"
    }
  }
}
```

### Login
Authenticate a user and receive a JWT token.

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response** (200):
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "full_name": "John Doe",
      "role": "member"
    }
  }
}
```

### Get Current User
Get details of the currently authenticated user.

**Endpoint**: `GET /auth/me`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "gym_id": "uuid",
      "email": "user@example.com",
      "full_name": "John Doe",
      "role": "member",
      "status": "active",
      "phone": "+1234567890"
    }
  }
}
```

---

## Gyms

### List All Gyms
Get a list of all gym locations.

**Endpoint**: `GET /gyms`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "status": "success",
  "results": 2,
  "data": {
    "gyms": [
      {
        "id": "uuid",
        "name": "ELITE Fitness Center",
        "address": "123 Main St, New York, NY",
        "timezone": "America/New_York",
        "capacity": 150,
        "settings": {...}
      }
    ]
  }
}
```

### Get Gym Details
Get details of a specific gym.

**Endpoint**: `GET /gyms/:id`

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "gym": {
      "id": "uuid",
      "name": "ELITE Fitness Center",
      "address": "123 Main St, New York, NY",
      "timezone": "America/New_York",
      "capacity": 150,
      "settings": {...}
    }
  }
}
```

### Create Gym
Create a new gym location (admin only).

**Endpoint**: `POST /gyms`

**Headers**: `Authorization: Bearer <admin-token>`

**Request Body**:
```json
{
  "name": "ELITE Downtown",
  "address": "456 Market St, San Francisco, CA",
  "timezone": "America/Los_Angeles",
  "capacity": 200,
  "settings": {
    "operatingHours": {
      "monday": "06:00-22:00"
    }
  }
}
```

### Get Gym Statistics
Get operational statistics for a gym.

**Endpoint**: `GET /gyms/:id/stats`

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "stats": {
      "totalMembers": 350,
      "activeMembersToday": 87,
      "currentOccupancy": {
        "current_count": 42,
        "capacity": 150,
        "percentage": 28
      }
    }
  }
}
```

---

## Members

### List Members
Get a paginated list of members.

**Endpoint**: `GET /members`

**Query Parameters**:
- `page` (number, default: 1)
- `limit` (number, default: 20, max: 100)
- `tier` (string): Filter by tier (basic, premium, vip)
- `status` (string): Filter by status

**Response** (200):
```json
{
  "status": "success",
  "results": 20,
  "data": {
    "members": [
      {
        "member_id": "uuid",
        "user_id": "uuid",
        "gym_id": "uuid",
        "current_tier": "premium",
        "join_date": "2024-01-15",
        "membership_expiry": "2025-01-15",
        "total_visits": 45,
        "current_streak": 7,
        "email": "member@example.com",
        "full_name": "Jane Doe"
      }
    ]
  }
}
```

### Check In Member
Record a member check-in.

**Endpoint**: `POST /members/:id/check-in`

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "checkIn": {
      "id": "uuid",
      "member_id": "uuid",
      "gym_id": "uuid",
      "check_in_time": "2024-02-03T16:00:00Z",
      "status": "active"
    }
  }
}
```

### Check Out Member
Record a member check-out.

**Endpoint**: `POST /members/:id/check-out`

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "checkIn": {
      "id": "uuid",
      "member_id": "uuid",
      "check_out_time": "2024-02-03T17:30:00Z",
      "duration_minutes": 90,
      "status": "completed"
    }
  }
}
```

### Get Member Badges
Get all badges earned by a member.

**Endpoint**: `GET /members/:id/badges`

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "badges": [
      {
        "id": "uuid",
        "name": "Gold Member",
        "description": "100 visits",
        "badge_type": "milestone",
        "icon_url": "https://...",
        "earned_at": "2024-01-20T10:00:00Z"
      }
    ]
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "status": "fail",
  "message": "Error description"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting
API is rate-limited to **100 requests per 15 minutes** per IP address.

## Headers
All requests should include:
- `Content-Type: application/json`
- `Authorization: Bearer <token>` (for protected routes)
