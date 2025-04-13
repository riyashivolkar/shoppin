import { useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import mockResults from "../utils/mockResult.json";

const ResultsSheet = ({ onDismiss }) => {
  const sheetRef = useRef();
  const flatResults = Object.values(mockResults).flat();

  // Start hidden at the bottom (y = 500)
  const [{ y }, api] = useSpring(() => ({ y: 500 }));

  // Drag behavior
  const bind = useDrag(
    ({ last, movement: [, my], velocity: [, vy] }) => {
      if (my < 0) return; // Don’t allow dragging upward past 0

      if (last) {
        if (my > 100 || vy > 0.5) {
          api.start({ y: 500 }); // Animate back to bottom
          onDismiss?.(); // Optional dismiss callback
        } else {
          api.start({ y: 0 }); // Snap back to open
        }
      } else {
        api.start({ y: my }); // Follow the finger
      }
    },
    {
      from: () => [0, y.get()], // Current y value
      bounds: { top: 0 }, // Can't drag past top
      rubberband: true,
    }
  );

  return (
    <animated.div
      ref={sheetRef}
      {...bind()}
      style={{
        transform: y.to((val) => `translateY(${val}px)`),
        touchAction: "none",
      }}
      className="fixed bottom-0 left-0 right-0 z-50 max-h-[100vh] overflow-y-auto bg-white shadow-lg rounded-t-2xl p-4"
    >
      {/* Drag handle */}
      <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-400" />

      <h2 className="mb-2 text-xl font-semibold">Search Results</h2>
      <div className="grid grid-cols-2 gap-4 pb-20">
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
