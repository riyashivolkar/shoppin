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
        setSelectedImage(base64Image);
        setGalleryImage(base64Image);
        setImageSrc(base64Image);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="absolute z-50 flex items-center justify-start right-36 top-4">
      <label htmlFor="fileInput" className="cursor-pointer">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="object-cover border-2 border-white rounded-full w-14 h-14"
          />
        ) : (
          <div className="flex items-center justify-center bg-white rounded-full w-14 h-14">
            <FaImage className="text-2xl" />
          </div>
        )}
      </label>
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
