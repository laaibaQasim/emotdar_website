import os

# common_utils.py
emotions = [
    "Happy",
    "Sad",
    "Angry",
    "Excited",
    "Neutral",
    "Disguise",
    "Fear",
    "Sarcastic",
]

recording_directory = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "../static/recordings"
)

# Define the directory where the default emoji GIF is stored
emoji_directory = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "../static/emojis"
)

# Define the default emoji GIF filename
default_emoji_filename = "emojis.gif"

recorded_videos_directory = "recorded_videos"
