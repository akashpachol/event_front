import React, { useState } from 'react';

import CropperDemo from './Cropper';
import { cropFormProps } from '../../../../../utils/types';
import { editProfileImg } from '../../../../../service/api/user/apiMethod';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../utils/redux/app/store';



const Modal: React.FC <cropFormProps>= ({setShowModal}) => {


  const [open, setOpen] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  
  const user = useSelector((state: RootState) => state.user);
  
  const handleUpload = (imageData: string) => {
    setUploadedImage(imageData);
    setCroppedImage(null);
    setOpen(true);
  };
  
  const handleClose = () => {
    setShowModal(false);
  };
  
  const getCroppedFile = (croppedData: string) => {
    setCroppedImage(croppedData);
    setUploadedImage(null)
    setOpen(false);

    editProfileImg(user.userId,croppedData)
    .then((response:object) => {
console.log(response,"kjhfdkfdkj");

    })
    .catch((error) => {
      toast.error(error?.message);
    });



  };
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        handleUpload(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    } else {
      alert("Please select a file.");
    }
  };
  return (
    <div
    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
  >
    <div className="relative w-md my-6 mx-auto max-w-3xl">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
          <h3 className="text-3xl font-semibold">
            Modal Title
          </h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>

        <div className="p-6 flex ">
        <div className={uploadedImage !==null?`w-1/2`:`mx-auto`}>
    <div className="w-full  mb-4 flex flex-col items-center justify-center ">
      {croppedImage ? (
        <img
          src={croppedImage}
          alt="Uploaded"
          className="w-72 h-72 object-cover rounded-full"
        />
      ) : (
        <div className="w-72 h-72 bg-gray-200 rounded-full flex items-center justify-center">
          <span>Upload Image</span>
        </div>
      )}

      {!open && (
        <label
          htmlFor="contained-button-file"
          className="bg-blue-500 px-4 py-2 mt-4 text-white rounded cursor-pointer mb-4"
        >
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            className="hidden"
            onChange={onChange}
          />
          Upload
        </label>
      )}
      <button onClick={handleClose}>close</button>
    </div>

   
    

  </div>
  <div className={uploadedImage !==null?`w-1/2`:`hidden`}>

    {uploadedImage !==null?(   <CropperDemo
        src={uploadedImage!}
        handleClose={handleClose}
        getCroppedFile={getCroppedFile}
      />):(<p>upload image</p>)}

  </div>

   </div>
      </div>
    </div>
  </div>
  );
};

export default Modal;
