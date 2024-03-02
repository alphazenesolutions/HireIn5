/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "./WorkExperience.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import countryimg from "../../../../assests/Avatar.png";
import countryimg1 from "../../../../assests/Vector.png";
import billx from "../../../../assests/billingX.png";
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
          {isArrow === true && (
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
                        <button>Product Management</button>
                        <button>Python</button>
                        <button>Java</button>
                      </div>
                    </div>
                    <div className="workTopskills">
                      <h4>Current Employment Status</h4>
                      <h2>On Contract</h2>
                    </div>
                    <div className="workTopskills">
                      <h4>Preferred mode of engagement</h4>
                      <h2>Part-time</h2>
                    </div>
                    <div className="workTopskills">
                      <h4>Preferred method of working</h4>
                      <h2>Remote, Hybrid</h2>
                    </div>
                    <div className="workTopskills">
                      <h4>Preferred Work Timings</h4>
                      <h5>Pending</h5>
                    </div>
                    <div className="workTopskills">
                      <h4>Languages known</h4>
                      <div className="worklanguages">
                        <h2 title="">English</h2>
                        <p>Fluent</p>
                      </div>
                      <div className="worklanguages">
                        <h2 title="">Kannada</h2>
                        <p>Basic</p>
                      </div>
                    </div>
                  </div>
                  <div className="workExperienceright">
                    <div className="workTopskills">
                      <h4>Website URL</h4>
                      <h5>Pending</h5>
                    </div>
                    <div className="workTopskills">
                      <h4>Hackerrank (or Equivalent Score)</h4>
                      <h5>Pending</h5>
                    </div>
                    <div className="workTopskills">
                      <h4>GitHub</h4>
                      <h5>Pending</h5>
                    </div>
                    <div className="workTopskills">
                      <h4>Preferred Work Locations</h4>
                      <h2>
                        <img src={countryimg1} alt="" />
                        Japan
                      </h2>
                      <h2>
                        <img src={countryimg} alt="" />
                        United Kingdom
                      </h2>
                      <h2>
                        <img src={countryimg1} alt="" />
                        Singapore
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                <div className="workExperinceOverlayLeft">
                  <div className="keySkills">
                    <div className="keyskills1">
                      <h3>Key Skills</h3>
                      <p>Minimum 5 skills and top 3 skills</p>
                    </div>
                    <div className="keyskills2">
                      <button>
                        Product Managelment{" "}
                        <span>
                          <img src={billx} alt="" />
                        </span>
                      </button>
                      <button>
                        Python{" "}
                        <span>
                          <img src={billx} alt="" />
                        </span>
                      </button>
                      <button>
                        Java{" "}
                        <span>
                          <img src={billx} alt="" />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="keySkills">
                    <div className="keyskills1">
                      <h3>Current Employment Status</h3>
                    </div>
                    <div className="keyskills2">
                      <select name="" id="" placeholder="On Contract">
                        <option value="">On Contract</option>
                      </select>
                    </div>
                  </div>
                  <div className="keySkills">
                    <div className="keyskills1">
                      <h3>Preferred mode of engagement</h3>
                    </div>
                    <div className="keyskills2">
                      <select name="" id="" placeholder="On Contract">
                        <option value="">Part-time</option>
                      </select>
                    </div>
                  </div>
                  <div className="keySkills">
                    <div className="keyskills1">
                      <h3>Preferred method of work</h3>
                      <p>Rank in order of preference</p>
                    </div>
                    <div className="keyskills2">
                      <select name="" id="">
                        <option value="">Remote</option>
                      </select>
                    </div>
                  </div>
                  <div className="keyskills3">
                    <select name="" id="">
                      <option value="">Remote</option>
                    </select>
                  </div>
                  <div className="keyskills3">
                    <select name="" id="">
                      <option value="">Hybrid</option>
                    </select>
                  </div>
                  <div className="keyskills3">
                    <select name="" id="">
                      <option value="">select preference #3</option>
                    </select>
                  </div>

                  <div className="keySkills">
                    <div className="keyskills1">
                      <h3>Preferred Work Timings</h3>
                    </div>
                    <div className="keyskills2">
                      <select name="" id="" placeholder="On Contract">
                        <option value="">05:00 to 14:00 IST</option>
                        <option value="">10:30 to 19:30 IST</option>
                        <option value="">13:30 to 22:30 IST</option>
                      </select>
                    </div>
                  </div>
                  <div className="worklanguage">
                    <div className="worklanguage1">
                      <h3>Language</h3>
                      <div className="keyskills2">
                        <input type="text" placeholder="English" />
                      </div>
                    </div>
                    <div className="worklanguage1">
                      <h3>Proficiency</h3>
                      <div className="keyskills2">
                        <select name="" id="">
                          <option value="">Fluent</option>
                          <option value="">Basic</option>
                        </select>
                      </div>
                    </div>
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
                          <h2>Pending</h2>
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
                          <h2>Pending</h2>
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
                          <h2>Pending</h2>
                        </div>
                      </div>
                    </div>
                    <div className="keySkills">
                      <div className="keyskills1">
                        <h3>Preferred Work Locations</h3>
                        <p>Top 3 countries</p>
                      </div>
                      <div className="keyskills4">
                        <select name="" id="" placeholder="On Contract">
                          <option value="">Country preference #1</option>

                          <option value="">Japan</option>
                          <option value="">Singapore</option>
                          <option value="">Malaysia</option>
                          <option value="">Dubai</option>
                          <option value="">KSA</option>
                          <option value="">Europe</option>
                          <option value="">United Kingdom</option>
                        </select>
                      </div>
                      <div className="keyskills4">
                        <select name="" id="" placeholder="On Contract">
                          <option value="">Country preference #2</option>

                          <option value="">Japan</option>
                          <option value="">Singapore</option>
                          <option value="">Malaysia</option>
                          <option value="">Dubai</option>
                          <option value="">KSA</option>
                          <option value="">Europe</option>
                          <option value="">United Kingdom</option>
                        </select>
                      </div>
                      <div className="keyskills4">
                        <select name="" id="" placeholder="On Contract">
                          <option value="">Country preference #3</option>
                          <option value="">Japan</option>
                          <option value="">Singapore</option>
                          <option value="">Malaysia</option>
                          <option value="">Dubai</option>
                          <option value="">KSA</option>
                          <option value="">Europe</option>
                          <option value="">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
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
