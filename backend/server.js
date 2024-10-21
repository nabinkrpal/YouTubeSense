const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');
const commentFetcher = require('./api/comments_fetcher');
const modelAnalysis = require('./api/model_analysis');

// Use body-parser to handle JSON requests
app.use(bodyParser.json());

// Set up session management
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.post('/api/fetch_comments', authMiddleware.ensureAuthenticated, commentFetcher.fetchComments);
app.post('/api/analyze_model', authMiddleware.ensureAuthenticated, modelAnalysis.analyzeWithModel);

// Admin routes
app.post('/api/train_model', [authMiddleware.ensureAuthenticated, adminMiddleware.ensureAdmin], (req, res) => {
    // Call your model training logic here
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
