import React, { useState } from "react";
import "./RangeSlider.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const RangeSlider = ({ setrangevalue }) => {
  const [value, setValue] = useState([50, 250]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setrangevalue(newValue);
  };
  const valueLabelFormat = (value) => {
    return `USD ${value}`;
  };

  return (
    <div>
      <Box sx={{ width: 385 }}>
        <Slider
          value={value}
          min={50}
          max={1000}
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          onChange={handleChange}
          className="text-black"
          getAriaLabel={() => "Temperature range"}
        />
      </Box>
    </div>
  );
};

export default RangeSlider;
