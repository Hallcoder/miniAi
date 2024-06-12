import { useState } from "react";
import image1 from "../../public/assets/images/emotional_faces/face1.jpg";
import image2 from "../../public/assets/images/emotional_faces/face2.jpg";
import image3 from "../../public/assets/images/emotional_faces/face3.jpg";
import image4 from "../../public/assets/images/emotional_faces/face4.jpg";
import image5 from "../../public/assets/images/emotional_faces/face5.jpg";
import toast, { Toaster } from "react-hot-toast";
import DropZone from "@/components/DropZone";
import ImageSamples from "@/components/ImageSamples";
import Image from "next/image";
import { ThreeDot } from "react-loading-indicators";
import axios from "axios";

function FaceEmotion() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [data, setData] = useState({});
  const images = [image1, image2, image3, image4, image5];

  const handleSubmit = () => {
    if (!selectedFile) {
      toast.error("No Image File selected!");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    setIsLoading(true);
    axios
      .post(process.env.NEXT_PUBLIC_API_URL_FACE_EMOTION!, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        setData(data.data);
        console.log(data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="flex flex-col min-h-screen justify-between p-4 m-3 bg-bgPlayground">
      <Toaster />
      {/* Section 4: Content Area */}
      <span className="min-h-[6vh] mt-4">
        <h1 className="font-semibold text-4xl flex items-center justify-center my-auto">
          Face Emotional Detection
        </h1>
      </span>
      <div className="flex mt-8 h-screen">
        <div className="flex flex-col w-7/12 items-center">
          {/* <div className="h-4/6 mb-2"> */}
            <DropZone
              setPreview={setPreview}
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              preview={preview}
              number={1}
            />
          {/* </div> */}
          <ImageSamples
            showText={true}
            images={images.slice(0, 4)}
            setPreview={setPreview}
            setSelectedFile={setSelectedFile}
          />
        </div>
        {!isLoading ? (
          Object.entries(data).length > 0 ? (
            <div className="flex ml-4 flex-col gap-2 w-4/12 overflow-hidden">
              <h2>Results</h2>
              {
                <span className="flex items-center p-1">
                  <Image
                    src={preview}
                    alt="Image 1"
                    width={0}
                    height={0}
                    className="w-7/12 h-full rounded-md"
                  />
                </span>
              }
              <span className="flex text-sm p-1 items-center"><p className="mx-1 font-bold">Emotion:</p>{data["emotion_result"]}</span>
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
        <div className="w-8/12">
          <button
            className="bg-primary text-white px-4 py-2 w-full rounded"
            onClick={handleSubmit}
          >
            Check Result
          </button>
        </div>
      ) : (
        <span className="m-auto w-6/12">
          <ThreeDot color="#FF5000" />
        </span>
      )}
    </div>
  );
}

export default FaceEmotion;
