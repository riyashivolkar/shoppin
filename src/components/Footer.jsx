import React from "react";

const Footer = () => {
  return (
    <footer className="text-sm text-gray-900 bg-gray-100">
      <div className="px-6 py-3 border-b border-gray-300">
        <p>India</p>
      </div>
      <div className="flex flex-col items-center justify-between px-6 py-4 space-y-4 md:flex-row md:space-y-0">
        {/* Left Links */}
        <div className="flex space-x-6">
          <a href="#" className="hover:underline">
            Advertising
          </a>
          <a href="#" className="hover:underline">
            Business
          </a>
          <a href="#" className="hover:underline">
            How Search works
          </a>
        </div>

        {/* Right Links */}
        <div className="flex space-x-6">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Settings
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
