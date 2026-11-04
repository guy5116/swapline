const pool = require("../data/db");

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
async function update_schedule(id, start, end, s_id) {
  const sql = `
    UPDATE schedule
    SET start = ?, end = ?, employee_id = ?
    WHERE schedule_id = ?;
    `;
  try {
    const [results] = await pool.query(sql, [start, end, id, s_id]);
    console.log("Update results: ", results);
  } catch (error) {
    console.log("There was an error updating schedule table", error);
  }
}

module.exports = {
  add_schedule,
  delete_schedule,
  update_schedule,
};
