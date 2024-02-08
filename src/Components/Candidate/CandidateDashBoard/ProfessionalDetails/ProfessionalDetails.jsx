import React, { useState } from "react";
import "./ProfessionalDetails.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import star from "../../../../assests/star.svg";

const ProfessionalDetails = () => {
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };
  return (
    <div>
      <div className="professionalDetails">
        <div className="innerprofessionalDetails">
          <div
            className={isArrow === true ? "projectDetailsHead" : "bottomBorder"}
          >
            <div className="professionalDetailsHeadLeft">
              <img src={user} alt="" />
              <h1>Professional Details</h1>
            </div>
            <div className="professionalDetailsLeftIcon">
              <img
                className="professionalDetailsLeftIconSvg"
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
          {isArrow === true && (
            <div className="professionalDetailsDesc">
              <h1>Add your current & Past professional experience here</h1>
              <h2>Java Developer</h2>
              <h3>PhonePe </h3>
              <h4>January 2018 - June 2024</h4>
              <h4>Hyderabad, India</h4>
              <h5>
                As always, all Htmlstream products are excellent with a very
                good personalization.
              </h5>
              <h6>Gross Annual Salary: Pending </h6>
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

export default ProfessionalDetails;
