const express = require('express');
const session = require('express-session');
const { findScheduleByEmployeeID } = require('../middleware/pull_schedule');
const pool = require('../data/db');
const router = express.Router();

router.get('/schedule', async(req,res,next) => {
	if(!req.session.user) {
			return res.redirect('/login');
	}
	console.log(req.session.user);
	try{
		const user = req.session.user ?? null;
		const dates = await findScheduleByEmployeeID(user.id);
		
		console.log('Current dates are:	', dates);
		
		return res.render('schedule', { 
						  title: 'Schedule',
						  user: user, 
						  dates: dates, 
						  error: null
						  });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
