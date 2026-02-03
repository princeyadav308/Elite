/**
 * Member Service
 * Business logic for member management
 */

const db = require('../../database/connection');

exports.getAllMembers = async (filters = {}) => {
    const { page = 1, limit = 20, tier, gymId } = filters;
    const offset = (page - 1) * limit;

    let query = `
    SELECT m.*, u.email, u.full_name, u.phone 
    FROM members m
    LEFT JOIN users u ON m.user_id = u.id
    WHERE 1=1
  `;
    const params = [];
    let paramIndex = 1;

    if (gymId) {
        query += ` AND m.gym_id = $${paramIndex++}`;
        params.push(gymId);
    }

    if (tier) {
        query += ` AND m.current_tier = $${paramIndex++}`;
        params.push(tier);
    }

    query += ` ORDER BY m.join_date DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(limit, offset);

    const result = await db.query(query, params);
    return result.rows;
};

exports.getMemberById = async (id) => {
    const result = await db.query(
        `SELECT m.*, u.email, u.full_name, u.phone 
     FROM members m
     LEFT JOIN users u ON m.user_id = u.id
     WHERE m.member_id = $1`,
        [id]
    );
    return result.rows[0];
};

exports.createMember = async (memberData) => {
    const result = await db.query(
        `INSERT INTO members (user_id, gym_id, current_tier, join_date, membership_expiry, qr_code_hash) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
        [
            memberData.user_id,
            memberData.gym_id,
            memberData.current_tier,
            memberData.join_date || new Date(),
            memberData.membership_expiry,
            memberData.qr_code_hash,
        ]
    );

    return result.rows[0];
};

exports.updateMember = async (id, memberData) => {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    Object.keys(memberData).forEach((key) => {
        if (memberData[key] !== undefined && key !== 'member_id') {
            fields.push(`${key} = $${paramIndex++}`);
            values.push(memberData[key]);
        }
    });

    if (fields.length === 0) {
        return null;
    }

    values.push(id);
    const query = `UPDATE members SET ${fields.join(', ')} WHERE member_id = $${paramIndex} RETURNING *`;

    const result = await db.query(query, values);
    return result.rows[0];
};

exports.deleteMember = async (id) => {
    await db.query('DELETE FROM members WHERE member_id = $1', [id]);
};

exports.checkInMember = async (memberId, gymId) => {
    const result = await db.query(
        `INSERT INTO check_ins (member_id, gym_id, check_in_time, status) 
     VALUES ($1, $2, CURRENT_TIMESTAMP, 'active') 
     RETURNING *`,
        [memberId, gymId]
    );

    // Update member stats
    await db.query(
        `UPDATE members 
     SET total_visits = total_visits + 1,
         last_check_in = CURRENT_TIMESTAMP,
         current_streak = CASE 
           WHEN DATE(last_check_in) = CURRENT_DATE - INTERVAL '1 day' THEN current_streak + 1
           ELSE 1 
         END
     WHERE member_id = $1`,
        [memberId]
    );

    return result.rows[0];
};

exports.checkOutMember = async (memberId) => {
    const result = await db.query(
        `UPDATE check_ins 
     SET check_out_time = CURRENT_TIMESTAMP,
         duration_minutes = EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - check_in_time)) / 60,
         status = 'completed'
     WHERE member_id = $1 AND status = 'active'
     RETURNING *`,
        [memberId]
    );

    return result.rows[0];
};

exports.getMemberHistory = async (memberId) => {
    const result = await db.query(
        `SELECT * FROM check_ins 
     WHERE member_id = $1 
     ORDER BY check_in_time DESC 
     LIMIT 50`,
        [memberId]
    );

    return result.rows;
};

exports.getMemberBadges = async (memberId) => {
    const result = await db.query(
        `SELECT b.*, mb.earned_at 
     FROM member_badges mb
     JOIN badges b ON mb.badge_id = b.id
     WHERE mb.member_id = $1 
     ORDER BY mb.earned_at DESC`,
        [memberId]
    );

    return result.rows;
};
