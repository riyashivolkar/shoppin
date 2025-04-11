import React, { useState } from "react";
import {
  FaSearch,
  FaMicrophone,
  FaCamera,
  FaAngleLeft,
  FaGlobe,
  FaMusic,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { trendingItems } from "../../utils/data";
import { HiTrendingUp } from "react-icons/hi";

import VoiceOverlay from "./VoiceOverlay";
import ImageSearchLens from "./ImageSearchLens";

export default function SearchBar() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [showImageLens, setShowImageLens] = useState(false);

  const [query, setQuery] = useState("");

  const inputBaseStyles =
    "w-full text-sm border border-gray-300 rounded-full shadow-md focus:outline-none";

  const handleCameraClick = (e) => {
    e.stopPropagation();
    setShowOverlay(false);
    setShowVoiceOverlay(false);
    setShowImageLens(true);
  };
  //ss
  return (
    <>
      {/* Search Input Default */}
      <div
        className={`relative w-full max-w-xl mx-auto ${
          showOverlay || showVoiceOverlay ? "hidden" : "block sm:block"
        }`}
        onClick={() => {
          if (window.innerWidth < 640) setShowOverlay(true);
        }}
      >
        <input
          type="text"
          value={query}
          placeholder="Search"
          className={`${inputBaseStyles} px-12 py-5 text-xl sm:text-sm sm:py-3`}
        />
        <FaSearch className="absolute text-gray-500 transform -translate-y-1/2 left-4 top-1/2 text-md" />
        <div className="absolute flex space-x-4 text-gray-600 transform -translate-y-1/2 right-4 top-1/2">
          <FaMicrophone
            className="cursor-pointer hover:text-black"
            onClick={(e) => {
              e.stopPropagation();
              setShowVoiceOverlay(true);
            }}
          />
          <FaCamera
            className="cursor-pointer hover:text-black"
            onClick={handleCameraClick}
          />
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 z-50 px-4 py-4 bg-white sm:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="relative w-full max-w-xl mx-auto">
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or type URL"
                className={`${inputBaseStyles} px-12 py-3 text-sm`}
              />
              <FaAngleLeft
                className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer left-4 top-1/2 text-md"
                onClick={() => setShowOverlay(false)}
              />
              <div className="absolute flex space-x-4 text-gray-600 transform -translate-y-1/2 right-4 top-1/2">
                <FaMicrophone
                  className="cursor-pointer hover:text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVoiceOverlay(true);
                    setShowOverlay(false);
                  }}
                />
                <FaCamera
                  className="cursor-pointer hover:text-black"
                  onClick={handleCameraClick}
                />
              </div>
            </div>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <p className="pl-2 mb-4 text-sm text-gray-500">What’s Trending</p>
              <ul className="space-y-3">
                {trendingItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 p-2 transition duration-200 rounded-lg hover:bg-gray-100"
                  >
                    <div className="p-1 bg-gray-100 rounded-full ">
                      <HiTrendingUp className="text-xl text-gray-600 shrink-0" />
                    </div>
                    <span className="text-sm text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <VoiceOverlay
        show={showVoiceOverlay}
        onClose={() => setShowVoiceOverlay(false)}
      />
      <ImageSearchLens
        show={showImageLens}
        onClose={() => setShowImageLens(false)}
      />
    </>
  );
}
