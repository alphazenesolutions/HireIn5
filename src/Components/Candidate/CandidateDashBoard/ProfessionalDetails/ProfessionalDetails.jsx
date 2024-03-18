/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./ProfessionalDetails.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import star from "../../../../assests/star.svg";
import plus from "../../../../assests/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import { FiLoader } from "react-icons/fi";
import axios from "axios";
import { FiBriefcase } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import Select from "react-select";
import Skilllist from "../../../../assests/skillsJSON.json";
import { RxCross1 } from "react-icons/rx";

const ProfessionalDetails = () => {
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
    dispatch(storeAction.isPopUpHander("professional"));
  };
  const editOverlayHandler = () => {
    dispatch(storeAction.isPopUpHander());
  };

  const [educationdata, seteducationdata] = useState({
    annual_salary: "",
    company_name: "",
    description: "",
    location: "",
    title: "",
    years_active: "",
    years_active_start: "",
    years_active_end: "",
    skills: "",
  });
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getUserinfo();
  }, [userdata.length !== 0]);

  const getUserinfo = async () => {
    if (userdata.length !== 0) {
      seteducationdata({
        annual_salary:
          userdata[0].professional_details_info !== null
            ? userdata[0].professional_details_info.annual_salary
            : "",
        company_name:
          userdata[0].professional_details_info !== null
            ? userdata[0].professional_details_info.company_name
            : "",
        description:
          userdata[0].professional_details_info !== null
            ? userdata[0].professional_details_info.description
            : "",
        location:
          userdata[0].professional_details_info !== null
            ? userdata[0].professional_details_info.location
            : "",
        title:
          userdata[0].professional_details_info !== null
            ? userdata[0].professional_details_info.title
            : "",
        years_active_start:
          userdata[0].professional_details_info !== null
            ? userdata[0].professional_details_info.years_active.length !== 0
              ? userdata[0].professional_details_info.years_active.split(",")[0]
              : ""
            : "",
        years_active_end:
          userdata[0].professional_details_info !== null
            ? userdata[0].professional_details_info.years_active.length !== 0
              ? userdata[0].professional_details_info.years_active.split(",")[1]
              : ""
            : "",
      });
      if (userdata[0].professional_details_info !== null) {
        if (userdata[0].professional_details_info.skills.length !== 0) {
          var filter = [];
          for (
            var a = 0;
            a < userdata[0].professional_details_info.skills.length;
            a++
          ) {
            filter.push({
              value: userdata[0].professional_details_info.skills[a],
              label: userdata[0].professional_details_info.skills[a],
            });
          }
          setSelectedOptionskill(filter);
          setskill_list(userdata[0].professional_details_info.skills);
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
      professional_details_info: {
        annual_salary: educationdata.annual_salary,
        company_name: educationdata.company_name,
        description: educationdata.description,
        location: educationdata.location,
        title: educationdata.title,
        years_active: `${educationdata.years_active_start},${educationdata.years_active_end}`,
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
        professional_details_info: updatedata.user.professional_details_info,
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
      <div className="professionalDetails">
        <div className="innerprofessionalDetails">
          <div
            className={isArrow === true ? "projectDetailsHead" : "bottomBorder"}
          >
            <div className="professionalDetailsHeadLeft">
              <span>
                <FiBriefcase />
              </span>
              <h1>Professional Details</h1>
            </div>
            <div className="professionalDetailsLeftIcon">
              <img
                className="professionalDetailsLeftIconSvg"
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
              userdata[0].professional_details_info !== null ? (
                <div className="professionalDetailsDesc">
                  <h1>Add your current & Past professional experience here</h1>
                  <h2>{userdata[0].professional_details_info.title}</h2>
                  <h3>{userdata[0].professional_details_info.company_name}</h3>
                  <h4>
                    {
                      userdata[0].professional_details_info.years_active.split(
                        ","
                      )[0]
                    }{" "}
                    -{" "}
                    {
                      userdata[0].professional_details_info.years_active.split(
                        ","
                      )[1]
                    }
                  </h4>
                  <h4>{userdata[0].professional_details_info.location}</h4>
                  <h5>{userdata[0].professional_details_info.description}</h5>

                  <h6>
                    Key Skills :{" "}
                    <span className="professionalDetailsDescSkills">
                      {userdata[0].professional_details_info.skills.toString()}{" "}
                    </span>
                  </h6>

                  <h6>
                    Gross Annual Salary :{" "}
                    {userdata[0].professional_details_info.annual_salary}{" "}
                  </h6>
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
                  <h1> Add your current & Past professional experience here</h1>
                  <button className="touchButtonnew" onClick={overLayHandler}>
                    <h4>Add Professional Details</h4>
                  </button>
                </div>
              )
            ) : (
              <div className="educationDesc">
                <h1> Add your current & Past professional experience here</h1>
                <button className="touchButtonnew" onClick={overLayHandler}>
                  <h4>Add Professional Details</h4>
                </button>
              </div>
            ))}
          {isPopUp === "professional" && (
            <div className="professionalDetailsOverlay">
              <div className="innerprofessionalDetailsOverlay">
                <div className="projectDetailsHead">
                  <div className="professionalDetailsHeadLeft">
                    <img src={user} alt="" />
                    <h1>Professional Details</h1>
                  </div>
                  <div
                    onClick={editOverlayHandler}
                    className="professionalDetailsLeftIcon"
                  >
                    <RxCross1 />

                    {/* <img
                      className="professionalDetailsLeftIconSvg"
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
              <h6>Add your current & Past professional experience here</h6>
              <div className="professionalDetailsOverlayFlex">
                <div className="professionalDetailsOverlayLeft">
                  <h2>Title / Role</h2>
                  <input
                    placeholder="Java Developer"
                    type="text"
                    name="title"
                    onChange={handlechange}
                    defaultValue={educationdata.title}
                  />
                  <h2>Company Name</h2>
                  <input
                    placeholder="PhonePe"
                    type="text"
                    name="company_name"
                    onChange={handlechange}
                    defaultValue={educationdata.company_name}
                  />
                  <h2>Location</h2>
                  <input
                    placeholder="Hyderabad, india"
                    type="text"
                    name="location"
                    onChange={handlechange}
                    defaultValue={educationdata.location}
                  />
                  <h2>Gross Annual Salary</h2>
                  <div className="grossSalary">
                    <select name="" id="">
                      <option value="">INR</option>
                    </select>
                    <input
                      placeholder=""
                      type="text"
                      name="annual_salary"
                      onChange={handlechange}
                      defaultValue={educationdata.annual_salary}
                    />
                  </div>
                </div>
                <div className="professionalDetailsOverlayRight">
                  <h2>Years Active</h2>
                  <div className="yearsActive">
                    <input
                      type="date"
                      name="years_active_start"
                      onChange={handlechange}
                      defaultValue={educationdata.years_active_start}
                    />
                    <input
                      type="date"
                      name="years_active_end"
                      onChange={handlechange}
                      defaultValue={educationdata.years_active_end}
                    />
                  </div>
                  <h2>Skills</h2>
                  {/* <input
                    placeholder="HTML"
                    type="text"
                    name="skills"
                    onChange={handlechange}
                    defaultValue={educationdata.skills}
                  /> */}
                  <Select
                    value={selectedOptionskill}
                    options={skilloption}
                    isMulti
                    onChange={handleSelectChange}
                  />
                  <div className="textDesc">
                    <h2>Description / Additional</h2>
                    <h5>{educationdata.description.length}/200</h5>
                  </div>
                  <textarea
                    className="text"
                    name="description"
                    onChange={handlechange}
                    maxLength={200}
                    defaultValue={educationdata.description}
                    placeholder="As always, all Htmlstream products are excellent with a very good personalition"
                  />
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

export default ProfessionalDetails;
