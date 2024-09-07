import React, { useRef, useEffect, useState } from 'react';

function PlantScanner() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Start camera on component mount
    startCamera();
  }, []);

  const startCamera = async () => {
    setError('');
    try {
      // Try accessing the back camera on mobile devices
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' }, // 'environment' for back camera, 'user' for front camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error('Error accessing the camera:', err);
      setError('Unable to access the camera. Please check camera permissions and ensure the site is served over HTTPS.');
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setImage(dataUrl);
  };

  return (
    <div>
      <h1>Plant Scanner</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <video ref={videoRef} width="640" height="480" autoPlay playsInline></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <button onClick={captureImage}>Capture Image</button>
      {image && <img src={image} alt="Captured Plant" />}
    </div>
  );
}

export default PlantScanner;
