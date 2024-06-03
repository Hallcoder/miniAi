import Image from "next/image";
import toast from "react-hot-toast";

function ImageSamples({images,setPreview,setSelectedFile}) {
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
        <h2 className="font-semibold">Image samples</h2>
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