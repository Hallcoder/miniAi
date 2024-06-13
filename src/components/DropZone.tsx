import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import ImageUploadSymbol from "./ImageUploadSymbol";
import { TbCloudUpload } from "react-icons/tb";
import { BiWebcam } from "react-icons/bi";
import { LuClipboardEdit } from "react-icons/lu";
import CameraCaptureModal from "./cameraCaptureModal";

interface Props{
  preview:any,
  selectedFile:any,
  setSelectedFile:any,
  setPreview:any,
  number?:any
}
const DropZone: React.FC<Props> = ({
  preview,
  selectedFile,
  setSelectedFile,
  setPreview,
  number,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);
  const fileInputRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" as unknown as Accept,
    noClick: false, // Disable click triggering for useDropzone
  });

  const handleCapture = async (dataUrl) => {
    console.log("DataUrl", dataUrl);
    const blob = await fetch(dataUrl).then((res) => res.blob());
    const file = new File([blob], "captured_image.png", { type: "image/png" });
    setSelectedFile(file);
    setPreview(dataUrl);
  };
  return (
    <div className="flex flex-col items-center">
    <div
      id="dashedBorder"
      {...getRootProps()}
      className="mt-1 border-primary justify-center mb-4 flex flex-col items-center h-[50vh] rounded-md cursor-pointer w-10/12 p-2"
    >
      <input {...getInputProps()} style={{ display: "none" }} />
      {!selectedFile && <ImageUploadSymbol number={number}/>}
      {!selectedFile && (
        <TbCloudUpload className="size-14 mx-auto my-4 p-2 text-primary font-extrabold" />
      )}
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          width={0}
          height={0}
          className={`w-fit h-5/6 mb-1 rounded-sm`}
        />
      )}
     {!selectedFile &&  <p className="text-primary font-bold text-xl">Drag & Drop image</p>}
    </div>
    <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
    <div className="flex flex-row gap-x-2 items-center justify-center w-full m-2">
        <TbCloudUpload
          onClick={() => fileInputRef.current!.click()}
          className="size-4 cursor-pointer  text-primary font-extrabold"
        />
        <BiWebcam onClick={() => setModalIsOpen(true)} className="size-4 cursor-pointer font-extrabold" />
        {/* <LuClipboardEdit className="size-4 cursor-pointer font-extrabold" /> */}
      </div>
      <CameraCaptureModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          onCapture={handleCapture}
        />
    </div>
  );
}

export default DropZone;
