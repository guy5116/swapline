const express = require('express');
const { pull_employees, add_schedule } = require('../middleware/pull_employees');
const router = express.Router();

router.get('/schedule/edit/add', async(req,res,next) => {
	if(!req.session.user || req.session.user.manager) {
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

router.post('/schedule/add', async(req,res,next) => {
	try {
		const { employee_id, start, end } = req.body
		if(!employee_id || !start || !end) {
			return res
				.status(400)
				.render('schedule-add',{
					title: 'Add to Schedule',
					error: 'Enter All required Fields'
				});
		}

		add_schedule(employee_id, start, end);
	} catch (err) {
		next(err);
	}
})
