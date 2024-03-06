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
      <h4 className="py-5">{value !== null ? `USD ${value[0]}-${value[1]}` : "Hourly Rate"}</h4>{" "}
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
