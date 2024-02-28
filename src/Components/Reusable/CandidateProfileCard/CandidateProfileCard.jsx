/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "./CandidateProfileCard.css";
import back from "../../../assests/back.png";
import candidatePropoic from "../../../assests/CandidateProfile.png";
import brief from "../../../assests/briefCase.png";
import user from "../../../assests/User.svg";
import map from "../../../assests/mapPin.png";
import { useSelector } from "react-redux";

const CandidateProfileCard = (props) => {
  const singleuser = useSelector((store) => store.singleuser);
  const [isSelect, setIsSelect] = useState("demographic");
  const buttonHandler = (e) => {
    setIsSelect(e.target.id);
    console.log(isSelect);
  };

  const [isSelect1, setIsSelect1] = useState("personal");
  const buttonHandler1 = (e) => {
    setIsSelect1(e.target.id);
    console.log(isSelect1);
  };
  console.log(singleuser, "singleuser");
  return (
    <div>
      <div className={props.main}>
        <div onClick={() => props.fun("page1")} className={props.back}>
          <img src={back} alt="" />
          <h2>Back to results</h2>
        </div>
        <div className="vedioNotes">
          {/* <img src={star} alt="" /> */}
          <div className="notes">
            <h4>
              If you don’t have a personality assessment certificate, you can
              take one here at{" "}
              <span className="certificateHighLight">Mettl</span>
            </h4>
          </div>
        </div>
        {singleuser.length !== 0 ? (
          <div className="mainProfile">
            <div className="profileLeft">
              <div className="profileLeftTop">
                <img src={candidatePropoic} alt="" />
                <h1>{singleuser[0].first_name}</h1>
                <h2>USD {singleuser[0].hourly_rate} / HR</h2>
                <div className="available">
                  <p>Available from</p>
                  <h5>03 Aug 2024</h5>
                </div>
              </div>
              <div className="profileLeftMiddle">
                <h3>TOP SKILLS</h3>
                {singleuser[0].preference_info !== null ? (
                  <div className="proSkills">
                    {singleuser[0].preference_info.skills.length !== 0
                      ? singleuser[0].preference_info.skills.map(
                          (data, index) =>
                            index == 0 || index == 1 || index == 2 ? (
                              <div className="skillOne" key={index}>
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.0341 3.94035L9.71458 5.06535L10.1097 6.7402C10.1376 6.85759 10.1302 6.98059 10.0885 7.09381C10.0468 7.20703 9.97269 7.30545 9.87537 7.37676C9.77694 7.44904 9.65939 7.4907 9.53742 7.49654C9.41545 7.50237 9.29446 7.47212 9.18958 7.40957L7.68958 6.51895L6.18958 7.40957C6.08471 7.47212 5.96372 7.50237 5.84175 7.49654C5.71977 7.4907 5.60223 7.44904 5.5038 7.37676C5.40653 7.30541 5.33242 7.20698 5.29074 7.09378C5.24906 6.98057 5.24165 6.85759 5.26943 6.7402L5.66458 5.06535L4.34458 3.94035C4.25221 3.86151 4.18523 3.75709 4.15208 3.64026C4.11892 3.52343 4.12107 3.3994 4.15826 3.28379C4.19544 3.16817 4.266 3.06615 4.36105 2.99055C4.45609 2.91495 4.57138 2.86916 4.6924 2.85895L6.43755 2.71129L7.11818 1.12457C7.16622 1.01333 7.24576 0.918591 7.34701 0.85203C7.44826 0.785468 7.56678 0.75 7.68794 0.75C7.80911 0.75 7.92763 0.785468 8.02887 0.85203C8.13012 0.918591 8.20967 1.01333 8.25771 1.12457L8.93833 2.71223L10.683 2.85895C10.8043 2.86846 10.9201 2.91375 11.0156 2.98907C11.1112 3.06439 11.1822 3.16636 11.2198 3.28208C11.2574 3.3978 11.2598 3.52206 11.2268 3.63916C11.1937 3.75625 11.1267 3.86091 11.0341 3.93988V3.94035ZM4.01552 5.35926C3.98069 5.32439 3.93934 5.29673 3.89381 5.27786C3.84829 5.25899 3.79949 5.24928 3.75021 5.24928C3.70093 5.24928 3.65213 5.25899 3.60661 5.27786C3.56108 5.29673 3.51972 5.32439 3.4849 5.35926L0.859896 7.98426C0.789531 8.05462 0.75 8.15006 0.75 8.24957C0.75 8.34908 0.789531 8.44452 0.859896 8.51488C0.930261 8.58525 1.0257 8.62478 1.12521 8.62478C1.22472 8.62478 1.32016 8.58525 1.39052 8.51488L4.01552 5.88988C4.05039 5.85506 4.07805 5.8137 4.09692 5.76817C4.11579 5.72265 4.1255 5.67385 4.1255 5.62457C4.1255 5.57529 4.11579 5.52649 4.09692 5.48097C4.07805 5.43544 4.05039 5.39409 4.01552 5.35926ZM4.76552 7.98426C4.73069 7.94939 4.68934 7.92173 4.64381 7.90286C4.59829 7.88399 4.54949 7.87428 4.50021 7.87428C4.45093 7.87428 4.40213 7.88399 4.35661 7.90286C4.31108 7.92173 4.26972 7.94939 4.2349 7.98426L1.6099 10.6093C1.57505 10.6441 1.54742 10.6855 1.52856 10.731C1.50971 10.7765 1.5 10.8253 1.5 10.8746C1.5 10.9238 1.50971 10.9726 1.52856 11.0182C1.54742 11.0637 1.57505 11.105 1.6099 11.1399C1.68026 11.2102 1.7757 11.2498 1.87521 11.2498C1.92448 11.2498 1.97327 11.2401 2.01879 11.2212C2.06432 11.2024 2.10568 11.1747 2.14052 11.1399L4.76552 8.51488C4.80039 8.48006 4.82805 8.4387 4.84692 8.39317C4.86579 8.34765 4.8755 8.29885 4.8755 8.24957C4.8755 8.20029 4.86579 8.15149 4.84692 8.10597C4.82805 8.06044 4.80039 8.01909 4.76552 7.98426ZM7.61037 7.98426L4.98536 10.6093C4.915 10.6796 4.87547 10.7751 4.87547 10.8746C4.87547 10.9741 4.915 11.0695 4.98536 11.1399C5.05573 11.2102 5.15117 11.2498 5.25068 11.2498C5.35019 11.2498 5.44562 11.2102 5.51599 11.1399L8.14099 8.51488C8.21136 8.44458 8.25091 8.3492 8.25095 8.24974C8.251 8.15027 8.21153 8.05486 8.14122 7.98449C8.07092 7.91413 7.97555 7.87457 7.87608 7.87453C7.77661 7.87448 7.6812 7.91396 7.61083 7.98426H7.61037Z"
                                    fill="#8B5CF6"
                                  />
                                </svg>
                                <p>{data}</p>
                              </div>
                            ) : null
                        )
                      : null}
                  </div>
                ) : null}

                <div className="proExperienceWrap">
                  {singleuser[0].preference_info !== null ? (
                    <div className="proExperience">
                      <img src={brief} alt="" />
                      <h5>
                        {singleuser[0].preference_info.year_of_experience} years
                        of experience
                      </h5>
                    </div>
                  ) : null}

                  <div className="proExperience">
                    <img src={user} alt="" />
                    <h5>Part-time availability</h5>
                  </div>
                  <div className="proExperience">
                    <img src={map} alt="" />
                    <h5>Bengaluru,India</h5>
                  </div>
                </div>
              </div>
              <div className="profileLeftBottom">
                <button className="touchButton">
                  <img src={back} alt="" />
                  <h4>Get in Touch</h4>
                </button>
                <button className="reserveButton">
                  <img src={user} alt="" />
                  <h4>Reserve Candidate</h4>
                </button>
              </div>
            </div>
            {/* profile card Right */}
            <div className="profileRight">
              <div className="profileRightHead">
                <h2
                  id="demographic"
                  className={
                    isSelect === "demographic"
                      ? "profileRightHeadH2Active"
                      : "profileRightHeadH2"
                  }
                  onClick={buttonHandler}
                >
                  Demographics
                </h2>
                <h2
                  id="assessments"
                  className={
                    isSelect === "assessments"
                      ? "profileRightHeadH2Active"
                      : "profileRightHeadH2"
                  }
                  onClick={buttonHandler}
                >
                  Assessments
                </h2>
                <h2
                  id="workhistory"
                  className={
                    isSelect === "workhistory"
                      ? "profileRightHeadH2Active"
                      : "profileRightHeadH2"
                  }
                  onClick={buttonHandler}
                >
                  Work History
                </h2>
                <h2
                  id="availability"
                  className={
                    isSelect === "availability"
                      ? "profileRightHeadH2Active"
                      : "profileRightHeadH2"
                  }
                  onClick={buttonHandler}
                >
                  Availability
                </h2>
                <h2
                  id="Rate Card"
                  className={
                    isSelect === "Rate Card"
                      ? "profileRightHeadH2Active"
                      : "profileRightHeadH2"
                  }
                  onClick={buttonHandler}
                >
                  Rate Card
                </h2>
              </div>
              <div className="profileRightSubHead">
                <div className="profileRightHead2">
                  {isSelect === "demographic" && (
                    <div className="work">
                      <h5 onClick={buttonHandler1} id="personal">
                        Personal Details
                      </h5>
                      <h5 onClick={buttonHandler1} id="background">
                        Background Verification
                      </h5>
                    </div>
                  )}
                  {isSelect === "assessments" && (
                    <div className="work">
                      <h5 className="">Technical (Self)</h5>
                      <h5>Certifications</h5>
                      <h5>Hackerrank</h5>
                      <h5>Personality</h5>
                    </div>
                  )}
                  {isSelect === "workhistory" && (
                    <div className="work">
                      <h5 className="">Employment</h5>
                      <h5>Projects</h5>
                      <h5>Achievements</h5>
                    </div>
                  )}
                  {isSelect === "availability" && (
                    <div className="work">
                      <h5 className=""> Availability</h5>
                      <h5>Travel History</h5>
                    </div>
                  )}
                  {isSelect === "Rate Card" && (
                    <div className="work">
                      <h5 className="">Remote</h5>
                      <h5>On-Site</h5>
                    </div>
                  )}
                </div>
              </div>
              {isSelect1 == "personal" && (
                <div className="personal">
                  <div className="personalFlex">
                    <div className="personalFlexLeft">
                      <h1>Full Name</h1>
                      {/* <h1>Last Name</h1> */}
                      <h1>Email ID</h1>
                      <h1>Phone no.</h1>
                      <h1>Date of birth</h1>
                      <h1>Address</h1>
                      {/* <h1>Address Line 2</h1> */}
                      <h1>Country</h1>
                      <h1>City</h1>
                      <h1>State</h1>
                      <h1>Pincode</h1>
                    </div>

                    <div className="personalFlexRight">
                      <h2>{singleuser[0].first_name}</h2>
                      {/* <h2>Narreddi</h2> */}
                      <h2>{singleuser[0].email}</h2>
                      <h2>{singleuser[0].phone}</h2>
                      <h2>
                        {singleuser[0].date_of_birth.length === 0
                          ? "-"
                          : singleuser[0].date_of_birth}
                      </h2>
                      <h2>
                        {singleuser[0].address !== null
                          ? singleuser[0].address.address.length !== 0
                            ? singleuser[0].address.address
                            : "-"
                          : ""}
                      </h2>

                      <h2>
                        {" "}
                        {singleuser[0].address !== null
                          ? singleuser[0].address.country.length !== 0
                            ? singleuser[0].address.country
                            : "-"
                          : ""}
                      </h2>
                      <h2>
                        {" "}
                        {singleuser[0].address !== null
                          ? singleuser[0].address.state.length !== 0
                            ? singleuser[0].address.state
                            : "-"
                          : "-"}
                      </h2>
                      <h2>
                        {" "}
                        {singleuser[0].address !== null
                          ? singleuser[0].address.city.length !== 0
                            ? singleuser[0].address.city
                            : "-"
                          : "-"}
                      </h2>
                      <h2>
                        {singleuser[0].address !== null
                          ? singleuser[0].address.pincode.length !== 0
                            ? singleuser[0].address.pincode
                            : "-"
                          : "-"}
                      </h2>
                    </div>
                  </div>
                </div>
              )}
              {isSelect1 == "background" && (
                <div className="personal">
                  <div className="personalFlex">
                    <div className="backgrundFlexLeft">
                      <h1>Aadhaar number</h1>
                      <h1>PAN number</h1>
                      <h1>Background Verification</h1>
                    </div>
                    <div className="backgroundFlexRight">
                      <h2>
                        {" "}
                        {singleuser[0].kyc_info !== null
                          ? singleuser[0].kyc_info.aadhar_number.length !== 0
                            ? singleuser[0].kyc_info.aadhar_number
                            : "-"
                          : "-"}
                      </h2>
                      <h2> {singleuser[0].kyc_info !== null
                          ? singleuser[0].kyc_info.pan_number.length !== 0
                            ? singleuser[0].kyc_info.pan_number
                            : "-"
                          : "-"}</h2>
                      <h2>Uploaded</h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default CandidateProfileCard;
