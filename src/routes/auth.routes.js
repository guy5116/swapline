const express = require('express');
const bcrypt = require('bcryptjs');
const { findByEmployeeEmail } = require('../middleware/login');
const pool = require('../data/db');
const router = express.Router();

//Login Route

router.get('/login', (req,res) => {
	if(req.session.user) {
		return res.redirect('/dashboard');
	}
	res.render('login', { title: 'Log in', error: null });
});

router.post('/login', async (req,res,next) => {
	try {
		const { email, password } = req.body;

		if(!email || !password) {
			return res
				.status(400)
				.render('login', { title: 'Log in', error : 'Enter a username and password' });
		}

		const employee = await findByEmployeeEmail(email);
		console.log(employee);

		const passwordOk = employee && (await bcrypt.compare(password, employee.password));

		if(!passwordOk) {
			return res
				.status(401)
				.render('login', { title: 'Log in', error: 'Invalid username or password' });
		}

		req.session.regenerate((err) => {
			if(err) return next(err);
			req.session.user = { id: employee.id, fname: employee.fname, lname: employee.lname, manager: employee.manager};
			res.redirect('/dashboard');
		});
	} catch(err) {
		next(err);
	}
});

//Registation Route

router.get('/register', (req,res) => {
	if(req.session.user) {
		return res.redirect('/dashboard');
	}
	res.render('register', { title: 'Register', error: null });
});

router.post('/register', async (req,res,next) => {
	try {
		const { fname, lname, email, password } = req.body;

		if (!fname || !lname || !email || !password) {
			return res
				.status(400)
				.render('register', { title: 'Register', error: 'Enter all required info' });
		}

		const employee = await findByEmployeeEmail(email);
		if (!!employee) {
			return res
				.status(401)
				.render('register', { title: 'Register', error: 'Email already in use' });
		}

		const hashword = bcrypt.hashSync(password, 10);
		const query = 'INSERT INTO employees (fname, lname, email, manager, password) VALUES (?, ?, ?, ?, ?)';
		pool.query(query, [fname,lname,email,false,hashword]);
		console.log('Employee Registered');
	} catch (err) {
		console.log(err);
		next(err);
	}
});

//Logout Route

router.post('/logout', (req,res,next) => {
	req.session.destroy((err) => {
		if(err) return next(err);
		res.clearCookie('sid');
		res.redirect('/')
	});
});

module.exports = router;
