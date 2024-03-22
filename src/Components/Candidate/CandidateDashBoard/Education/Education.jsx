/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./Education.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import plus from "../../../../assests/plus.svg";
import gallery from "../../../../assests/gallery.svg";
import trash from "../../../../assests/trash-2.svg";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

import { FiBookOpen } from "react-icons/fi";

const Education = () => {
  const userdata = useSelector((store) => store.userdata);
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);

  const dispatch = useDispatch();
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };
  const exitOverlayHandler = () => {
    dispatch(storeAction.isPopUpHander());
  };

  const [isUpload, setIsUpload] = useState(false);

  const [isShow, setIsShow] = useState(false);
  const [index, setindex] = useState(null);

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("education"));
    setIsArrow(true);
  };

  const [travelwork, settravelwork] = useState([
    {
      cgpa: "",
      degree: "",
      education_level: "",
      study_mode: "",
      university_name: "",
      year_of_graduation: "",
      type: "new",
      upload_file: [],
    },
  ]);

  const addcountwork = () => {
    var newobj = {
      cgpa: "",
      degree: "",
      education_level: "",
      study_mode: "",
      university_name: "",
      year_of_graduation: "",
      type: "new",
      upload_file: [],
    };
    settravelwork((prevState) => [...prevState, newobj]);
  };

  const handlechangework = (value, index, name) => {
    travelwork[index][name] = value;
    settravelwork([...travelwork]);
  };
  const [loading, setloading] = useState(false);
  const [education_data, seteducation_data] = useState([]);

  useEffect(() => {
    getUserinfo();
  }, [userdata.length !== 0]);

  const getUserinfo = async () => {
    if (userdata.length !== 0) {
      var certificatedata = userdata[0].education_info;
      if (certificatedata.length !== 0) {
        seteducation_data(certificatedata);
        var filterdata = [];
        for (var i = 0; i < certificatedata.length; i++) {
          filterdata.push({
            cgpa: certificatedata[i].cgpa,
            degree: certificatedata[i].degree,
            education_level: certificatedata[i].education_level,
            study_mode: certificatedata[i].study_mode,
            university_name: certificatedata[i].university_name,
            year_of_graduation: certificatedata[i].year_of_graduation,
            type: "edit",
            upload_file: certificatedata[i].upload_file,
            id: certificatedata[i].id,
          });
        }
        settravelwork(filterdata);
      }
    }
  };
  const displayHandler = async () => {
    if (travelwork.length !== 0) {
      setloading(true);
      var alldata = [];
      for (var i = 0; i < travelwork.length; i++) {
        alldata.push({
          cgpa: travelwork[i].cgpa,
          degree: travelwork[i].degree,
          education_level: travelwork[i].education_level,
          study_mode: travelwork[i].study_mode,
          university_name: travelwork[i].university_name,
          year_of_graduation: travelwork[i].year_of_graduation,
          upload_file: travelwork[i].upload_file,
          id: travelwork[i].id,
        });
        if (travelwork[i].type === "new") {
          var newobj = {
            education_info: {
              cgpa: travelwork[i].cgpa,
              degree: travelwork[i].degree,
              education_level: travelwork[i].education_level,
              study_mode: travelwork[i].study_mode,
              university_name: travelwork[i].university_name,
              year_of_graduation: travelwork[i].year_of_graduation,
              upload_file: travelwork[i].upload_file,
            },
            username: userdata[0].username,
          };

          await axios
            .post(
              `${process.env.REACT_APP_LOCAL_HOST_URL}/getEducations/${userid}/`,
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
          var new_obj = {
            education_info: {
              cgpa: travelwork[i].cgpa,
              degree: travelwork[i].degree,
              education_level: travelwork[i].education_level,
              study_mode: travelwork[i].study_mode,
              university_name: travelwork[i].university_name,
              year_of_graduation: travelwork[i].year_of_graduation,
              upload_file: travelwork[i].upload_file,
            },
            username: userdata[0].username,
          };
          await axios
            .put(
              `${process.env.REACT_APP_LOCAL_HOST_URL}/getEducations/${travelwork[i].id}/`,
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
        education_info: alldata,
      };
      dispatch(storeAction.userdataHander({ userdata: [] }));
      setTimeout(() => {
        dispatch(storeAction.userdataHander({ userdata: [updatedObject] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsShow(!isShow);
      setloading(false);
      getUserinfo();
    }
  };
  const fileInputRef = useRef(null);

  const uploadHandler = (index) => {
    fileInputRef.current.click();
    setindex(index);
  };
  var [certificate, setcertificate] = useState([]);
  const [formData] = useState(new FormData());
  const handleFileInputChange = async (e) => {
    formData.append("image", e.target.files[0]);
    const selectedImage = e.target.files[0];
    if (selectedImage.size > 5 * 1024 * 1024) {
      fileInputRef.current.value = "";
      alert("Image size exceeds 5 MB limit.");
    } else {
      formData.append("name", `certificate${userid}`);
      const response = await axios.post(
        "https://fileserver-21t2.onrender.com/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedTravelwork = [...travelwork];
      const updatedObj = {
        ...updatedTravelwork[index],
        upload_file: [
          ...updatedTravelwork[index].upload_file,
          response.data.img_url,
        ],
      };
      updatedTravelwork[index] = updatedObj;
      settravelwork(updatedTravelwork);
      fileInputRef.current.value = "";
      setIsUpload(true);
    }
  };
  // const deletebtn = async (id) => {
  //   const updatedElements = [...certificate];
  //   updatedElements.splice(id, 1);
  //   setcertificate(updatedElements);
  // };

  return (
    <div>
      <div className="education">
        <div className="innerEducation">
          <div className={isArrow === true ? "educationHead" : "bottomBorder"}>
            <div className="educationHeadLeft">
              <span>
                <FiBookOpen />
              </span>
              <h1>Education</h1>
            </div>
            <div className="educationLeftIcon">
              <img
                className="educationLeftIconSvg"
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
                <div className="educationDesc" key={index}>
                  <h2>{data.degree}</h2>
                  <div className="educationDescFlex">
                    <h3>Name of University/School : </h3>
                    <p>{data.university_name} </p>
                  </div>
                  <div className="educationDescFlex">
                    <h3>Year of Graduation : </h3>
                    <p>{data.year_of_graduation}</p>
                  </div>
                  <div className="educationDescFlex">
                    <h3>Education Level : </h3>
                    <p>{data.education_level} </p>
                  </div>
                  <div className="educationDescFlex">
                    <h4>Study Mode : </h4>
                    <p>{data.study_mode}</p>
                  </div>
                  <div className="educationDescFlexLast">
                    <h4>CGPA : </h4>
                    <p>{data.cgpa}</p>
                  </div>
                  {data.upload_file.length !== 0
                    ? data.upload_file.map((data, index) =>
                        data.length !== 0 ? (
                          <div
                            className="gradeCertificate"
                            key={index}
                            onClick={() => {
                              window.open(`${data}`, "_blank");
                            }}
                          >
                            <img src={gallery} alt="" />
                            <div className="gradeCertificateDesc">
                              <h2>{data.split("/images/")[1].split("/")[1]}</h2>
                              {/* <p>4 MB</p> */}
                            </div>
                          </div>
                        ) : null
                      )
                    : null}
                </div>
              ))
            ) : (
              <div className="educationDesc">
                <h1>Add your education and degrees here</h1>
                <button className="touchButtonnew" onClick={overLayHandler}>
                  <h4>Add Education Details</h4>
                </button>
              </div>
            )
          ) : null}

          {isPopUp === "education" && (
            <div className="educationDescOverlay">
              <div
                className={isArrow === true ? "educationHead" : "bottomBorder"}
              >
                <div className="educationHeadLeft">
                  <img src={user} alt="" />
                  <h1>Education</h1>
                </div>
                <div onClick={exitOverlayHandler} className="educationLeftIcon">
                  <RxCross1 />

                  {/* <img
                    className="educationLeftIconSvg"
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
              <div className="innerEducationOverlay">
                <h6>
                  Add certification / course Details here to enhance your
                  profile
                </h6>
                {travelwork.length !== 0
                  ? travelwork.map((data, index) => (
                      <>
                        <div className="educationDescOverlayFlex" key={index}>
                          <div className="educationDescOverlayFlexLeft">
                            <h2>Degree</h2>
                            <input
                              type="text"
                              name="degree"
                              onChange={(e) => {
                                handlechangework(
                                  e.target.value,
                                  index,
                                  "degree"
                                );
                              }}
                              defaultValue={data.degree}
                            />
                            <h2>Name of University / School</h2>
                            <input
                              type="text"
                              name="university_name"
                              onChange={(e) => {
                                handlechangework(
                                  e.target.value,
                                  index,
                                  "university_name"
                                );
                              }}
                              defaultValue={data.university_name}
                            />
                            <h2>CGPA</h2>
                            <input
                              type="text"
                              name="cgpa"
                              onChange={(e) => {
                                handlechangework(e.target.value, index, "cgpa");
                              }}
                              defaultValue={data.cgpa}
                            />
                          </div>
                          <div className="educationDescOverlayFlexRight">
                            <h2>Year of Graduation</h2>
                            <input
                              type="text"
                              name="year_of_graduation"
                              onChange={(e) => {
                                handlechangework(
                                  e.target.value,
                                  index,
                                  "year_of_graduation"
                                );
                              }}
                              defaultValue={data.year_of_graduation}
                            />
                            <h2>Education Level</h2>
                            <select
                              name="education_level"
                              onChange={(e) => {
                                handlechangework(
                                  e.target.value,
                                  index,
                                  "education_level"
                                );
                              }}
                              defaultValue={data.education_level}
                              selected={data.education_level}
                            >
                              <option>Select</option>
                              <option value="UG">UG</option>
                              <option value="PG">PG</option>
                            </select>

                            <h2>Study Mode</h2>
                            <select
                              name="study_mode"
                              onChange={(e) => {
                                handlechangework(
                                  e.target.value,
                                  index,
                                  "study_mode"
                                );
                              }}
                              defaultValue={data.study_mode}
                              selected={data.study_mode}
                            >
                              <option value="">Select Study Mode</option>
                              <option value="full-time">Full-time</option>
                              <option value="part-time">Part-time</option>
                            </select>
                          </div>
                        </div>

                        <>
                          <div
                            onClick={() => {
                              uploadHandler(index);
                            }}
                            className="educationUpload"
                          >
                            <h2>
                              Drop your files here or
                              <span className="browser">browse</span>
                            </h2>
                            <h5>Maximum size: 5MB</h5>
                            <h5>PDF, JPEG and PNG accepted</h5>
                          </div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            name="aadhaarfront"
                            onChange={handleFileInputChange}
                          />
                        </>
                        <>
                          {data.upload_file.length !== 0
                            ? data.upload_file.map((data, index) => (
                                <div className="educationUploaded">
                                  <div className="educationUploadedFlex">
                                    <div className="educationUploadedFlexLeft">
                                      <img src={gallery} alt="" />
                                      <div className="educationUploadedFlexLeftDesc">
                                        <h2>certificate{index + 1}.jpeg</h2>
                                        {/* <p>4 MB</p> */}
                                      </div>
                                    </div>
                                    {/* <div
                                      className="educationUploadedFlexRight"
                                      onClick={() => {
                                        deletebtn(index);
                                      }}
                                    >
                                      <img src={trash} alt="" />
                                    </div> */}
                                  </div>
                                  <div className="percent">
                                    <div className="range">
                                      <div className="InnerRange"></div>
                                    </div>
                                    <h2>100%</h2>
                                  </div>
                                </div>
                              ))
                            : null}
                        </>
                      </>
                    ))
                  : null}

                <div className="Add_More">
                  <button onClick={addcountwork}>
                    <img src={plus} alt="" />
                    <h3>ADD MORE EDUCATION DETAILS</h3>
                  </button>
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

export default Education;
