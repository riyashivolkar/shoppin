import { useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import mockResults from "../utils/mockResult.json";

const ResultsSheet = ({ onDismiss }) => {
  const sheetRef = useRef();
  const flatResults = Object.values(mockResults).flat();

  const [{ y }, api] = useSpring(() => ({ y: 500 }));

  const bind = useDrag(
    ({ last, movement: [, my], velocity: [, vy], cancel, event, target }) => {
      // Prevent dragging if the user is scrolling a scrollable area
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
      pointer: { touch: true }, // Important for mobile touch handling
    }
  );

  return (
    <animated.div
      ref={sheetRef}
      {...bind()}
      style={{
        transform: y.to((val) => `translateY(${val}px)`),
        // Removed touchAction: "none" to allow scrolling
      }}
      className="fixed bottom-0 left-0 right-0 z-50 max-h-[100vh] bg-white shadow-lg rounded-t-2xl p-4 overflow-hidden"
    >
      {/* Drag handle */}
      <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-400" />

      <h2 className="mb-2 text-xl font-semibold">Search Results</h2>

      {/* 👇 Scrollable area */}
      <div className="grid grid-cols-2 gap-4 pb-20 overflow-y-auto scrollable max-h-[100vh]">
        {flatResults.map((item, index) => (
          <div key={index} className="rounded shadow">
            <img
              src={item.image_url}
              alt={item.title}
              className="object-cover w-full h-32 rounded"
            />
            <p className="mt-1 text-sm">{item.title}</p>
          </div>
        ))}
      </div>
    </animated.div>
  );
};

export default ResultsSheet;
