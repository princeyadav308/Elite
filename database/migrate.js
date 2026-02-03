/**
 * Database Migration Runner
 * Executes SQL migration files in order
 */

const fs = require('fs').promises;
const path = require('path');
const db = require('./connection');

const MIGRATIONS_DIR = path.join(__dirname, 'migrations');
const SEEDS_DIR = path.join(__dirname, 'seeds');

/**
 * Create migrations tracking table
 */
async function createMigrationsTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    await db.query(query);
    console.log('✅ Migrations tracking table ready');
}

/**
 * Get list of executed migrations
 */
async function getExecutedMigrations() {
    try {
        const result = await db.query('SELECT name FROM migrations ORDER BY id');
        return result.rows.map(row => row.name);
    } catch (error) {
        return [];
    }
}

/**
 * Mark migration as executed
 */
async function markMigrationExecuted(name) {
    await db.query('INSERT INTO migrations (name) VALUES ($1)', [name]);
}

/**
 * Run a single migration file
 */
async function runMigration(filePath, fileName) {
    const client = await db.getClient();
    try {
        console.log(`\n🔄 Running migration: ${fileName}`);

        // Read SQL file
        const sql = await fs.readFile(filePath, 'utf8');

        // Begin transaction
        await client.query('BEGIN');

        // Execute migration
        await client.query(sql);

        // Mark as executed
        await client.query('INSERT INTO migrations (name) VALUES ($1)', [fileName]);

        // Commit transaction
        await client.query('COMMIT');

        console.log(`✅ Migration completed: ${fileName}`);
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(`❌ Migration failed: ${fileName}`);
        throw error;
    } finally {
        client.release();
    }
}

/**
 * Run all pending migrations
 */
async function runMigrations() {
    try {
        console.log('🚀 Starting database migrations...\n');

        // Test connection
        const connected = await db.testConnection();
        if (!connected) {
            throw new Error('Database connection failed');
        }

        // Create migrations table
        await createMigrationsTable();

        // Get executed migrations
        const executed = await getExecutedMigrations();
        console.log(`📋 Already executed: ${executed.length} migrations`);

        // Get all migration files
        const files = await fs.readdir(MIGRATIONS_DIR);
        const sqlFiles = files
            .filter(f => f.endsWith('.sql'))
            .sort(); // Sort to ensure order

        console.log(`📁 Found ${sqlFiles.length} migration files`);

        // Run pending migrations
        let runCount = 0;
        for (const file of sqlFiles) {
            if (!executed.includes(file)) {
                const filePath = path.join(MIGRATIONS_DIR, file);
                await runMigration(filePath, file);
                runCount++;
            }
        }

        if (runCount === 0) {
            console.log('\n✨ No new migrations to run. Database is up to date!');
        } else {
            console.log(`\n✨ Successfully ran ${runCount} new migration(s)!`);
        }

    } catch (error) {
        console.error('\n❌ Migration error:', error);
        throw error;
    }
}

/**
 * Run seed data
 */
async function runSeeds() {
    try {
        console.log('\n🌱 Starting database seeding...\n');

        // Get all seed files
        const files = await fs.readdir(SEEDS_DIR);
        const sqlFiles = files
            .filter(f => f.endsWith('.sql'))
            .sort();

        console.log(`📁 Found ${sqlFiles.length} seed file(s)`);

        // Run each seed file
        for (const file of sqlFiles) {
            console.log(`\n🔄 Running seed: ${file}`);
            const filePath = path.join(SEEDS_DIR, file);
            const sql = await fs.readFile(filePath, 'utf8');
            await db.query(sql);
            console.log(`✅ Seed completed: ${file}`);
        }

        console.log('\n✨ All seeds executed successfully!');

    } catch (error) {
        console.error('\n❌ Seeding error:', error);
        throw error;
    }
}

/**
 * Reset database (drop all tables)
 */
async function resetDatabase() {
    try {
        console.log('⚠️  Resetting database...');

        const query = `
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `;

        await db.query(query);
        console.log('✅ Database reset complete');

    } catch (error) {
        console.error('❌ Reset error:', error);
        throw error;
    }
}

// CLI interface
if (require.main === module) {
    const command = process.argv[2];

    (async () => {
        try {
            switch (command) {
                case 'migrate':
                    await runMigrations();
                    break;
                case 'seed':
                    await runSeeds();
                    break;
                case 'reset':
                    await resetDatabase();
                    await runMigrations();
                    break;
                case 'fresh':
                    await resetDatabase();
                    await runMigrations();
                    await runSeeds();
                    break;
                default:
                    console.log(`
🗄️  ELITE Database Migration Tool

Usage:
  node database/migrate.js <command>

Commands:
  migrate    Run pending migrations
  seed       Run seed data
  reset      Reset database and run migrations
  fresh      Reset database, run migrations, and seed data

Examples:
  node database/migrate.js migrate
  node database/migrate.js fresh
          `);
            }

            await db.closePool();
            process.exit(0);

        } catch (error) {
            console.error('Fatal error:', error);
            await db.closePool();
            process.exit(1);
        }
    })();
}

module.exports = {
    runMigrations,
    runSeeds,
    resetDatabase,
};
