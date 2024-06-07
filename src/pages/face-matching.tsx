// src/pages/face-recognition.js
import React, { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import Image from "next/image";
import sampleImage from "../../public/assets/images/faces/face1.jpg";
import DropZone from "@/components/DropZone";
import ImageSamples from "@/components/ImageSamples";
import image1 from "../../public/assets/images/faces/face1.jpg";
import image2 from "../../public/assets/images/faces/face2.jpg";
import image3 from "../../public/assets/images/faces/face3.jpg";
import image4 from "../../public/assets/images/faces/face4.jpg";
import image5 from "../../public/assets/images/faces/face5.jpg";
import image6 from "../../public/assets/images/faces/face6.jpg";
import image7 from "../../public/assets/images/faces/face7.jpg";
import image8 from "../../public/assets/images/faces/face8.jpg";
import Operator from "@/components/operator";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";

const FaceRecognition = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [data, setData] = useState({});
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];

  const handleSubmit = () => {
    let formData = new FormData();
    if (selectedFile && selectedFile2) {
      setIsLoading(true);
      formData.append("file1", selectedFile);
      formData.append("file2", selectedFile2);
    } else {
      toast.error("Please input all images!");
      return;
    }
    console.log("API endpoint", process.env.NEXT_PUBLIC_API_FACE_MATCHING);
    axios
      .post(process.env.NEXT_PUBLIC_API_URL_FACE_MATCHING!, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        setData(data.data);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col min-h-screen justify-between p-4 m-3 bg-bgPlayground">
      <Toaster />
      {/* Section 4: Content Area */}
      <span className="min-h-[6vh] mt-4">
        <h1 className="font-semibold text-4xl flex items-center justify-center my-auto">
          Face Recognition
        </h1>
      </span>
      <div className="flex mt-8 min-h-screen">
        <div className="flex flex-col w-4/12">
          <h2>Image 1</h2>
          <div className="h-3/6 mb-2">
            <DropZone
              constraintWidth={"w-10/12"}
              setPreview={setPreview}
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              preview={preview}
            />
          </div>
          <ImageSamples
            images={images.slice(0, 4)}
            setPreview={setPreview}
            setSelectedFile={setSelectedFile}
          />
        </div>
        <div className="flex flex-col w-4/12">
          <h2>Image 2</h2>
          <div className="h-3/6 mb-2">
            <DropZone
              constraintWidth={"w-10/12"}
              setPreview={setPreview2}
              setSelectedFile={setSelectedFile2}
              selectedFile={selectedFile2}
              preview={preview2}
            />
          </div>
          <ImageSamples
            images={images.slice(4)}
            setPreview={setPreview2}
            setSelectedFile={setSelectedFile2}
          />
        </div>
        {!isLoading ? (
          Object.entries(data).length > 0 ? (
            <div className="flex mt-6 ml-4 flex-col h-4/6 justify-between w-4/12 overflow-hidden">
              <h2>Results</h2>
              {
                <span className="flex items-center gap-2 p-1">
                  <Image
                    src={preview}
                    alt="Image 1"
                    width={0}
                    height={0}
                    className="w-5/12 h-5/6 rounded-md"
                  />
                  <Operator
                    areSame={
                      data["compare_similarity"] >= 0.75
                        ? true
                        : false
                    }
                  />
                  <Image
                    src={preview2}
                    alt="Image 2"
                    width={0}
                    height={0}
                    className="w-5/12 h-5/6 rounded-md"
                  />
                </span>
              }
              <p className="text-sm my-2">
                <strong>Is same Person</strong>: {data["compare_result"]}
              </p>
              <p className="text-sm">
                <strong>Confidence score</strong>: {data["compare_similarity"]}
              </p>
            </div>
          ) : (
            <div className="mx-auto mt-[20vh]">Upload to view results</div>
          )
        ) : (
          <span className="m-auto"><ThreeDot color="#FF5000" /></span>
        )}
      </div>
      {!isLoading ? (
        <div className="w-8/12">
          <button
            className="bg-primary text-white px-4 py-2 w-full rounded"
            onClick={handleSubmit}
          >
            Check Result
          </button>
        </div>
      ) : (
        <span className="m-auto w-6/12"><ThreeDot color="#FF5000" /></span>
      )}
    </div>
  );
};

export default FaceRecognition;
