import React, { useState } from "react";
import "./TravelHistory.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";

const TravelHistory = () => {
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };
  return (
    <div>
      <div className="travelHistory">
        <div className="innerTravelHistory">
          <div
            className={isArrow === true ? "travelHistoryHead" : "bottomBorder"}
          >
            <div className="travelHistoryHeadLeft">
              <img src={user} alt="" />
              <h1>TravelHistory</h1>
            </div>
            <div className="travelHistoryLeftIcon">
              <img className="travelHistoryLeftIconSvg" src={edit} alt="" />
              {isArrow === true ? (
                <img onClick={dropDownhandler} src={dropUp} alt="" />
              ) : (
                <img onClick={dropDownhandler} src={dropDown} alt="" />
              )}
            </div>
          </div>
          {isArrow === true && (
            <div className="travelHistoryDesc">
              <h1>
                Add your travel history here to stand out from other candidates
              </h1>
              <div className="travelHistoryDescGrid">
                <div className="travelHistoryDescGridOne">
                  <h5>Countries you’ve travelled to</h5>
                  <h2>Country</h2>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Year of Travel:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlexGap">
                    <h3>Duration:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Purpose:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Type of Visa:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Validity of Visa: </h3>
                    <h4>Pending</h4>
                  </div>
                </div>
                <div className="travelHistoryDescGridOne">
                  <h5>Countries you’ve travelled to</h5>
                  <h2>Country</h2>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Year of Travel:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlexGap">
                    <h3>Duration:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Purpose:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Type of Visa:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Validity of Visa: </h3>
                    <h4>Pending</h4>
                  </div>
                </div>

                <div className="travelHistoryDescGridOne">
                  <h5>Countries you’ve travelled to</h5>
                  <h2>Country</h2>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Year of Travel:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlexGap">
                    <h3>Duration:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Purpose:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Type of Visa:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Validity of Visa: </h3>
                    <h4>Pending</h4>
                  </div>
                </div>

                <div className="travelHistoryDescGridOne">
                  <h5>Countries you’ve travelled to</h5>
                  <h2>Country</h2>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Year of Travel:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlexGap">
                    <h3>Duration:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Purpose:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Type of Visa:</h3>
                    <h4>Pending</h4>
                  </div>
                  <div className="travelHistoryDescGridOneFlex">
                    <h3>Validity of Visa: </h3>
                    <h4>Pending</h4>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelHistory;
