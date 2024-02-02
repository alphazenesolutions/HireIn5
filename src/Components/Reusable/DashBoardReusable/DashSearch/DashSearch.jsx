import React, { useState } from "react";
import "./DashSearch.css";
import Range from "../../../MaterialUi/Range/RangeSlider";
import search from "../../../../assests/search.png";
import downArrow from "../../../../assests/btnDownArrow.png";

const DashSearch = (props) => {
  const [isHourly, setIsHourly] = useState(false);
  const HourlyHandler = () => {
    setIsHourly(!isHourly);
    setIsLoction(false);
  };
  const [isLocation, setIsLoction] = useState(false);
  const LocationHandler = () => {
    setIsLoction(!isLocation);
    setIsHourly(false);
  };

  const locationData = [
    {
      loc1: "India",
    },
    {
      loc1: "Australia",
    },
    {
      loc1: "Saudi Arab Emirates",
    },
    {
      loc1: "Saudi Arabia",
    },
    {
      loc1: "Indonesia",
    },
    {
      loc1: "Japan",
    },
    {
      loc1: "Germany",
    },
    {
      loc1: "Netherlands",
    },
    {
      loc1: "Saudi Arabia",
    },
    {
      loc1: "Indonesia",
    },
    {
      loc1: "Japan",
    },
    {
      loc1: "Germany",
    },
    {
      loc1: "Netherlands",
    },
  ];
  return (
    <div>
      <div className={props.class}>
        <img className="searchImg" src={search} alt="" />
        <input
          className="mainInput"
          onChange={props.function}
          placeholder="Search Candidates"
          type="text"
        />
        <div className="dashBoardMainSelect">
          <button onClick={HourlyHandler} className="dashBoardMainSelectbutton">
            <p>Hourly Rate</p> <img src={downArrow} alt="" />
          </button>
          <button
            onClick={LocationHandler}
            className="dashBoardMainSelectbutton"
          >
            <p>Location</p> <img src={downArrow} alt="" />
          </button>
          <button className="dashBoardMainSelectbutton">
            <p>All Filters</p>
            <img src={downArrow} alt="" />
          </button>
        </div>
        {isHourly === true && (
          <div className="hourlyRate">
            <h1>Select an estimated budget within this range</h1>
            <Range />
            <h3>615 candidates found</h3>
            <div className="hourlyButton">
              <button className="hourlyButtonReset marginTop15">Reset</button>
              <button className="hourlyButtonFilter">Set Filter</button>
            </div>
          </div>
        )}
        {isLocation === true && (
          <div className="location">
            <input className="locInput" type="text" />
            <div className="locationDesc">
              {locationData.map((data) => {
                return (
                  <div className="locDesc">
                    <input
                      className="checkInput"
                      type="checkbox"
                      name=""
                      id=""
                    />
                    <p>{data.loc1}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashSearch;
