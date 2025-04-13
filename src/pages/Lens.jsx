import React, { useState } from "react";
import ImageCropper from "../components/searchbar/imageSearch/ImageCropper";
import ResultsSheet from "../components/ResultsSheet";

const Lens = () => {
  const [image, setImage] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set uploaded image as base64 data
        setShowResults(true); // Show results bottom sheet automatically
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="mb-4 text-2xl font-semibold">Upload an Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      {image && <ImageCropper imageSrc={image} />}

      {/* Show Results Bottom Sheet when image is uploaded */}
      <ResultsSheet
        open={showResults}
        onDismiss={() => setShowResults(false)}
      />
    </div>
  );
};

export default Lens;
