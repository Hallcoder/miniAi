import Image from "next/image";
import toast from "react-hot-toast";

function ImageSamples({ images, setPreview, setSelectedFile }) {
  const handleSampleClick = async (img) => {
    try {
      // Convert the imported image to a Data URL (base64)
      const toDataURL = (url) =>
        fetch(url)
          .then((response) => response.blob())
          .then(
            (blob) =>
              new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              })
          );

      const dataUrl = await toDataURL(img.src); // img.src for Next.js Image component
      setPreview(dataUrl as string);

      // Create a blob from the Data URL
      const blob = await fetch(dataUrl as unknown as string).then((res) =>
        res.blob()
      );
      const file = new File([blob], "selected_image.png", {
        type: "image/png",
      });
      setSelectedFile(file);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to set image.");
    }
  };
  return (
    <div className="w-10/12">
      <span className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-3 text-gray-600 m-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <h2 className="font-semibold text-xs">Examples</h2>
      </span>
      <span className="flex flex-wrap gap-1 mb-4 w-full">
        {images.map((img, index) => {
          return (
            <Image
              key={index}
              className="hover:border-2 hover:border-gray-900 rounded-md cursor-pointer object-contain"
              alt="sample-image"
              height={100}
              width={80}
              onClick={() => handleSampleClick(img)}
              src={img}
            />
          );
        })}
      </span>
    </div>
  );
}

export default ImageSamples;
