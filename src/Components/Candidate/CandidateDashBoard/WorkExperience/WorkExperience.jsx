/* eslint-disable no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import "./WorkExperience.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import countryimg1 from "../../../../assests/Vector.png";
import Select from "react-select";
import Skilllist from "../../../../assests/skillsJSON.json";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

const WorkExperience = () => {
  const userdata = useSelector((store) => store.userdata);
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
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
  const [selectedOptionskill, setSelectedOptionskill] = useState(null);
  const [skilloption, setskilloption] = useState([]);
  const [Experiencedata, setExperiencedata] = useState({
    website_url: "",
    hackerrank_url: "",
    github_url: "",
    preferred_mode_of_engagement: "",
    current_employment_status: "",
    preference1: "",
    preference2: "",
    preference3: "",
    location1: "",
    location2: "",
    location3: "",
    preffered_work_timings: "",
  });
  const [loading, setloading] = useState(false);
function exitOverlayHandler(params) {
  dispatch(storeAction.isPopUpHander());
  
}
  useEffect(() => {
    Getskill();
  }, [Skilllist]);

  const Getskill = async () => {
    var skillarrray = Skilllist;
    const uniqueSkills = Array.from(
      new Set(skillarrray.map((skill) => skill.Skill))
    );
    if (uniqueSkills.length !== 0) {
      var filter = [];
      for (var i = 0; i < uniqueSkills.length; i++) {
        filter.push({
          value: uniqueSkills[i],
          label: uniqueSkills[i],
        });
      }
      setskilloption(filter);
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setExperiencedata((values) => ({ ...values, [name]: value }));
  };
  const savebtn = async () => {
    var values_Array = [];
    if (selectedOptionskill !== null) {
      values_Array = selectedOptionskill.map((country) => country.value);
    }
    const arrayOfStrings = row.map((obj) => `${obj.languages}: ${obj.level}`);
    setloading(true);
    var newobj = {
      username: userdata[0].username,
      work_preference_info: {
        key_skills: values_Array,
        current_employment_status: Experiencedata.current_employment_status,
        preferred_mode_of_engagement:
          Experiencedata.preferred_mode_of_engagement,
        website_url: Experiencedata.website_url,
        hackerrank_url: Experiencedata.hackerrank_url,
        github_url: Experiencedata.github_url,
        preffered_work_timings: Experiencedata.preffered_work_timings,
        preferred_method_of_work: [
          Experiencedata.preference1,
          Experiencedata.preference2,
          Experiencedata.preference3,
        ],
        preffered_work_location: [
          Experiencedata.location1,
          Experiencedata.location2,
          Experiencedata.location3,
        ],
        language: arrayOfStrings,
      },
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${userid}/`,
        newobj,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response;
      });
    if (
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      let updatedObject = {
        ...userdata[0],
        work_preference_info: updatedata.user.work_preference_info,
      };
      dispatch(storeAction.userdataHander({ userdata: [] }));
      setTimeout(() => {
        dispatch(storeAction.userdataHander({ userdata: [updatedObject] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setloading(false);
    } else {
      setloading(false);
    }
    getUserinfo();
  };
  const inputref1 = useRef("");
  const [row, setrow] = useState([{ languages: "", level: "" }]);
  const addcount = () => {
    var newobj = {
      languages: "",
      level: "",
    };
    setrow((prevState) => [...prevState, newobj]);
  };
  function filterdata(event, index) {
    row[index]["level"] = event;
    setrow([...row]);
  }
  const get_value = (e, index) => {
    row[index]["languages"] = e;
    setrow([...row]);
  };
  useEffect(() => {
    getUserinfo();
  }, [userdata.length !== 0]);

  const getUserinfo = async () => {
    if (userdata.length !== 0) {
      if (userdata[0].work_preference_info !== null) {
        setExperiencedata({
          website_url: userdata[0].work_preference_info.website_url,
          hackerrank_url: userdata[0].work_preference_info.hackerrank_url,
          github_url: userdata[0].work_preference_info.github_url,
          preferred_mode_of_engagement:
            userdata[0].work_preference_info.preferred_mode_of_engagement,
          current_employment_status:
            userdata[0].work_preference_info.current_employment_status,
          preference1:
            userdata[0].work_preference_info.preferred_method_of_work[0],
          preference2:
            userdata[0].work_preference_info.preferred_method_of_work[1],
          preference3:
            userdata[0].work_preference_info.preferred_method_of_work[2],
          location1:
            userdata[0].work_preference_info.preffered_work_location[0],
          location2:
            userdata[0].work_preference_info.preffered_work_location[1],
          location3:
            userdata[0].work_preference_info.preffered_work_location[2],
          preffered_work_timings:
            userdata[0].work_preference_info.preffered_work_timings,
        });
        if (userdata[0].work_preference_info.key_skills.length !== 0) {
          var filter = [];
          for (
            var i = 0;
            i < userdata[0].work_preference_info.key_skills.length;
            i++
          ) {
            filter.push({
              value: userdata[0].work_preference_info.key_skills[i],
              label: userdata[0].work_preference_info.key_skills[i],
            });
          }
          setSelectedOptionskill(filter);
        }
        if (userdata[0].work_preference_info.language.length !== 0) {
          var newfilter = [];
          for (
            var i = 0;
            i < userdata[0].work_preference_info.language.length;
            i++
          ) {
            newfilter.push({
              languages: userdata[0].work_preference_info.language[i]
                .split(":")[0]
                .replace(/\s/g, ""),
              level: userdata[0].work_preference_info.language[i]
                .split(":")[1]
                .replace(/\s/g, ""),
            });
          }
          setrow(newfilter);
        }
      }
    }
  };
  return (
    <div>
      <div className="workExperience">
        <div className="innerWorkExperience">
          <div
            className={isArrow === true ? "workExperienceHead" : "bottomBorder"}
            bottomBorder
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
          {isArrow === true &&
            (userdata.length !== 0 ? (
              userdata[0].work_preference_info !== null ? (
                <div className="workExperienceDesc">
                  <div className="workExperience1">
                    <h3>
                      Add your Details to help us match you with the perfect
                      opportunity
                    </h3>
                    <div className="workExperience2">
                      <div className="workExperienceleft">
                        <div className="workTopskills">
                          <h4>Top Skills</h4>
                          <div className="workbtns">
                            {userdata[0].work_preference_info.key_skills
                              .length !== 0
                              ? userdata[0].work_preference_info.key_skills.map(
                                  (data, index) => (
                                    <button key={index}>{data}</button>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        <div className="workTopskills">
                          <h4>Current Employment Status</h4>
                          <h2>
                            {
                              userdata[0].work_preference_info
                                .current_employment_status
                            }
                          </h2>
                        </div>
                        <div className="workTopskills">
                          <h4>Preferred mode of engagement</h4>
                          <h2>
                            {" "}
                            {
                              userdata[0].work_preference_info
                                .preferred_mode_of_engagement
                            }
                          </h2>
                        </div>
                        <div className="workTopskills">
                          <h4>Preferred method of working</h4>
                          <h2>
                            {" "}
                            {userdata[0].work_preference_info.preferred_method_of_work.toString()}
                          </h2>
                        </div>
                        <div className="workTopskills">
                          <h4>Preferred Work Timings</h4>
                          <h5>
                            {
                              userdata[0].work_preference_info
                                .preffered_work_timings
                            }
                          </h5>
                        </div>
                        <div className="workTopskills">
                          <h4>Languages known</h4>
                          {userdata[0].work_preference_info.language.length !==
                          0
                            ? userdata[0].work_preference_info.language.map(
                                (data, index) => (
                                  <div className="worklanguages" key={index}>
                                    <h2 title="">{data.split(":")[0]}</h2>
                                    <p>{data.split(":")[1]}</p>
                                  </div>
                                )
                              )
                            : null}
                        </div>
                      </div>
                      <div className="workExperienceright">
                        <div className="workTopskills">
                          <h4>Website URL</h4>
                          <h5>
                            {userdata[0].work_preference_info.website_url}
                          </h5>
                        </div>
                        <div className="workTopskills">
                          <h4>Hackerrank (or Equivalent Score)</h4>
                          <h5>
                            {userdata[0].work_preference_info.hackerrank_url}
                          </h5>
                        </div>
                        <div className="workTopskills">
                          <h4>GitHub</h4>
                          <h5>{userdata[0].work_preference_info.github_url}</h5>
                        </div>
                        <div className="workTopskills">
                          <h4>Preferred Work Locations</h4>
                          {userdata[0].work_preference_info
                            .preffered_work_location.length !== 0
                            ? userdata[0].work_preference_info.preffered_work_location.map(
                                (data, index) => (
                                  <h2 key={index}>
                                    <img src={countryimg1} alt="" />
                                    {data}
                                  </h2>
                                )
                              )
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="educationDesc">
                  <h1>
                    {" "}
                    Add your Details to help us match you with the perfect
                    opportunity
                  </h1>
                  <button className="touchButtonnew" onClick={overLayHandler}>
                    <h4>Add Work Experience</h4>
                  </button>
                </div>
              )
            ) : (
              <div className="educationDesc">
                <h1>
                  {" "}
                  Add your Details to help us match you with the perfect
                  opportunity
                </h1>
                <button className="touchButtonnew" onClick={overLayHandler}>
                  <h4>Add Work Experience</h4>
                </button>
              </div>
            ))}
          {isPopUp == "Experience" && (
            <div className="workExperinceOverlay">
              <div className="innerWorkExperience">
                <div className="workExperienceHead">
                  <div className="workExperienceHeadLeft">
                    <img src={user} alt="" />
                    <h1>Work Experience</h1>
                  </div>
                  <div onClick={exitOverlayHandler} className="workExperienceHeadLeftIcon">
                    <RxCross1 />
                  </div>
                </div>
              </div>
              <h6>
                Add your Details to help us match you with the perfect
                opportunity
              </h6>

              <div className="workExperinceOverlayFlex">
                <div className="workExperinceOverlayLeft">
                  <div className="keySkills">
                    <div className="keyskills1">
                      <h3>Key Skills</h3>
                      <p>Minimum 5 skills and top 3 skills</p>
                    </div>
                    <Select
                      defaultValue={selectedOptionskill}
                      onChange={setSelectedOptionskill}
                      options={skilloption}
                      isMulti
                    />
                  </div>
                  <div className="keySkills">
                    <div className="keyskills1">
                      <h3>Current Employment Status</h3>
                    </div>
                    <div className="keyskills2">
                      <select
                        placeholder="Select"
                        name="current_employment_status"
                        onChange={handlechange}
                        defaultValue={Experiencedata.current_employment_status}
                      >
                        <option value="">Select</option>
                        <option value="On Contract">On Contract</option>
                      </select>
                    </div>
                  </div>
                  <div className="keySkills">
                    <div className="keyskills1">
                      <h3>Preferred mode of engagement</h3>
                    </div>
                    <div className="keyskills2">
                      <select
                        placeholder="Select"
                        name="preferred_mode_of_engagement"
                        onChange={handlechange}
                        defaultValue={
                          Experiencedata.preferred_mode_of_engagement
                        }
                      >
                        <option value="">Select</option>
                        <option value="Part-time">Part-time</option>
                      </select>
                    </div>
                  </div>
                  <div className="keySkills" title="">
                    <div className="keyskills1">
                      <h3>Preferred method of work</h3>
                      <p>Rank in order of preference</p>
                    </div>
                    <div className="keyskills2">
                      <select
                        name="preference1"
                        onChange={handlechange}
                        defaultValue={Experiencedata.preference1}
                      >
                        <option value="">Select preference #1</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="keyskills2">
                      <select
                        name="preference2"
                        onChange={handlechange}
                        defaultValue={Experiencedata.preference2}
                      >
                        <option value="">Select preference #2</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="keyskills2">
                      <select
                        name="preference3"
                        onChange={handlechange}
                        defaultValue={Experiencedata.preference3}
                      >
                        <option value="">Select preference #3</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div className="keySkills">
                    <div className="keyskills1">
                      <h3>Preferred Work Timings</h3>
                    </div>
                    <div className="keyskills2">
                      <select
                        name="preffered_work_timings"
                        onChange={handlechange}
                        defaultValue={Experiencedata.preffered_work_timings}
                        placeholder="On Contract"
                        selected={Experiencedata.preffered_work_timings}
                      >
                        <option value="">Select</option>
                        <option value="05:00 to 14:00 IST">
                          05:00 to 14:00 IST
                        </option>
                        <option value="10:30 to 19:30 IST">
                          10:30 to 19:30 IST
                        </option>
                        <option value="13:30 to 22:30 IST">
                          13:30 to 22:30 IST
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="languagesnew">
                    {row.length !== 0
                      ? row.map((datanew, index) => (
                          <div className="addLanguages" key={index}>
                            <div className="addLanguageInner">
                              <h3>Languages</h3>
                              <input
                                type="text"
                                placeholder="e.g. Kannada"
                                name="language"
                                onChange={(e) => {
                                  get_value(e.target.value, index);
                                }}
                                defaultValue={datanew.languages}
                              />
                            </div>
                            <div className="selectLanguages">
                              <h3>Proficiency</h3>

                              <div className="candidateState">
                                <select
                                  defaultValue={datanew.level}
                                  ref={inputref1}
                                  onChange={(e) => {
                                    filterdata(e.target.value, index);
                                  }}
                                >
                                  <option value="">Select</option>
                                  <option value="Basic">Basic</option>
                                  <option value="Conversational">
                                    Conversational
                                  </option>
                                  <option value="Proficient">Proficient</option>
                                  <option value="Fluent">Fluent</option>
                                </select>
                                {/* <FaAngleDown
                            onClick={() => {
                              dropDownHandler1(index);
                            }}
                          /> */}
                              </div>
                              {/* {levelerror && (
                                <h6 className="text-red-500 text-xs font-semibold mt-2">
                                  Please Enter Proficiency
                                </h6>
                              )} */}
                            </div>
                          </div>
                        ))
                      : null}
                    {/* 
                    {lanuageerror && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Languages
                      </h6>
                    )} */}

                    <button className="addLanguagesButton" onClick={addcount}>
                      + Add more
                    </button>
                  </div>
                </div>
                <div className="workExperinceOverlayRight">
                  <div className="workExperienceright1">
                    <div className="keySkills">
                      <div className="keyskills1">
                        <h4>Website URL</h4>
                      </div>
                      <div className="keyskills2">
                        <div className="keylink">
                          <h4>https://</h4>
                        </div>
                        <div className="keylink1">
                          <input
                            type="text"
                            placeholder="Pending"
                            name="website_url"
                            onChange={handlechange}
                            defaultValue={Experiencedata.website_url}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="keySkills">
                      <div className="keyskills1">
                        <h3>Hackerrank URL</h3>
                      </div>
                      <div className="keyskills2">
                        <div className="keylink">
                          <h4>http://www.hackerrank.com/</h4>
                        </div>
                        <div className="keylink1">
                          <input
                            type="text"
                            placeholder="Pending"
                            name="hackerrank_url"
                            onChange={handlechange}
                            defaultValue={Experiencedata.hackerrank_url}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="keySkills">
                      <div className="keyskills1">
                        <h3>GitHub URL</h3>
                      </div>
                      <div className="keyskills2">
                        <div className="keylink">
                          <h4>http://www.github.com/</h4>
                        </div>
                        <div className="keylink1">
                          <input
                            type="text"
                            placeholder="Pending"
                            name="github_url"
                            onChange={handlechange}
                            defaultValue={Experiencedata.github_url}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="keySkills">
                      <div className="keyskills1">
                        <h3>Preferred Work Locations</h3>
                        <p>Top 3 countries</p>
                      </div>
                      <div className="keyskills4">
                        <select
                          name="location1"
                          onChange={handlechange}
                          defaultValue={Experiencedata.location1}
                          placeholder="On Contract"
                        >
                          <option value="">Country preference #1</option>
                          <option value="Japan">Japan</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Dubai">Dubai</option>
                          <option value="KSA">KSA</option>
                          <option value="Europe">Europe</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>
                      <div className="keyskills4">
                        <select
                          name="location2"
                          onChange={handlechange}
                          defaultValue={Experiencedata.location2}
                          placeholder="On Contract"
                        >
                          <option value="">Country preference #2</option>
                          <option value="Japan">Japan</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Dubai">Dubai</option>
                          <option value="KSA">KSA</option>
                          <option value="Europe">Europe</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>
                      <div className="keyskills4">
                        <select
                          name="location3"
                          onChange={handlechange}
                          defaultValue={Experiencedata.location3}
                          placeholder="On Contract"
                        >
                          <option value="">Country preference #3</option>
                          <option value="Japan">Japan</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Dubai">Dubai</option>
                          <option value="KSA">KSA</option>
                          <option value="Europe">Europe</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="vedioResumeButtons">
                <button
                  className="discard"
                  onClick={() => {
                    dispatch(storeAction.isPopUpHander());
                  }}
                >
                  Discard Changes
                </button>
                {loading === false ? (
                  <button className="save" onClick={savebtn}>
                    Save & Close
                  </button>
                ) : (
                  <button className="save w-[10rem] flex justify-center items-center">
                    <FiLoader className="loadingIcon" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
