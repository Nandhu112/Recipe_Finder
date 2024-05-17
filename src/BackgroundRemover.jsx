import React, { useState } from 'react';
import axios from 'axios';
import { FaImage } from 'react-icons/fa';
import { FaSyncAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUpload = () => {
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(true);
  const [file1, setFile1] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRemove, setIsRemove] = useState(true);
  const apiKey = "XVtGjrXjmmtXSHUgCTGSdw3T";
  const [error, setError] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile1(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      setIsImage(false);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image_file', file1);

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': apiKey,
        },
        responseType: 'arraybuffer',
      });
      setIsRemove(false);
      const blob = new Blob([response.data], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setImage(url);
    } catch (error) {
      toast.error('Unsupported image format');
      console.error('Error removing background:', error);
    }

    setLoading(false);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = image;
    a.download = 'removed_background.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reload = () => {
    setImage(null);
    setIsImage(true);
    setIsRemove(true)
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-[5rem]">
      <div className="max-w-xs relative p-5">
        {image ? (
          <img src={image} alt="Uploaded" className="rounded-lg shadow-md p-4 bg-slate-100" />
        ) : (
          <div className="border border-gray-300 rounded-lg text-center bg-white w-64 h-64 items-center justify-center pt-[rem]">
            <div className='pl-[6.5rem] pt-[5rem]'>
            <FaImage className="text-gray-500 mt-2 " size={44} />
            </div>
            
            <span >Add your Image</span>
          </div>
        )}
      </div>

      {isImage && (
        <label htmlFor="file-upload" className="relative cursor-pointer">
          <span className="py-2 px-4 bg-[#37247d] text-white rounded-lg shadow-md inline-block">
            Select an Image
          </span>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}

      {image && (
        <div>
          {loading ? (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <>
          {isRemove?  <div className="flex">
              <button onClick={handleRemoveBackground} className="bg-red-500 text-white px-4 py-2 rounded">
                Remove Background
              </button>
              <button onClick={reload} className="flex items-center ml-2 justify-center rounded-full bg-gray-200 hover:bg-gray-300 w-10 h-10">
                <FaSyncAlt className="h-6 w-6 text-gray-600" />
              </button>
            </div>:  <div className='flex'>
            <button
              onClick={handleDownload}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Download
            </button>
            <button onClick={reload} className="flex items-center ml-2 justify-center rounded-full bg-gray-200 hover:bg-gray-300 w-10 h-10">
              <FaSyncAlt className="h-6 w-6 text-gray-600" />
            </button>
            </div>}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
