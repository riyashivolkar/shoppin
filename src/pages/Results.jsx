// import React from "react";
// import mockResult from "../utils/mockResult.json";

// const Results = () => {
//   // Flatten all arrays from the object
//   const flatResults = Object.values(mockResult).flat();

//   return (
//     <div className="p-6">
//       <h2 className="mb-4 text-2xl font-bold">Search Results</h2>
//       <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
//         {flatResults.map((item, index) => (
//           <div key={index} className="p-2 border rounded shadow">
//             <img
//               src={item.image_url}
//               alt={item.title}
//               className="object-cover w-full h-40 rounded"
//             />
//             <p className="mt-2 text-sm">{item.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Results;

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import mockResult from "../utils/mockResult.json"; // Assuming you have a mock result JSON file
const Results = ({ open, onDismiss }) => {
  const flatResults = Object.values(mockResult).flat();

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ maxHeight }) => [0.4 * maxHeight, 0.8 * maxHeight]}
      blocking={false}
    >
      <div className="p-4">
        <h2 className="mb-2 text-xl font-semibold">Search Results</h2>
        <div className="grid grid-cols-2 gap-4">
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
      </div>
    </BottomSheet>
  );
};

export default Results;
