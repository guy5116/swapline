const express = require('express');
const session = require('express-session');
const { findScheduleByEmployeeID, pullSchedule, sqlDTtojs, fullScheduleView } = require('../middleware/pull_schedule');
const { pull_employees, add_schedule } = require('../middleware/pull_employees');
const pool = require('../data/db');
const router = express.Router();

router.get('/schedule', async(req,res,next) => {
	if(!req.session.user) {
			return res.redirect('/login');
	}
	//console.log(req.session.user);
	try{
		const user = req.session.user ?? null;
		const dates = await findScheduleByEmployeeID(user.id);

		const order_schedule = await sqlDTtojs(dates)
		
		return res.render('schedule', { 
						  title: 'Schedule',
						  user: user, 
						  dates: order_schedule, 
						  error: null
						  });
	} catch (error) {
		next(error);
	}
});

router.get('/schedule/edit', async(req,res,next) => {
	if(!req.session.user || !req.session.user.manager) {
		return res.redirect('/schedule')
	}

	try{
		const user = req.session.user ?? null;
		const schedule = await pullSchedule();
		
		const dates = await findScheduleByEmployeeID(user.id);
		const ordered_dates = await fullScheduleView();
		return res.render(
			'schedule-edit', {
				title: 'Schedule',
				user: user,
				dates:  ordered_dates,
				error: null
			}
		)
	} catch(error) {
		next(error);
	}
	
	
});

router.get('/schedule/edit/add', async(req,res,next) => {
	if(!req.session.user || !req.session.user.manager) {
		console.log('NO AUTH');
		return res.redirect('/schedule')
	}

	const employees = await pull_employees();
	
	res.render('schedule-add',{
		title : 'Add to Schedule',
		error: null,
		user: req.session.user,
		employees : employees
	});
})

router.post('/schedule/edit/add', async(req,res,next) => {
	try {
		const { employee, start, end } = req.body
		if(!employee || !start || !end) {
			console.log('Fill out form',employee,start,end);
			return res
				.status(400)
				.render('schedule-add',{
					title: 'Add to Schedule',
					error: 'Enter All required Fields'
				});
		}

		add_schedule(employee, start, end);
	} catch (err) {
		next(err);
	}
})

module.exports = router;
