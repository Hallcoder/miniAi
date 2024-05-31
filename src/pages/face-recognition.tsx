// src/pages/face-recognition.js
import React from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
const FaceRecognition = () => {
  return (
    <Layout>
      <div className="p-4">
        {/* Section 4: Content Area */}
        <h1 className="text-2xl font-semibold">Face Recognition</h1>
        <div className="mt-4 flex gap-4">
          <div>
            <h2>Image 1</h2>
            <Image src="/path/to/image1.jpg" alt="Image 1" width={300} height={200} />
          </div>
          <div>
            <h2>Image 2</h2>
            <Image src="/path/to/image2.jpg" alt="Image 2" width={300} height={200} />
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Check Result</button>
        </div>
      </div>
    </Layout>
  );
};

export default FaceRecognition;
