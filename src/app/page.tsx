"use client";
import UploadAndPreview from "@/components/uploadAndPreview";
import { useEffect, useState } from "react";

import { ThreeDot } from "react-loading-indicators";
import Tabs from "@/components/tabs";

export default function Home() {
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
            "linear-gradient(48deg, rgba(212,202,200,1) 0%, rgba(255,255,255,1) 60%)",
        }}
      >
        <div className="flex flex-col items-center w-5/12">
          <UploadAndPreview
            updateData={setData}
            updateLoading={setIsDataUpdated}
          />
          
        </div>
        <Tabs data={data} isLoading={isLoading}/>
        {/* <Intro /> */}
      </article>
    </main>
  );
}
