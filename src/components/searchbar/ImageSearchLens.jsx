import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Cropper from "react-easy-crop";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

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
      <button
        onClick={onClose}
        className="absolute z-20 flex items-center justify-center text-white transition bg-white rounded-full shadow w-14 h-14 top-6 right-6 hover:bg-red-500"
      >
        <FiX className="text-2xl" />
      </button>

      {!imageSrc && (
        <div className="relative flex flex-col w-full h-full bg-white">
          {/* Webcam view with rounded bottom */}
          <div className="relative w-full h-[85%] rounded-b-3xl overflow-hidden bg-white">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: { exact: "environment" } }}
              className="object-cover w-full h-full "
            />
          </div>

          {/* White background below webcam */}
          <div className="w-full h-[15%] bg-white" />

          {/* Floating camera button */}
          <button
            onClick={capture}
            className="absolute z-20 flex items-center justify-center w-20 h-20 text-2xl transition -translate-x-1/2 bg-white rounded-full shadow-2xl left-1/2 bottom-6 hover:scale-105"
          >
            📷
          </button>
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
