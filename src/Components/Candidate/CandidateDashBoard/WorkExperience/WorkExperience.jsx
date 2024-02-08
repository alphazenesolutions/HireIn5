import React, { useState } from "react";
import "./WorkExperience.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";

const WorkExperience = () => {
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };
  return (
    <div>
      <div className="workExperience">
        <div className="innerWorkExperience">
          <div
            className={isArrow === true ? "workExperienceHead" : "bottomBorder"}
          >
            <div className="workExperienceHeadLeft">
              <img src={user} alt="" />
              <h1>Work Experience</h1>
            </div>
            <div className="workExperienceHeadLeftIcon">
              <img
                className="workExperienceHeadLeftIconSvg"
                src={edit}
                alt=""
              />
              {isArrow === true ? (
                <img onClick={dropDownhandler} src={dropUp} alt="" />
              ) : (
                <img onClick={dropDownhandler} src={dropDown} alt="" />
              )}
            </div>
          </div>
          {isArrow === true && <div className="workExperienceDesc"></div>}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
