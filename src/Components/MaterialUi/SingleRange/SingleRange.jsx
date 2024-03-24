/* eslint-disable eqeqeq */
import React, { useState } from "react";
import Slider from "@mui/material/Slider";

const SingleRange = ({ setmonth }) => {
  const [value, setValue] = useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setmonth(newValue);
    // setrangevalue(newValue);
  };
  const valueLabelFormat = (value) => {
    if (value == 12) {
      return `1 Year`;
    } else {
      return `${value} month`;
    }
  };
  return (
    <div>
      <Slider
        value={value}
        onChange={handleChange}
        min={1}
        max={12}
        // step={12 / 4}
        valueLabelDisplay="auto" // or 'on' to always display, 'off' to hide
        valueLabelFormat={valueLabelFormat}
      />
    </div>
  );
};

export default SingleRange;
