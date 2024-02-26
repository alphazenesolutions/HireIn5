/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "./CandidateProfileCard.css";
import back from "../../../assests/back.png";
import candidatePropoic from "../../../assests/CandidateProfile.png";
import brief from "../../../assests/briefCase.png";
import user from "../../../assests/User.svg";
import map from "../../../assests/mapPin.png";

const CandidateProfileCard = (props) => {
  const [isSelect1, setIsSelect1] = useState(false);
  const buttonHandler1 = () => {
    setIsSelect1(true);
    setIsSelect2(false);
    setIsSelect3(false);
    setIsSelect4(false);
    setIsSelect5(false);
  };
  const [isSelect2, setIsSelect2] = useState(false);
  const buttonHandler2 = () => {
    setIsSelect1(false);
    setIsSelect2(true);
    setIsSelect3(false);
    setIsSelect4(false);
    setIsSelect5(false);
  };
  const [isSelect3, setIsSelect3] = useState(false);
  const buttonHandler3 = () => {
    setIsSelect1(false);
    setIsSelect2(false);
    setIsSelect3(true);
    setIsSelect4(false);
    setIsSelect5(false);
  };
  const [isSelect4, setIsSelect4] = useState(false);
  const buttonHandler4 = () => {
    setIsSelect1(false);
    setIsSelect2(false);
    setIsSelect3(false);
    setIsSelect4(true);
    setIsSelect5(false);
  };
  const [isSelect5, setIsSelect5] = useState(false);
  const buttonHandler5 = () => {
    setIsSelect1(false);
    setIsSelect2(false);
    setIsSelect3(false);
    setIsSelect4(false);
    setIsSelect5(true);
  };
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
        {props.reserveduser.length !== 0 ? (
          <div className="mainProfile">
            <div className="profileLeft">
              <div className="profileLeftTop">
                <img src={candidatePropoic} alt="" />
                <h1>{props.reserveduser[0].first_name}</h1>
                <h2>USD 80 / HR</h2>
                <div className="available">
                  <p>Available from</p>
                  <h5>03 Aug 2024</h5>
                </div>
              </div>
              <div className="profileLeftMiddle">
                <h3>TOP SKILLS</h3>
                {props.reserveduser[0].preference_info !== null ? (
                  <div className="proSkills">
                    {props.reserveduser[0].preference_info.skills.length !== 0
                      ? props.reserveduser[0].preference_info.skills.map(
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
                  {props.reserveduser[0].preference_info !== null ? (
                    <div className="proExperience">
                      <img src={brief} alt="" />
                      <h5>
                        {
                          props.reserveduser[0].preference_info
                            .year_of_experience
                        }{" "}
                        years of experience
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
            <div className="profileRight">
              <div className="profileRightHead">
                <div
                  onClick={buttonHandler1}
                  className={isSelect1 === true ? "workActive" : "work"}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.334 4.66699H2.66732C1.93094 4.66699 1.33398 5.26395 1.33398 6.00033V12.667C1.33398 13.4034 1.93094 14.0003 2.66732 14.0003H13.334C14.0704 14.0003 14.6673 13.4034 14.6673 12.667V6.00033C14.6673 5.26395 14.0704 4.66699 13.334 4.66699Z"
                      stroke={isSelect1 === true ? "#8b5cf6" : "#1F2937"}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.6673 14V3.33333C10.6673 2.97971 10.5268 2.64057 10.2768 2.39052C10.0267 2.14048 9.68761 2 9.33398 2H6.66732C6.3137 2 5.97456 2.14048 5.72451 2.39052C5.47446 2.64057 5.33398 2.97971 5.33398 3.33333V14"
                      stroke={isSelect1 === true ? "#8b5cf6" : "#1F2937"}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <h5>Work</h5>
                </div>
                <div
                  onClick={buttonHandler2}
                  className={isSelect2 === true ? "workActive" : "work"}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.00065 9.33333L4.96732 7.4C5.07863 7.1791 5.24919 6.99353 5.45994 6.86402C5.67068 6.73451 5.91329 6.66618 6.16065 6.66667H13.334M13.334 6.66667C13.5377 6.66631 13.7387 6.71262 13.9217 6.80206C14.1047 6.89149 14.2648 7.02166 14.3897 7.18258C14.5146 7.3435 14.6009 7.53089 14.6421 7.73037C14.6833 7.92985 14.6782 8.13611 14.6273 8.33333L13.594 12.3333C13.52 12.6199 13.3527 12.8738 13.1186 13.0548C12.8844 13.2359 12.5966 13.3339 12.3007 13.3333H2.66732C2.3137 13.3333 1.97456 13.1929 1.72451 12.9428C1.47446 12.6928 1.33398 12.3536 1.33398 12V3.33333C1.33398 2.6 1.93398 2 2.66732 2H5.28732C5.50693 2.00114 5.72286 2.0565 5.91592 2.16117C6.10898 2.26585 6.2732 2.41659 6.39398 2.6L6.94065 3.4C7.06144 3.58341 7.22565 3.73415 7.41872 3.83883C7.61178 3.9435 7.82771 3.99886 8.04732 4H12.0007C12.3543 4 12.6934 4.14048 12.9435 4.39052C13.1935 4.64057 13.334 4.97971 13.334 5.33333V6.66667Z"
                      stroke={isSelect2 === true ? "#8b5cf6" : "#1F2937"}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <h5>Projects</h5>
                </div>
                <div
                  onClick={buttonHandler3}
                  className={isSelect3 === true ? "workActive" : "work"}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 9.33301C10.2091 9.33301 12 7.54215 12 5.33301C12 3.12387 10.2091 1.33301 8 1.33301C5.79086 1.33301 4 3.12387 4 5.33301C4 7.54215 5.79086 9.33301 8 9.33301Z"
                      stroke={isSelect3 === true ? "#8b5cf6" : "#1F2937"}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.3173 8.59375L11.3327 14.6671L7.99935 12.6671L4.66602 14.6671L5.68135 8.59375"
                      stroke={isSelect3 === true ? "#8b5cf6" : "#1F2937"}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <h5>Certificate</h5>
                </div>
                <div
                  onClick={buttonHandler4}
                  className={isSelect4 === true ? "workActive" : "work"}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1557_2030)">
                      <path
                        d="M8.00065 14.6663C11.6825 14.6663 14.6673 11.6816 14.6673 7.99967C14.6673 4.31778 11.6825 1.33301 8.00065 1.33301C4.31875 1.33301 1.33398 4.31778 1.33398 7.99967C1.33398 11.6816 4.31875 14.6663 8.00065 14.6663Z"
                        stroke={isSelect4 === true ? "#8b5cf6" : "#1F2937"}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1.33398 8H14.6673"
                        stroke={isSelect4 === true ? "#8b5cf6" : "#1F2937"}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.00065 1.33301C9.66817 3.15858 10.6158 5.5277 10.6673 7.99967C10.6158 10.4717 9.66817 12.8408 8.00065 14.6663C6.33313 12.8408 5.38548 10.4717 5.33398 7.99967C5.38548 5.5277 6.33313 3.15858 8.00065 1.33301Z"
                        stroke={isSelect4 === true ? "#8b5cf6" : "#1F2937"}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1557_2030">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <h5>Travel History</h5>
                </div>
                <div
                  onClick={buttonHandler5}
                  className={isSelect5 === true ? "workActive" : "work"}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.6673 14V12.6667C12.6673 11.9594 12.3864 11.2811 11.8863 10.781C11.3862 10.281 10.7079 10 10.0007 10H6.00065C5.29341 10 4.61513 10.281 4.11503 10.781C3.61494 11.2811 3.33398 11.9594 3.33398 12.6667V14"
                      stroke={isSelect5 === true ? "#8b5cf6" : "#1F2937"}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.00065 7.33333C9.47341 7.33333 10.6673 6.13943 10.6673 4.66667C10.6673 3.19391 9.47341 2 8.00065 2C6.52789 2 5.33398 3.19391 5.33398 4.66667C5.33398 6.13943 6.52789 7.33333 8.00065 7.33333Z"
                      stroke={isSelect5 === true ? "#8b5cf6" : "#1F2937"}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <h5>Personal</h5>
                </div>
              </div>
              <div className="profileDetails">
                <h1>Java Developer</h1>
                <h2>PhonePe </h2>
                <h3>January 2018 - June 2024</h3>
                <h6>Hyderabad, India</h6>
                <h4>
                  As always, all Htmlstream products are excellent with a very
                  good personalization.
                </h4>
                <h5>
                  <span className="key">Key Skills:</span> Java, User Research,
                  React, JSS
                </h5>
                <h5>
                  <span className="key"></span>
                </h5>
              </div>
              <div className="profileDetails">
                <h1>Software Intern</h1>
                <h2>Google </h2>
                <h3>June 2016 - May 2017</h3>
                <h6>Bengaluru, India</h6>
                <h4>A year long membership to level my skills</h4>
                <h5>
                  <span className="key">Key Skills:</span> Java, User Research,
                  React, JSS
                </h5>
                <h5>
                  <span className="key">Gross Annual Salary:</span> 20,000
                </h5>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default CandidateProfileCard;
