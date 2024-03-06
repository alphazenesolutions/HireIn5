import React, { useState } from "react";
import "./AClientProfileView.css";
import clientProfile from "../../../../assests/gpay.png";
import back from "../../../../assests/back.png";
import editOutline from "../../../../assests/pencil.svg";
import { useNavigate } from "react-router-dom";

const AClientProfileView = () => {
  const navigate = useNavigate();
  const [isToggle, setIsToggle] = useState("basic");
  const toggleHandler = (e) => {
    setIsToggle(e.target.id);
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
              <button>Disable profile</button>
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
                <button>
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
                <button>
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
        {/* page 2 */}
        {/* card 1 */}
        {isToggle === "billing" && (
          <>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Billing Information</h1>
                <button>
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
                <button>
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
                <button>
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
      </div>
    </div>
  );
};

export default AClientProfileView;
