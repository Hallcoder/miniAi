// src/pages/face-recognition.js
import React, { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import Image from "next/image";
import sampleImage from "../../public/assets/images/image1.jpg"
import DropZone from "@/components/DropZone";
import ImageSamples from "@/components/ImageSamples";
import image1 from "../../public/assets/images/faces/face1.jpg"
import image2 from "../../public/assets/images/faces/face2.jpg"
import image3 from "../../public/assets/images/faces/face3.jpg"
import image4 from "../../public/assets/images/faces/face4.jpg"
import image5 from "../../public/assets/images/faces/face5.jpg"
import image6 from "../../public/assets/images/faces/face6.jpg"
import image7 from "../../public/assets/images/faces/face7.jpg"
import image8 from "../../public/assets/images/faces/face8.jpg"


const FaceRecognition = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const images = [image1,image2,image3,image4,image5,image6,image7,image8];

 

  return (
    <div className="p-4 w-full bg-bgPlaygroundz">
      {/* Section 4: Content Area */}
      <h1 className="text-2xl font-semibold">Face Recognition</h1>
      <div className="flex gap-2 mt-10 w-full justify-between">
        <div className="flex flex-col flex-1">
          <h2>Image 1</h2>
          <DropZone
            setPreview={setPreview}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            preview={preview}
          />
          <ImageSamples images={images.slice(0,4)} setPreview={setPreview} setSelectedFile={setSelectedFile}/>
        </div>
        <div className="flex flex-col flex-1">
          <h2>Image 2</h2>
          <DropZone
            setPreview={setPreview2}
            setSelectedFile={setSelectedFile2}
            selectedFile={selectedFile2}
            preview={preview2}
          />
          <ImageSamples images={images.slice(4)} setPreview={setPreview2} setSelectedFile={setSelectedFile2}/>
        </div>
        <div className="ml-4 mt-20 w-4/12">
          <h2>Results</h2>
         { <span className="flex gap-2 p-1">
            <Image
              src={sampleImage}
              alt="Image 2"
              width={300}
              height={200}
            />
            <Image
              src={sampleImage}
              alt="Image 2"
              width={300}
              height={200}
            />
          </span>}
        </div>
      </div>
      <div className="mt-4 w-full">
        <button className="bg-primary text-white px-4 py-2 w-full rounded">
          Check Result
        </button>
      </div>
    </div>
  );
};

export default FaceRecognition;
