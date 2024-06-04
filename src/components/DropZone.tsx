import Image from "next/image";
import { useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
function DropZone({ preview, selectedFile, setSelectedFile, setPreview }) {
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
      {...getRootProps()}
      className="border-dashed mt-1 flex flex-col items-center border-4 h-full rounded-md cursor-pointer w-11/12"
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
        <div className="w-full">
          <Image
            src={preview}
            alt="Preview"
            width={0}
            height={0}
            objectFit="cover"
            className="w-5/6 h-5/6 mt-4 mb-1 m-auto rounded-sm"
          />
        </div>
      )}
    </div>
  );
}

export default DropZone;
