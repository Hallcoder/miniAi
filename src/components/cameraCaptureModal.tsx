import { useRef } from 'react';
import Modal from 'react-modal';

const CameraCaptureModal = ({ isOpen, onRequestClose, onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onCapture(dataUrl);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={startCamera}
      style={{
        content: {
          width: '80vw',
          height: '80vh',
          margin: 'auto',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <div style={{ position: 'relative' }}>
        <video ref={videoRef} style={{ width: '100%', height: 'auto' }}></video>
        <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }}></canvas>
        <button
          onClick={captureImage}
          style={{
            position: 'absolute',
            bottom: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#fff',
            border: '2px solid #000',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          &#x1F4F7; {/* Unicode for camera icon */}
        </button>
      </div>
    </Modal>
  );
};

export default CameraCaptureModal;
