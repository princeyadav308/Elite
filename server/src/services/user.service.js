/**
 * User Service
 * Business logic for user management
 */

const db = require('../../database/connection');

exports.getAllUsers = async (filters = {}) => {
    const { page = 1, limit = 20, role, status } = filters;
    const offset = (page - 1) * limit;

    let query = 'SELECT id, gym_id, email, full_name, role, status, profile_photo_url, phone, created_at, last_login FROM users WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (role) {
        query += ` AND role = $${paramIndex++}`;
        params.push(role);
    }

    if (status) {
        query += ` AND status = $${paramIndex++}`;
        params.push(status);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(limit, offset);

    const result = await db.query(query, params);
    return result.rows;
};

exports.getUserById = async (id) => {
    const result = await db.query(
        'SELECT id, gym_id, email, full_name, role, status, profile_photo_url, phone, created_at, last_login FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

exports.getUserByEmail = async (email) => {
    const result = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0];
};

exports.createUser = async (userData) => {
    const { gym_id, email, password_hash, full_name, role, status, phone } = userData;

    const result = await db.query(
        `INSERT INTO users (gym_id, email, password_hash, full_name, role, status, phone) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) 
     RETURNING id, gym_id, email, full_name, role, status, phone, created_at`,
        [gym_id, email, password_hash, full_name, role, status, phone]
    );

    return result.rows[0];
};

exports.updateUser = async (id, userData) => {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    Object.keys(userData).forEach((key) => {
        if (userData[key] !== undefined && key !== 'id' && key !== 'password_hash') {
            fields.push(`${key} = $${paramIndex++}`);
            values.push(userData[key]);
        }
    });

    if (fields.length === 0) {
        return null;
    }

    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING id, gym_id, email, full_name, role, status, phone`;

    const result = await db.query(query, values);
    return result.rows[0];
};

exports.deleteUser = async (id) => {
    await db.query('DELETE FROM users WHERE id = $1', [id]);
};

exports.updateLastLogin = async (id) => {
    await db.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [id]);
};
