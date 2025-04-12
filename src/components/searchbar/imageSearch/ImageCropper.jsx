import { useState } from "react";
import Cropper from "react-easy-crop"; // Cropper library

const ImageCropper = ({
  imageSrc,
  setShowCropper,
  onCropComplete,
  uploadImage,
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  // Zoom change handler
  const handleZoomChange = (event) => {
    const newZoom = parseFloat(event.target.value);
    setZoom(newZoom);
  };

  // Rotate handler (rotate by 90 degrees)
  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  return (
    <div className="relative z-50 flex items-center justify-center w-full h-full overflow-hidden bg-white ">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={0} // No fixed aspect ratio
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        onRotateChange={setRotation}
        showGrid={false} // Disable the grid and center lines
        style={{
          containerStyle: { width: "100%", height: "100%" },
          cropAreaStyle: {
            borderRadius: "12px",
            border: "none", // No border around the crop area
          },
        }}
      />

      {/* Overlay button */}
      <div className="absolute z-30 bottom-6 right-6">
        <button
          onClick={uploadImage}
          className="px-5 py-2 text-sm font-medium text-white transition duration-200 bg-green-600 rounded-full shadow-md hover:bg-green-700 active:scale-95"
        >
          Search Image
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
