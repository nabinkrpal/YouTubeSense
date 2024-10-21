// Middleware to protect routes by ensuring the user is authenticated
exports.ensureAuthenticated = (req, res, next) => {
    if (req.session.oauth2Client) {
        // User is authenticated, proceed to the next middleware
        return next();
    }
    // User is not authenticated, redirect to login
    res.redirect('/login.html');
};
