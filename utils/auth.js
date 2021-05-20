const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        // res.redirect('/api/users/login');
    } else {
        next();
    }
};

module.exports = withAuth;