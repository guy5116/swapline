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

async function sqlDTtojs(dates){
	const sunday 	= [];		
	const monday 	= [];		
	const tuesday 	= [];		
	const wednesday	= [];		
	const thursday 	= [];		
	const friday 	= [];		
	const saturday	= [];		
	
	const starts = [sunday,monday,tuesday,wednesday,thursday,friday,saturday];

	dates.sort((a,b) => new Date(a.start)- new Date(b.start));
	
	for (const date of dates){
		const i = date.start.getDay();
		starts[i].push(date);
	}
	
	console.log('Starts are:	',starts)
	
	return starts;
}

module.exports = { 
	findScheduleByEmployeeID,
	pullSchedule,
	sqlDTtojs
 };
