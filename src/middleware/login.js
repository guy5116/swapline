const pool = require('../data/db');

async function findByEmployeeEmail(email) {
    const sql = 'SELECT * FROM employees where email = ?';
    try {
        const [rows] = await pool.execute(sql, [email]);

        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Error fetching employee');
        throw error;
    }
}

module.exports = { findByEmployeeEmail };
