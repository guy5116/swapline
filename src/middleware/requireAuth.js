function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

function requireManager(req, res, next) {
  if (!req.session.user || !req.session.user.manager) {
    return res.redirect("/login");
  }
  next();
}
module.exports = {
  requireAuth,
  requireManager,
};
