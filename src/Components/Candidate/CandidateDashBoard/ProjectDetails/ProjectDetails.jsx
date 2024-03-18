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

  const [educationdata, seteducationdata] = useState({
    description: "",
    duration_of_project: "",
    project_title: "",
    reporting_to: "",
    role: "",
    skills: "",
  });
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getUserinfo();
  }, [userdata.length !== 0]);

  const getUserinfo = async () => {
    if (userdata.length !== 0) {
      seteducationdata({
        description:
          userdata[0].project_details_info !== null
            ? userdata[0].project_details_info.description
            : "",
        duration_of_project:
          userdata[0].project_details_info !== null
            ? userdata[0].project_details_info.duration_of_project
            : "",
        project_title:
          userdata[0].project_details_info !== null
            ? userdata[0].project_details_info.project_title
            : "",
        reporting_to:
          userdata[0].project_details_info !== null
            ? userdata[0].project_details_info.reporting_to
            : "",
        role:
          userdata[0].project_details_info !== null
            ? userdata[0].project_details_info.role
            : "",
      });
      if (userdata[0].project_details_info !== null) {
        if (userdata[0].project_details_info.skills.length !== 0) {
          var filter = [];
          for (
            var a = 0;
            a < userdata[0].project_details_info.skills.length;
            a++
          ) {
            filter.push({
              value: userdata[0].project_details_info.skills[a],
              label: userdata[0].project_details_info.skills[a],
            });
          }
          setSelectedOptionskill(filter);
          setskill_list(userdata[0].project_details_info.skills);
        }
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

  const handlechange = (e) => {
    const { name, value } = e.target;
    seteducationdata((values) => ({ ...values, [name]: value }));
  };
  const displayHandler = async () => {
    setloading(true);
    var newobj = {
      username: userdata[0].username,
      project_details_info: {
        description: educationdata.description,
        duration_of_project: educationdata.duration_of_project,
        project_title: educationdata.project_title,
        reporting_to: educationdata.reporting_to,
        role: educationdata.role,
        skills: skill_list,
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
        project_details_info: updatedata.user.project_details_info,
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
  const handleSelectChange = (selectedOptions) => {
    if (selectedOptions.length <= 5) {
      setSelectedOptionskill(selectedOptions);
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
          {isArrow === true &&
            (userdata.length !== 0 ? (
              userdata[0].project_details_info !== null ? (
                <div className="projectDetailsDesc">
                  <h1>Add details of projects you worked on in your career</h1>
                  <h2>{userdata[0].project_details_info.project_title}</h2>
                  <div className="projectDetailsDescFlex">
                    <h3>Role : </h3>
                    <p>{userdata[0].project_details_info.role}</p>
                  </div>
                  <div className="projectDetailsDescFlex">
                    <h3>Reporting to : </h3>
                    <p>{userdata[0].project_details_info.reporting_to}</p>
                  </div>
                  <div className="projectDetailsDescFlex">
                    <h3>Duration : </h3>
                    <p>
                      {userdata[0].project_details_info.duration_of_project}{" "}
                    </p>
                  </div>
                  <div className="projectDetailsDescFlexLast">
                    <h4>Key Skills:</h4>
                    <p>{userdata[0].project_details_info.skills.toString()}</p>
                  </div>
                  <h6>{userdata[0].project_details_info.description}</h6>
                  <div className="projectDetailsHighlight">
                    <img src={star} alt="" />
                    <p>
                      Did you know that highlighting more projects enhances your
                      credibility and attracts the attention of potential
                      employers?
                    </p>
                  </div>
                </div>
              ) : (
                <div className="educationDesc">
                  <h1> Add details of projects you worked on in your career</h1>
                  <button className="touchButtonnew" onClick={overLayHandler}>
                    <h4>Add Project Details</h4>
                  </button>
                </div>
              )
            ) : (
              <div className="educationDesc">
                <h1> Add details of projects you worked on in your career</h1>
                <button className="touchButtonnew" onClick={overLayHandler}>
                  <h4>Add Project Details</h4>
                </button>
              </div>
            ))}
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

                    {/* <img
                      className="projectDetailsLeftIconSvg"
                      onClick={overLayHandler}
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
              <div className="projectDetailsOverlayFlex">
                <div className="projectDetailsOverlayFlexLeft">
                  <h2>Project Title</h2>
                  <input
                    type="text"
                    name="project_title"
                    onChange={handlechange}
                    defaultValue={educationdata.project_title}
                  />
                  <h2>Role</h2>
                  <input
                    type="text"
                    name="role"
                    onChange={handlechange}
                    defaultValue={educationdata.role}
                  />
                  <h2>Reporting to</h2>
                  <input
                    type="text"
                    name="reporting_to"
                    onChange={handlechange}
                    defaultValue={educationdata.reporting_to}
                  />
                  <h2>Duration of project</h2>
                  <input
                    type="number"
                    name="duration_of_project"
                    onChange={handlechange}
                    defaultValue={educationdata.duration_of_project}
                  />
                  <div className="skillFlex">
                    <h2>Key Skills</h2>
                    <h5>Maximum 5 skills and top 3 skills</h5>
                  </div>
                  <Select
                    value={selectedOptionskill}
                    options={skilloption}
                    isMulti
                    onChange={handleSelectChange}
                  />
                  {/* <input
                    type="text"
                    name="skills"
                    onChange={handlechange}
                    defaultValue={educationdata.skills}
                  /> */}
                </div>
                <div className="projectDetailsOverlayFlexRight">
                  <h2>Description</h2>
                  <textarea
                    name="description"
                    onChange={handlechange}
                    defaultValue={educationdata.description}
                  ></textarea>
                </div>
              </div>
              {/* <div className="AddMore">
                <button>
                  <img src={plus} alt="" />
                  <h3>ADD MORE WORK HISTROY</h3>
                </button>
              </div> */}
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
