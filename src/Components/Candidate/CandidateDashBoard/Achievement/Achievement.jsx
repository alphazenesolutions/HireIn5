/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Achievement.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import star from "../../../../assests/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import plus from "../../../../assests/plus.svg";
import gallery from "../../../../assests/gallery.svg";
import trash from "../../../../assests/trash-2.svg";
import { FiLoader } from "react-icons/fi";
import axios from "axios";
import { TfiCup } from "react-icons/tfi";

const Achievement = () => {
  const dispatch = useDispatch();
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("achievements"));
  };
  return (
    <div>
      <div className="achievement">
        <div className="innerAchievement">
          <div
            className={isArrow === true ? "achievementHead" : "bottomBorder"}
          >
            <div className="achievementHeadLeft">
              <span>
                <TfiCup />
              </span>
              <h1>Achievements</h1>
            </div>
            <div className="achievementHeadLeftIcon">
              <img
                className="achievementHeadLeftIconSvg"
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
          {isArrow == true && (
            <div className="achievementDesc">
              <h1>Add details of projects you worked on in your career </h1>
              <h2>Project Title</h2>
              <div className="achievementRole">
                <h3>Role:</h3>
                <h4>Pending</h4>
              </div>
              <div className="achievementRole">
                <h3>Reporting to:</h3>
                <h4>Pending</h4>
              </div>
              <div className="achievementRole">
                <h3>Duration:</h3>
                <h4>Pending</h4>
              </div>
              <div className="achievementSkills">
                <h3>Key Skills:</h3>
                <h4>Pending</h4>
              </div>
              <h5>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </h5>
              <div className="achievementDescHighlight">
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

export default Achievement;
