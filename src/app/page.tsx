"use client";
import image1 from "../../public/assets/images/image1.jpg";
import image2 from "../../public/assets/images/image2.jpg";
import image3 from "../../public/assets/images/image3.jpg";
import image4 from "../../public/assets/images/image4.jpg";
import UploadAndPreview from "@/components/uploadAndPreview";
import { useEffect, useState } from "react";
import Image from "next/image";
import Intro from "@/components/intro";
import { ThreeDot } from "react-loading-indicators";

export default function Home() {
  const images = [image1, image2, image3, image4];
  const [data, setData] = useState({
    Images: { Document: "", Portrait: "" },
  });
  const [isLoading, setIsDataUpdated] = useState(false);

  return (
    <main className="flex flex-col items-center justify-between">
      <article
        className="flex  w-full border"
        style={{
          background:
            "linear-gradient(90deg, rgba(244,196,151,1) 0%, rgba(246,240,234,0.7289040616246498) 100%)",
        }}
      >
        <div className="flex flex-col items-center w-5/12">
          <UploadAndPreview
            updateData={setData}
            updateLoading={setIsDataUpdated}
          />
          <div className="w-10/12">
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
        <div className="w-4/12 p-3">
          {!isLoading ? (
            <ul>
              {Object.keys(data).map((d) => {
                if (typeof data[d] !== "string") return;
                return (
                  <li className="p-2 m-1 border-b border-black">
                    <span className="my-2 font-semibold">{d}</span> :{" "}
                    <span className="text-sm">{data[d]}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-full">
              <ThreeDot color="#cc5800" />
            </div>
          )}
          <div></div>
        </div>
        <div className="w-4/12 p-2">
          <table className="w-full">
            <thead className="font-bold">
              <tr>
                <td className="font-bold">Field</td>
                <td className="font-bold">Image</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Document</td>
                <td className="flex items-center justify-center">
                  <Image
                    src={`data:image/jpeg;base64,${data["Images"]["Document"]}`}
                    alt="Preview"
                    width={200}
                    height={100}
                    objectFit="contain"
                    className="rounded-sm m-2"
                  />
                </td>
              </tr>
              <tr>
                <td>Portrait</td>
                <td className="flex items-center justify-center">
                  <Image
                    src={`data:image/jpeg;base64,${data["Images"]["Portrait"]}`}
                    alt="Preview"
                    width={100}
                    height={50}
                    objectFit="contain"
                    className="rounded-sm m-2"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <Intro /> */}
      </article>
    </main>
  );
}
