export const localsMiddleware = (req, res, next) => {
	res.locals.loggedIn = Boolean(req.session.loggedIn);
	res.locals.siteName = "Wetube";
	res.locals.loggedInUser = req.session.user;
	next();
};

export const viewSessionsList = (req, res, next) => {
	req.sessionStore.all((err, sessions) => {
		console.log(sessions);
		next();
	});
};