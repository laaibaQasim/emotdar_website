import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ selectedEmotion, selectedSentence, showEmoji}) => {
  const [mediaUrl, setMediaUrl] = useState(null);

  useEffect(() => {
    const fetchMediaUrl = async () => {
      try {
        console.log("sentence passed in comp: ", selectedEmotion, selectedSentence);
        if (showEmoji) {
          setMediaUrl('http://127.0.0.1:5000/emotions/play');
          return;
        }
        console.log("requesting: ",`recordings/${selectedEmotion}/${selectedSentence}`);
        const response = await fetch(`http://localhost:5000/recordings/${selectedEmotion}/${selectedSentence}`);

        if (!response.ok) {
          throw new Error(`Error fetching media URL: ${response.status} - ${response.statusText}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setMediaUrl(url);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchMediaUrl();
  }, [showEmoji, selectedEmotion,selectedSentence]);

  // Reset media URL when component unmounts
  useEffect(() => {
    return () => {
      setMediaUrl(null);
    };
  }, []); // Empty dependency array means it only runs on mount and unmount

  return (
    <div id="video-container">
      { (selectedEmotion && selectedSentence) ? (
          <video width="700" height="500" key={mediaUrl} controls>
            <source src={process.env.PUBLIC_URL + mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : showEmoji ? (
          <img src={mediaUrl} alt="Default Emoji" style={{ marginTop: 70 }} />
        ) : (
        // Do not show "Loading media..." when the camera is displayed
        !showEmoji && <p>Loading media...</p>
      )}
    </div>
  );
};

export default VideoPlayer;
