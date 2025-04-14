import React, { useEffect, useState } from "react";
import { HiTrendingUp } from "react-icons/hi";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import NewsSection from "./NewsSection";

export default function Feed() {
  const [news, setNews] = useState([]);
  const apiKey = process.env.REACT_APP_MEDIASTACK_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=business&countries=in,au&languages=en&keywords=-fashion,-shopping&sort=published_desc&offset=0&limit=4`
        );
        const data = await response.json();
        setNews(data.data || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  // Truncate long titles for better display
  const truncateTitle = (title, maxLength = 85) =>
    title.length > maxLength ? title.slice(0, maxLength) + "..." : title;

  return (
    <div className="w-full ">
      <div className="hidden w-full px-4 py-3 mt-6 md:block">
        <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800">
          Trending News
        </h3>

        <div className="space-y-4">
          {news.length > 0 ? (
            news.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 transition duration-200 border-b hover:bg-gray-100"
              >
                <HiTrendingUp className="mt-1 text-xl text-gray-600 shrink-0" />
                <span className="text-sm leading-snug text-gray-800">
                  {truncateTitle(item.title)}
                </span>
              </a>
            ))
          ) : (
            <p className="text-sm text-gray-500">Fetching latest news...</p>
          )}
        </div>
      </div>
      <div className="block w-full px-4 py-3 mt-6 overflow-hidden md:hidden">
        <div className="flex flex-row gap-4 overflow-x-auto custom-scrollbar">
          {/* Air Quality (80%) */}
          <div className="flex-shrink-0 w-[80%] border border-gray-200  p-4 rounded-xl shadow-sm">
            <div className="text-sm font-semibold text-gray-700">
              Air Quality
            </div>
            <div className="flex justify-between mt-1 text-sm text-gray-600">
              <div>Poor</div>
              <div className="flex flex-row items-center gap-1">
                <span>258 AQI</span>
                <img
                  src="/icons/air.svg"
                  alt="Air Quality Icon"
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>

          {/* Settings (Overflow item) */}
          <div className="flex-shrink-0  border border-gray-200  w-[250px] bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-1 text-sm ">
              <Cog6ToothIcon className="w-4 h-4" />
              <span className="text-sm font-semibold text-blue-500">
                Settings
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Customise your space
            </div>
          </div>
        </div>
        <NewsSection />
      </div>
    </div>
  );
}
