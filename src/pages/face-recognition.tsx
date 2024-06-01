// src/pages/face-recognition.js
import React, { useCallback, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import Image from 'next/image';
const FaceRecognition = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" as unknown as Accept,
    noClick: false, // Disable click triggering for useDropzone
  });
  return (
      <div className="p-4 h-screen">
        {/* Section 4: Content Area */}
        <h1 className="text-2xl font-semibold">Face Recognition</h1>
        <div className="mt-4 flex gap-4">
          <div className="border ">
            <h2>Image 1</h2>
            <div
        {...getRootProps()}
        className="border-dashed border-4 m-2 p-4 rounded-md cursor-pointer my-4 min-h-[40vh] w-10/12"
      >
        <input {...getInputProps()} style={{ display: "none" }} />
        <p>Drag & drop an image here</p>
        {!selectedFile && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 mx-auto mt-16 animate-bounce border-2 p-2 border-primary rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        )}
        {preview && (
          <div style={{ marginTop: "20px" }}>
            <Image
              src={preview}
              alt="Preview"
              width={0}
              height={0}
              objectFit="contain"
              className="w-full"
            />
          </div>
        )}
      </div>
          </div>
          <div>
            <h2>Image 2</h2>
            {<Image src="/path/to/image2.jpg" alt="Image 2" width={300} height={200} />}
          </div>
          <div>
            <h2>Image 2</h2>
            {<Image src="/path/to/image2.jpg" alt="Image 2" width={300} height={200} />}
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Check Result</button>
        </div>
      </div>
  );
};

export default FaceRecognition;
