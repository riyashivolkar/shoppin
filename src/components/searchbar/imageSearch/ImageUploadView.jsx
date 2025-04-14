import React, { useRef } from "react";
import { FaTimes } from "react-icons/fa";

export default function ImageUploadView({
  setShowCameraView,
  setGalleryImage,
  setImageSrc,
  setShowCropper,
}) {
  const fileInputRef = useRef();

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setGalleryImage(base64Image);
        setImageSrc(base64Image);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-col items-center py-6 px-5 justify-center hidden w-[50%] text-sm border-2 border-gray-100 rounded-2xl font-bold lg:flex">
      <div className="relative flex items-center justify-between w-full mb-4">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-sm font-semibold text-center text-gray-700">
            Search any image with Google Lens
          </h2>
        </div>

        <FaTimes
          className="z-10 ml-auto text-gray-500 cursor-pointer hover:text-black"
          onClick={() => setShowCameraView(false)}
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-lg p-6 bg-gray-100 rounded-lg shadow-sm">
        <div className="flex flex-col items-center w-full space-y-4">
          <div className="flex items-center justify-center w-full h-40 rounded-lg">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex flex-row text-gray-400">
                <img
                  src="/icons/dragImg.svg"
                  alt="Drag and Drop Icon"
                  width={20}
                  height={20}
                />
                <span className="ml-2 text-sm font-semibold text-gray-700">
                  Drag an image here or
                </span>

                <span
                  onClick={handleFileClick}
                  className="ml-1 text-blue-500 cursor-pointer hover:underline"
                >
                  upload a file
                </span>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>

          {/* OR divider and input */}
          <div className="flex flex-col items-center w-full mt-6">
            <div className="flex items-center w-full mb-2 text-gray-400">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="px-2 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            <div className="flex flex-row w-full gap-2 font-light">
              <input
                type="text"
                placeholder="Paste image link"
                className="px-3 py-2 text-sm border border-gray-300 rounded-2xl grow"
              />
              <button className="px-4 py-2 text-white bg-blue-500 rounded-2xl shrink-0 hover:bg-blue-600">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
