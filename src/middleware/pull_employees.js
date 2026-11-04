const pool = require("../data/db");

//Pull full array of employees
async function pull_employees() {
  const sql = "SELECT * FROM employees";

  try {
    const [rows] = await pool.execute(sql);
    return rows.length > 0 ? rows : null;
  } catch (error) {
    console.error("error fetching employees");
    throw error;
  }
}

//Insert a new row into the schedule table
async function add_schedule(id, start, end) {
  const sql = "INSERT INTO schedule (start, end, employee_id) VALUES (?,?,?)";
  try {
    await pool.query(sql, [start, end, id]);
    console.log("Schedule Added");
  } catch (error) {
    console.log("error adding to schedule");
    throw error;
  }
}

//Delete a row in the schedule table
async function delete_schedule(id) {
  const sql = "DELETE FROM schedule WHERE schedule_id = ?";

  try {
    console.log("Deleting: ", id);
    await pool.query(sql, [id]);
    console.log("Row deleted!");
  } catch (error) {
    console.log("Error deleting selected id");
    throw error;
  }
}

//Update a row in the schedule table
async function update_schedule(id, start, end) {
  const sql = `
    UPDATE schedule
    SET start = ?, end = ?
    WHERE schedule_id = ?;
    `;
  try {
    await pool.query(sql, [start, end, id]);
    console.log("Schedule table updated successfully");
  } catch (error) {
    console.log("There was an error updating schedule table");
  }
}

module.exports = {
  pull_employees,
  add_schedule,
  delete_schedule,
};
