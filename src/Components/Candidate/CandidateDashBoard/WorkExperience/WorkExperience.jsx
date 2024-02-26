import React, { useState } from "react";
import "./WorkExperience.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";

const WorkExperience = () => {
  const dispatch = useDispatch();
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("Experience"));
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
          {isArrow === true && <div className="workExperienceDesc"></div>}
          {isPopUp == "Experience" && (
            <div className="workExperinceOverlay">
              <div className="innerWorkExperience">
                <div className="workExperienceHead">
                  <div className="workExperienceHeadLeft">
                    <img src={user} alt="" />
                    <h1>Work Experience</h1>
                  </div>
                  <div className="workExperienceHeadLeftIcon">
                    {/* <img
                      className="workExperienceHeadLeftIconSvg"
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
              <h6>
                Add your Details to help us match you with the perfect
                opportunity
              </h6>
              <div className="workExperinceOverlayFlex">
                <div className="workExperinceOverlayLeft"></div>
                <div className="workExperinceOverlayRight"></div>
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

export default WorkExperience;
