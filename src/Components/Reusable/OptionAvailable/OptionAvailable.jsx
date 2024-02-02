import React from "react";
import "./OptionAvailable.css";
// import correct from "../../../assests/correct.png";

const OptionAvailable = (props) => {
  return (
    <div>
      <div className={props.class}>
        <p>{props.head}</p>
        <img src={props.img} alt="" />
      </div>
    </div>
  );
};

export default OptionAvailable;
