/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./AClientProfileView.css";
import clientProfile from "../../../../assests/gpay.png";
import back from "../../../../assests/back.png";
import editOutline from "../../../../assests/pencil.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import { FiLoader } from "react-icons/fi";

const AClientProfileView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isToggle, setIsToggle] = useState("basic");
  const toggleHandler = (e) => {
    setIsToggle(e.target.id);
  };
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });
  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("candidateRate"));
  };
  const editHandler1 = (e) => {
    dispatch(storeAction.isPopUpHander(e.target.id));
  };
  const [loading, setIsLoading] = useState(false);
  const displayHandler = () => {
    setIsLoading(true);
  };
  return (
    <div>
      <div className="paddingLeft100 paddingRight100 ">
        <div className="clientProfileViewHeader">
          <div className="ClientProfileBackButton">
            <img
              onClick={() => navigate("/customerProfile")}
              src={back}
              alt=""
            />
            <h5 onClick={() => navigate("/customerProfile")}>
              Back to profile page
            </h5>
          </div>
          <div className="clientProfileViewFlex">
            <div className="clientProfileViewFlexLeft">
              <div className="clientProfileViewFlexLeftImg">
                <img src={clientProfile} alt="" />
              </div>
              <div className="clientProfileViewFlexLeftDesc">
                <h1>Google Pay</h1>
                <div className="clientProfileViewFlexLeftDescRole">
                  <h2>Yasir Quazi,</h2>
                  <h2>HR Manager</h2>
                </div>
                <div className="clientProfileViewFlexLeftDescLocation">
                  <img src={clientProfile} alt="" />
                  <h2>Bengaluru, India</h2>
                </div>
              </div>
            </div>
            <div className="clientProfileViewFlexRight">
              <button className="disableProfile">Disable profile</button>
            </div>
          </div>
        </div>
        <div className="clientViewTab">
          <h5
            onClick={toggleHandler}
            id="basic"
            className={
              isToggle === "basic"
                ? "clientViewTabActive"
                : "clientViewTabInactive"
            }
          >
            Basic
          </h5>
          <h5
            onClick={toggleHandler}
            id="billing"
            className={
              isToggle === "billing"
                ? "clientViewTabActive"
                : "clientViewTabInactive"
            }
          >
            Billing
          </h5>
        </div>
        {isToggle === "basic" && (
          <>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Company details</h1>
                <button id="admincompanydetails" onClick={editHandler1}>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Company name</h2>
                  <h3>Google Pay</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Company Location</h2>
                  <h3>Bangalore, India</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Company URL</h2>
                  <h3>https://google.com</h3>
                </div>
              </div>
            </div>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>billing contact details</h1>
                <button id="adminbillingcontact" onClick={editHandler1}>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Name</h2>
                  <h3>Surya Narreddi</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Phone no.</h2>
                  <h3>9876543210</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Job Title</h2>
                  <h3>HR Manager</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Linknedin Profile</h2>
                  <h3>https://linkedin.com/suryanarreddi</h3>
                </div>
              </div>
            </div>
          </>
        )}
        {isPopUp == "admincompanydetails" && (
          <>
            <div className="adminEditOverlay">
              <div className="adminEditOverlayHead">
                <h1>Company Name</h1>
              </div>
              <div className="adminEditOverlayBody">
                <div className="adminEditOverlayContent">
                  <h2>Company name</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Company Location</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Company URL</h2>
                  <input type="text" />
                </div>
              </div>
              {/* <button className="adminEditAddMore">Add More</button> */}
              <div className="editOverlayButton">
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
          </>
        )}
        {isPopUp == "adminbillingcontact" && (
          <>
            <div className="adminEditOverlay">
              <div className="adminEditOverlayHead">
                <h1>billing contact details</h1>
              </div>
              <div className="adminEditOverlayBody">
                <div className="adminEditOverlayContent">
                  <h2>Name</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Phone no.</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Job Title</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Linknedin Profile</h2>
                  <input type="text" />
                </div>
              </div>
              {/* <button className="adminEditAddMore">Add More</button> */}
              <div className="editOverlayButton">
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
          </>
        )}
        {/* page 2 */}
        {/* card 1 */}
        {isToggle === "billing" && (
          <>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Billing Information</h1>
                <button id="adminbillinginformation" onClick={editHandler1}>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Registered Company Name (for billing)</h2>
                  <h3>Google Pay</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Company Billing Address</h2>
                  <h3>Richmond Par, Avenue 2</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Company Registration No.</h2>
                  <h3>48XX XXXX XX21</h3>
                </div>
              </div>
            </div>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Primary contact for billing</h1>
                <button id="adminprimarycontact" onClick={editHandler1}>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Full Name</h2>
                  <h3>Yasir Quazi</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Contact Number</h2>
                  <h3>+91 9876543210</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Email Address</h2>
                  <h3>yasirquazi@gmail.com</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Location</h2>
                  <h3>Hyderabad, India</h3>
                </div>
              </div>
            </div>

            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>SECONDARY contact for billing</h1>
                <button id="adminsecondarycontact" onClick={editHandler1}>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Full Name</h2>
                  <h3>Yasir Quazi</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Contact Number</h2>
                  <h3>+91 9876543210</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Email Address</h2>
                  <h3>yasirquazi@gmail.com</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Location</h2>
                  <h3>Hyderabad, India</h3>
                </div>
              </div>
            </div>
          </>
        )}
        {isPopUp == "adminbillinginformation" && (
          <>
            <div className="adminEditOverlay">
              <div className="adminEditOverlayHead">
                <h1>Billing Information</h1>
              </div>
              <div className="adminEditOverlayBody">
                <div className="adminEditOverlayContent">
                  <h2>Registered Company Name (for billing)</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Company Billing Address</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Company Registration No.</h2>
                  <input type="text" />
                </div>
              </div>
              {/* <button className="adminEditAddMore">Add More</button> */}
              <div className="editOverlayButton">
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
          </>
        )}
        {isPopUp == "adminprimarycontact" && (
          <>
            <div className="adminEditOverlay">
              <div className="adminEditOverlayHead">
                <h1>Primary contact for billing</h1>
              </div>
              <div className="adminEditOverlayBody">
                <div className="adminEditOverlayContent">
                  <h2>Full Name</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Contact Number</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Email Address</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Location</h2>
                  <input type="text" />
                </div>
              </div>
              {/* <button className="adminEditAddMore">Add More</button> */}
              <div className="editOverlayButton">
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
          </>
        )}
        {isPopUp == "adminsecondarycontact" && (
          <>
            <div className="adminEditOverlay">
              <div className="adminEditOverlayHead">
                <h1>SECONDARY contact for billing</h1>
              </div>
              <div className="adminEditOverlayBody">
                <div className="adminEditOverlayContent">
                  <h2>Full Name</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Contact Number</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Email Address</h2>
                  <input type="text" />
                </div>
                <div className="adminEditOverlayContent">
                  <h2>Location</h2>
                  <input type="text" />
                </div>
              </div>
              {/* <button className="adminEditAddMore">Add More</button> */}
              <div className="editOverlayButton">
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
          </>
        )}
      </div>
    </div>
  );
};

export default AClientProfileView;
