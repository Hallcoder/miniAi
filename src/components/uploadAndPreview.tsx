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

const UploadAndPreview = ({ updateData, updateLoading }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const images = [image1, image2, image3, image4];

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
    console.log(formData.getAll("file"));
    axios
      .post(process.env.NEXT_PUBLIC_API_URL!, formData, {
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

  const handleSampleClick = async (img) => {
    try {
      // Convert the imported image to a Data URL (base64)
      const toDataURL = (url) =>
        fetch(url)
          .then((response) => response.blob())
          .then(
            (blob) =>
              new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              })
          );

      const dataUrl = await toDataURL(img.src); // img.src for Next.js Image component
      setPreview(dataUrl as string);

      // Create a blob from the Data URL
      const blob = await fetch(dataUrl as unknown as string).then((res) =>
        res.blob()
      );
      const file = new File([blob], "selected_image.png", {
        type: "image/png",
      });
      setSelectedFile(file);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to set image.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" as unknown as Accept,
    noClick: false, // Disable click triggering for useDropzone
  });

  return (
    <div className="flex flex-col items-center w-full">
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
      <div className="w-10/12">
        <h2 className="font-semibold">Image samples</h2>
        <span className="flex flex-wrap gap-1 mb-4 w-full">
          {images.map((img, index) => {
            return (
              <Image
                key={index}
                className="hover:border-2 hover:border-gray-900 rounded-md cursor-pointer object-contain"
                alt="sample-image"
                height={100}
                width={80}
                onClick={() => handleSampleClick(img)}
                src={img}
              />
            );
          })}
        </span>
      </div>
      <CameraCaptureModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onCapture={handleCapture}
      />
    </div>
  );
};

export default UploadAndPreview;
