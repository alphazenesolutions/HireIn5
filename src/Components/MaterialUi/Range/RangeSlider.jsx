import React, { useState } from "react";
import "./RangeSlider.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const RangeSlider = ({ setrangevalue }) => {
  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setrangevalue(newValue);
  };
  function valuetext(value) {
    return `${value} USD`;
  }

  return (
    <div>
      <Box sx={{ width: 385 }}>
        <Slider
          className="text-black"
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    </div>
  );
};

export default RangeSlider;
