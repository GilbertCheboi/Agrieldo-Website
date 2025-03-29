import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageGallery = ({ images, currentImageIndex, setCurrentImageIndex, darkMode }) => {
  const handleNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const handlePrevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 relative col-span-1 md:col-span-2 lg:col-span-1 overflow-hidden">
      <div className="w-full h-full relative">
        <img
          src={images[currentImageIndex]?.image || "https://via.placeholder.com/128"}
          alt={`Animal Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover rounded-lg transition-opacity duration-300"
          onError={(e) => console.log(`Failed to load image ${currentImageIndex + 1}:`, e)}
        />
        <button
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
        >
          <ChevronRight size={20} />
        </button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;