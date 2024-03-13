/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import "./VideoResume.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import star from "../../../../assests/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import { FiVideo } from "react-icons/fi";

const VideoResume = () => {
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
    dispatch(storeAction.isPopUpHander("video"));
    setuploadstatus(false);
  };

  const fileInputRef = useRef(null);

  const uploadHandler = (data) => {
    fileInputRef.current.click();
  };
  const [resumevideo, setresumevideo] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [loading, setloading] = useState(false);
  const [uploadstatus, setuploadstatus] = useState(false);

  const handleFileInputChange = async (e) => {
    setloading(true);
    formData.append("image", e.target.files[0]);
    formData.append("name", `resume${userid}`);
    const response = await axios.post(
      "https://fileserver-21t2.onrender.com/api/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setresumevideo(response.data.img_url);
    fileInputRef.current.value = "";
    setloading(false);
    setuploadstatus(true);
  };
  const displayHandler = async () => {
    setloading(true);
    var newobj = {
      username: userdata[0].username,
      video_resume: resumevideo,
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
      dispatch(storeAction.userdataHander({ userdata: [updatedata.user] }));
      dispatch(storeAction.isPopUpHander());
      setloading(false);
    } else {
      setloading(false);
    }
  };
  return (
    <div>
      <div className="videoResume">
        <div className="innerVideoResume">
          <div
            className={isArrow === true ? "videoResumeHead" : "bottomBorder"}
          >
            <div className="videoResumeHeadLeft">
              <span>
                <FiVideo />
              </span>
              <h1>Video Resume</h1>
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
              userdata[0].video_resume.length !== 0 ? (
                <div className="videoResumeDesc">
                  <h1>
                    upload a video resume to showcase your personality & stand
                    out!
                  </h1>
                  <div className="uploadVedioRes">
                    <h2>Your video file here</h2>
                    <h3>
                      Maximum size: 5MB MP4,
                      <br /> MOV, AVI and WMV accepted
                    </h3>
                  </div>

                  <div className="vedioNotes">
                    <img src={star} alt="" />
                    <div className="notes">
                      <h4>
                        Here are a few basic pointers to help you get started
                      </h4>
                      <ol>
                        <li>Choose a non-distracting background</li>
                        <li>
                          Ensure the lighting is flattering and the sound is
                          clear.
                        </li>
                        <li>
                          Dress professionally and maintain eye contact with the
                          camera
                        </li>
                        <li>
                          The Video Resume should be recorded only in English
                        </li>
                        <li>Aim for a length of 1-2 minutes for the video</li>
                        <li>
                          Do not record in HD or UHD formats as the file size
                          would be large.
                        </li>
                      </ol>
                    </div>
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
                    <h4>Add Video Resume</h4>
                  </button>
                </div>
              )
            ) : (
              <div className="educationDesc">
                <h1>
                  {" "}
                  Add certification / course Details here to enhance your
                  profile
                </h1>
                <button className="touchButtonnew" onClick={overLayHandler}>
                  <h4>Add Video Resume</h4>
                </button>
              </div>
            ))}

          {isPopUp == "video" && (
            <div className="vedioOverlay">
              <div className="innerVideoResume">
                <div
                  className={
                    isArrow === true ? "videoResumeHead" : "bottomBorder"
                  }
                >
                  <div className="videoResumeHeadLeft">
                    <img src={user} alt="" />
                    <h1>Video Resume</h1>
                  </div>
                  <div className="projectDetailsLeftIcon">
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
              <div className="videoResumeDesc">
                <h1>
                  upload a video resume to showcase your personality & stand
                  out!
                </h1>
                <div className="uploadVedioRes" onClick={uploadHandler}>
                  <h2>Your video file here</h2>
                  <h3>
                    Maximum size: 5MB MP4,
                    <br /> MOV, AVI and WMV accepted
                  </h3>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  name="aadhaarfront"
                  accept="video/*"
                  onChange={handleFileInputChange}
                />
                {uploadstatus && (
                  <h6 className="text-green-500 text-sm font-semibold my-2">
                    Video Resume Uploaded Successfully
                  </h6>
                )}

                <div className="vedioNotes">
                  <img src={star} alt="" />
                  <div className="notes">
                    <h4>
                      Here are a few basic pointers to help you get started
                    </h4>
                    <ol>
                      <li>Choose a non-distracting background</li>
                      <li>
                        Ensure the lighting is flattering and the sound is
                        clear.
                      </li>
                      <li>
                        Dress professionally and maintain eye contact with the
                        camera
                      </li>
                      <li>
                        The Video Resume should be recorded only in English
                      </li>
                      <li>Aim for a length of 1-2 minutes for the video</li>
                      <li>
                        Do not record in HD or UHD formats as the file size
                        would be large.
                      </li>
                    </ol>
                  </div>
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

export default VideoResume;
