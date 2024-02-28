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
  }, []);

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
        skills:
          userdata[0].professional_details_info !== null
            ? userdata[0].professional_details_info.skills !== undefined
              ? userdata[0].professional_details_info.skills.toString(" , ")
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
      professional_details_info: {
        annual_salary: educationdata.annual_salary,
        company_name: educationdata.company_name,
        description: educationdata.description,
        location: educationdata.location,
        title: educationdata.title,
        years_active: `${educationdata.years_active_start},${educationdata.years_active_end}`,
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
        professional_details_info: updatedata.user.professional_details_info,
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
      <div className="professionalDetails">
        <div className="innerprofessionalDetails">
          <div
            className={isArrow === true ? "projectDetailsHead" : "bottomBorder"}
          >
            <div className="professionalDetailsHeadLeft">
              <img src={user} alt="" />
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
              <div className="professionalDetailsDesc">
                {userdata[0].professional_details_info !== null ? (
                  <>
                    <h1>
                      Add your current & Past professional experience here
                    </h1>
                    <h2>{userdata[0].professional_details_info.title}</h2>
                    <h3>
                      {userdata[0].professional_details_info.company_name}
                    </h3>
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
                      {userdata[0].professional_details_info.skills.toString()}{" "}
                    </h6>
                    <h6>
                      Gross Annual Salary :{" "}
                      {userdata[0].professional_details_info.annual_salary}{" "}
                    </h6>
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
                  <h1>Add your current & Past professional experience here</h1>
                )}
              </div>
            ) : null)}
          {isPopUp === "professional" && (
            <div className="professionalDetailsOverlay">
              <div className="innerprofessionalDetails">
                <div className="projectDetailsHead">
                  <div className="professionalDetailsHeadLeft">
                    <img src={user} alt="" />
                    <h1>Professional Details</h1>
                  </div>
                  <div className="professionalDetailsLeftIcon">
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
                  <input
                    placeholder="HTML"
                    type="text"
                    name="skills"
                    onChange={handlechange}
                    defaultValue={educationdata.skills}
                  />
                  <div className="textDesc">
                    <h2>Description / Additional</h2>
                    <h5>82/250</h5>
                  </div>
                  <textarea
                    className="text"
                    name="description"
                    onChange={handlechange}
                    defaultValue={educationdata.description}
                    placeholder="As always, all Htmlstream products are excellent with a very good personalition"
                  />
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

export default ProfessionalDetails;
