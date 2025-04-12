import { useState } from "react";
import { FaImage } from "react-icons/fa"; // React Icon for image upload

const GalleryPreview = ({ setGalleryImage, setImageSrc, setShowCropper }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image); // Show preview
        setGalleryImage(base64Image); // Pass to parent if needed
        setImageSrc(base64Image); // Set image for cropping
        setShowCropper(true); // Open cropper
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="absolute z-50 flex items-center justify-start right-36 top-4">
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Selected"
          className="object-cover border-2 border-white rounded-full w-14 h-14"
          onClick={triggerFileInput}
        />
      ) : (
        <div
          className="flex items-center justify-center bg-white rounded-full cursor-pointer w-14 h-14"
          onClick={triggerFileInput}
        >
          <FaImage className="text-2xl" />
        </div>
      )}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default GalleryPreview;
