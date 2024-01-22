import React from "react";

const CustomHoverCard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded shadow-md hover:shadow-lg">
      <p className="text-2xl font-bold text-gray-800">Hover Card</p>
      <p className="text-gray-700">Hover me to see the shadow effect</p>
    </div>
  );
};

export default CustomHoverCard;
