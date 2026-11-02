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

async function pullSchedule() {
	const sql = 'SELECT * FROM schedule';
	try {
		const [rows] = await pool.execute(sql);
		
		return rows.length > 0 ? rows : null;
	} catch (error) {
		console.error('error fetching data');
		throw error;
	}
}

module.exports = { 
	findScheduleByEmployeeID,
	pullSchedule
 };
