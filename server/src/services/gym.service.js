/**
 * Gym Service
 * Business logic for gym management
 */

const db = require('../../database/connection');

exports.getAllGyms = async () => {
    const result = await db.query('SELECT * FROM gyms ORDER BY created_at DESC');
    return result.rows;
};

exports.getGymById = async (id) => {
    const result = await db.query('SELECT * FROM gyms WHERE id = $1', [id]);
    return result.rows[0];
};

exports.createGym = async (gymData) => {
    const { name, address, timezone, capacity, settings } = gymData;

    const result = await db.query(
        `INSERT INTO gyms (name, address, timezone, capacity, settings) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
        [name, address, timezone, capacity, settings]
    );

    return result.rows[0];
};

exports.updateGym = async (id, gymData) => {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    Object.keys(gymData).forEach((key) => {
        if (gymData[key] !== undefined && key !== 'id') {
            fields.push(`${key} = $${paramIndex++}`);
            values.push(gymData[key]);
        }
    });

    if (fields.length === 0) {
        return null;
    }

    values.push(id);
    const query = `UPDATE gyms SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

    const result = await db.query(query, values);
    return result.rows[0];
};

exports.deleteGym = async (id) => {
    await db.query('DELETE FROM gyms WHERE id = $1', [id]);
};

exports.getGymStats = async (id) => {
    const stats = {};

    // Total members
    const memberCount = await db.query(
        'SELECT COUNT(*) as count FROM members WHERE gym_id = $1',
        [id]
    );
    stats.totalMembers = parseInt(memberCount.rows[0].count, 10);

    // Active members (checked in today)
    const activeMembers = await db.query(
        `SELECT COUNT(DISTINCT member_id) as count 
     FROM check_ins 
     WHERE gym_id = $1 AND DATE(check_in_time) = CURRENT_DATE`,
        [id]
    );
    stats.activeMembersToday = parseInt(activeMembers.rows[0].count, 10);

    // Current occupancy
    const occupancy = await db.query(
        `SELECT current_count, capacity, percentage 
     FROM occupancy 
     WHERE gym_id = $1 
     ORDER BY recorded_at DESC 
     LIMIT 1`,
        [id]
    );
    stats.currentOccupancy = occupancy.rows[0] || null;

    return stats;
};
