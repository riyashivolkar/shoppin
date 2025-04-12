import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Cropper from "react-easy-crop";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { FaGraduationCap, FaSearch } from "react-icons/fa";
import { HiAcademicCap, HiOutlineChevronLeft } from "react-icons/hi";
import GalleryPreview from "./GalleryPreview";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { ImageSearchButtonsData } from "../../utils/data";
import ImageSearchButtons from "../ui/ImageSearchButtons";

const ImageSearchLens = ({ show, onClose }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setShowCropper(true);
  }, []);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
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

  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Close Button (small and modern) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-between w-full max-w-[400px] px-4">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="flex items-center justify-center w-12 h-12 text-white transition rounded-full shadow hover:bg-red-500"
        >
          <HiOutlineChevronLeft className="text-2xl" />
        </button>

        {/* Title */}
        <h1 className="text-lg font-semibold text-white">Google Lens</h1>

        {/* 3 Dots Menu */}
        <div className="flex items-center justify-center w-12 h-12 text-white rounded-full cursor-pointer hover:bg-gray-700">
          <span className="text-3xl">⋯</span>
        </div>
      </div>

      {!imageSrc && (
        <div className="relative flex flex-col w-full h-full bg-white">
          <div className="relative w-full h-[92%] rounded-b-3xl overflow-hidden bg-white">
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute w-14 h-14 border-t-[3px] border-l-[3px] border-white/50 top-[20%] left-[10%] rounded-tl-[36px] " />

              <div className="absolute w-14 h-14 border-t-[3px] border-r-[3px] border-white/50 top-[20%] right-[10%] rounded-tr-[36px] " />

              <div className="absolute w-14 h-14 border-b-[3px] border-l-[3px] border-white/50 bottom-[40%] left-[10%] rounded-bl-[36px] " />

              <div className="absolute w-14 h-14 border-b-[3px] border-r-[3px] border-white/50 bottom-[40%] right-[10%] rounded-br-[36px]" />
            </div>

            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: { exact: "environment" } }}
              className="object-cover w-full h-full bg-black "
            />
          </div>
          <div className="w-full h-[8%] pb-4 px-4 bg-white">
            <div className="absolute z-10 flex items-center space-x-6 -translate-x-1/2 left-1/2 bottom-24">
              <div className="absolute top-5 bg-red-50"></div>
              <GalleryPreview />
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

      {/* Cropping View */}
      {imageSrc && showCropper && (
        <div className="relative w-full h-full">
          <Cropper
            image={imageSrc}
            crop={{ x: 0, y: 0 }}
            zoom={1}
            aspect={4 / 3}
            onCropChange={() => {}}
            onCropComplete={onCropComplete}
            onZoomChange={() => {}}
          />
          <button
            onClick={uploadImage}
            className="absolute px-6 py-3 text-white transition bg-green-600 rounded-full shadow-lg bottom-6 right-6 hover:bg-green-700"
          >
            Search
          </button>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute left-0 right-0 text-sm text-center text-gray-300 bottom-4">
          Processing image...
        </div>
      )}

      {/* Result Box */}
      {results && !loading && (
        <div className="absolute px-6 py-4 text-center text-white -translate-x-1/2 shadow-lg bottom-20 left-1/2 bg-black/70 rounded-xl backdrop-blur">
          <h2 className="mb-1 text-lg font-semibold">Search Results:</h2>
          <p className="text-sm">Label: {results.label}</p>
          <p className="text-sm">Confidence: {results.confidence}</p>
        </div>
      )}
    </motion.div>
  );
};

export default ImageSearchLens;
