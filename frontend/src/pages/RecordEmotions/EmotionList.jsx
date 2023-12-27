import React, { useState, useEffect } from 'react';
import '../../style.css';

const EmotionList = ({ onEmotionSelect }) => {
  const [emotions, setEmotions] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  useEffect(() => {
    // Fetch the list of emotions from the backend
    fetch('http://localhost:5000/emotions')
      .then((response) => response.json())
      .then((data) => {
        // Check if the API response has the expected structure
        if (data.status === 'ok' && Array.isArray(data.object)) {
          setEmotions(data.object);
        } else {
          console.error('Invalid API response:', data);
        }
      })
      .catch((error) => console.error('Error fetching emotions:', error));
  }, []);

  const handleEmotionClick = (emotionName) => {
    // Toggle the selected emotion
    setSelectedEmotion((prevEmotion) => (prevEmotion === emotionName ? null : emotionName));
    // Callback to the parent component with the selected emotion
    onEmotionSelect(emotionName);
  };

  return (
    <div className="emotion-list">
      <ul className="emul">
        {emotions.map((emotion) => (
          <li className="emli" key={emotion.name}>
            <button
              type="button"
              className={`list-btn btn-round w-100 ${selectedEmotion === emotion.name ? 'selected' : ''}`}
              onClick={() => handleEmotionClick(emotion.name)}
            >
              {emotion.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmotionList;
