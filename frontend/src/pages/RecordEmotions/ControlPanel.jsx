import React, { useState } from 'react';

const ControlPanel = ({ onShowCamera, onStartRecording, onStartRecordingAudio, onShowSampleClick, showCamera,showSample,recording,recordingAudio }) => {

  return (
    <div className="cp-body">
      <button
        type="button"
        className={`cp-btn ${showSample ? 'selected' : ''}`}
        onClick={() => onShowSampleClick()}
        style={{ marginRight: '10px' }}>
        Show Sample
      </button>
      <button
        type="button"
        className={`cp-btn  ${showCamera ? 'selected' : ''}`}
        onClick={() => onShowCamera()}
        style={{ marginRight: '10px' }}>
        Show Camera
      </button>
      <button
        type="button"
        className={`cp-btn alert ${recording ? 'selected' : ''}`}
        onClick={() => onStartRecording()}
        style={{ marginRight: '10px' }}>
        Record Video
      </button>
      <button
        type="button"
        className={`cp-btn alert ${recordingAudio ? 'selected' : ''}`}
        onClick={() => onStartRecordingAudio()}
        style={{ marginRight: '10px' }}>
        Record Audio
      </button>
    </div>
  );
};

export default ControlPanel;
