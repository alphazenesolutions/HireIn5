import React, { useState } from "react";
import "./PersonalDetails.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander());
  };
  return (
    <div>
      <div className="personalDetails">
        <div className="innerPersonalDetails">
          <div
            className={
              isArrow === true ? "personalDetailsHead" : "bottomBorder"
            }
          >
            <div className="personalDetailsHeadLeft">
              <img src={user} alt="" />
              <h1>Personal Details</h1>
            </div>
            <div className="personalDetailsLeftIcon">
              <img
                className="personalDetailsLeftIconSvg"
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
            <div className="personalDetailsDesc">
              <h1>Tell us about yourself</h1>
              <div className="personalInfo">
                <div className="personalDetailsDescLeft">
                  <h2>Name</h2>
                  <h3>Yasir Quazi</h3>
                  <h2>Date of Birth</h2>
                  <h3>31/05/1991</h3>
                  <h2>Phone Number</h2>
                  <h3>+91 9876543210</h3>
                  <h2>AADHAAR / Govt. Issued ID</h2>
                  <h3 className="personalDetailsDescLeftOpacity">
                    48XX XXXX XX21
                  </h3>
                  <h2>PAN Card / Govt. Issued TAX ID</h2>
                  <h3 className="personalDetailsDescLeftOpacity">
                    48XX XXXX XX21
                  </h3>
                </div>
                <div className="personalDetailsDescRight">
                  <h2>Email ID</h2>
                  <h3>yasirquazi2000@gmail.com</h3>
                  <h2>Current Residential Address</h2>
                  <h3>Lorem ipsum dolor sit amet, Richard’s Town</h3>
                  <h2>City</h2>
                  <h3>Bengaluru, KA</h3>
                  <h2>PINCODE</h2>
                  <h3>560005</h3>
                  <h2>Country</h2>
                  <h3>India</h3>
                </div>
              </div>
            </div>
          )}
          {/* {isPopUp && } */}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
