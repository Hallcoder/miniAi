import { useState, useRef } from "react";
import axios from "axios";
import CameraCaptureModal from "./cameraCaptureModal";
import { ThreeDot } from "react-loading-indicators";
import toast, { Toaster } from "react-hot-toast";
import image1 from "../../public/assets/images/image1.jpg";
import image2 from "../../public/assets/images/image2.jpg";
import image3 from "../../public/assets/images/image3.jpg";
import image4 from "../../public/assets/images/image4.jpg";
import DropZone from "./DropZone";
import ImageSamples from "./ImageSamples";

const UploadAndPreview = ({ updateData, updateLoading, pageType }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const images = [image1, image2, image3, image4];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFileSubmit = () => {
    setIsUploading(true);
    updateLoading(true);
    if (!selectedFile) {
      setIsUploading(false);
      updateLoading(false);
      toast.error("Please Input image!");
      console.log("awaa");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL!}/idcard_recognition`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((data) => {
        console.log(data);
        updateData(data.data);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      })
      .finally(() => {
        setIsUploading(false);
        updateLoading(false);
      });
  };

  return (
      <div className="flex flex-col items-center w-full h-4/6">
        <Toaster />
        <div className="w-11/12 h-full flex justify-center">
          <DropZone
            preview={preview}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            setPreview={setPreview}
          />
        </div>
        <div className="flex items-center w-8/12 mb-4">
          <button
            type="button"
            onClick={() => fileInputRef.current!.click()}
            className="inline-flex justify-center items-center gap-x-2 rounded-md bg-primary px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-6/12 h-4/6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
              />
            </svg>
            Upload
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {isUploading ? (
            <ThreeDot color="#FF5000" />
          ) : (
            <button
              onClick={() => handleFileSubmit()}
              type="button"
              className="inline-flex justify-center items-center gap-x-2 my-2 rounded-md bg-primary px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-6/12 m-1 h-4/6"
            >
              Analyze Document
            </button>
          )}
        </div>

        <ImageSamples
          showText={true}
          updateData={updateData}
          images={images}
          setPreview={setPreview}
          setSelectedFile={setSelectedFile}
        />  
      </div>
       );
};

export default UploadAndPreview;
