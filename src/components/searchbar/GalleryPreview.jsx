import { Camera, CameraSource } from "@capacitor/camera";
import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";

const GalleryPreview = () => {
  const [latestPhoto, setLatestPhoto] = useState(null);
  const [isWeb, setIsWeb] = useState(false); // Flag to detect web platform

  // Request permissions and pick the latest photo (iOS and Android)
  const fetchLatestPhoto = async () => {
    try {
      // Check if running in a web environment (e.g., iPhone Safari)
      if (isWeb) {
        // Fallback for web browsers (Safari/iOS)
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async (event) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setLatestPhoto(reader.result); // Display selected image
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
      } else {
        // For iOS/Android native apps, use Capacitor's Camera API
        await Camera.requestPermissions({ permissions: ["photos"] }); // Request gallery access
        const photo = await Camera.getPhoto({
          source: CameraSource.Photos, // Access gallery
          resultType: "dataUrl", // Return base64 image
          quality: 80,
        });
        setLatestPhoto(photo.dataUrl); // Display the latest photo
      }
    } catch (error) {
      console.error("Error accessing gallery:", error);
    }
  };

  // Detect if the platform is web
  useEffect(() => {
    if (Capacitor.getPlatform() === "web") {
      setIsWeb(true); // Mark as web if it's running in a browser
    }
    fetchLatestPhoto(); // Fetch the latest photo when the component mounts
  }, [isWeb]);

  return (
    <div className="absolute z-50 flex items-center justify-start right-36 top-4">
      {latestPhoto ? (
        <img
          src={latestPhoto}
          alt="Latest"
          className="object-cover border-2 border-white rounded-full w-14 h-14" // Circular preview
        />
      ) : (
        <div className="bg-gray-700 rounded-full w-14 h-14 animate-pulse" /> // Loading spinner for missing photo
      )}
    </div>
  );
};

export default GalleryPreview;
