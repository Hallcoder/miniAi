import { atom } from "recoil";


export const selectedFile = atom({
    key: "selectedFile",
    default:null
});

export const sideBarCurrentParent =  atom({
    key:"sideBarCurrentParent",
    default:{
        name:"FaceSDK"
    }
});
