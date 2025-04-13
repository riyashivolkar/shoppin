import { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import ResultsSheet from "../../ResultsSheet"; // Import ResultsSheet

const ImageCropper = ({ imageSrc, onCropDone, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showResults, setShowResults] = useState(false); // State to control bottom sheet visibility

  const handleCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // 🚀 Auto redirect once image is uploaded and show results in Bottom Sheet
  useEffect(() => {
    if (imageSrc) {
      setShowResults(true); // Open the bottom sheet with animation
    }
  }, [imageSrc]);

  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-white">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
        cropShape="rect"
      />

      {/* ResultsSheet will open after image upload */}
      <ResultsSheet
        open={showResults}
        onDismiss={() => setShowResults(false)} // Dismiss bottom sheet
      />
    </div>
  );
};

export default ImageCropper;
