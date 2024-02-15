import React, { useState } from "react";
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

const Education = () => {
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
    dispatch(storeAction.isPopUpHander("education"));
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
          {isArrow === true && (
            <div className="educationDesc">
              <h1>Add your education and degrees here</h1>
              <h2>Degree</h2>

              <div className="educationDescFlex">
                <h3>Name of University/School:</h3>
                <p>Pending </p>
              </div>
              <div className="educationDescFlex">
                <h3>Year of Graduation:</h3>
                <p>Pending</p>
              </div>
              <div className="educationDescFlex">
                <h3>Education Level:</h3>
                <p>Pending </p>
              </div>
              <div className="educationDescFlexLast">
                <h4>CGPA:</h4>
                <p>Pending</p>
              </div>
              {isUpload == true && (
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
          {isPopUp == "education" && (
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
              </div>
              <h6>
                Add certification / course Details here to enhance your profile
              </h6>
              <div className="educationDescOverlayFlex">
                <div className="educationDescOverlayFlexLeft">
                  <h2>Degree</h2>
                  <input type="text" />
                  <h2>Name of University / School</h2>
                  <input type="text" />
                  <h2>CGPA</h2>
                  <input type="text" />
                </div>
                <div className="educationDescOverlayFlexRight">
                  <h2>Year of Graduation</h2>
                  <input type="text" />
                  <h2>Education Level</h2>
                  {/* <select name="" id="">
                    <option value="">Undergraduate</option>
                  </select> */}
                  <input placeholder="Undergraduate" type="text" />
                  <h2>Study Mode</h2>
                  {/* <select name="" id="">
                    <option value="">Undergraduate</option>
                  </select> */}
                  <input placeholder="Full-Time" type="text" />
                </div>
              </div>
              {isUpload === true ? (
                <div onClick={uploadHandler} className="educationUploaded">
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
                <div onClick={uploadHandler} className="educationUpload">
                  <h2>
                    Drop your files here or
                    <span className="browser">browse</span>
                  </h2>
                  <h5>Maximum size: 5MB</h5>
                  <h5>PDF, JPEG and PNG accepted</h5>
                </div>
              )}

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

export default Education;
