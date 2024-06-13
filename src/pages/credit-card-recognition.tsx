import Tabs from "@/components/tabs";
import UploadAndPreview from "@/components/uploadAndPreview";
import { PageType } from "@/utils/types";
import { useState } from "react";

function CreditCardReader() {
  const [data, setData] = useState({
    Images: { Document: "", Portrait: "" },
  });
  const [isLoading, setIsDataUpdated] = useState(false);
  return (
    <main className="flex flex-col items-center justify-between bg-white">
    <span className="min-h-[8vh] p-2 mt-4 mb-4 bg-white"><h1 className="font-semibold text-4xl flex items-center justify-center my-auto">IDSDK - Credit Card Recognition</h1></span> 
      <article className="flex w-full border  bg-bgPlayground">
        <div className="flex flex-col items-center w-5/12 bg-white">
          <UploadAndPreview
            pageType={PageType.CREDIT_CARD}
            updateData={setData}
            updateLoading={setIsDataUpdated}
          />
        </div>
        <Tabs data={data} isLoading={isLoading} />
      </article>
    </main>
  );
}

export default CreditCardReader;
