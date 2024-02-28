/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-redeclare */
import React, { useEffect, useState } from "react";
import "./DashSearch.css";
import Range from "../../../MaterialUi/Range/RangeSlider";
import search from "../../../../assests/search.png";
import downArrow from "../../../../assests/btnDownArrow.png";
import { storeAction } from "../../../../Store/Store";
import { useDispatch, useSelector } from "react-redux";
import close from "../../../../assests/billingX.png";
import filter from "../../../../assests/allFilters.png";
import RangeSlider from "../../../MaterialUi/Range/RangeSlider";
import Select from "react-select";

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
  const [allfilterdata, setallfilterdata] = useState({
    skill: "",
    experience: "",
    location: "",
    languages: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setallfilterdata((values) => ({ ...values, [name]: value }));
  };
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const FilterHandler = () => {
    dispatch(storeAction.isPopUpHander("filter"));
  };

  const [isToggle, setIsToggle] = useState(false);
  const [allfilter, setallfilter] = useState([]);
  const toggleHandler = () => {
    setIsToggle(!isToggle);
    const updatedItems = allfilter.includes("Currently")
      ? allfilter.filter((datanew) => datanew !== "Currently")
      : [...allfilter, "Currently"];
    setallfilter(updatedItems);
  };

  const [isToggle1, setIsToggle1] = useState(false);
  const toggleHandler1 = () => {
    setIsToggle1(!isToggle1);
    const updatedItems = allfilter.includes("Eligible")
      ? allfilter.filter((datanew) => datanew !== "Eligible")
      : [...allfilter, "Eligible"];
    setallfilter(updatedItems);
  };
  const [locationlist, setlocationlist] = useState([]);
  const countHandler = (data) => {
    const updatedItems = locationlist.includes(data)
      ? locationlist.filter((datanew) => datanew !== data)
      : [...locationlist, data];
    if (updatedItems.length !== 0) {
      var filterdata = [];
      for (var i = 0; i < props.alldata.length; i++) {
        const checkdata = updatedItems.includes(
          props.alldata[i].current_place_of_residence
        );
        if (checkdata === true) {
          filterdata.push(props.alldata[i]);
        }
      }
      props.setfilterdata(filterdata);
      props.setIsInput(true);
    } else {
      props.setfilterdata([]);
      props.setIsInput(true);
    }
    setlocationlist(updatedItems);
  };
  const [Cost, setCost] = useState(false);
  const [rangevalue, setrangevalue] = useState([50, 250]);
  const CostHandler = () => {
    if (props.alldata.length !== 0) {
      var filterdata = [];
      for (var i = 0; i < props.alldata.length; i++) {
        if (
          props.alldata[i].hourly_rate >= rangevalue[0] &&
          props.alldata[i].hourly_rate <= rangevalue[1]
        ) {
          filterdata.push(props.alldata[i]);
        }
      }
      props.setfilterdata(filterdata);
      props.setIsInput(true);
    }
    setCost(true);
    setIsHourly(false);
  };

  const ResetHandler = () => {
    setCost(false);
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
      loc1: "Netherlands",
    },
    {
      loc1: "Germany",
    },
  ];

  const setbtn = async () => {
    var finaldata = [];
    if (props.alldata.length !== 0) {
      for (var i = 0; i < props.alldata.length; i++) {
        if (props.alldata[i].preference_info !== null) {
          if (props.alldata[i].preference_info.skills.length !== 0) {
            if (skill_list.length !== 0) {
              for (
                var j = 0;
                j < props.alldata[i].preference_info.skills.length;
                j++
              ) {
                for (var a = 0; a < skill_list.length; a++) {
                  if (
                    props.alldata[i].preference_info.skills[j].toLowerCase() ===
                    skill_list[a].toLowerCase()
                  ) {
                    finaldata.push(props.alldata[i]);
                  }
                }
              }
            }
          } else {
            finaldata.push(props.alldata[i]);
          }
        }
      }

      for (var i = 0; i < props.alldata.length; i++) {
        if (
          props.alldata[i].hourly_rate >= rangevalue[0] &&
          props.alldata[i].hourly_rate <= rangevalue[1]
        ) {
          finaldata.push(props.alldata[i]);
        }
      }
      if (location_list.length !== 0) {
        for (var i = 0; i < props.alldata.length; i++) {
          var locationlist = location_list;
          const checkdata = locationlist.includes(
            props.alldata[i].current_place_of_residence
          );
          if (checkdata === true) {
            finaldata.push(props.alldata[i]);
          }
        }
      }
      if (allfilterdata.experience.length !== 0) {
        for (var i = 0; i < props.alldata.length; i++) {
          if (props.alldata[i].preference_info !== null) {
            if (
              props.alldata[i].preference_info.year_of_experience ==
              allfilterdata.experience
            ) {
              finaldata.push(props.alldata[i]);
            }
          }
        }
      }
    }
    const uniqueObjectsMap = {};
    const uniqueObjects = finaldata.filter((obj) => {
      const id = obj.id;
      if (!uniqueObjectsMap[id]) {
        uniqueObjectsMap[id] = true;
        return true;
      }
      return false;
    });
    props.setfilterdata(uniqueObjects);
    props.setIsInput(true);
    dispatch(storeAction.isPopUpHander());
  };
  const resetbtn = () => {
    setallfilter([]);
    dispatch(storeAction.isPopUpHander());
    setIsToggle1(false);
    setIsToggle(false);
  };
  const options = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
    { value: "Argentina", label: "Argentina" },
    { value: "Armenia", label: "Armenia" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Bahamas", label: "Bahamas" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Barbados", label: "Barbados" },
    { value: "Belarus", label: "Belarus" },
    { value: "Belgium", label: "Belgium" },
    { value: "Belize", label: "Belize" },
    { value: "Benin", label: "Benin" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
    { value: "Botswana", label: "Botswana" },
    { value: "Brazil", label: "Brazil" },
    { value: "Brunei", label: "Brunei" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "Burundi", label: "Burundi" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Canada", label: "Canada" },
    { value: "Cape Verde", label: "Cape Verde" },
    { value: "Central African Republic", label: "Central African Republic" },
    { value: "Chad", label: "Chad" },
    { value: "Chile", label: "Chile" },
    { value: "China", label: "China" },
    { value: "Colombia", label: "Colombia" },
    { value: "Comoros", label: "Comoros" },
    { value: "Congo", label: "Congo" },
    { value: "Costa Rica", label: "Costa Rica" },
    { value: "Croatia", label: "Croatia" },
    { value: "Cuba", label: "Cuba" },
    { value: "Cyprus", label: "Cyprus" },
    { value: "Czech Republic", label: "Czech Republic" },
    { value: "Denmark", label: "Denmark" },
    { value: "Djibouti", label: "Djibouti" },
    { value: "Dominica", label: "Dominica" },
    { value: "Dominican Republic", label: "Dominican Republic" },
    { value: "East Timor (Timor-Leste)", label: "East Timor (Timor-Leste)" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Egypt", label: "Egypt" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "Equatorial Guinea", label: "Equatorial Guinea" },
    { value: "Eritrea", label: "Eritrea" },
    { value: "Estonia", label: "Estonia" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Fiji", label: "Fiji" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "Gabon", label: "Gabon" },
    { value: "Gambia", label: "Gambia" },
    { value: "Georgia", label: "Georgia" },
    { value: "Germany", label: "Germany" },
    { value: "Ghana", label: "Ghana" },
    { value: "Greece", label: "Greece" },
    { value: "Grenada", label: "Grenada" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Guinea", label: "Guinea" },
    { value: "Guinea-Bissau", label: "Guinea-Bissau" },
    { value: "Guyana", label: "Guyana" },
    { value: "Haiti", label: "Haiti" },
    { value: "Honduras", label: "Honduras" },
    { value: "Hungary", label: "Hungary" },
    { value: "Iceland", label: "Iceland" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Iran", label: "Iran" },
    { value: "Iraq", label: "Iraq" },
    { value: "Ireland", label: "Ireland" },
    { value: "Israel", label: "Israel" },
    { value: "Italy", label: "Italy" },
    { value: "Ivory Coast", label: "Ivory Coast" },
    { value: "Jamaica", label: "Jamaica" },
    { value: "Japan", label: "Japan" },
    { value: "Jordan", label: "Jordan" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kiribati", label: "Kiribati" },
    { value: "Korea, North", label: "Korea, North" },
    { value: "Korea, South", label: "Korea, South" },
    { value: "Kuwait", label: "Kuwait" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionskill, setSelectedOptionskill] = useState(null);
  const [location_list, setlocation_list] = useState([]);
  const [skill_list, setskill_list] = useState([]);
  useEffect(() => {
    getLocationdata();
  }, [selectedOption, selectedOptionskill]);
  const getLocationdata = async () => {
    if (selectedOption !== null) {
      const valuesArray = selectedOption.map((country) => country.value);
      setlocation_list(valuesArray);
    }
    if (selectedOptionskill !== null) {
      const values_Array = selectedOptionskill.map((country) => country.value);
      setskill_list(values_Array);
    }
  };
  const [skilloption, setskilloption] = useState([]);
  const [searchvalue, setsearchvalue] = useState("");
  const handleInputChangeNew = (value) => {
    setsearchvalue(value);
  };
  useEffect(() => {
    Getskill();
  }, [searchvalue]);
  const Getskill = async () => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "m6DPZFayQKB7uHJSfmv3toiM7sjfodaG");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    var skilldata = await fetch(
      `https://api.apilayer.com/skills?q=${searchvalue}`,
      requestOptions
    ).then((response) => {
      return response.text();
    });
    var newarray = JSON.parse(skilldata);
    if (newarray.length !== 0) {
      var filter = [];
      for (var i = 0; i < newarray.length; i++) {
        filter.push({
          value: newarray[i],
          label: newarray[i],
        });
      }
      setskilloption(filter);
    }
  };
  const [isDrop, setIsDrop] = useState(false);
  const dropHandler = () => {
    setIsDrop(!isDrop);
  };
  return (
    <div>
      <div className={props.class}>
        <img onClick={dropHandler} className="searchImg" src={search} alt="" />
        <input
          className="mainInput"
          onChange={(e) => {
            props.buttonHandler(e.target.value);
          }}
          onClick={(props.function2, dropHandler)}
          // onClick={props.function2}
          placeholder="Search candidates by role or skills"
          type="text"
        />
        <button
          className={
            props.isButton === true ? "searchButtonActive" : "searchButton"
          }
          onClick={props.seachuser}
          // className="searchButtonActive"
        >
          Search
        </button>
        <div className="dashBoardMainSelect">
          <button onClick={HourlyHandler} className="dashBoardMainSelectbutton">
            <p>
              {Cost === true
                ? rangevalue !== null
                  ? `USD ${rangevalue[0]}-${rangevalue[1]}`
                  : "Hourly Rate"
                : "Hourly Rate"}
            </p>{" "}
            <img src={downArrow} alt="" />
          </button>
          <button
            onClick={LocationHandler}
            className="dashBoardMainSelectbutton"
          >
            <p>Location</p>
            {locationlist.length !== 0 ? (
              <h6>{locationlist.length}</h6>
            ) : null}{" "}
            <img src={downArrow} alt="" />
          </button>
          <button onClick={FilterHandler} className="dashBoardMainSelectbutton">
            <p>All Filters </p>
            {allfilter.length !== 0 ? <h6>{allfilter.length}</h6> : null}
            <img src={downArrow} alt="" />
          </button>
        </div>
        {isHourly === true && (
          <div className="hourlyRate">
            <h1>Select an estimated budget within this range</h1>
            <Range setrangevalue={setrangevalue} />
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
                      onClick={() => {
                        countHandler(data.loc1);
                      }}
                      checked={locationlist.includes(data.loc1)}
                    />
                    <p>{data.loc1}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {isPopUp === "filter" && (
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
              <Select
                defaultValue={selectedOptionskill}
                onChange={setSelectedOptionskill}
                options={skilloption}
                isMulti
                onInputChange={handleInputChangeNew}
              />
            </div>
            <div className="allFilterBody">
              <div className="filterRate">
                <div className="filterRateHead">
                  <h2>Hourly Rate</h2>
                  <h3>Select a price range</h3>
                </div>
                {rangevalue !== null ? (
                  <h4>
                    USD {rangevalue[0]} - {rangevalue[1]}
                  </h4>
                ) : null}

                <RangeSlider setrangevalue={setrangevalue} />
              </div>
              <div className="fliterLocation">
                <h2>Location</h2>
                {/* <input
                  type="text"
                  name="location"
                  onChange={handlechange}
                  defaultValue={allfilterdata.location}
                /> */}
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  isMulti
                />
              </div>
            </div>
            <div className="allFilterBodyBottom">
              <div className="workExp">
                <h2>Years of Work Experience</h2>
                <input
                  placeholder="3"
                  type="text"
                  name="experience"
                  onChange={handlechange}
                  defaultValue={allfilterdata.experience}
                />
              </div>
              {/* <div className="language">
                <h2>Languages</h2>
                <input
                  placeholder="e.g French"
                  type="text"
                  name="languages"
                  onChange={handlechange}
                  defaultValue={allfilterdata.languages}
                />
              </div> */}
            </div>
            <div className="allFilterBodyButton">
              <button className="ResetAll" onClick={resetbtn}>
                Reset All
              </button>
              <button className="SetFilter" onClick={setbtn}>
                Set Filters
              </button>
            </div>
          </div>
        )}
        {isDrop == true && (
          <div className="searchDropDown">
            <h2 onClick={dropHandler}>javascript</h2>
            <h2 onClick={dropHandler}>javascript</h2>
            <h2 onClick={dropHandler}>javascript</h2>
            <h2 onClick={dropHandler}>javascript</h2>
            <h2 onClick={dropHandler}>javascript</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashSearch;
