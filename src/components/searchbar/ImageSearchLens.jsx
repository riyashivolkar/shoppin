import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Cropper from "react-easy-crop";
import { motion } from "framer-motion";

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
      // Simulate sending to backend or API
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
      className="fixed inset-0 z-50 px-4 py-12 overflow-y-auto bg-white"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <button
        onClick={onClose}
        className="absolute text-2xl font-bold text-gray-600 top-4 right-4 hover:text-black"
      >
        ×
      </button>

      <div className="flex flex-col items-center p-4">
        {!imageSrc && (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: { exact: "environment" }, // Use back camera
              }}
              className="w-full max-w-md shadow-lg rounded-xl"
            />
            <button
              onClick={capture}
              className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-full shadow hover:bg-blue-700"
            >
              Capture Image
            </button>
          </>
        )}

        {imageSrc && showCropper && (
          <div className="relative w-full max-w-md mt-4 h-96">
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
              className="absolute px-4 py-2 text-white bg-green-600 rounded-full bottom-4 right-4 hover:bg-green-700"
            >
              Search
            </button>
          </div>
        )}

        {loading && (
          <p className="mt-4 text-sm text-gray-500">Processing image...</p>
        )}

        {results && !loading && (
          <div className="mt-6 text-center">
            <h2 className="mb-2 text-xl font-bold">Search Results:</h2>
            <p>Label: {results.label}</p>
            <p>Confidence: {results.confidence}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ImageSearchLens;
