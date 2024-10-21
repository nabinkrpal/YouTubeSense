const { OAuth2Client } = require('google-auth-library');
const express = require('express');
const router = express.Router();

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const client = new OAuth2Client(CLIENT_ID);

// Route for Google sign-in
router.post('/google', async (req, res) => {
    const token = req.body.credential;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    req.session.user = payload;  // Store user session
    res.redirect('/dashboard.html');
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
