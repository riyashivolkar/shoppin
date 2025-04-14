import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { HiOutlineChevronLeft } from "react-icons/hi";
import GalleryPreview from "./GalleryPreview";
import { ImageSearchButtonsData } from "../../../utils/data";
import CameraFrame from "../../ui/Snippets";
import ImageCropper from "./ImageCropper";
import ImageSearchButtons from "./ImageSearchButtons";

const ImageSearchLens = ({ show, onClose }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [galleryImage, setGalleryImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setShowCropper(true);
  }, []);

  const uploadImage = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setResults({ label: "Example Object", confidence: "95%" });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (galleryImage || imageSrc) {
      setGalleryImage(null);
      setImageSrc(null);
      setShowCropper(false);
      setResults(null);
    } else {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-white"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Close Button (small and modern) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-between w-full max-w-[400px] px-4">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-12 h-12 text-white transition rounded-full"
        >
          <HiOutlineChevronLeft className="text-2xl" />
        </button>

        <h1 className="text-lg font-semibold text-white">Google Lens</h1>

        <div className="flex items-center justify-center w-12 h-12 text-white rounded-full cursor-pointer hover:bg-gray-700">
          <span className="text-3xl">⋯</span>
        </div>
      </div>

      {!imageSrc && !galleryImage && (
        <div className="relative flex flex-col w-full h-full bg-white">
          <div className="relative w-full h-[92%] rounded-b-3xl overflow-hidden bg-white">
            <CameraFrame />

            {galleryImage ? (
              <img
                src={galleryImage}
                alt="Uploaded"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: { exact: "environment" } }}
                className="object-cover w-full h-full bg-black"
              />
            )}
          </div>
          <div className="w-full h-[8%] pb-4 mb-4 px-4 bg-white">
            <div className="absolute z-10 flex items-center space-x-6 -translate-x-1/2 left-1/2 bottom-24">
              <div className="absolute top-5 "></div>
              <GalleryPreview
                setGalleryImage={setGalleryImage}
                setImageSrc={setImageSrc}
                setShowCropper={setShowCropper}
              />

              <div className="flex items-center justify-center w-24 h-24 border-4 border-white rounded-full">
                <button
                  onClick={capture}
                  className="flex items-center justify-center w-20 h-20 text-2xl transition bg-white rounded-full shadow-2xl hover:scale-105"
                >
                  <FaSearch className="text-xl text-gray-700" />
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-4 text-xs font-medium text-gray-800 gap-x-3">
              {ImageSearchButtonsData.map((feature, index) => (
                <ImageSearchButtons key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      )}

      {imageSrc && showCropper && (
        <ImageCropper
          imageSrc={imageSrc}
          onCropDone={(croppedAreaPixels) => {
            console.log("Crop Area:", croppedAreaPixels);
            uploadImage(croppedAreaPixels);
            setShowCropper(false);
          }}
          onClose={() => setShowCropper(false)}
        />
      )}
    </motion.div>
  );
};

export default ImageSearchLens;
