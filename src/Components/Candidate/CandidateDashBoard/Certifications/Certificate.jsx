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
    setloading(true);
    var newobj = {
      username: userdata[0].username,
      certificate_info: {
        course_name: educationdata.course_name,
        date_issued: educationdata.date_issued,
        description: educationdata.description,
        url: educationdata.url,
        skills: skill_list,
        certificate_file: certificate,
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
        certificate_info: updatedata.user.certificate_info,
      };
      dispatch(storeAction.userdataHander({ userdata: [] }));
      setTimeout(() => {
        dispatch(storeAction.userdataHander({ userdata: [updatedObject] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsShow(!isShow);
      setloading(false);
    } else {
      setloading(false);
    }
    getUserinfo();
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("certificate"));
  };

  const [educationdata, seteducationdata] = useState({
    course_name: "",
    date_issued: "",
    description: "",
    url: "",
    skills: "",
  });
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getUserinfo();
  }, [userdata.length !== 0]);

  const getUserinfo = async () => {
    if (userdata.length !== 0) {
      seteducationdata({
        course_name:
          userdata[0].certificate_info !== null
            ? userdata[0].certificate_info.course_name
            : "",
        date_issued:
          userdata[0].certificate_info !== null
            ? userdata[0].certificate_info.date_issued
            : "",
        description:
          userdata[0].certificate_info !== null
            ? userdata[0].certificate_info.description
            : "",
        url:
          userdata[0].certificate_info !== null
            ? userdata[0].certificate_info.url
            : "",
      });
      if (userdata[0].certificate_info !== null) {
        setcertificate(userdata[0].certificate_info.certificate_file);
      }
      if (userdata[0].certificate_info !== null) {
        if (userdata[0].certificate_info.skills.length !== 0) {
          var filter = [];
          for (var a = 0; a < userdata[0].certificate_info.skills.length; a++) {
            filter.push({
              value: userdata[0].certificate_info.skills[a],
              label: userdata[0].certificate_info.skills[a],
            });
          }
          setSelectedOptionskill(filter);
          setskill_list(userdata[0].certificate_info.skills);
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
  const fileInputRef = useRef(null);

  const uploadHandler = (data) => {
    // setIsUpload(!isUpload);
    fileInputRef.current.click();
  };
  var [certificate, setcertificate] = useState([]);
  const [formData] = useState(new FormData());
  const handleFileInputChange = async (e) => {
    formData.append("image", e.target.files[0]);
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
    setcertificate([...certificate, response.data.img_url]);
    fileInputRef.current.value = "";
    setIsUpload(true);
  };
  const deletebtn = async (id) => {
    const updatedElements = [...certificate];
    updatedElements.splice(id, 1);
    setcertificate(updatedElements);
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
            (userdata.length !== 0 ? (
              <div className="certificateDesc">
                <div className="certificateDescUpload">
                  <div className="certificateDescUploadDesc">
                    <h1>Add your personality assessment test result</h1>
                    {isShow === false && (
                      <div className="uploadVedioRes">
                        <h5>Your PDF here</h5>
                        <h3>
                          Maximum size: 5MB MP4,
                          <br /> MOV, AVI and WMV accepted
                        </h3>
                      </div>
                    )}
                    {isShow === false && (
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
                    )}
                    {isShow === true && (
                      <div className="gradeCertificate">
                        <img src={gallery} alt="" />
                        <div className="gradeCertificateDesc">
                          <h2>certificate01.jpeg</h2>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {userdata[0].certificate_info !== null ? (
                  <div className="innerCertificateDesc">
                    <h1>
                      Add certification / course Details here to enhance your
                      profile
                    </h1>
                    <h2>{userdata[0].certificate_info.course_name}</h2>
                    {/* <div className="certificateDescFlex">
                      <h3>Issue Body: </h3>
                      <p>Pending </p>
                    </div> */}
                    <div className="certificateDescFlex">
                      <h3>Date Issued:</h3>
                      <p>{userdata[0].certificate_info.date_issued}</p>
                    </div>
                    <div className="certificateDescFlex">
                      <h3>URL:</h3>
                      <p>{userdata[0].certificate_info.url}</p>
                    </div>
                    <div className="certificateDescFlexLast">
                      <h4>Key Skills:</h4>
                      <p>{userdata[0].certificate_info.skills.toString()}</p>
                    </div>
                    <p>{userdata[0].certificate_info.description}</p>
                  </div>
                ) : null}
                <div className="flex gap-4">
                  {certificate.length !== 0
                    ? certificate.map((data, index) =>
                        data.length !== 0 ? (
                          <div
                            className="gradeCertificate"
                            onClick={() => {
                              window.open(`${data}`, "_blank");
                            }}
                          >
                            <img src={gallery} alt="" />
                            <div className="gradeCertificateDesc">
                              <h2>{data.split("/images/")[1].split("/")[1]}</h2>
                            </div>
                          </div>
                        ) : null
                      )
                    : null}
                </div>
              </div>
            ) : (
              <div className="educationDesc">
                <h1>
                  {" "}
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
              <div className="innerCertificate">
                <div
                  className={
                    isArrow === true ? "certificateHead" : "bottomBorder"
                  }
                >
                  <div className="certificateHeadLeft">
                    <img src={user} alt="" />
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
                <div className="certificateDescOverlayFlex">
                  <div className="certificateDescOverlayFlexLeft">
                    <h2>Course name</h2>
                    <input
                      type="text"
                      name="course_name"
                      onChange={handlechange}
                      defaultValue={educationdata.course_name}
                    />
                    <h2>Issuing body</h2>
                    <input type="text" />
                    <h2>URL</h2>
                    <input
                      type="text"
                      name="url"
                      onChange={handlechange}
                      defaultValue={educationdata.url}
                    />
                  </div>
                  <div className="certificateDescOverlayFlexRight">
                    <h2>Date Issued</h2>
                    <input
                      type="date"
                      name="date_issued"
                      onChange={handlechange}
                      defaultValue={educationdata.date_issued}
                    />
                    <h2>Skills</h2>
                    {/* <input
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
                    <h2>Description</h2>
                    <input
                      type="text"
                      name="description"
                      onChange={handlechange}
                      defaultValue={educationdata.description}
                    />
                  </div>
                </div>
                <>
                  <div onClick={uploadHandler} className="uploadCertificate">
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
                </>
                <>
                  {certificate.length !== 0
                    ? certificate.map((data, index) => (
                        <div className="educationUploaded">
                          <div className="educationUploadedFlex">
                            <div className="educationUploadedFlexLeft">
                              <img src={gallery} alt="" />
                              <div className="educationUploadedFlexLeftDesc">
                                {data.length !== 0 ? (
                                  <h2>
                                    {data.split("/images/")[1].split("/")[1]}
                                  </h2>
                                ) : (
                                  <h2>certificate{index + 1}.jpeg</h2>
                                )}

                                {/* <p>4 MB</p> */}
                              </div>
                            </div>
                            <div
                              className="educationUploadedFlexRight"
                              onClick={() => {
                                deletebtn(index);
                              }}
                            >
                              <img src={trash} alt="" />
                            </div>
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

export default Certificate;
