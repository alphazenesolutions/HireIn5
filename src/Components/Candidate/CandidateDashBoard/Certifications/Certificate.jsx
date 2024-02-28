/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
  const uploadHandler = () => {
    setIsUpload(!isUpload);
  };

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
        certificate_info: updatedata.user.certificate_info,
      };
      dispatch(storeAction.userdataHander({ userdata: [updatedObject] }));
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
  }, []);

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

        skills:
          userdata[0].certificate_info !== null
            ? userdata[0].certificate_info.skills !== undefined
              ? userdata[0].certificate_info.skills.toString(" , ")
              : ""
            : "",
      });
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    seteducationdata((values) => ({ ...values, [name]: value }));
  };
  return (
    <div>
      <div className="certificate">
        <div className="innerCertificate">
          <div
            className={isArrow === true ? "certificateHead" : "bottomBorder"}
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
                          <p>4 MB</p>
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

                {isShow === true && (
                  <div className="gradeCertificate">
                    <img src={gallery} alt="" />
                    <div className="gradeCertificateDesc">
                      <h2>certificate01.jpeg</h2>
                      <p>4 MB</p>
                    </div>
                  </div>
                )}
              </div>
            ) : null)}
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
                    <input
                      type="text"
                      name="skills"
                      onChange={handlechange}
                      defaultValue={educationdata.skills}
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
                {isUpload === true ? (
                  <div
                    onClick={uploadHandler}
                    className="certificationUploaded"
                  >
                    <div className="educationUploadedFlex">
                      <div className="educationUploadedFlexLeft">
                        <img src={gallery} alt="" />
                        <div className="educationUploadedFlexLeftDesc">
                          <h2>certificate01.jpeg</h2>
                          <p>4 MB</p>
                        </div>
                      </div>
                      <div className="educationUploadedFlexRight">
                        <img src={trash} alt="" />
                      </div>
                    </div>
                    <div className="percent">
                      <div className="range">
                        <div className="InnerRange"></div>
                      </div>
                      <h2>50%</h2>
                    </div>
                  </div>
                ) : (
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
                )}
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

export default Certificate;
