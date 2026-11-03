const express = require('express');
const session = require('express-session');
const { findScheduleByEmployeeID, pullSchedule, sqlDTtojs } = require('../middleware/pull_schedule');

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
		console.log(user);
		return res.render(
			'schedule-edit', {
				title: 'Schedule',
				user: user,
				dates:  schedule,
				error: null
			}
		)
	} catch(error) {
		next(error);
	}
	
	
});

module.exports = router;
