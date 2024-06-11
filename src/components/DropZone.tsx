import Image from "next/image";
import { useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { TbCloudUpload } from "react-icons/tb";
import ImageUploadSymbol from "./ImageUploadSymbol";
function DropZone({
  preview,
  selectedFile,
  setSelectedFile,
  setPreview,
  constraintWidth,
  number
}) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" as unknown as Accept,
    noClick: false, // Disable click triggering for useDropzone
  });
  return (
    <div
      id="dashedBorder"
      {...getRootProps()}
      className="mt-1 border-primary justify-center mb-4 flex flex-1 flex-col items-center h-[50vh] rounded-md cursor-pointer w-10/12"
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
          className={`${constraintWidth} h-5/6 mb-1 rounded-sm`}
        />
      )}
     {!selectedFile &&  <p className="text-primary font-bold text-xl">Drag & Drop image</p>}
    </div>
  );
}

export default DropZone;
