import React, { useEffect, useRef, useState } from 'react';
import './Recording.css';

const Recording = ({ selectedEmotion, onCameraUnmount, onDiscard, selectedSentence }) => {
  const videoElementRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [remainingTime, setRemainingTime] = useState(2);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [rollNo, setRollNo] = useState('');

  const handleSave = () => {
    console.log('User input:', rollNo);
    if (recordedBlob) {
      const formData = new FormData();

      formData.append('rollNo', rollNo);
      formData.append('name', selectedEmotion);
      formData.append('id', selectedSentence);
      formData.append('video', true);
      formData.append('video', recordedBlob, 'recorded-video.webm');
  
      const apiUrl = 'http://127.0.0.1:5000/recordings';

      console.log("size: ", recordedBlob.size)
      fetch(apiUrl, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Video saved successfully:', data);
          setRecordedBlob(null);
          stopRecording();
        })
        .catch(error => {
          console.error('Error saving video:', error);
        });
    } else {
      console.warn('No recorded video to save.');
    }
    onDiscard();
  };

  const handleDiscard = () => {
    onDiscard();
  };

  const startRecording = () => {
    setIsRecording(true);

    navigator.mediaDevices.getUserMedia({ video: true, audio:true })
      .then((stream) => {
        videoElementRef.current.srcObject = stream;
        videoElementRef.current.play();

        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });

          console.log('Recorded Video Blob:', blob);

          setRecordedBlob(blob);

          chunksRef.current = [];
        };

        mediaRecorderRef.current.start();

        const intervalId = setInterval(() => {
          setRemainingTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        setTimeout(() => {
          if (mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
          }
          clearInterval(intervalId);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    const videoElement = videoElementRef.current;

    startRecording();

    return () => {
      stopRecording();

      if (videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
      videoElement.remove();
      onCameraUnmount();
    };
  }, [onCameraUnmount, selectedEmotion]);

  useEffect(() => {
    const storedRollNo = localStorage.getItem('prevRollNo');
    if (storedRollNo) {
        setRollNo(storedRollNo);
    }
}, []);

  const handleRollNoChange = (e) => {
    const newRollNo = e.target.value;
    setRollNo(newRollNo);

    // Save the roll number to local storage
    localStorage.setItem('prevRollNo', newRollNo);
  };

  return (
    <div className="recording-container">
      <video muted="muted" ref={videoElementRef} />

      <div className="remainingTime">
        Remaining Time: {remainingTime} seconds
      </div>

      {recordedBlob && (
        <div className="modal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <video controls autoPlay style={{ maxWidth: '100%', maxHeight: '100%' }}>
            <source src={URL.createObjectURL(recordedBlob)} type="video/webm" />
          </video>

          <div className="button-container">
            <button
                type="submit"
                className="cp-btn "
                style={{ marginTop:'5px',margin: '2px', padding: '8px 16px' }}
                onClick={handleSave}>Save</button>
            <button
              type="button"
              className="cp-btn alert"
              style={{ margin: '2px', padding: '8px 16px', marginTop:'5px'}}
              onClick={handleDiscard}>Discard</button>
            <label style={{ color: 'white', marginLeft: '10px', marginTop: '5px'}}>
                Enter roll no:
                <input style={{marginLeft: '10px'}} type="text" value={rollNo} onChange={handleRollNoChange} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recording;
