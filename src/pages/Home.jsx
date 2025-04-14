import React, { useState } from "react";
import SearchBar from "../components/searchbar/SearchBar";
import Fidgets from "../components/Fidgets";
import Feed from "../components/Feed";
import ImageUploadView from "../components/searchbar/imageSearch/ImageUploadView";
import ImageCropper from "../components/searchbar/imageSearch/ImageCropper"; // Make sure this path is correct

export default function Home() {
  const [showCameraView, setShowCameraView] = useState(false);
  const [galleryImage, setGalleryImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleCloseCropper = () => {
    setShowCropper(false);
    setImageSrc(null);
    setShowCameraView(false);
  };

  return (
    <div className="flex flex-col items-center px-4 py-6">
      <img
        src="https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        alt="Google"
        className="w-40 mx-auto my-4 sm:w-44 md:w-52 lg:w-60"
      />

      {/* Case 1: Show main search bar view */}
      {!showCameraView && !showCropper && (
        <>
          <SearchBar setShowCameraView={setShowCameraView} />
          <Fidgets />
          <Feed />
        </>
      )}

      {/* Case 2: Show image upload view */}
      {showCameraView && !showCropper && (
        <ImageUploadView
          setShowCameraView={setShowCameraView}
          setGalleryImage={setGalleryImage}
          setImageSrc={setImageSrc}
          setShowCropper={setShowCropper}
        />
      )}

      {/* Case 3: Show cropper */}
      {showCropper && imageSrc && (
        <ImageCropper
          imageSrc={imageSrc}
          onCropDone={(croppedImg) => {
            // You can handle final cropped image here
            console.log("Cropped Image Result:", croppedImg);
            setShowCropper(false);
          }}
          onClose={handleCloseCropper}
        />
      )}
    </div>
  );
}
