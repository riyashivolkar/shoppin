// pages/Home.jsx
import React from "react";
import SearchBar from "../components/searchbar/SearchBar";
import Fidgets from "../components/Fidgets";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 py-6">
      <img
        src="https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        alt="Google"
        className="w-40 mx-auto my-4 sm:w-44 md:w-52 lg:w-60"
      />
      <SearchBar />
      <Fidgets />
      {/* <Feed /> */}
    </div>
  );
}
