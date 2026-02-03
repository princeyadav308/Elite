# Server README

## ELITE Backend API

Express.js REST API for the ELITE Gym Management System.

## Directory Structure

```
server/
├── src/
│   ├── api/
│   │   ├── routes/         # Route definitions
│   │   ├── controllers/    # Request handlers
│   │   └── middlewares/    # Custom middleware
│   ├── services/           # Business logic
│   ├── models/             # Database models
│   ├── validations/        # Request validation
│   ├── utils/              # Utility functions
│   ├── config/             # Configuration
│   ├── jobs/               # Background jobs
│   ├── app.js              # Express app setup
│   └── server.js           # Entry point
└── tests/                  # Tests
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run migrations**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Server will run at http://localhost:3000

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues

## Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `NODE_ENV` - Environment (development, production)
- `PORT` - Server port (default: 3000)
- `DB_*` - Database configuration
- `JWT_SECRET` - JWT signing secret
- `CORS_ORIGIN` - Allowed origins

## API Endpoints

See [docs/api/README.md](../docs/api/README.md) for complete API documentation.

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm run test:watch
```

## Architecture

### Layers
1. **Routes** - Define endpoints and attach controllers
2. **Controllers** - Handle requests, call services
3. **Services** - Business logic, database operations
4. **Models** - Database query builders (optional)

### Middleware Stack
- `helmet` - Security headers
- `cors` - Cross-origin requests
- `morgan` - Request logging
- `express-rate-limit` - Rate limiting
- `compression` - Response compression
- Custom authentication middleware

## Error Handling

All errors are handled by the global error handler in `middlewares/errorHandler.js`.

Use `AppError` class for operational errors:
```javascript
const { AppError } = require('./middlewares/errorHandler');
throw new AppError('Resource not found', 404);
```

## Logging

Winston logger is configured in `utils/logger.js`.

```javascript
const logger = require('./utils/logger');
logger.info('Information message');
logger.error('Error message');
```

## Database

PostgreSQL connection is managed via the connection pool in `database/connection.js`.

```javascript
const db = require('../database/connection');
const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure proper CORS origins
4. Enable SSL for database
5. Set up proper logging
6. Configure rate limiting
7. Use a process manager (PM2)

```bash
npm install -g pm2
pm2 start src/server.js --name elite-api
```
