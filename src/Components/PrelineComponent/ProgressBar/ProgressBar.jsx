import React from "react";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const alluserdata = useSelector((store) => store.alluserdata);
  return (
    <div>
      <div class="relative size-[100%]">
        <svg
          class="size-full"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            class="stroke-current text-[#C4B5FD]"
            stroke-width="3.5"
            stroke-dasharray="100"
            stroke-dashoffset="-40"
            stroke-linecap="round"
          ></circle>
          <g class="origin-center -rotate-90 transform">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              class="stroke-current text-[#8b5cf6]"
              stroke-width="3.5"
              stroke-dasharray="100"
              stroke-dashoffset="40"
              stroke-linecap="round"
            ></circle>
          </g>
        </svg>
        <div class="flex flex-col	 absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <span class="text-center text-2xl font-bold text-gray-800 dark:text-black">
            {alluserdata.length}
          </span>
          {/* <p className="text-[#71717a]">Onboarded</p> */}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
