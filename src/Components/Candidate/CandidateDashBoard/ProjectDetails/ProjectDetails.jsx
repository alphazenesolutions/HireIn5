import React, { useState } from "react";
import "./ProjectDetails.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import star from "../../../../assests/star.svg";

const ProjectDetails = () => {
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };
  return (
    <div>
      <div className="projectDetails">
        <div className="innerprojectDetails">
          <div
            className={isArrow === true ? "projectDetailsHead" : "bottomBorder"}
          >
            <div className="projectDetailsHeadLeft">
              <img src={user} alt="" />
              <h1>Project Details</h1>
            </div>
            <div className="projectDetailsLeftIcon">
              <img className="projectDetailsLeftIconSvg" src={edit} alt="" />
              {isArrow === true ? (
                <img onClick={dropDownhandler} src={dropUp} alt="" />
              ) : (
                <img onClick={dropDownhandler} src={dropDown} alt="" />
              )}
            </div>
          </div>
          {isArrow === true && (
            <div className="projectDetailsDesc">
              <h1>
                Add certification / course Details here to enhance your profile
              </h1>
              <h2>Course Name</h2>

              <div className="projectDetailsDescFlex">
                <h3>Issue Body: </h3>
                <p>Pending </p>
              </div>
              <div className="projectDetailsDescFlex">
                <h3>Date Issued:</h3>
                <p>Pending</p>
              </div>
              <div className="projectDetailsDescFlex">
                <h3>URL:</h3>
                <p>Pending </p>
              </div>
              <div className="projectDetailsDescFlexLast">
                <h4>Key Skills:</h4>
                <p>Pending</p>
              </div>
              <h6>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </h6>
              <div className="projectDetailsHighlight">
                <img src={star} alt="" />
                <p>
                  Did you know that highlighting more projects enhances your
                  credibility and attracts the attention of potential employers?
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
