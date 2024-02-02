import React from "react";
import "./DashBody.css";
// import glasses from "../../../../assests/glasses.png";

const DashBody = (props) => {
  return (
    <div>
      <div className="dashBoardMainBody">
        <div className="dashBoardMainBodyInner">
          <img src={props.Img} alt="" />
          <h1 className="marginTop10">{props.head}</h1>
          <p>{props.desc}</p>
          <button
            onClick={props.fun}
            id={props.Id}
            className={props.buttonClass}
          >
            {props.button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBody;
