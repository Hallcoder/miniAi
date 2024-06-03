import { useState, useCallback, useRef } from "react";
import { Accept, useDropzone } from "react-dropzone";
import Image from "next/image";
import axios from "axios";
import CameraCaptureModal from "./cameraCaptureModal";
import { ThreeDot } from "react-loading-indicators";
import toast from "react-hot-toast";
import image1 from "../../public/assets/images/image1.jpg";
import image2 from "../../public/assets/images/image2.jpg";
import image3 from "../../public/assets/images/image3.jpg";
import image4 from "../../public/assets/images/image4.jpg";
import DropZone from "./DropZone";
import ImageSamples from "./ImageSamples";

const UploadAndPreview = ({ updateData, updateLoading }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData.getAll("file"));
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL!}/idcard_recognition`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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

  const handleCapture = async (dataUrl) => {
    console.log("DataUrl", dataUrl);
    const blob = await fetch(dataUrl).then((res) => res.blob());
    const file = new File([blob], "captured_image.png", { type: "image/png" });
    setSelectedFile(file);
    console.log("Another file", file);
    setPreview(dataUrl);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <DropZone preview={preview} setSelectedFile={setSelectedFile} selectedFile={selectedFile} setPreview={setPreview}/>
      <div>
        <button
          type="button"
          onClick={() => fileInputRef.current!.click()}
          className="inline-flex items-center gap-x-2 rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
        <button
          onClick={() => setModalIsOpen(true)}
          type="button"
          className="inline-flex mx-1 items-center gap-x-2 rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            />
          </svg>
          Take Photo
        </button>
      </div>
      {isUploading ? (
        <ThreeDot color="#FF5000" />
      ) : (
        <button
          onClick={() => handleFileSubmit()}
          type="button"
          className="inline-flex items-center gap-x-2 my-2 rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Analyze Document
        </button>
      )}
      <ImageSamples images={images} setPreview={setPreview} setSelectedFile={setSelectedFile}/>
      <CameraCaptureModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onCapture={handleCapture}
      />
    </div>
  );
};

export default UploadAndPreview;
