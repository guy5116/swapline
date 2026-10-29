const path = require('path');
const express = require('express');
const session = require('express-session');

const pageRoutes = require('./routes/page.routes');
const authRoutes = require('./routes/auth.routes');
const scheduleRoutes = require('./routes/schedule.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		name: 'sid',
		secret: process.env.SESSION_SECRET,
		resave: false,
		cookie: {
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 1000 * 60 * 60,
		},
	})
);

app.use((req,res,next) => {
	res.locals.user = req.session.user || null;
	next();
});

app.use(pageRoutes);
app.use(authRoutes);
app.use(scheduleRoutes);

app.use((req,res) => {
	res.status(404).send('Page not found');
});

module.exports = app;
