import React, { useState, useEffect } from 'react';
import '../../style.css';

const EmotionList = ({ onEmotionSelect }) => {
  const [emotions, setEmotions] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedSentence, setSelectedSentence] = useState(null);

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

       // Fetch the list of emotions from the backend
    fetch('http://localhost:5000/sentences')
    .then((response) => response.json())
    .then((data) => {
      // Check if the API response has the expected structure
      if (data.status === 'ok' && Array.isArray(data.object)) {
        setSentences(data.object);
      } else {
        console.error('Invalid API response:', data);
      }
    })
    .catch((error) => console.error('Error fetching emotions:', error));

  }, []);

  const handleEmotionClick = (emotionName) => {
    // Toggle the selected emotion
    setSelectedEmotion((prevEmotion) => (prevEmotion === emotionName ? null : emotionName));
    // Callback to parent component with the selected emotion
    onEmotionSelect(selectedEmotion === emotionName ? null : emotionName, selectedSentence);
  };

  const handleSentenceClick = (sentence_id) => {
    // Toggle the selected sentence
    setSelectedSentence((prevSentence) => (prevSentence === sentence_id ? null : sentence_id));
    // Callback to the parent component with the selected emotion and sentence (or null if deselected)
    onEmotionSelect(selectedEmotion, selectedSentence === sentence_id ? null : sentence_id);
  };

  return (
    <div className='sentence-emotion-list'>
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
      <div className="sentence-list">
        <ul className="emul">
          {sentences.map((sentence) => (
            <li className="emli" key={sentence.id}>
              <button
                type="button"
                className={`stn-btn btn-round w-100 ${selectedSentence === sentence.id ? 'selected-stn' : ''}`}
                onClick={() => handleSentenceClick(sentence.id)}
              >
                {sentence.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmotionList;
