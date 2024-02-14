import React, { useState } from "react";
import "./VideoResume.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import star from "../../../../assests/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";

const VideoResume = () => {
  const dispatch = useDispatch();
  const [isArrow, setIsArrow] = useState(false);
  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp1;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander());
    dispatch(storeAction.isPopUpHander1());
  };
  return (
    <div>
      <div className="videoResume">
        <div className="innerVideoResume">
          <div
            className={isArrow === true ? "videoResumeHead" : "bottomBorder"}
          >
            <div className="videoResumeHeadLeft">
              <img src={user} alt="" />
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
          {isArrow === true && (
            <div className="videoResumeDesc">
              <h1>
                upload a video resume to showcase your personality & stand out!
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
                  <h4>Here are a few basic pointers to help you get started</h4>
                  <ol>
                    <li>Choose a non-distracting background</li>
                    <li>
                      Ensure the lighting is flattering and the sound is clear.
                    </li>
                    <li>
                      Dress professionally and maintain eye contact with the
                      camera
                    </li>
                    <li>The Video Resume should be recorded only in English</li>
                    <li>Aim for a length of 1-2 minutes for the video</li>
                    <li>
                      Do not record in HD or UHD formats as the file size would
                      be large.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {isPopUp && (
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
              <div className="vedioResumeButtons">
                <button className="discard">Discard Changes</button>
                <button className="save">Save & Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoResume;
