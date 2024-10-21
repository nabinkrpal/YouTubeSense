// Fetch YouTube stats and display them on the dashboard
async function getYouTubeStats() {
    const response = await fetch('/api/get_channel_stats');
    const data = await response.json();
    document.getElementById('username').textContent = data.username;
    document.getElementById('channelName').textContent = data.channelName;
    document.getElementById('subscriberCount').textContent = data.subscriberCount;

    const videoList = document.getElementById('videoList');
    data.videos.forEach(video => {
        const li = document.createElement('li');
        li.textContent = video.title;
        
        const analyzeButton = document.createElement('button');
        analyzeButton.textContent = 'Analyze Comments';
        analyzeButton.onclick = () => analyzeComments(video.id);
        
        li.appendChild(analyzeButton);
        videoList.appendChild(li);
    });
}

// Log out the user
document.getElementById('logoutButton').addEventListener('click', () => {
    fetch('/auth/logout').then(() => {
        window.location.href = '/';
    });
});

// Function to train the model from the admin page
async function trainModel() {
    const videoUrl = document.getElementById('videoUrl').value;
    const response = await fetch('/api/train_model', {
        method: 'POST',
        body: JSON.stringify({ url: videoUrl }),
        headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.text();
    document.getElementById('trainStatus').textContent = result;
}

// Function to analyze comments using the trained model
async function analyzeComments(videoId) {
    const response = await fetch('/api/analyze_comments', {
        method: 'POST',
        body: JSON.stringify({ videoId }),
        headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    alert(`Analysis Result: ${JSON.stringify(result)}`);
}
