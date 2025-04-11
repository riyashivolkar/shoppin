// components/VoiceOverlay.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { BiGlobe } from "react-icons/bi";
import { BsMusicNote } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";

const colors = ["bg-blue-500", "bg-red-500", "bg-orange-400", "bg-green-500"];

export default function VoiceOverlay({ show, onClose }) {
  const [message, setMessage] = useState("Speak now");

  useEffect(() => {
    if (show) {
      setMessage("Speak now");
      const timeout = setTimeout(() => {
        setMessage("Listening...");
      }, 2000); // 2-second delay

      return () => clearTimeout(timeout);
    }
  }, [show]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 px-4 py-12 text-center bg-white "
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="relative max-w-xl mx-auto md:max-w-full">
            <div className="flex items-center justify-between w-full px-4">
              <HiOutlineChevronLeft
                className="p-2 text-sm text-gray-500 bg-gray-100 rounded-full cursor-pointer w-9 h-9"
                onClick={onClose}
              />
              <BiGlobe className="p-2 text-sm text-gray-500 bg-gray-100 rounded-full cursor-pointer w-9 h-9" />
            </div>
            <div className="flex flex-col items-center justify-center mt-16 md:pt-24 lg:pt-28 md:flex-row gap-x-48 gap-y-48">
              <p className="text-xl text-gray-500 md:text-3xl">{message}</p>
              <div className="items-center justify-center hidden md:flex">
                <FaMicrophone className="w-32 h-32 p-4 text-red-500 bg-white rounded-full shadow-lg animate-pulse" />
              </div>
              <div className="flex items-center justify-center h-10 space-x-2 md:hidden">
                {colors.map((color, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 h-3 rounded-full ${color}`}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <div className="flex flex-row items-center px-4 py-2 border border-gray-300 md:hidden rounded-3xl">
                <BsMusicNote className="p-2 text-sm text-gray-500 cursor-pointer w-9 h-9" />
                <span className="text-sm text-gray-800">Search a song</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
