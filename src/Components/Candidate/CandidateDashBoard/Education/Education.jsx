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

const Education = () => {
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

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("education"));
  };
  const [educationdata, seteducationdata] = useState({
    cgpa: "",
    degree: "",
    education_level: "",
    study_mode: "",
    university_name: "",
    year_of_graduation: "",
  });
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getUserinfo();
  }, [userdata.length !== 0]);

  const getUserinfo = async () => {
    if (userdata.length !== 0) {
      seteducationdata({
        cgpa:
          userdata[0].education_info !== null
            ? userdata[0].education_info.cgpa
            : "",
        degree:
          userdata[0].education_info !== null
            ? userdata[0].education_info.degree
            : "",
        education_level:
          userdata[0].education_info !== null
            ? userdata[0].education_info.education_level
            : "",
        study_mode:
          userdata[0].education_info !== null
            ? userdata[0].education_info.study_mode
            : "",
        university_name:
          userdata[0].education_info !== null
            ? userdata[0].education_info.university_name
            : "",
        year_of_graduation:
          userdata[0].education_info !== null
            ? userdata[0].education_info.year_of_graduation
            : "",
      });
      if (userdata[0].education_info !== null) {
        setcertificate(userdata[0].education_info.upload_file);
      }
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
      education_info: {
        cgpa: educationdata.cgpa,
        degree: educationdata.degree,
        education_level: educationdata.education_level,
        study_mode: educationdata.study_mode,
        university_name: educationdata.university_name,
        year_of_graduation: educationdata.year_of_graduation,
        upload_file: certificate,
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
        education_info: updatedata.user.education_info,
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
  const fileInputRef = useRef(null);

  const uploadHandler = (data) => {
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

  return (
    <div>
      <div className="education">
        <div className="innerEducation">
          <div className={isArrow === true ? "educationHead" : "bottomBorder"}>
            <div className="educationHeadLeft">
              <img src={user} alt="" />
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
          {userdata.length !== 0
            ? isArrow === true &&
              (userdata[0].education_info !== null ? (
                <div className="educationDesc">
                  <h1>Add your education and degrees here</h1>
                  <h2>{userdata[0].education_info.degree}</h2>
                  <div className="educationDescFlex">
                    <h3>Name of University/School : </h3>
                    <p>{userdata[0].education_info.university_name} </p>
                  </div>
                  <div className="educationDescFlex">
                    <h3>Year of Graduation : </h3>
                    <p>{userdata[0].education_info.year_of_graduation}</p>
                  </div>
                  <div className="educationDescFlex">
                    <h3>Education Level : </h3>
                    <p>{userdata[0].education_info.education_level} </p>
                  </div>
                  <div className="educationDescFlex">
                    <h4>Study Mode : </h4>
                    <p>{userdata[0].education_info.study_mode}</p>
                  </div>
                  <div className="educationDescFlexLast">
                    <h4>CGPA : </h4>
                    <p>{userdata[0].education_info.cgpa}</p>
                  </div>
                  {certificate.length !== 0
                    ? certificate.map((data, index) => (
                        <div className="gradeCertificate">
                          <img src={gallery} alt="" />
                          <div className="gradeCertificateDesc">
                            <h2>certificate0{index + 1}.jpeg</h2>
                            {/* <p>4 MB</p> */}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              ) : (
                <div className="educationDesc">
                  <h1>Add your education and degrees here</h1>
                  <button className="touchButtonnew" onClick={overLayHandler}>
                    <h4>Add education</h4>
                  </button>
                </div>
              ))
            : null}
          {isPopUp === "education" && (
            <div className="educationDescOverlay">
              <div className="innerEducation">
                <div
                  className={
                    isArrow === true ? "educationHead" : "bottomBorder"
                  }
                >
                  <div className="educationHeadLeft">
                    <img src={user} alt="" />
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
              </div>
              <h6>
                Add certification / course Details here to enhance your profile
              </h6>
              <div className="educationDescOverlayFlex">
                <div className="educationDescOverlayFlexLeft">
                  <h2>Degree</h2>
                  <input
                    type="text"
                    name="degree"
                    onChange={handlechange}
                    defaultValue={educationdata.degree}
                  />
                  <h2>Name of University / School</h2>
                  <input
                    type="text"
                    name="university_name"
                    onChange={handlechange}
                    defaultValue={educationdata.university_name}
                  />
                  <h2>CGPA</h2>
                  <input
                    type="text"
                    name="cgpa"
                    onChange={handlechange}
                    defaultValue={educationdata.cgpa}
                  />
                </div>
                <div className="educationDescOverlayFlexRight">
                  <h2>Year of Graduation</h2>
                  <input
                    type="text"
                    name="year_of_graduation"
                    onChange={handlechange}
                    defaultValue={educationdata.year_of_graduation}
                  />
                  <h2>Education Level</h2>

                  <input
                    placeholder="Undergraduate"
                    type="text"
                    name="education_level"
                    onChange={handlechange}
                    defaultValue={educationdata.education_level}
                  />
                  <h2>Study Mode</h2>
                  <input
                    placeholder="Full-Time"
                    type="text"
                    name="study_mode"
                    onChange={handlechange}
                    defaultValue={educationdata.study_mode}
                  />
                </div>
              </div>

              <>
                <div onClick={uploadHandler} className="educationUpload">
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
              {isUpload === true ? (
                <>
                  {certificate.length !== 0
                    ? certificate.map((data, index) => (
                        <div className="educationUploaded">
                          <div className="educationUploadedFlex">
                            <div className="educationUploadedFlexLeft">
                              <img src={gallery} alt="" />
                              <div className="educationUploadedFlexLeftDesc">
                                <h2>certificate{index + 1}.jpeg</h2>
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
              ) : null}
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

export default Education;
