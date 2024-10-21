import sys
import json

# Placeholder function to simulate comment analysis
def analyze_comments(video_id):
    # Simulate analysis result
    return {
        'positive': 80,
        'negative': 20,
        'suggestions': ['Add more tutorials', 'Improve sound quality'],
        'trending_topics': ['AI', 'Machine Learning']
    }

if __name__ == '__main__':
    video_id = sys.argv[1]
    analysis_result = analyze_comments(video_id)
    print(json.dumps(analysis_result))
