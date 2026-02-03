/**
 * Database Connection Test
 * Quick script to verify database connectivity
 */

const db = require('./connection');

async function testConnection() {
    console.log('🔍 Testing database connection...\n');
    console.log('Configuration:');
    console.log('  Host:', process.env.DB_HOST || 'localhost');
    console.log('  Port:', process.env.DB_PORT || '5432');
    console.log('  Database:', process.env.DB_NAME || 'elite_gym');
    console.log('  User:', process.env.DB_USER || 'postgres');
    console.log('');

    try {
        const connected = await db.testConnection();

        if (connected) {
            // Additional test: count tables
            const result = await db.query(`
        SELECT COUNT(*) as table_count 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);

            console.log(`📊 Tables in database: ${result.rows[0].table_count}`);
        }

        await db.closePool();
        process.exit(connected ? 0 : 1);

    } catch (error) {
        console.error('Connection test failed:', error);
        await db.closePool();
        process.exit(1);
    }
}

testConnection();
