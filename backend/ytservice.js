const { google } = require('googleapis');
const youtube = google.youtube('v3');

// Function to fetch YouTube channel stats
exports.getChannelStats = async (req, res) => {
    const oauth2Client = req.session.oauth2Client;
    const channelResponse = await youtube.channels.list({
        part: 'snippet,statistics,contentDetails',
        mine: true,
        auth: oauth2Client,
    });

    const channel = channelResponse.data.items[0];
    const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;

    // Fetch the list of videos
    const videoResponse = await youtube.playlistItems.list({
        part: 'snippet',
        playlistId: uploadsPlaylistId,
        maxResults: 10,
        auth: oauth2Client,
    });

    const videos = videoResponse.data.items.map(item => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
    }));

    res.json({
        username: channel.snippet.title,
        channelName: channel.snippet.title,
        subscriberCount: channel.statistics.subscriberCount,
        videos,
    });
};
