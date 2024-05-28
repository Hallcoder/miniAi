"use client";
import image1 from "../../public/assets/images/image1.jpg";
import image2 from "../../public/assets/images/image2.jpg";
import image3 from "../../public/assets/images/image3.jpg";
import image4 from "../../public/assets/images/image4.jpg";
import UploadAndPreview from "@/components/uploadAndPreview";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const images = [image1, image2, image3, image4];
  const [data, setData] = useState({
    Images: { Document: "", Portrait: "" },
  });
  return (
    <main className="flex flex-col h-screen items-center justify-between">
      <h4 className="">AI Document Analyzer</h4>
      <article className="flex w-full border bg-gray-100">
        <div className="flex flex-col items-center w-3/12">
          <h2 className="font-semibold">Use your own image</h2>
          <UploadAndPreview updateData={setData} />
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
        <div className="w-6/12 p-3">
          {/* <table className="w-full">
            <thead>
              <tr className="border-2 p-2">
                <th>Field</th>
                <th>Value</th>
                <th>MRZ</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((d) => {
                // console.log(data["Images"]["Portrait"])
                if (typeof data[d] !== "string") return;
                return (
                  <tr className="border-2 p-2">
                    <td className="border-r-2 font-bold p-2 text-center">
                      {d.toString()}
                    </td>
                    <td className="text-center text-xs border-r-2 p-2">
                      {data[d]}
                    </td>
                    <td className="p-2 w-3/12 text-center">NA</td>
                  </tr>
                );
              })}
            </tbody>
          </table>  */}
          <ul>
            {Object.keys(data).map((d) => {
              if (typeof data[d] !== "string") return;
              return (
                <li>
                  <span className="my-2 font-semibold">{d}</span> : <span className="text-sm">{data[d]}</span>
                </li>
              );
            })}
          </ul>
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
      </article>
    </main>
  );
}
