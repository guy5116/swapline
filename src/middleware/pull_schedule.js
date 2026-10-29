const pool = require('../data/db');

async function findScheduleByEmployeeID(id) {
	const sql = 'SELECT * FROM schedule where employee_id = ?';
	try {
		const [rows] = await pool.execute(sql, [id]);

		return rows.length > 0 ? rows : null;
	} catch (error) {
		console.error('error fetching employee');
		throw error;
	}
}

module.exports = { findScheduleByEmployeeID };
