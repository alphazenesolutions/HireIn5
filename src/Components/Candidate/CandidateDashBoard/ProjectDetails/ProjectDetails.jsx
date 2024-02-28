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
  }, []);

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
        skills:
          userdata[0].project_details_info !== null
            ? userdata[0].project_details_info.skills !== undefined
              ? userdata[0].project_details_info.skills.toString(" , ")
              : ""
            : "",
      });
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
        skills: educationdata.skills.split(),
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
      dispatch(storeAction.userdataHander({ userdata: [updatedObject] }));
      dispatch(storeAction.isPopUpHander());

      setloading(false);
    } else {
      setloading(false);
    }
    getUserinfo();
  };
  return (
    <div>
      <div className="projectDetails">
        <div className="innerprojectDetails">
          <div
            className={isArrow === true ? "projectDetailsHead" : "bottomBorder"}
          >
            <div className="projectDetailsHeadLeft">
              <img src={user} alt="" />
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
              <div className="projectDetailsDesc">
                {userdata[0].project_details_info !== null ? (
                  <>
                    <h1>
                      Add details of projects you worked on in your career
                    </h1>
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
                      <p>
                        {userdata[0].project_details_info.skills.toString()}
                      </p>
                    </div>
                    <h6>{userdata[0].project_details_info.description}</h6>
                    <div className="projectDetailsHighlight">
                      <img src={star} alt="" />
                      <p>
                        Did you know that highlighting more projects enhances
                        your credibility and attracts the attention of potential
                        employers?
                      </p>
                    </div>
                  </>
                ) : (
                  <h1>Add details of projects you worked on in your career</h1>
                )}
              </div>
            ) : null)}
          {isPopUp === "project" && (
            <div className="projectDetailsOverlay">
              <div className="innerprojectDetails">
                <div
                  className={
                    isArrow === true ? "projectDetailsHead" : "bottomBorder"
                  }
                >
                  <div className="projectDetailsHeadLeft">
                    <img src={user} alt="" />
                    <h1>Project Details</h1>
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
                    type="date"
                    name="duration_of_project"
                    onChange={handlechange}
                    defaultValue={educationdata.duration_of_project}
                  />
                  <div className="skillFlex">
                    <h2>Key Skills</h2>
                    <h5>Minimum 5 skills and top 3 skills</h5>
                  </div>
                  <input
                    type="text"
                    name="skills"
                    onChange={handlechange}
                    defaultValue={educationdata.skills}
                  />
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
              <div className="AddMore">
                <button>
                  <img src={plus} alt="" />
                  <h3>ADD MORE WORK HISTROY</h3>
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
