/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProgressBar = ({ setvalueper }) => {
  const userdata = useSelector((store) => store.userdata);
  const [percentage, setpercentage] = useState(0);
  useEffect(() => {
    GetPercentage();
  }, [userdata]);
  const GetPercentage = async () => {
    if (userdata.length !== 0) {
      var count = 0;
      if (userdata[0].address !== null) {
        count += 1;
      }
      if (userdata[0].work_preference_info !== null) {
        count += 1;
      }
      if (userdata[0].professional_details_info.length !== 0) {
        count += 1;
      }
      if (userdata[0].project_details_info.length !== 0) {
        count += 1;
      }
      if (userdata[0].certificate_info.length !== 0) {
        count += 1;
      }
      if (userdata[0].travel_info !== null) {
        count += 1;
      }
      if (userdata[0].education_info.length !== 0) {
        count += 1;
      }
      if (userdata[0].video_resume !== null) {
        if (userdata[0].video_resume.length !== 0) {
          count += 1;
        }
      }
      let percent = Math.round((count / 8) * 100);
      setpercentage(percent);
      setvalueper(percent);
    }
  };
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
            stroke-dashoffset="0" //light
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
              stroke-dashoffset={100 - percentage} //dark
              stroke-linecap="round"
            ></circle>
          </g>
        </svg>
        <div class="flex flex-col	 absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <span class="text-center text-sm font-bold text-gray-800 dark:text-black">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
