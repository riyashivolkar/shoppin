import { Camera, CameraSource } from "@capacitor/camera";
import { useEffect, useState } from "react";

const GalleryPreview = () => {
  const [latestPhoto, setLatestPhoto] = useState(null);

  const pickLatestFromGallery = async () => {
    try {
      const photo = await Camera.getPhoto({
        source: CameraSource.Photos, // Get from gallery/photos
        resultType: "dataUrl", // We need it as base64
        quality: 80, // Set photo quality (optional)
      });
      setLatestPhoto(photo.dataUrl); // Set the image data
    } catch (error) {
      console.error("Error accessing gallery:", error);
    }
  };

  // Automatically fetch the latest photo when the component mounts
  useEffect(() => {
    pickLatestFromGallery();
  }, []);

  return (
    <div className="absolute z-50 flex items-center justify-start right-36 top-4">
      {latestPhoto ? (
        <img
          src={latestPhoto}
          alt="Latest"
          className="object-cover border-2 border-white rounded-full w-14 h-14" // Circular preview
        />
      ) : (
        <div className="w-20 h-20 bg-gray-700 rounded-full " /> // Loader for missing photo
      )}
    </div>
  );
};

export default GalleryPreview;
