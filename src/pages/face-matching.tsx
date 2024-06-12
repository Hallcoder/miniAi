// src/pages/face-recognition.js
import React, { useState } from "react";
import Image from "next/image";
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
import ImageCropper from "@/components/ImageCropper";
import ServicesText from "@/components/servicesText";

const FaceRecognition = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [data, setData] = useState({});
  const [face1, setFace1] = useState({});
  const [face2, setFace2] = useState({});

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
        console.log(data.data);
        setFace1(data.data.face1);
        setFace2(data.data.face2);
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
    <div className="flex flex-col min-h-screen justify-center p-2 bg-bgPlayground">
      <Toaster />
      {/* Section 4: Content Area */}
      <span className="min-h-[6vh] py-8 bg-white">
        <h1 className="font-semibold text-4xl flex items-center justify-center my-auto">
          Face Recognition
        </h1>
      </span>
      <div className="flex mt-4 min-h-[80vh] bg-white">
        <div className="flex flex-col w-4/12">
          {/* <div className="h-3/6 mb-2"> */}
          <DropZone
            setPreview={setPreview}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            preview={preview}
            number={1}
          />
          {/* </div> */}
          <ImageSamples
            showText={false}
            images={images.slice(0, 4)}
            setPreview={setPreview}
            setSelectedFile={setSelectedFile}
          />
        </div>
        <div className="flex flex-col w-4/12 bg-white">
          {/* <div className="h-3/6 mb-2"> */}
          <DropZone
            setPreview={setPreview2}
            setSelectedFile={setSelectedFile2}
            selectedFile={selectedFile2}
            preview={preview2}
            number={2}
          />
          {/* </div> */}
          <ImageSamples
            showText={false}
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
                  <ImageCropper
                    src={preview}
                    topLeftX={face1["x1"]}
                    topLeftY={face1["y1"]}
                    width={face1["x2"] - face1["x1"]}
                    height={face1["y2"] - face1["y1"]}
                  />
                  <Operator
                    areSame={data["compare_similarity"] >= 0.75 ? true : false}
                  />
                  <ImageCropper
                    src={preview2}
                    topLeftX={face2["x1"]}
                    topLeftY={face2["y1"]}
                    width={face2["x2"] - face2["x1"]}
                    height={face2["y2"] - face2["y1"]}
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
          <span className="m-auto">
            <ThreeDot color="#FF5000" />
          </span>
        )}
      </div>
      {!isLoading ? (
        <div className="w-full bg-white">
          <button
            className="bg-primary w-8/12 text-white px-4 py-2  rounded"
            onClick={handleSubmit}
          >
            Check Result
          </button>
          <span className="w-8/12 border-2"><ServicesText /></span>
        </div>
      ) : (
        <div className="w-full bg-white">
          <span className="m-auto"><ThreeDot color="#FF5000" /></span>
          <span className="w-8/12 border-2"><ServicesText /></span>
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;
