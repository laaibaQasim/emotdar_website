import { useState, useRef } from "react";
const AudioRecorder = ({ selectedEmotion, selectedSentence }) => {
    const [permission, setPermission] = useState(false);
    const mimeType = "audio/webm";
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audio, setAudio] = useState(null);
    const [rollNo, setRollNo] = useState('');
    const [showRollNoInput, setShowRollNoInput] = useState(false);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };
    const startRecording = async () => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
           if (typeof event.data === "undefined") {
             return;
           }
           if (event.data.size === 0) {
             return;
           }
           localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
      };

      const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
          //creates a blob file from the audiochunks data
           const audioBlob = new Blob(audioChunks, { type: mimeType });
          //creates a playable URL from the blob file.
           const audioUrl = URL.createObjectURL(audioBlob);
           setAudio(audioUrl);
           setAudioBlob(audioBlob);
           setAudioChunks([]);
        };
      };

      const handleSave = () => {
        if (rollNo.trim() === '') {
            // Roll number is required, show input field
            setShowRollNoInput(true);
            return;
          }
        console.log('User input:', rollNo);
        const formData = new FormData();
    
        formData.append('rollNo', rollNo);
        formData.append('name', selectedEmotion);
        formData.append('id', selectedSentence);
        formData.append('audio', audioBlob, mimeType); // Convert audioChunks to Blob
      
          const apiUrl = 'http://127.0.0.1:5000/recordings';
    
          console.log("size: ", audio.size)

          fetch(apiUrl, {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              console.log('Audio saved successfully:', data);
              setAudio(null);
              stopRecording();
            })
            .catch(error => {
              console.error('Error saving audio:', error);
            });
        }

    return (
        <div>
            <h2>Audio Recorder</h2>
            <main>
            <div className="audio-controls">
                {!permission ? (
                <button onClick={getMicrophonePermission} type="button">
                    Get Microphone
                </button>
                ) : null}
                {audio ? (
                <div className="audio-container">
                    <audio src={audio} controls></audio> <br></br>
                    <button style={{ marginTop: '10px' }} onClick={handleSave}>Enter Roll No</button>
                    {showRollNoInput && (
                        <div>
                        <label >
                            Enter your Roll Number:
                            <input
                            type="text"
                            style={{marginLeft: '10px'}}
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            />
                        </label><br></br>
                        <button className="button" style={{ marginTop: '10px' }} onClick={handleSave}>Save</button>
                        <br></br>
                        </div>
                    )}
                </div>
                ) : null}
                {permission && recordingStatus === "inactive" ? (
                <button onClick={startRecording} type="button" style={{ marginTop: '10px' }}>
                    Start Recording
                </button>
                ) : null}
                {recordingStatus === "recording" ? (
                <button onClick={stopRecording} type="button" style={{ marginTop: '10px' }}>
                    Stop Recording
                </button>
                ) : null}
            </div>
            </main>
        </div>
    );
};
export default AudioRecorder;