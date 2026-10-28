const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/', (req,res) => {
	res.render('landing', { title: 'Home' });
});


router.get('/dashboard', requireAuth, (req,res) => {
	res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;
