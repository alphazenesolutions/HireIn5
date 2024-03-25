/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./ProjectDetails.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import star from "../../../../assests/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import plus from "../../../../assests/plus.svg";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import { LuFolderOpen } from "react-icons/lu";
import Select from "react-select";
import Skilllist from "../../../../assests/skillsJSON.json";
import { RxCross1 } from "react-icons/rx";

const ProjectDetails = () => {
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
    dispatch(storeAction.isPopUpHander("project"));
  };

  const exitOverlayHandler = () => {
    dispatch(storeAction.isPopUpHander());
  };


  const [loading, setloading] = useState(false);

  const [education_data, seteducation_data] = useState([]);
  const [travelwork, settravelwork] = useState([
    {
      description: "",
      duration_of_project: "",
      project_title: "",
      reporting_to: "",
      role: "",
      skills: [],
      type: "new",
    },
  ]);

  const addcountwork = () => {
    var newobj = {
      description: "",
      duration_of_project: "",
      project_title: "",
      reporting_to: "",
      role: "",
      skills: [],
      type: "new",
    };
    settravelwork((prevState) => [...prevState, newobj]);
  };

  const handlechangework = (value, index, name) => {
    travelwork[index][name] = value;
    settravelwork([...travelwork]);
  };

  useEffect(() => {
    getUserinfo();
  }, [userdata.length !== 0]);

  const getUserinfo = async () => {
    if (userdata.length !== 0) {
      var certificatedata = userdata[0].project_details_info;
      if (certificatedata.length !== 0) {
        seteducation_data(certificatedata);
        var filterdata = [];
        for (var i = 0; i < certificatedata.length; i++) {
          const arrayOfObjects = certificatedata[i].skills.map((value) => ({
            value,
            label: value,
          }));
          filterdata.push({
            description: certificatedata[i].description,
            duration_of_project: certificatedata[i].duration_of_project,
            project_title: certificatedata[i].project_title,
            reporting_to: certificatedata[i].reporting_to,
            role: certificatedata[i].role,
            skills: arrayOfObjects,
            type: "edit",
            id: certificatedata[i].id,
          });
        }
        settravelwork(filterdata);
      }
    }
    var skillarrray = Skilllist;
    const uniqueSkills = Array.from(
      new Set(skillarrray.map((skill) => skill.Skill))
    );
    if (uniqueSkills.length !== 0) {
      var filter1 = [];
      for (var i = 0; i < uniqueSkills.length; i++) {
        filter1.push({
          value: uniqueSkills[i],
          label: uniqueSkills[i],
        });
      }
      setskilloption(filter1);
    }
  };

  const displayHandler = async () => {
    if (travelwork.length !== 0) {
      setloading(true);
      var alldata = [];
      for (var i = 0; i < travelwork.length; i++) {
        if (travelwork[i].type === "new") {
          var arrayOf_Values = [];
          if (travelwork[i].skills.length !== 0) {
            arrayOf_Values = travelwork[i].skills.map((obj) => obj.value);
          }
          var newobj = {
            username: userdata[0].username,
            project_details_info: {
              description: travelwork[i].description,
              duration_of_project: travelwork[i].duration_of_project,
              project_title: travelwork[i].project_title,
              reporting_to: travelwork[i].reporting_to,
              role: travelwork[i].role,
              skills: arrayOf_Values,
            },
          };
          alldata.push({
            description: travelwork[i].description,
            duration_of_project: travelwork[i].duration_of_project,
            project_title: travelwork[i].project_title,
            reporting_to: travelwork[i].reporting_to,
            role: travelwork[i].role,
            skills: arrayOf_Values,
          });

          await axios
            .post(
              `${process.env.REACT_APP_LOCAL_HOST_URL}/getProjectDetails/${userid}/`,
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
        } else {
          var arrayOfValues = [];
          if (travelwork[i].skills.length !== 0) {
            arrayOfValues = travelwork[i].skills.map((obj) => obj.value);
          }
          var new_obj = {
            username: userdata[0].username,
            project_details_info: {
              description: travelwork[i].description,
              duration_of_project: travelwork[i].duration_of_project,
              project_title: travelwork[i].project_title,
              reporting_to: travelwork[i].reporting_to,
              role: travelwork[i].role,
              skills: arrayOfValues,
            },
          };
          alldata.push({
            description: travelwork[i].description,
            duration_of_project: travelwork[i].duration_of_project,
            project_title: travelwork[i].project_title,
            reporting_to: travelwork[i].reporting_to,
            role: travelwork[i].role,
            skills: arrayOfValues,
            id: travelwork[i].id,
          });
          await axios
            .put(
              `${process.env.REACT_APP_LOCAL_HOST_URL}/getProjectDetails/${travelwork[i].id}/`,
              new_obj,
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
        }
      }
      let updatedObject = {
        ...userdata[0],
        project_details_info: alldata,
      };
      dispatch(storeAction.userdataHander({ userdata: [] }));
      setTimeout(() => {
        dispatch(storeAction.userdataHander({ userdata: [updatedObject] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setloading(false);
      getUserinfo();
    }
  };
  const [selectedOptionskill, setSelectedOptionskill] = useState(null);
  const [skilloption, setskilloption] = useState([]);
  const [skill_list, setskill_list] = useState([]);
  useEffect(() => {
    getLocationdata();
  }, [selectedOptionskill]);
  const getLocationdata = async () => {
    if (selectedOptionskill !== null) {
      if (selectedOptionskill.length > 5) {
        setSelectedOptionskill(null);
        // setTimeout(() => {
        //   setSelectedOptionskill(selectedOptionskill.slice(0, 5));
        // }, 10);
      } else {
        if (selectedOptionskill !== null) {
          const values_Array = selectedOptionskill.map(
            (country) => country.value
          );
          setskill_list(values_Array);
        }
      }
    }
  };
  const handleSelectChange = (index, selectedOptions) => {
    if (selectedOptions.length <= 5) {
      travelwork[index]["skills"] = selectedOptions;
      settravelwork([...travelwork]);
    }
  };
  return (
    <div>
      <div className="projectDetails">
        <div className="innerprojectDetails">
          <div
            className={isArrow === true ? "projectDetailsHead" : "bottomBorder"}
          >
            <div className="projectDetailsHeadLeft">
              <span>
                <LuFolderOpen />
              </span>
              <h1>Project Details</h1>
            </div>
            <div className="projectDetailsLeftIcon">
              <img
                className="projectDetailsLeftIconSvg"
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
          {isArrow === true ? (
            education_data.length !== 0 ? (
              education_data.map((data, index) => (
                <div className="projectDetailsDesc" key={index}>
                  <h2>{data.project_title}</h2>
                  <div className="projectDetailsDescFlex">
                    <h3>Role : </h3>
                    <p>{data.role}</p>
                  </div>
                  <div className="projectDetailsDescFlex">
                    <h3>Reporting to : </h3>
                    <p>{data.reporting_to}</p>
                  </div>
                  <div className="projectDetailsDescFlex">
                    <h3>Duration : </h3>
                    <p>{data.duration_of_project} </p>
                  </div>
                  <div className="projectDetailsDescFlexLast">
                    <h4>Key Skills:</h4>
                    <p>{data.skills.toString()}</p>
                  </div>
                  <h6>{data.description}</h6>
                  <div className="projectDetailsHighlight">
                    <img src={star} alt="" />
                    <p>
                      Did you know that highlighting more projects enhances your
                      credibility and attracts the attention of potential
                      employers?
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="educationDesc">
                <h1> Add details of projects you worked on in your career</h1>
                <button className="touchButtonnew" onClick={overLayHandler}>
                  <h4>Add Project Details</h4>
                </button>
              </div>
            )
          ) : null}

          {isPopUp === "project" && (
            <div className="projectDetailsOverlay">
              <div className="innerprojectDetailsOverlay">
                <div
                  className={
                    isArrow === true ? "projectDetailsHead" : "bottomBorder"
                  }
                >
                  <div className="projectDetailsHeadLeft">
                    <img src={user} alt="" />
                    <h1>Project Details</h1>
                  </div>
                  <div
                    onClick={exitOverlayHandler}
                    className="projectDetailsLeftIcon"
                  >
                    <RxCross1 />
                  </div>
                </div>
              </div>
              <h6>
                Add your Details to help us match you with the perfect
                opportunity
              </h6>
              {travelwork.length !== 0
                ? travelwork.map((data, index) => (
                    <div className="projectDetailsOverlayFlex" key={index}>
                      <div className="projectDetailsOverlayFlexLeft">
                        <h2>Project Title</h2>
                        <input
                          type="text"
                          name="project_title"
                          onChange={(e) => {
                            handlechangework(
                              e.target.value,
                              index,
                              "project_title"
                            );
                          }}
                          defaultValue={data.project_title}
                        />
                        <h2>Role</h2>
                        <input
                          type="text"
                          name="role"
                          onChange={(e) => {
                            handlechangework(e.target.value, index, "role");
                          }}
                          defaultValue={data.role}
                        />
                        <h2>Reporting to</h2>
                        <input
                          type="text"
                          name="reporting_to"
                          onChange={(e) => {
                            handlechangework(
                              e.target.value,
                              index,
                              "reporting_to"
                            );
                          }}
                          defaultValue={data.reporting_to}
                        />
                        <h2>Duration of project</h2>
                        <input
                          type="date"
                          name="duration_of_project"
                          onChange={(e) => {
                            handlechangework(
                              e.target.value,
                              index,
                              "duration_of_project"
                            );
                          }}
                          defaultValue={data.duration_of_project}
                        />
                        <div className="skillFlex">
                          <h2>Key Skills</h2>
                          <h5>Maximum 5 skills and top 3 skills</h5>
                        </div>
                        <Select
                          value={data.skills}
                          options={skilloption}
                          isMulti
                          onChange={(selectedOption) =>
                            handleSelectChange(index, selectedOption)
                          }
                        />
                      </div>
                      <div className="projectDetailsOverlayFlexRight">
                        <h2>Description</h2>
                        <textarea
                          name="description"
                          onChange={(e) => {
                            handlechangework(
                              e.target.value,
                              index,
                              "description"
                            );
                          }}
                          defaultValue={data.description}
                        ></textarea>
                      </div>
                    </div>
                  ))
                : null}
              <div className="Add_More">
                <button onClick={addcountwork}>
                  <img src={plus} alt="" />
                  <h3>ADD MORE EDUCATION DETAILS</h3>
                </button>
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
                  <button className="save" onClick={displayHandler}>
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

export default ProjectDetails;
