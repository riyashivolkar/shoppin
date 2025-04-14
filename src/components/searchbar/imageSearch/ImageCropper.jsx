import { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import ResultsSheet from "../../ResultsSheet";

const ImageCropper = ({ imageSrc, onCropDone, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const handleCropComplete = (_, croppedAreaPixel, imgSrc) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  useEffect(() => {
    if (imageSrc) {
      setShowResults(true);
    }
  }, [imageSrc]);

  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-white">
      {imageSrc && (
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
          cropShape="rect"
        />
      )}
      <ResultsSheet
        open={showResults}
        imageSrc={imageSrc}
        onDismiss={() => setShowResults(false)}
      />
    </div>
  );
};

export default ImageCropper;
