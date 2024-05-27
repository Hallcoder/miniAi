// components/UploadAndPreview.js
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import axios from 'axios';

const UploadAndPreview = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles:any) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleFileSubmit = ()=>{
    if(!selectedFile) return;
    const formData = new FormData();
    formData.append('file',selectedFile);
    axios.post("http://191.96.31.183:8081/idcard_recognition",formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    }).then(data =>{
        console.log(data);
    })
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className='flex flex-col items-center'>
        <div
          {...getRootProps()}
          className='border-dashed border-4 m-2 p-4 rounded-md cursor-pointer my-4 min-h-[40vh]'
        >
          <input {...getInputProps()} />
          <p>Drag & drop an image here, or click to select one</p>
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          {preview && (
            <div style={{ marginTop: '20px' }}>
              <Image src={preview} alt="Preview" width={300} height={300} objectFit="contain" />
            </div>
          )}
        </div>
          <button onClick={handleFileSubmit} className="bg-[#1e033d] text-white rounded-sm font-bold text-xs mb-4 p-2">
                Analyze Document
              </button>
    </div>
  );
};

export default UploadAndPreview;
