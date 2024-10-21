const { exec } = require('child_process');

// Train model by calling the Python script
exports.trainModel = (req, res) => {
    const videoUrl = req.body.url;
    exec(`python3 backend/python/train_model.py ${videoUrl}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send('Error training model.');
        }
        res.send('Model training complete.');
    });
};

// Analyze comments using trained model
exports.analyzeComments = (req, res) => {
    const videoId = req.body.videoId;
    exec(`python3 backend/python/analyze_comments.py ${videoId}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send('Error analyzing comments.');
        }
        const analysisResult = JSON.parse(stdout);
        res.json(analysisResult);
    });
};
