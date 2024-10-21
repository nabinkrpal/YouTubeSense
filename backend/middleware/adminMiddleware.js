// Middleware to restrict access to admin routes
exports.ensureAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        // User is an admin, proceed to the next middleware
        return next();
    }
    // User is not an admin, return unauthorized response
    res.status(403).json({ error: 'Unauthorized. Admin access required.' });
};
