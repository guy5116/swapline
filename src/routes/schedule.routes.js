const express = require("express");
const session = require("express-session");
const pool = require("../data/db");
const router = express.Router();
//Access schedule table functions
const {
  findScheduleByEmployeeID,
  sqlDTtojs,
  fullScheduleView,
} = require("../middleware/pull_schedule");

//Edit schedule table
const {
  add_schedule,
  delete_schedule,
  update_schedule,
} = require("../middleware/schedule_editor");

//Access employee database
const { pull_employees } = require("../middleware/pull_employees");

//View a Employees Weekly Schedule
router.get("/schedule", async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  //console.log(req.session.user);
  try {
    const user = req.session.user ?? null;
    const dates = await findScheduleByEmployeeID(user.id);

    const order_schedule = await sqlDTtojs(dates);

    return res.render("schedule", {
      title: "Schedule",
      user: user,
      dates: order_schedule,
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

//Allow a manager to see every employees schedule
router.get("/schedule/edit", async (req, res, next) => {
  if (!req.session.user || !req.session.user.manager) {
    return res.redirect("/schedule");
  }

  try {
    const user = req.session.user ?? null;
    const ordered_dates = await fullScheduleView();
    const employees = await pull_employees();
    return res.render("schedule-edit", {
      title: "Schedule",
      user: user,
      dates: ordered_dates,
      employees: employees,
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

//Allow a manger to add a date to the schedule
router.post("/schedule/edit/add", async (req, res, next) => {
  try {
    const { employee, start, end } = req.body;
    if (!employee || !start || !end) {
      const employees = await pull_employees();
      const ordered_dates = await fullScheduleView();
      return res.status(400).render("schedule-edit", {
        title: "Add to Schedule",
        error: "Enter All required Fields",
        user: req.session.user,
        employees: employees,
        dates: ordered_dates,
      });
    }

    await add_schedule(employee, start, end);
    res.redirect("/schedule/edit");
  } catch (err) {
    next(err);
  }
});

//Allow a manager to delete a schedule date
router.post("/schedule/edit/delete", async (req, res, next) => {
  console.log("Deleting in Progress...");
  try {
    const schedule_id = req.body;
    await delete_schedule(schedule_id.id);
    res.redirect("/schedule/edit"); //Find Better Fix Later :)
  } catch (err) {
    next(err);
  }
});

//Allow a manager to update a scheduled date
router.post("/schedule/edit/update", async (req, res, next) => {
  if (!req.session.user || !req.session.user.manager) {
    redirect("/login");
    return;
  }

  try {
    const { start_edit, end_edit, employee_edit, schedule_edit } = req.body;
    console.log("ID: ", schedule_edit);
    if (!start_edit || !end_edit || !employee_edit || !schedule_edit) {
      console.log(schedule_edit);
      const user = req.session.user ?? null;
      const ordered_dates = await fullScheduleView();
      const employees = await pull_employees();
      return res.render("schedule-edit", {
        title: "Schedule",
        error: "Fillout all info",
        user: user,
        dates: ordered_dates,
        employees: employees,
      });
    }
    await update_schedule(employee_edit, start_edit, end_edit, schedule_edit);
    const user = req.session.user ?? null;
    const ordered_dates = await fullScheduleView();
    const employees = await pull_employees();
    return res.render("schedule-edit", {
      title: "Schedule",
      error: null,
      user: user,
      dates: ordered_dates,
      employees: employees,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
