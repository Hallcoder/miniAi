import React, { useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ImageCropper = ({ src, topLeftX, topLeftY, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas not found");
      return;
    } else {
      console.log("Canvas is found");
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("2D context not found");
      return;
    } else {
      console.log("2D context is found");
    }

    if (img) {
      img.onload = () => {
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw the cropped image on the canvas
        ctx.drawImage(img, topLeftX, topLeftY, width, height, 0, 0, width, height);
        console.log("Image drawn on canvas");
      };

      // Handle image loading error
      img.onerror = (err) => {
        console.error("Image failed to load", err);
      };

      // Trigger image loading
      img.src = src;
    } else {
      console.error("Image element is not found");
    }
  }, [src, topLeftX, topLeftY, width, height]);

  return (
    <div className="w-full">
      <Toaster />
      <img ref={imgRef} src={src} alt="Source" style={{ display: 'none' }} />
      <canvas ref={canvasRef} className="h-[150px] w-[150px]"/>
    </div>
  );
};

export default ImageCropper;
