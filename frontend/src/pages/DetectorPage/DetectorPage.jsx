import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './DetectorPage.css';
import robot2 from '../../components/assets/images/robot2.png';
import Typewriter from 'typewriter-effect';

const DetectorPage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const setupFaceDetection = async () => {
      // Load faceapi models
      console.log('Loading faceapi models...');
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      console.log('Faceapi models loaded.');

      // Access the video element
      const video = videoRef.current;

      try {
        // Get user media stream
        console.log('Getting user media stream...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        console.log('User media stream obtained.');

        // Assign the stream to the video element
        video.srcObject = stream;

        // Wait for the video to play
        console.log('Playing video...');
        await video.play();
        console.log('Video is playing.');

        const detectorPageDiv = document.getElementById('detector-page');

        // Create a new div for the canvas and append it to 'detector-page'
        const canvasContainer = document.createElement('div');
        canvasContainer.classList.add('canvas-container'); // Add a class for styling
        detectorPageDiv.appendChild(canvasContainer);

        const canvas = faceapi.createCanvasFromMedia(video);
        canvasContainer.appendChild(canvas);

        // Adjust the size of video and canvas
        const videoWidth = 600;
        const videoHeight = 450;
        video.width = videoWidth;
        video.height = videoHeight;

        const displaySize = { width: videoWidth, height: videoHeight };
        faceapi.matchDimensions(canvas, displaySize);

        // Set interval for face detection
        console.log('Setting up face detection interval...');
        const detectionInterval = setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }, 1000);

        // Cleanup interval and stream on component unmount
        return () => {
          console.log('Cleaning up...');
          clearInterval(detectionInterval);
          stream.getTracks().forEach(track => track.stop());
          detectorPageDiv.removeChild(canvasContainer);
          console.log('Cleanup complete.');
        };
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    setupFaceDetection();
  }, []);

  return (
    <div className='main-body'>
      <div id="detector-page" className="detector-page">
        <video ref={videoRef} autoPlay muted></video>
      </div>
      <div className="robot-overlay">
          <img src={robot2} alt="Robot" className="robot-image" />
          <p className="overlay-text">
          <Typewriter
          options={{
          strings: [
          "Let's detect your emotions"
          ],
          autoStart: true,
          loop: true,
          delay: 30, // Adjust the delay between characters
          deleteSpeed: 100 // Adjust the speed of deleting characters
        }}/>
            </p>
        </div>
    </div>
  );
};

export default DetectorPage;

