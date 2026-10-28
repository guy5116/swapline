const mysql = require('mysql2/promise');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'andrew',
	password: 'password',
	database: 'swapline',
	waitForConnection: true,
	connectionLimit: 10,
	queueLimit: 0
});

async function createEmployeesTable() {
	const sql = `
		CREATE TABLE IF NOT EXISTS employees (
			employee_id INT AUTO_INCREMENT PRIMARY KEY,
			fname VARCHAR(100) NOT NULL,
			lname VARCHAR(100) NOT NULL,
			email VARCHAR(100) UNIQUE NOT NULL,
			password VARCHAR(100) NOT NULL,
			manager BOOLEAN NOT NULL
			);
		`;

		try {
			const[result] = await pool.query(sql);
			console.log('Employees table successfully verified/created: ', result);
		} catch (error) {
			console.log('Error creating employees table: ', error)
		}
}

async function createScheduleTable() {
	const sql = `
		CREATE TABLE IF NOT EXISTS schedule (
			schedule_id INT AUTO_INCREMENT PRIMARY KEY,
			start DATETIME,
			end DATETIME,
			employee_id INT,
			CONSTRAINT fk_employee
			FOREIGN KEY (employee_id)
			REFERENCES employees(employee_id)
			);
		`;

		try {
			const[result] = await pool.query(sql);
			console.log('Schedule table successfully verified/created: ', result);
		} catch (error) {
			console.log('Error creating schedule table: ', error)
		}
}

createEmployeesTable();
createScheduleTable();

module.exports = pool;
