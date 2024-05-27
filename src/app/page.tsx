"use client";
import { MdOutlineFileUpload } from "react-icons/md";
import Image from "next/image";
import image1 from "../../public/assets/images/image1.jpg";
import image2 from "../../public/assets/images/image2.jpg";
import image3 from "../../public/assets/images/image3.jpg";
import image4 from "../../public/assets/images/image4.jpg";
import UploadAndPreview from "@/components/uploadAndPreview";

export default function Home() {
  const images = [image1, image2, image3, image4];
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <main className="flex flex-col h-screen items-center justify-between">
      <h4 className="">AI Document Analyzer</h4>
      <article className="flex w-full border bg-gray-100">
        <div className="flex flex-col items-center w-3/12">
          <h2 className="font-semibold">Use your own image</h2>
          <UploadAndPreview />
          <div className="w-9/12">
            <h2 className="font-semibold">Image samples</h2>
            <span className="flex flex-wrap gap-1 mb-4 w-full">
              {images.map((img) => {
                return (
                  <Image
                    className="hover:border-2 hover:border-gray-900 rounded-md cursor-pointer object-contain"
                    alt="social-image"
                    height={100}
                    width={80}
                    src={img}
                  />
                );
              })}
            </span>
          </div>
        </div>
        <div className="w-6/12">results</div>
        <div className="w-3/12">upload info</div>
      </article>
    </main>
  );
}
