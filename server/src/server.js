/**
 * Server Entry Point
 */

require('dotenv').config();
const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');
const db = require('../database/connection');

const PORT = config.port || 3000;

// Test database connection before starting server
async function startServer() {
    try {
        // Test database connection
        const connected = await db.testConnection();
        if (!connected) {
            throw new Error('Database connection failed');
        }

        // Start server
        app.listen(PORT, () => {
            logger.info(`🚀 Server running on port ${PORT}`);
            logger.info(`   Environment: ${config.nodeEnv}`);
            logger.info(`   API Base: http://localhost:${PORT}/api/v1`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    logger.error(err);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    logger.error(err);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    logger.info('SIGTERM received. Shutting down gracefully...');
    await db.closePool();
    process.exit(0);
});

startServer();
