import Tabs from "@/components/tabs";
import UploadAndPreview from "@/components/uploadAndPreview";
import { useState } from "react";

function IdCardRecognition() {
  const [data, setData] = useState({
    Images: { Document: "", Portrait: "" },
  });
  const [isLoading, setIsDataUpdated] = useState(false);
  return (
    <main className="flex flex-col items-center justify-between bg-bgPlayground">
    <span className="min-h-[8vh] p-2 mt-4 mb-4"><h1 className="font-semibold text-4xl flex items-center justify-center my-auto">IDSDK - ID Card Recognition</h1></span> 
      <article className="flex w-full border">
        <div className="flex flex-col items-center w-5/12">
          <UploadAndPreview
            updateData={setData}
            updateLoading={setIsDataUpdated}
          />
        </div>
        <Tabs data={data} isLoading={isLoading} />
      </article>
    </main>
  );
}

export default IdCardRecognition;
