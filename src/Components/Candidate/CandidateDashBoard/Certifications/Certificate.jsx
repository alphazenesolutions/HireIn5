import React, { useState } from "react";
import "./Certificate.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";

const Certificate = () => {
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };
  return (
    <div>
      <div className="certificate">
        <div className="innerCertificate">
          <div
            className={isArrow === true ? "certificateHead" : "bottomBorder"}
          >
            <div className="certificateHeadLeft">
              <img src={user} alt="" />
              <h1>Certificate</h1>
            </div>
            <div className="certificateLeftIcon">
              <img className="certificateLeftIconSvg" src={edit} alt="" />
              {isArrow === true ? (
                <img onClick={dropDownhandler} src={dropUp} alt="" />
              ) : (
                <img onClick={dropDownhandler} src={dropDown} alt="" />
              )}
            </div>
          </div>
          {isArrow === true && (
            <div className="certificateDesc">
              <h1>
                Add certification / course Details here to enhance your profile
              </h1>
              <h2>Course Name</h2>

              <div className="certificateDescFlex">
                <h3>Issue Body: </h3>
                <p>Pending </p>
              </div>
              <div className="certificateDescFlex">
                <h3>Date Issued:</h3>
                <p>Pending</p>
              </div>
              <div className="certificateDescFlex">
                <h3>URL:</h3>
                <p>Pending </p>
              </div>
              <div className="certificateDescFlexLast">
                <h4>Key Skills:</h4>
                <p>Pending</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificate;
