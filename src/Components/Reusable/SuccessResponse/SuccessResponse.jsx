import React from "react";
import "./SuccessResponse.css";
import successIcon from "../../../assests/Succcess.png";
const SuccessResponse = (props) => {
  return (
    <>
      <div className="successResponse">
        <div className="successResponseInner">
          <img src={successIcon} alt="" />
          <h1 className="marginTop10">{props.title}</h1>
          <p>{props.des}</p>
        </div>
      </div>
    </>
  );
};

export default SuccessResponse;
