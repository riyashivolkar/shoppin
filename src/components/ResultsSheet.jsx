import { useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import mockResults from "../utils/mockResult.json";

const ResultsSheet = ({ open, onDismiss }) => {
  const sheetRef = useRef();
  const flatResults = Object.values(mockResults).flat();

  // Start the sheet off-screen or at a certain position at the bottom
  const [styles, api] = useSpring(() => ({ y: 500 })); // Start at the bottom initially

  // Drag gesture to move the sheet up or down
  const bind = useDrag(
    ({ last, movement: [, my], velocity: [, vy], cancel }) => {
      if (my < 0) return; // Prevent dragging upwards past 0

      if (last) {
        // If dragged down far enough or fast enough, dismiss
        if (my > 100 || vy > 0.5) {
          onDismiss();
        } else {
          api.start({ y: my }); // Otherwise stay at current position
        }
      } else {
        // Track the drag movement
        api.start({ y: my + 500 }); // Start from the bottom
      }
    },
    {
      from: () => [0, styles.y.get()], // Use styles.y.get() for current position
      bounds: { top: 0 }, // Restrict to drag upwards only
      rubberband: true, // Allow for a little bounce-back
    }
  );

  // Animate in when opened
  if (open) {
    api.start({ y: 0 }); // Bring sheet up when open
  } else {
    api.start({ y: 500 }); // Hide when closed
  }

  return (
    <animated.div
      ref={sheetRef}
      {...bind()}
      style={{
        transform: styles.y.to((y) => `translateY(${y}px)`), // Correct usage of to()
      }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-lg rounded-t-2xl touch-none"
    >
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
