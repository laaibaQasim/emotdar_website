import React, { useState, useEffect } from 'react';
import EmotionList from './EmotionList';
import VideoPlayer from './VideoPlayer';
import ControlPanel from './ControlPanel';
import CameraViewer from './CameraViewer';
import RecordingComponent from './Recording';
import AudioRecorder from './AudioRecorder';
import '../../style.css';

const RecordEmotion = ({navBarColor}) => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [showEmoji, setEmoji] = useState(true);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);


  const handleEmotionSelect = (emotion, sid) => {
    console.log("id passed: ", sid);
    console.log("emotion passed: ", emotion);
    setSelectedEmotion(emotion);
    setSelectedSentence(sid);
    if (emotion && sid) {
      setEmoji(false);
      if (showCamera === false && recording === false && recordingAudio === false) {
        setShowSample(true);
      }
      else {
        setShowSample(false);
      }
    }
    else {
      setEmoji(true);
      setRecordedVideoUrl(false);
      setRecordingAudio(false);
      setShowSample(false);
    }
  };

  const handleShowCamera = () => {
    setShowCamera(true);
    setRecording(false); // Ensure recording is false when showing the camera
    setShowSample(false);
    setRecordingAudio(false);
  };

  const handleStartRecording = () => {
    setShowCamera(false); // Hide CameraViewer
    setRecording(true); // Start Recording with RecordingComponent
    setRecordedVideoUrl(null); // Reset recorded video URL
    setRecordingAudio(false);
    setShowSample(false);

    // Pass the selected emotion to RecordingComponent
    const selectedEmotionForRecording = selectedEmotion || 'DefaultEmotion'; // Replace with a default emotion if none is selected
    setRecordedVideoUrl(selectedEmotionForRecording);
  };

  const handleStartRecordingAudio = () => {
    setShowCamera(false); // Hide CameraViewer
    setRecordingAudio(true); // Start Recording with RecordingComponent
    setRecording(false); // Start Recording with RecordingComponent
    setRecordedVideoUrl(null); // Reset recorded video URL
    setShowSample(false);

    // Pass the selected emotion to RecordingComponent
    const selectedEmotionForRecording = selectedEmotion || 'DefaultEmotion'; // Replace with a default emotion if none is selected
    setRecordedVideoUrl(selectedEmotionForRecording);
  };

  const onShowSampleClick = () => {
    setShowCamera(false); // Hide CameraViewer
    setRecordingAudio(false); // Start Recording with RecordingComponent
    setRecording(false); // Start Recording with RecordingComponent
    setRecordedVideoUrl(null); // Reset recorded video URL
    setShowSample(true);
  }
  return (
    <div className="app-container">
      <div className="row-container">
        <div className="emotion-list-container">
          <EmotionList onEmotionSelect={handleEmotionSelect} />
        </div>
        <div className="video-player-container">
          {showEmoji ? (
            <VideoPlayer selectedEmotion={null} selectedSentence={null} showEmoji={true} />
          ): showCamera ? (
            <CameraViewer onCameraUnmount={() => setShowCamera(false)} />
          ) : (recording && !showSample) ? (
            <RecordingComponent
              selectedEmotion={recordedVideoUrl} // Pass selected emotion as a prop
              onDiscard={handleShowCamera}
              onCameraUnmount={() => setRecording(false)}
              selectedSentence={selectedSentence}
            />
          ) : (recordingAudio && !showSample) ? (
            <AudioRecorder selectedEmotion={selectedEmotion} selectedSentence={selectedSentence}/>
          ) : (
            <VideoPlayer selectedEmotion={selectedEmotion} selectedSentence={selectedSentence} showEmoji={showEmoji}/>
          )}
        </div>
      </div>
      <div className="control-panel-container">
        {(selectedEmotion && selectedSentence) ? (
          <ControlPanel
            onShowCamera={handleShowCamera}
            onStartRecording={handleStartRecording}
            onStartRecordingAudio={handleStartRecordingAudio}
            onShowSampleClick={onShowSampleClick}
            showCamera={showCamera}
            showSample={showSample}
            recording={recording}
            recordingAudio={recordingAudio}
          />
        ) : null}
      </div>
    </div>
  );
};

export default RecordEmotion;
