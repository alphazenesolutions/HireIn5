import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const SingleRange = () => {
  const [value, setValue] = useState([20, 37]);

  //   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //     setrangevalue(newValue);
  //   };
  function valuetext(value) {
    return `${value} USD`;
  }
  return (
    <div>
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </div>
  );
};

export default SingleRange;
