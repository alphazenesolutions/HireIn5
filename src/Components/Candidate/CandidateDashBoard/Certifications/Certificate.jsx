/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./Certificate.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import star from "../../../../assests/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import plus from "../../../../assests/plus.svg";
import gallery from "../../../../assests/gallery.svg";
import trash from "../../../../assests/trash-2.svg";
import { FiLoader } from "react-icons/fi";
import axios from "axios";
import { FiAward } from "react-icons/fi";
import Select from "react-select";
import Skilllist from "../../../../assests/skillsJSON.json";
import { RxCross1 } from "react-icons/rx";

const Certificate = () => {
  const userdata = useSelector((store) => store.userdata);
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);

  const dispatch = useDispatch();
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };

  const [isUpload, setIsUpload] = useState(false);

  const [isShow, setIsShow] = useState(false);

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
            certificate_info: {
              course_name: travelwork[i].course_name,
              date_issued: travelwork[i].date_issued,
              description: travelwork[i].description,
              url: travelwork[i].url,
              skills: arrayOf_Values,
              certificate_file: travelwork[i].certificate_file,
            },
          };
          alldata.push({
            course_name: travelwork[i].course_name,
            date_issued: travelwork[i].date_issued,
            description: travelwork[i].description,
            url: travelwork[i].url,
            skills: arrayOf_Values,
            certificate_file: travelwork[i].certificate_file,
          });
          await axios
            .post(
              `${process.env.REACT_APP_LOCAL_HOST_URL}/getCertifications/${userid}/`,
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
            certificate_info: {
              course_name: travelwork[i].course_name,
              date_issued: travelwork[i].date_issued,
              description: travelwork[i].description,
              url: travelwork[i].url,
              skills: arrayOfValues,
              certificate_file: travelwork[i].certificate_file,
            },
          };
          alldata.push({
            course_name: travelwork[i].course_name,
            date_issued: travelwork[i].date_issued,
            description: travelwork[i].description,
            url: travelwork[i].url,
            skills: arrayOfValues,
            certificate_file: travelwork[i].certificate_file,
            id: travelwork[i].id,
          });
          await axios
            .put(
              `${process.env.REACT_APP_LOCAL_HOST_URL}/getCertifications/${travelwork[i].id}/`,
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
        certificate_info: alldata,
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

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("certificate"));
  };

  const exitOverlayHandler = () => {
    dispatch(storeAction.isPopUpHander());
  };
  const [loading, setloading] = useState(false);
  const [education_data, seteducation_data] = useState([]);
  const [travelwork, settravelwork] = useState([
    {
      course_name: "",
      date_issued: "",
      description: "",
      url: "",
      skills: [],
      type: "new",
      certificate_file: [],
    },
  ]);

  const addcountwork = () => {
    var newobj = {
      course_name: "",
      date_issued: "",
      description: "",
      url: "",
      skills: [],
      type: "new",
      certificate_file: [],
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
      var certificatedata = userdata[0].certificate_info;
      if (certificatedata.length !== 0) {
        seteducation_data(certificatedata);
        var filterdata = [];
        for (var i = 0; i < certificatedata.length; i++) {
          const arrayOfObjects = certificatedata[i].skills.map((value) => ({
            value,
            label: value,
          }));

          filterdata.push({
            course_name: certificatedata[i].course_name,
            date_issued: certificatedata[i].date_issued,
            description: certificatedata[i].description,
            url: certificatedata[i].url,
            skills: arrayOfObjects,
            type: "edit",
            certificate_file: certificatedata[i].certificate_file,
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
  const fileInputRef = useRef(null);
  const uploadHandler = (index) => {
    fileInputRef.current.click();
    setindex(index);
  };
  const [index, setindex] = useState(null);
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
        certificate_file: [
          ...updatedTravelwork[index].certificate_file,
          response.data.img_url,
        ],
      };
      updatedTravelwork[index] = updatedObj;
      settravelwork(updatedTravelwork);
      fileInputRef.current.value = "";
      setIsUpload(true);
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
      <div className="certificate">
        <div className="innerCertificate">
          <div
            className={isArrow === true ? "certificateHead" : "bottomBorder"}
          >
            <div className="certificateHeadLeft">
              <span>
                <FiAward />
              </span>
              <h1>Certificate</h1>
            </div>
            <div className="certificateLeftIcon">
              <img
                className="certificateLeftIconSvg"
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
            (education_data.length !== 0 ? (
              <div className="certificateDesc">
                <h1>
                  Add certification / course Details here to enhance your
                  profile
                </h1>
                <div key={index}>
                  {education_data.map((data, index) => (
                    <div className="innerCertificateDesc" key={index}>
                      <h2>{data.course_name}</h2>
                      <div className="certificateDescFlex">
                        <h3>Date Issued:</h3>
                        <p>{data.date_issued}</p>
                      </div>
                      <div className="certificateDescFlex">
                        <h3>URL:</h3>
                        <p>{data.url}</p>
                      </div>
                      <div className="certificateDescFlexLast">
                        <h4>Key Skills:</h4>
                        <p>{data.skills.toString()}</p>
                      </div>
                      <p>{data.description}</p>
                      {data.certificate_file.length !== 0
                        ? data.certificate_file.map((data, index) =>
                            data.length !== 0 ? (
                              <div
                                className="gradeCertificate"
                                onClick={() => {
                                  window.open(`${data}`, "_blank");
                                }}
                                key={index}
                              >
                                <img src={gallery} alt="" />
                                <div className="gradeCertificateDesc">
                                  <h2>
                                    {data.split("/images/")[1].split("/")[1]}
                                  </h2>
                                </div>
                              </div>
                            ) : null
                          )
                        : null}
                    </div>
                  ))}

                  <div className="flex gap-4"></div>
                </div>
              </div>
            ) : (
              <div className="educationDesc">
                <h1>
                  Add certification / course Details here to enhance your
                  profile
                </h1>
                <button className="touchButtonnew" onClick={overLayHandler}>
                  <h4>Add Certificate</h4>
                </button>
              </div>
            ))}
          {isPopUp === "certificate" && (
            <div className="certificateDescOverlay">
              <div className="innerCertificateOverlay">
                <div
                  className={
                    isArrow === true ? "certificateHead" : "bottomBorder"
                  }
                >
                  <div className="certificateHeadLeft">
                    <img src={user} alt="" />
                    <h1>Certificate</h1>
                  </div>
                  <div
                    onClick={exitOverlayHandler}
                    className="certificateLeftIcon"
                  >
                    <RxCross1 />
                  </div>
                </div>
              </div>
              <div className="outerCertificate">
                <div className="certificateDescUpload">
                  <div className="certificateDescUploadDesc">
                    <h1>Add your personality assessment test result</h1>
                    <div className="uploadCertificate">
                      <h2 className="drop">
                        Drag your fies here to{" "}
                        <span className="browser">Browse</span>
                      </h2>
                      <h3>
                        Maximum size: 5MB MP4,
                        <br /> MOV, AVI and WMV accepted
                      </h3>
                    </div>
                    <div className="vedioNotes">
                      <img src={star} alt="" />
                      <div className="notes">
                        <h4>
                          If you don’t have a personality assessment
                          certificate, you can take one here at{" "}
                          <span className="certificateHighLight">Mettl</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="addCertification">
                <h6>
                  Add certification / course Details here to enhance your
                  profile
                </h6>
                {travelwork.length !== 0
                  ? travelwork.map((data, index) => (
                      <>
                        <div className="certificateDescOverlayFlex">
                          <div className="certificateDescOverlayFlexLeft">
                            <h2>Course name</h2>
                            <input
                              type="text"
                              name="course_name"
                              onChange={(e) => {
                                handlechangework(
                                  e.target.value,
                                  index,
                                  "course_name"
                                );
                              }}
                              defaultValue={data.course_name}
                            />
                            <h2>Issuing body</h2>
                            <input type="text" />
                            <h2>URL</h2>
                            <input
                              type="text"
                              name="url"
                              onChange={(e) => {
                                handlechangework(e.target.value, index, "url");
                              }}
                              defaultValue={data.url}
                            />
                          </div>
                          <div className="certificateDescOverlayFlexRight">
                            <h2>Date Issued</h2>
                            <input
                              type="date"
                              name="date_issued"
                              onChange={(e) => {
                                handlechangework(
                                  e.target.value,
                                  index,
                                  "date_issued"
                                );
                              }}
                              defaultValue={data.date_issued}
                            />
                            <h2>Skills</h2>
                            <Select
                              value={data.skills}
                              options={skilloption}
                              isMulti
                              onChange={(selectedOption) =>
                                handleSelectChange(index, selectedOption)
                              }
                            />
                            <h2>Description</h2>
                            <input
                              type="text"
                              name="description"
                              onChange={(e) => {
                                handlechangework(
                                  e.target.value,
                                  index,
                                  "description"
                                );
                              }}
                              defaultValue={data.description}
                            />
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            uploadHandler(index);
                          }}
                          className="uploadCertificate"
                        >
                          <h2 className="drop">
                            Drag your fies here to{" "}
                            <span className="browser">Browse</span>
                          </h2>
                          <h3>
                            Maximum size: 5MB MP4,
                            <br /> PDF, JPEG and PNG accepted
                          </h3>
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          name="aadhaarfront"
                          onChange={handleFileInputChange}
                        />
                        {data.certificate_file.length !== 0
                          ? data.certificate_file.map((data, index1) => (
                              <div className="educationUploaded">
                                <div className="educationUploadedFlex">
                                  <div className="educationUploadedFlexLeft">
                                    <img src={gallery} alt="" />
                                    <div className="educationUploadedFlexLeftDesc">
                                      <h2>certificate{index + 1}.jpeg</h2>
                                    </div>
                                  </div>
                                  {/* <div
                                    className="educationUploadedFlexRight"
                                    onClick={() => {
                                      deletebtn(index, index1);
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
                    ))
                  : null}
              </div>
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

export default Certificate;
