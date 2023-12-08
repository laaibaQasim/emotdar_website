import React, { useState, useEffect } from 'react';
import EmotionList from './EmotionList';
import VideoPlayer from './VideoPlayer';
import ControlPanel from './ControlPanel';
import CameraViewer from './CameraViewer';
import RecordingComponent from './Recording';
import '../../style.css';

const RecordEmotion = ({navBarColor}) => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [recording, setRecording] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);


  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion((prevEmotion) => (prevEmotion === emotion ? null : emotion));
    setShowCamera(false);
    setRecording(false);
  };

  const handleShowCamera = () => {
    setShowCamera((prevShowCamera) => !prevShowCamera);
    setRecording(false); // Ensure recording is false when showing the camera
  };

  const handleStartRecording = () => {
    setShowCamera(false); // Hide CameraViewer
    setRecording(true); // Start Recording with RecordingComponent
    setRecordedVideoUrl(null); // Reset recorded video URL

    // Pass the selected emotion to RecordingComponent
    const selectedEmotionForRecording = selectedEmotion || 'DefaultEmotion'; // Replace with a default emotion if none is selected
    setRecordedVideoUrl(selectedEmotionForRecording);
  };

  return (
    <div className="app-container">
      <div className="row-container">
        <div className="emotion-list-container">
          <EmotionList onEmotionSelect={handleEmotionSelect} />
        </div>
        <div className="video-player-container">
          {showCamera ? (
            <CameraViewer onCameraUnmount={() => setShowCamera(false)} />
          ) : recording ? (
            <RecordingComponent
              selectedEmotion={recordedVideoUrl} // Pass selected emotion as a prop
              onDiscard={handleShowCamera}
              onCameraUnmount={() => setRecording(false)}
              onRecordingFinish={(recordedBlob) => {
                setRecordedVideoUrl(URL.createObjectURL(recordedBlob));
              }}
            />
          ) : (
            <VideoPlayer selectedEmotion={selectedEmotion} recording={recording} />
          )}
        </div>
      </div>
      <div className="control-panel-container">
        {selectedEmotion ? (
          <ControlPanel
            onShowCamera={handleShowCamera}
            onStartRecording={handleStartRecording}
            timerValue={timerValue}
          />
        ) : null}
      </div>
    </div>
  );
};

export default RecordEmotion;
