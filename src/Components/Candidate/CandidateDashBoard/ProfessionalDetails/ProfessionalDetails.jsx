/* eslint-disable no-redeclare */
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

  const [loading, setloading] = useState(false);

  const [education_data, seteducation_data] = useState([]);
  const [travelwork, settravelwork] = useState([
    {
      annual_salary: "",
      company_name: "",
      description: "",
      location: "",
      title: "",
      years_active: "",
      years_active_start: "",
      years_active_end: "",
      skills: [],
      type: "new",
    },
  ]);

  const addcountwork = () => {
    var newobj = {
      annual_salary: "",
      company_name: "",
      description: "",
      location: "",
      title: "",
      years_active: "",
      years_active_start: "",
      years_active_end: "",
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
      var certificatedata = userdata[0].professional_details_info;
      if (certificatedata.length !== 0) {
        seteducation_data(certificatedata);
        var filterdata = [];
        for (var i = 0; i < certificatedata.length; i++) {
          const arrayOfObjects = certificatedata[i].skills.map((value) => ({
            value,
            label: value,
          }));
          console.log(arrayOfObjects, "arrayOfObjects");
          filterdata.push({
            annual_salary: certificatedata[i].annual_salary,
            company_name: certificatedata[i].company_name,
            description: certificatedata[i].description,
            location: certificatedata[i].location,
            title: certificatedata[i].title,
            years_active: certificatedata[i].years_active,
            years_active_start: certificatedata[i].years_active_start,
            years_active_end: certificatedata[i].years_active_end,
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
            professional_details_info: {
              annual_salary: travelwork[i].annual_salary,
              company_name: travelwork[i].company_name,
              description: travelwork[i].description,
              location: travelwork[i].location,
              title: travelwork[i].title,
              years_active: travelwork[i].years_active,
              years_active_start: travelwork[i].years_active_start,
              years_active_end: travelwork[i].years_active_end,
              skills: arrayOf_Values,
            },
          };
          alldata.push({
            annual_salary: travelwork[i].annual_salary,
            company_name: travelwork[i].company_name,
            description: travelwork[i].description,
            location: travelwork[i].location,
            title: travelwork[i].title,
            years_active: travelwork[i].years_active,
            years_active_start: travelwork[i].years_active_start,
            years_active_end: travelwork[i].years_active_end,
            skills: arrayOf_Values,
          });

          await axios
            .post(
              `${process.env.REACT_APP_LOCAL_HOST_URL}/getProffessionalDetails/${userid}/`,
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
            professional_details_info: {
              annual_salary: travelwork[i].annual_salary,
              company_name: travelwork[i].company_name,
              description: travelwork[i].description,
              location: travelwork[i].location,
              title: travelwork[i].title,
              years_active: travelwork[i].years_active,
              years_active_start: travelwork[i].years_active_start,
              years_active_end: travelwork[i].years_active_end,
              skills: arrayOfValues,
            },
          };
          alldata.push({
            annual_salary: travelwork[i].annual_salary,
            company_name: travelwork[i].company_name,
            description: travelwork[i].description,
            location: travelwork[i].location,
            title: travelwork[i].title,
            years_active: travelwork[i].years_active,
            years_active_start: travelwork[i].years_active_start,
            years_active_end: travelwork[i].years_active_end,
            skills: arrayOfValues,
            id: travelwork[i].id,
          });
          await axios
            .put(
              `${process.env.REACT_APP_LOCAL_HOST_URL}/getProffessionalDetails/${travelwork[i].id}/`,
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
        professional_details_info: alldata,
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
          {isArrow === true ? (
            education_data.length !== 0 ? (
              education_data.map((data, index) => (
                <div className="professionalDetailsDesc" key={index}>
                  <h1>Add your current & Past professional experience here</h1>
                  <h2>{data.title}</h2>
                  <h3>{data.company_name}</h3>
                  <h4>
                    {data.years_active.split(",")[0]} -{" "}
                    {data.years_active.split(",")[1]}
                  </h4>
                  <h4>{data.location}</h4>
                  <h5>{data.description}</h5>
                  <h6>
                    Key Skills :{" "}
                    <span className="professionalDetailsDescSkills">
                      {data.skills.toString()}{" "}
                    </span>
                  </h6>
                  <h6>Gross Annual Salary : {data.annual_salary} </h6>
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
                <h1> Add your current & Past professional experience here</h1>
                <button className="touchButtonnew" onClick={overLayHandler}>
                  <h4>Add Professional Details</h4>
                </button>
              </div>
            )
          ) : null}

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
                  </div>
                </div>
              </div>
              <h6>Add your current & Past professional experience here</h6>
              {travelwork.length !== 0
                ? travelwork.map((data, index) => (
                    <div className="professionalDetailsOverlayFlex">
                      <div className="professionalDetailsOverlayLeft">
                        <h2>Title / Role</h2>
                        <input
                          placeholder="Java Developer"
                          type="text"
                          name="title"
                          onChange={(e) => {
                            handlechangework(e.target.value, index, "title");
                          }}
                          defaultValue={data.title}
                        />
                        <h2>Company Name</h2>
                        <input
                          placeholder="PhonePe"
                          type="text"
                          name="company_name"
                          onChange={(e) => {
                            handlechangework(
                              e.target.value,
                              index,
                              "company_name"
                            );
                          }}
                          defaultValue={data.company_name}
                        />
                        <h2>Location</h2>
                        <input
                          placeholder="Hyderabad, india"
                          type="text"
                          name="location"
                          onChange={(e) => {
                            handlechangework(e.target.value, index, "location");
                          }}
                          defaultValue={data.location}
                        />
                        <h2>Gross Annual Salary</h2>
                        <div className="grossSalary">
                          {/* <select name="" id="">
                            <option value="">INR</option>
                          </select> */}
                          <input
                            placeholder=""
                            type="text"
                            name="annual_salary"
                            onChange={(e) => {
                              handlechangework(
                                e.target.value,
                                index,
                                "annual_salary"
                              );
                            }}
                            defaultValue={data.annual_salary}
                          />
                        </div>
                      </div>
                      <div className="professionalDetailsOverlayRight">
                        <h2>Years Active</h2>
                        <div className="yearsActive">
                          <input
                            type="date"
                            name="years_active_start"
                            onChange={(e) => {
                              handlechangework(
                                e.target.value,
                                index,
                                "years_active_start"
                              );
                            }}
                            defaultValue={data.years_active_start}
                          />
                          <input
                            type="date"
                            name="years_active_end"
                            onChange={(e) => {
                              handlechangework(
                                e.target.value,
                                index,
                                "years_active_end"
                              );
                            }}
                            defaultValue={data.years_active_end}
                          />
                        </div>
                        <h2>Skills</h2>

                        <Select
                          value={data.skills}
                          options={skilloption}
                          isMulti
                          onChange={(selectedOption) =>
                            handleSelectChange(index, selectedOption)
                          }
                        />
                        <div className="textDesc">
                          <h2>Description / Additional</h2>
                          <h5>{data.description.length}/200</h5>
                        </div>
                        <textarea
                          className="text"
                          name="description"
                          onChange={(e) => {
                            handlechangework(
                              e.target.value,
                              index,
                              "description"
                            );
                          }}
                          defaultValue={data.description}
                          placeholder="As always, all Htmlstream products are excellent with a very good personalition"
                        />
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

export default ProfessionalDetails;
