import { useRef, useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import mockResults from "../utils/mockResult.json";
import { subCategories } from "../utils/data";

const ResultsSheet = ({ onDismiss, imageSrc }) => {
  const [query, setQuery] = useState("");
  const sheetRef = useRef();
  const flatResults = Object.values(mockResults).flat();

  const [{ y }, api] = useSpring(() => ({ y: 500 }));

  // Fix for mobile Safari height issue
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  const bind = useDrag(
    ({ last, movement: [, my], velocity: [, vy], target }) => {
      const isScrollable = target.closest(".scrollable");
      if (isScrollable && isScrollable.scrollTop > 0) return;

      if (my < 0) return;

      if (last) {
        if (my > 100 || vy > 0.5) {
          api.start({ y: 500 });
          onDismiss?.();
        } else {
          api.start({ y: 0 });
        }
      } else {
        api.start({ y: my });
      }
    },
    {
      from: () => [0, y.get()],
      bounds: { top: 0 },
      rubberband: true,
      pointer: { touch: true },
    }
  );

  return (
    <animated.div
      ref={sheetRef}
      {...bind()}
      style={{
        transform: y.to((val) => `translateY(${val}px)`),
        maxHeight: "calc(var(--vh, 1vh) * 100)",
        borderTopLeftRadius: y.to((val) => (val >= 300 ? "1rem" : "0rem")),
        borderTopRightRadius: y.to((val) => (val >= 300 ? "1rem" : "0rem")),
      }}
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-col p-4 bg-white shadow-lg"
    >
      <animated.div
        style={{
          opacity: y.to((val) => (val >= 300 ? 1 : 0)),
          pointerEvents: y.to((val) => (val >= 300 ? "auto" : "none")),
        }}
        className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-400"
      />

      {/* Header/Input Area */}
      <div className="relative w-full max-w-xl mx-auto mb-4 md:max-w-6xl shrink-0">
        <img
          src="/logo/google.svg"
          alt="Google Icon"
          className="absolute w-6 h-6 transform -translate-y-1/2 left-4 top-1/2"
        />

        {/* Uploaded Image Preview */}
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Preview"
            className="absolute object-cover w-8 h-8 transform -translate-y-1/2 border border-gray-300 rounded-lg left-12 top-1/2"
          />
        )}

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Add to search"
          className="w-full py-4 pl-24 text-base border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-300 pr-14"
        />
      </div>

      {/* Categories */}
      <div className="w-full pb-2 overflow-x-auto shrink-0 custom-scrollbar">
        <div className="flex flex-row whitespace-nowrap">
          {subCategories.map((item, index) => (
            <div
              key={index}
              className={`px-2 py-2 text-sm ${
                index === 0 ? "border-gray-600 font-semibold" : ""
              } cursor-pointer hover:bg-gray-100 transition`}
            >
              {item}
              <div
                className={`py-1 px-2 text-sm ${
                  index === 0 ? "border-gray-600 border-b-2 font-semibold" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Masonry Container */}
      <div className="flex-1 overflow-y-auto scrollable">
        <div className="gap-4 pb-20 columns-2 md:columns-3 lg:columns-4">
          {flatResults.map((item, index) => {
            const isPortrait = index % 2 === 0;
            const heightClass = isPortrait ? "h-60" : "h-32";

            return (
              <div key={index} className="mb-4 break-inside-avoid">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className={`object-cover w-full rounded ${heightClass}`}
                />
                <div className="flex items-center gap-1 mt-1">
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt={item.source}
                      className="object-contain w-4 h-4"
                    />
                  )}
                  <p className="text-sm font-medium line-clamp-1">
                    {item.source.split(" ").slice(0, 3).join(" ")}
                  </p>
                </div>
                <div>{item.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </animated.div>
  );
};

export default ResultsSheet;
