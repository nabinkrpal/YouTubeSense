const { google } = require('googleapis');

// Fetch YouTube comments for a given video ID
exports.fetchComments = async (req, res) => {
    const videoId = req.body.videoId;

    try {
        // OAuth2 client should be set up in the session
        const oauth2Client = req.session.oauth2Client;
        const youtube = google.youtube({
            version: 'v3',
            auth: oauth2Client,
        });

        // Fetch the comments for the specified video ID
        const commentsResponse = await youtube.commentThreads.list({
            part: 'snippet',
            videoId: videoId,
            maxResults: 100,
        });

        const comments = commentsResponse.data.items.map(item => ({
            commentId: item.id,
            text: item.snippet.topLevelComment.snippet.textOriginal,
            author: item.snippet.topLevelComment.snippet.authorDisplayName,
        }));

        res.json({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};
