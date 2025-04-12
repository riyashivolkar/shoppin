import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ imageSrc, onCropDone, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDone = () => {
    if (onCropDone && croppedAreaPixels) {
      onCropDone(croppedAreaPixels);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-white">
      {" "}
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
        style={{
          containerStyle: { width: "100%", height: "100%" },
          cropAreaStyle: { borderRadius: "12px" },
        }}
      />
      <div className="absolute flex gap-4 bottom-6 right-6">
        <button
          onClick={handleDone}
          className="px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 active:scale-95"
        >
          🔍 Search Image
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
