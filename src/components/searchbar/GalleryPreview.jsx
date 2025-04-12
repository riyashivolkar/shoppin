import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";

const GalleryPreview = () => {
  const [latestPhoto, setLatestPhoto] = useState(null);
  const [isWeb, setIsWeb] = useState(false); // Detect if app is running on web

  // Fallback for gallery access on web
  const fetchLatestPhoto = async () => {
    try {
      if (isWeb) {
        // For web (using file input to pick an image)
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*"; // Accept images only
        input.onchange = async (event) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setLatestPhoto(reader.result); // Set the image as base64 URL
            };
            reader.readAsDataURL(file);
          }
        };
        input.click(); // Trigger file picker
      }
      // If it's a mobile app (iOS/Android), use Capacitor's Camera API
      else {
        // The Camera plugin isn't available on the web, so we skip it.
        console.log("Camera access is not supported on web.");
      }
    } catch (error) {
      console.error("Error accessing gallery:", error);
    }
  };

  // Detect if platform is web
  useEffect(() => {
    if (Capacitor.getPlatform() === "web") {
      setIsWeb(true);
    }
    fetchLatestPhoto(); // Automatically fetch the latest photo
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
        <div className="bg-gray-700 rounded-full w-14 h-14 animate-pulse" /> // Loading state
      )}
    </div>
  );
};

export default GalleryPreview;
