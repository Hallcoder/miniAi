"use client";
import UploadAndPreview from "@/components/uploadAndPreview";
import { useEffect, useState } from "react";
import "../app/globals.css"
import Tabs from "@/components/tabs";
import SideBarNavigation from "@/components/SideBarNavigation";
import { RecoilRoot } from 'recoil';

export default function Home() {
  const [data, setData] = useState({
    Images: { Document: "", Portrait: "" },
  });
  const [isLoading, setIsDataUpdated] = useState(false);

  return (
    <RecoilRoot>
    <main className="flex flex-col items-center justify-between">
      <article
        className="flex  w-full border"
        style={{
          background:
          "linear-gradient(48deg, rgba(212,202,200,1) 0%, rgba(255,255,255,1) 60%)",
        }}
      >
      </article>
    </main>
    </RecoilRoot>
  );
}
