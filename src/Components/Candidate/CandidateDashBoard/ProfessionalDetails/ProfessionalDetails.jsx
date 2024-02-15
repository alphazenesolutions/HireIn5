import React, { useState } from "react";
import "./ProfessionalDetails.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import star from "../../../../assests/star.svg";
import plus from "../../../../assests/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";

const ProfessionalDetails = () => {
  const dispatch = useDispatch();
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("professional"));
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
                onClick={overLayHandler}
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
          {isPopUp == "professional" && (
            <div className="professionalDetailsOverlay">
              <div className="innerprofessionalDetails">
                <div className="projectDetailsHead">
                  <div className="professionalDetailsHeadLeft">
                    <img src={user} alt="" />
                    <h1>Professional Details</h1>
                  </div>
                  <div className="professionalDetailsLeftIcon">
                    {/* <img
                      className="professionalDetailsLeftIconSvg"
                      onClick={overLayHandler}
                      src={edit}
                      alt=""
                    />
                    {isArrow === true ? (
                      <img onClick={dropDownhandler} src={dropUp} alt="" />
                    ) : (
                      <img onClick={dropDownhandler} src={dropDown} alt="" />
                    )} */}
                  </div>
                </div>
              </div>
              <h6>Add your current & Past professional experience here</h6>
              <div className="professionalDetailsOverlayFlex">
                <div className="professionalDetailsOverlayLeft">
                  <h2>Title / Role</h2>
                  <input placeholder="Java Developer" type="text" />
                  <h2>Company Name</h2>
                  <input placeholder="PhonePe" type="text" />
                  <h2>Location</h2>
                  <input placeholder="Hyderabad, india" type="text" />
                  <h2>Gross Annual Salary</h2>
                  <div className="grossSalary">
                    <select name="" id="">
                      <option value="">INR</option>
                    </select>
                    <input placeholder="" type="text" />
                  </div>
                </div>
                <div className="professionalDetailsOverlayRight">
                  <h2>Years Active</h2>
                  <div className="yearsActive">
                    <input type="date" />
                    <input type="date" />
                  </div>
                  <h2>Skills</h2>
                  <input placeholder="HTML" type="text" />
                  <div className="textDesc">
                    <h2>Description / Additional</h2>
                    <h5>82/250</h5>
                  </div>
                  <textarea
                    className="text"
                    placeholder="As always, all Htmlstream products are excellent with a very good personalition"
                  />
                </div>
              </div>
              <div className="AddMore">
                <button>
                  <img src={plus} alt="" />
                  <h3>ADD MORE WORK HISTROY</h3>
                </button>
              </div>
              <div className="vedioResumeButtons">
                <button className="discard">Discard Changes</button>
                <button className="save">Save & Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetails;
