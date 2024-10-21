const { exec } = require('child_process');

// Analyze comments using a trained model
exports.analyzeWithModel = (req, res) => {
    const videoId = req.body.videoId;

    // Execute the Python script that analyzes comments based on the trained model
    exec(`python3 backend/python/analyze_comments.py ${videoId}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error analyzing comments:', error);
            return res.status(500).json({ error: 'Failed to analyze comments.' });
        }

        try {
            // Parse the Python script's output and send it as a response
            const analysisResult = JSON.parse(stdout);
            res.json(analysisResult);
        } catch (parseError) {
            console.error('Error parsing analysis result:', parseError);
            res.status(500).json({ error: 'Failed to parse analysis result.' });
        }
    });
};
