const pool = require('../data/db');

async function pull_employees(){
	const sql = 'SELECT * FROM employees';

	try {
		const [rows] = await pool.execute(sql);
		return rows.length > 0 ? rows : null;
	}catch (error) {
		console.error('error fetching employees');
		throw error;
	}
}

async function add_schedule(id, start, end) {
	const sql = 'INSERT INTO schedule (start, end, employee_id) VALUES (?,?,?)';
	try {
		pool.query(sql, [start, end, id]);
		console.log('Schedule Added');
	} catch (error) {
		console.log('error adding to schedule')
		throw(error);
	}
}

module.exports = {
	pull_employees,
	add_schedule
};
