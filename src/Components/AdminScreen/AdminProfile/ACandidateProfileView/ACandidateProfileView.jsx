import React, { useState } from "react";
import "./ACandidateProfileView.css";
import candidateProfile from "../../../../assests/profile.png";
import back from "../../../../assests/back.png";
import editOutline from "../../../../assests/pencil.svg";
import { useNavigate } from "react-router-dom";

const ACandidateProfileView = () => {
  const navigate = useNavigate();
  const [isToggle, setIsToggle] = useState("personal");
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
                <img src={candidateProfile} alt="" />
              </div>
              <div className="clientProfileViewFlexLeftDesc">
                <h1>Google Pay</h1>
                <div className="clientProfileViewFlexLeftDescRole">
                  <h2>Yasir Quazi,</h2>
                  <h2>HR Manager</h2>
                </div>
                <div className="clientProfileViewFlexLeftDescLocation">
                  <img src={candidateProfile} alt="" />
                  <h2>Bengaluru, India</h2>
                  <h2>₹4500/hr</h2>
                </div>
              </div>
            </div>
            <div className="clientProfileViewFlexRight">
              <button>Disable profile</button>
            </div>
          </div>
          <div className="calendlyLink">
            <h4>Calendly Link (for interview)</h4>
            <input
              type="text"
              placeholder="https://calendly.com/meet/usernamelink"
            />
            <h5>Edit</h5>
          </div>
        </div>
        <div className="clientViewTab">
          <h5
            onClick={toggleHandler}
            id="personal"
            className={
              isToggle === "personal"
                ? "clientViewTabActive"
                : "clientViewTabInactive"
            }
          >
            Personal
          </h5>
          <h5
            onClick={toggleHandler}
            id="professional"
            className={
              isToggle === "professional"
                ? "clientViewTabActive"
                : "clientViewTabInactive"
            }
          >
            Professional
          </h5>
          <h5
            onClick={toggleHandler}
            id="travel"
            className={
              isToggle === "travel"
                ? "clientViewTabActive"
                : "clientViewTabInactive"
            }
          >
            Travel
          </h5>
          <h5
            onClick={toggleHandler}
            id="details"
            className={
              isToggle === "details"
                ? "clientViewTabActive"
                : "clientViewTabInactive"
            }
          >
            Other details
          </h5>
        </div>
        {isToggle === "personal" && (
          <>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Basic details</h1>
                <button>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>First Name</h2>
                  <h3>Narreddi</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Email ID</h2>
                  <h3>suryanarreddi@gmail.com</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Mobile No.</h2>
                  <h3>+91 9876543210</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Date of birth</h2>
                  <h3>01/01/1990</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Address Line 1</h2>
                  <h3>
                    Richmond Par, Avenue 2, 13th Cross Road, Ponyglyph Layout,
                    Bangalore
                  </h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Address Line 2</h2>
                  <h3>NA</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>City</h2>
                  <h3>Bangalore</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>State</h2>
                  <h3>Karnataka</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Country</h2>
                  <h3>India</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Pincode</h2>
                  <h3>560013</h3>
                </div>
              </div>
            </div>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>documents</h1>
                <button>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Aadhaar number / Govt. ID</h2>
                  <h3>48XX XXXX XX21</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Aadhaar Card / Govt. ID Front</h2>
                  <h3>Uploaded</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Aadhaar Card / Govt. ID Back</h2>
                  <h3>Uploaded</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>PAN number / Tax ID</h2>
                  <h3>48XX XXXX XX21</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>PAN Card / Tax ID Front</h2>
                  <h3>Uploaded</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Personality Assessment </h2>
                  <h3>Uploaded</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Personality Assessment Test Link </h2>
                  <h3>https://mettl.com/test-score/yasirquazi</h3>
                </div>
              </div>
            </div>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Passport details (Optional)</h1>
                <button>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Passport no.</h2>
                  <h3>48XX XXXX XX21</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Valid until</h2>
                  <h3>10/10/2025</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Country of Citizenship</h2>
                  <h3>India</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Country of Issue</h2>
                  <h3>Zimbabwe</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Passport Front</h2>
                  <h3>Uploaded</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Passport Back </h2>
                  <h3>Uploaded</h3>
                </div>
              </div>
            </div>
          </>
        )}
        {/* page 2 */}
        {/* card 1 */}
        {isToggle === "professional" && (
          <>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Details</h1>
                <button>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Primary Technical Skill</h2>
                  <h3>Java Developer</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Years of Experience (all time)</h2>
                  <h3>5</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Skills</h2>
                  <h3>Python, PHP, HTML, jQuery</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>LinkedIn</h2>
                  <h3>NA</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>HackerRank</h2>
                  <h3>NA</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>GitHub</h2>
                  <h3>NA</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Languages</h2>
                  <h3>
                    English (Conversational), Hindi (Basic), Kannada
                    (Proficient)
                  </h3>
                </div>
              </div>
            </div>
          </>
        )}
        {isToggle === "travel" && (
          <>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Countries travelled to</h1>
                <button>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Country 1</h2>
                  <h3>Netherlands</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Year of travel</h2>
                  <h3>12/12/2018</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Duration</h2>
                  <h3>6 Months</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Purpose</h2>
                  <h3>Work</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Type of Visa</h2>
                  <h3>Tourist</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Validity of Visa</h2>
                  <h3>08/05/2023</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Country 2</h2>
                  <h3>Japan</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Year of travel</h2>
                  <h3>12/12/2018</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Duration</h2>
                  <h3>2 Months</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Purpose</h2>
                  <h3>Travel</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Type of Visa</h2>
                  <h3>Tourist</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Validity of Visa</h2>
                  <h3>08/05/2023</h3>
                </div>
              </div>
            </div>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Residency Details</h1>
                <button>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Current country of residence</h2>
                  <h3>India</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Duration of stay in the country</h2>
                  <h3>10 Years 03 Months</h3>
                </div>
              </div>
            </div>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Countries willing to travel to for work</h1>
                <button>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Countries</h2>
                  <h3>Japan, Australia, Germany</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Only for</h2>
                  <h3>Work Onsite</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Duration</h2>
                  <h3>3 - 6 months</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Readiness to Travel</h2>
                  <h3>Immediate</h3>
                </div>
              </div>
            </div>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Countries willing to RElocate for work</h1>
                <button>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Willingness to relocate</h2>
                  <h3>Yes</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Preferred countries</h2>
                  <h3>Japan, Australia, Germany</h3>
                </div>
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Preferred duration for relocation</h2>
                  <h3>6 - 12 months</h3>
                </div>
              </div>
            </div>
          </>
        )}
        {isToggle === "details" && (
          <>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Project details</h1>
                <button>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <h6>project 1</h6>
              <div className="CandidateProfileViewCardBody">
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Project Title</h2>
                  <h3>
                    GreenScape City: Sustainable Urban Development Simulator
                  </h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Role</h2>
                  <h3>Lead Software Developer</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Reporting to</h2>
                  <h3>Haed of Development, CEO</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Duration of project</h2>
                  <h3>January 2018 - December 2018</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Key skills</h2>
                  <h3>Java, Python, React</h3>
                </div>
              </div>
              <h6>project 2</h6>
              <div className="CandidateProfileViewCardBody">
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Project Title</h2>
                  <h3>
                    GreenScape City: Sustainable Urban Development Simulator
                  </h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Role</h2>
                  <h3>Lead Software Developer</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Reporting to</h2>
                  <h3>Haed of Development, CEO</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Duration of project</h2>
                  <h3>January 2018 - December 2018</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Key skills</h2>
                  <h3>Java, Python, React</h3>
                </div>
              </div>
            </div>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>Certifications and courses</h1>
                <button>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <h6>Certificate 1</h6>
              <div className="CandidateProfileViewCardBody">
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Course name</h2>
                  <h3>UI/UX course by Google</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Issuing body</h2>
                  <h3>Google India</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Date Issued</h2>
                  <h3>23/04/2018</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Skills</h2>
                  <h3>User Experience / User Interface Design</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>URL</h2>
                  <h3>www.google.com/googlecourse</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Certificate File</h2>
                  <h3>Uploaded</h3>
                </div>
              </div>
            </div>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>EDUCATION</h1>
                <button>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <h6>UNDERGRADUATE</h6>
              <div className="CandidateProfileViewCardBody">
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Degree</h2>
                  <h3>Bachelor of Technology</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Year of Graduation</h2>
                  <h3>2009 - 2013</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Name of University / School</h2>
                  <h3>IIT Bombay</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Education Level</h2>
                  <h3>Undergraduate</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>CGPA</h2>
                  <h3>1</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Study Mode</h2>
                  <h3>Full-Time</h3>
                </div>
                <div className="CandidateProfileViewCardBodyTable">
                  <h2>Relevant document</h2>
                  <h3>Uploaded</h3>
                </div>
              </div>
            </div>
            <div className="ClientProfileViewCard">
              <div className="ClientProfileViewCardEdit">
                <h1>video resume</h1>
                <button>
                  <img src={editOutline} alt="" />
                  Edit
                </button>
              </div>
              <div className="ClientProfileViewCardBody">
                <div className="ClientProfileViewCardBodyTable">
                  <h2>Video file</h2>
                  <h3>Uploaded</h3>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ACandidateProfileView;
