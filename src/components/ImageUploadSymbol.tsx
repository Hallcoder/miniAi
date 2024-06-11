import { AiOutlinePicture } from "react-icons/ai";
function ImageUploadSymbol({number}) {
    return (<span className="bg-[#FF50001F] flex rounded-xl text-primary p-1 text-xs items-center">
      <AiOutlinePicture className="mx-1"/>
      Image {number}
    </span>);
}

export default ImageUploadSymbol;