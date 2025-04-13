import { useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import mockResults from "../utils/mockResult.json";

const ResultsSheet = ({ open, onDismiss }) => {
  const sheetRef = useRef();
  const flatResults = Object.values(mockResults).flat();

  const [{ y }, setY] = useSpring(() => ({
    y: 300,
  }));

  const bind = useDrag(
    ({ last, movement: [, my], velocity: [, vy], cancel }) => {
      if (my < 0) return;

      if (last) {
        if (my > 100 || vy > 0.5) {
          onDismiss();
        } else {
          setY({ y: 0 });
        }
      } else {
        setY({ y: my });
      }
    },
    {
      from: () => [0, y.getValue()],
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  // Animate in when opened
  useEffect(() => {
    if (open) {
      setY({ y: 0 });
    } else {
      setY({ y: 300 }); // Hide when closed
    }
  }, [open, setY]);

  return (
    <animated.div
      ref={sheetRef}
      {...bind()}
      style={{ transform: y.interpolate((y) => `translateY(${y}px)`) }}
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
