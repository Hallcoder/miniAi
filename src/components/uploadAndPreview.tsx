import { useState, useCallback, useRef } from "react";
import { Accept, useDropzone } from "react-dropzone";
import Image from "next/image";
import axios from "axios";
import CameraCaptureModal from "./cameraCaptureModal";
import {ThreeDot} from "react-loading-indicators";

const UploadAndPreview = ({updateData}) => {
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
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post("http://89.116.159.229:8082/idcard_recognition", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        console.log(data);
        updateData(data.data);
      }).finally(()=>{
        setIsUploading(false);
      })
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
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-[#1e033d] text-white rounded-sm font-bold text-xs mb-4 p-2"
      >
        Take Photo
      </button>
     {isUploading ? <ThreeDot color="#1e033d"/> : <button
        onClick={handleFileSubmit}
        className="bg-[#1e033d] text-white rounded-sm font-bold text-xs mb-4 p-2"
      >
       Analyze Document
      </button>}
      <CameraCaptureModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onCapture={handleCapture}
      />
    </div>
  );
};

export default UploadAndPreview;
