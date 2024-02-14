import React, { useState } from "react";
import "./TravelHistory.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import star from "../../../../assests/star.svg";

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
              <h1>Travel History</h1>
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
                Add certification / course Details here to enhance your profile
              </h1>
              <div className="travelGrid">
                <div className="travelGridOne">
                  <h1>Countries you’ve travelled to</h1>
                  <h2>Country</h2>
                  <h3>
                    Year of Travel:<p></p>
                  </h3>
                  <h3 className="marginBottom20">
                    Duration :<p>Pending</p>
                  </h3>
                  <h3>
                    Purpose:<p>Pending</p>
                  </h3>
                  <h3>
                    Type of Visa:<p>Pending</p>
                  </h3>
                  <h3>
                    Validity of Visa:<p>Pending</p>
                  </h3>
                </div>
                <div className="travelGridOne">
                  <h1>Countries you’re willing to travel to for work</h1>
                  <h2>Country 1</h2>
                  <h2>Country 2</h2>
                  <h2>Country 3</h2>
                  <h3 className="marginTop20">
                    Only For:
                    <p>Pending</p>
                  </h3>
                  <h3>
                    Duration:
                    <p>Pending</p>
                  </h3>
                  <h3>
                    Travel Readiness:
                    <p>Pending</p>
                  </h3>
                </div>
                <div className="travelGridOne">
                  <h1>Residency details</h1>
                  <h3 className="marginTop20">
                    Current Place of Residence:
                    <p>Pending</p>
                  </h3>
                  <h3 className="marginTop20">
                    Duration:
                    <p>Pending</p>
                  </h3>
                </div>
                <div className="travelGridOne">
                  <h1>Countries you’re willing to travel to for work</h1>
                  <h2>Country 1</h2>
                  <h2>Country 2</h2>
                  <h2>Country 3</h2>
                  <h3 className="marginTop20">
                    Preferred Duration:
                    <p>Pending</p>
                  </h3>
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
