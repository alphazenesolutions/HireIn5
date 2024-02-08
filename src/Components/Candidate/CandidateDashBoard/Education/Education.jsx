import React, { useState } from "react";
import "./Education.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";

const Education = () => {
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };
  return (
    <div>
      <div className="education">
        <div className="innerEducation">
          <div className={isArrow === true ? "educationHead" : "bottomBorder"}>
            <div className="educationHeadLeft">
              <img src={user} alt="" />
              <h1>Education</h1>
            </div>
            <div className="educationLeftIcon">
              <img className="educationLeftIconSvg" src={edit} alt="" />
              {isArrow === true ? (
                <img onClick={dropDownhandler} src={dropUp} alt="" />
              ) : (
                <img onClick={dropDownhandler} src={dropDown} alt="" />
              )}
            </div>
          </div>
          {isArrow === true && (
            <div className="educationDesc">
              <h1>Add your education and degrees here</h1>
              <h2>Degree</h2>

              <div className="educationDescFlex">
                <h3>Name of University/School:</h3>
                <p>Pending </p>
              </div>
              <div className="educationDescFlex">
                <h3>Year of Graduation:</h3>
                <p>Pending</p>
              </div>
              <div className="educationDescFlex">
                <h3>Education Level:</h3>
                <p>Pending </p>
              </div>
              <div className="educationDescFlexLast">
                <h4>CGPA:</h4>
                <p>Pending</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Education;
