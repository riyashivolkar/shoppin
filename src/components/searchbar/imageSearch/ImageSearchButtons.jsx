import React from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";

const ImageSearchButtons = ({ label, icon, type = "icon", active = false }) => {
  const baseStyles =
    "flex items-center gap-2 px-4 py-2 rounded-full transition border text-xs font-medium";
  const activeStyles = active
    ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
    : "bg-white text-gray-800 border-gray-300 hover:shadow-sm";

  return (
    <div className={`${baseStyles} ${activeStyles}`}>
      {type === "icon" ? (
        React.createElement(icon, { className: "w-5 h-5 text-blue-600" })
      ) : (
        <img
          src={icon}
          alt={label}
          width={20}
          height={20}
          className="w-5 h-5 text-blue-500"
        />
      )}
      <span>{label}</span>
    </div>
  );
};

export default ImageSearchButtons;
