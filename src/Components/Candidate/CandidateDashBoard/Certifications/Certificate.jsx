import React, { useState } from "react";
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

const Certificate = () => {
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
  const displayHandler = () => {
    setIsShow(!isShow);
    dispatch(storeAction.isPopUpHander());
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("certificate"));
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
          {isArrow === true && (
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
              <div className="innerCertificateDesc">
                <h1>
                  Add certification / course Details here to enhance your
                  profile
                </h1>
                <h2>Course Name</h2>

                <div className="certificateDescFlex">
                  <h3>Issue Body: </h3>
                  <p>Pending </p>
                </div>
                <div className="certificateDescFlex">
                  <h3>Date Issued:</h3>
                  <p>Pending</p>
                </div>
                <div className="certificateDescFlex">
                  <h3>URL:</h3>
                  <p>Pending </p>
                </div>
                <div className="certificateDescFlexLast">
                  <h4>Key Skills:</h4>
                  <p>Pending</p>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
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
          )}
          {isPopUp == "certificate" && (
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
                    <input type="text" />
                    <h2>Issuing body</h2>
                    <input type="text" />
                    <h2>URL</h2>
                    <input type="text" />
                  </div>
                  <div className="certificateDescOverlayFlexRight">
                    <h2>Date Issued</h2>
                    <input type="date" />
                    <h2>Skills</h2>
                    <input type="text" />
                    <h2>Description</h2>
                    <input type="text" />
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
                <button className="discard">Discard Changes</button>
                <button onClick={displayHandler} className="save">
                  Save & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificate;
