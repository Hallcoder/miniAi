import { useState, useCallback, useRef } from "react";
import { Accept, useDropzone } from "react-dropzone";
import Image from "next/image";
import axios from "axios";
import CameraCaptureModal from "./cameraCaptureModal";
import { ThreeDot } from "react-loading-indicators";

const UploadAndPreview = ({ updateData, updateLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

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
    axios
      .post("http://191.96.31.183:8083/idcard_recognition", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        console.log(data);
        updateData(data.data);
      })
      .finally(() => {
        setIsUploading(false);
       updateLoading(false);
      });
  };

  const handleCapture = async (dataUrl) => {
    const blob = await fetch(dataUrl).then((res) => res.blob());
    const file = new File([blob], "captured_image.png", { type: "image/png" });
    setSelectedFile(file);
    setPreview(dataUrl);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" as unknown as Accept,
  });

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className="border-dashed border-4 m-2 p-4 rounded-md cursor-pointer my-4 min-h-[40vh]"
      >
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
        {!selectedFile && <svg
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
        </svg>}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {preview && (
          <div style={{ marginTop: "20px" }}>
            <Image
              src={preview}
              alt="Preview"
              width={300}
              height={300}
              objectFit="contain"
            />
          </div>
        )}
      </div>
      {/* <button
        onClick={() => setModalIsOpen(true)}
        className="bg-[#1e033d] text-white rounded-sm font-bold text-xs mb-4 p-2"
      >
        Take Photo
      </button> */}
      <button
        onClick={() => setModalIsOpen(true)}
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
          />
        </svg>
        Take Photo
      </button>
      {isUploading ? (
        <ThreeDot color="#cc5800" />
      ) : (
        <button
          onClick={() => handleFileSubmit()}
          type="button"
          className="inline-flex items-center gap-x-2 my-2 rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Analyze Document
        </button>
      )}
      <CameraCaptureModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onCapture={handleCapture}
      />
    </div>
  );
};

export default UploadAndPreview;
