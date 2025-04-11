import React from "react";
import { iconGrid } from "../utils/data";

const icons = [{ label: "Google Search" }, { label: "I'm Feeling Lucky" }];

const languages = [
  "हिन्दी",
  "বাংলা",
  "తెలుగు",
  "मराठी",
  "தமிழ்",
  "ગુજરાતી",
  "ಕನ್ನಡ",
  "മലയാളം",
  "ਪੰਜਾਬੀ",
];

export default function Fidgets() {
  return (
    <div className="w-full ">
      <div className="flex-col items-center hidden mt-6 space-y-4 md:block">
        <div className="flex justify-center space-x-4">
          {icons.map((item) => (
            <button
              key={item.label}
              className="px-4 py-2 text-sm text-gray-800 transition bg-gray-100 rounded hover:shadow-md hover:scale-105"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Language Line */}
        <div className="flex flex-wrap justify-center pt-4 text-xs text-gray-600 gap-x-2 gap-y-1">
          <span>Google offered in:</span>
          {languages.map((lang, index) => (
            <span
              key={index}
              className="text-indigo-800 cursor-pointer hover:underline"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div className="block w-full pb-3 mt-6 border-b md:hidden">
        <div className="grid w-full grid-cols-4 gap-2 text-xl text-center">
          {iconGrid.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center w-full py-4 rounded-3xl ${item.bgColor}`}
            >
              <img
                src={item.icon}
                width={20}
                height={20}
                className="w-6 h-6 text-blue-500"
                alt={`icon-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
