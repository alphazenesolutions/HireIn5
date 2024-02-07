import React, { useState } from "react";
import "./DashSearch.css";
import Range from "../../../MaterialUi/Range/RangeSlider";
import search from "../../../../assests/search.png";
import downArrow from "../../../../assests/btnDownArrow.png";
import { storeAction } from "../../../../Store/Store";
import { useDispatch, useSelector } from "react-redux";
import close from "../../../../assests/billingX.png";
import filter from "../../../../assests/allFilters.png";
import RangeSlider from "../../../MaterialUi/Range/RangeSlider";

const DashSearch = (props) => {
  const dispatch = useDispatch();
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

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const FilterHandler = () => {
    dispatch(storeAction.isPopUpHander());
  };

  const [isToggle, setIsToggle] = useState(false);
  const toggleHandler = () => {
    setIsToggle(!isToggle);
  };

  const [isToggle1, setIsToggle1] = useState(false);
  const toggleHandler1 = () => {
    setIsToggle1(!isToggle1);
  };
  const [Count, setCount] = useState([]);
  const countHandler = () => {
    setCount(Count + 1);
  };
  const [Cost, setCost] = useState(false);
  const CostHandler = () => {
    setCost(true);
  };

  const ResetHandler = () => {
    setCost(false);
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
            <p>{Cost === true ? "USD 0-100" : "Hourly Rate"}</p>{" "}
            <img src={downArrow} alt="" />
          </button>
          <button
            onClick={LocationHandler}
            className="dashBoardMainSelectbutton"
          >
            <p>Location</p>
            <h6>{Count.length}</h6> <img src={downArrow} alt="" />
          </button>
          <button onClick={FilterHandler} className="dashBoardMainSelectbutton">
            <p>All Filters</p>
            <h6>5</h6>
            <img src={downArrow} alt="" />
          </button>
        </div>
        {isHourly === true && (
          <div className="hourlyRate">
            <h1>Select an estimated budget within this range</h1>
            <Range />
            <h3>615 candidates found</h3>
            <div className="hourlyButton">
              <button
                onClick={ResetHandler}
                className="hourlyButtonReset marginTop15"
              >
                Reset
              </button>
              <button onClick={CostHandler} className="hourlyButtonFilter">
                Set Filter
              </button>
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
                      onClick={countHandler}
                    />
                    <p>{data.loc1}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {isPopUp && (
          <div className="allFilter">
            <div className="allFilterHead">
              <div className="allFilterHeadLeft">
                <img src={filter} alt="" />
                <h2>All Filters</h2>
              </div>
              <img src={close} alt="" />
            </div>
            <div className="workHistory">
              <div className="FilterToggle">
                <h2>Currently available for work</h2>
                <div
                  onClick={toggleHandler}
                  className={
                    isToggle === true ? "toggleBodyRight" : "toggleBodyLeft"
                  }
                >
                  <div className="toggle"></div>
                </div>
                <h2>Eligible for Overseas Travel</h2>
                <div
                  onClick={toggleHandler1}
                  className={
                    isToggle1 === true ? "toggleBodyRight" : "toggleBodyLeft"
                  }
                >
                  <div className="toggle"></div>
                </div>
              </div>
            </div>
            <div className="filterSkill">
              <div className="filterSkillHead">
                <h2>Skill / Role</h2>
                <h3>Type a skill or a job role here</h3>
              </div>
              <input type="text" name="" id=""></input>
            </div>
            <div className="allFilterBody">
              <div className="filterRate">
                <div className="filterRateHead">
                  <h2>Hourly Rate</h2>
                  <h3>Select a price range</h3>
                </div>
                <h4>USD 50 - 250</h4>
                <RangeSlider />
              </div>
              <div className="fliterLocation">
                <h2>Location</h2>
                <input type="text" />
              </div>
            </div>
            <div className="allFilterBodyBottom">
              <div className="workExp">
                <h2>Years of Work Experience</h2>
                <input placeholder="3" type="text" />
              </div>
              <div className="language">
                <h2>Languages</h2>
                <input placeholder="e.g French" type="text" />
              </div>
            </div>
            <div className="allFilterBodyButton">
              <button className="ResetAll">Reset All</button>
              <button className="SetFilter">Set Filters</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashSearch;
