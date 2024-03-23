/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "./MobileCandidateProfile.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import brief from "../../../assests/briefCase.png";
import user from "../../../assests/User.svg";
import map from "../../../assests/mapPin.png";
import profile from "../../../assests/profile.png";
import { FiShare } from "react-icons/fi";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import vedio from "../../../assests/Image.jpg";

const MobileCandidateProfile = () => {
  const singleuser = useSelector((store) => store.singleuser);
  const [isActive, setIsActive] = useState(
    "personaldetails" || "technical" || ""
  );
  const ActiveHandler = (e) => {
    setIsActive(e.target.id);
  };
  return (
    <div>
      <div className="mobileCandidateProfile ">
        <div className="mobCandidateProfileBack">
          <IoArrowBackSharp />
          <h1>Back to results</h1>
        </div>
        <div className="mobileCandidateProfileDetails">
          <div className="mobileCandidateProfileDetailsFlex">
            <div className="mobileCandidateProfileDetailsLeft">
              <img src={profile} alt="" />
            </div>
            <div className="mobileCandidateProfileDetailsRight">
              <h1>Yasir Quazi</h1>
              <h1>USD 80 / HR</h1>
              <h2>
                <span className="mobileCandidateProfileDetailsRightSpan">
                  Available from
                </span>
                03 Aug 2024
              </h2>
              <div className="mobileCandidateProfileDetailsRightImg">
                <CiBookmark />
                <FaBookmark />
                <FiShare />
              </div>
            </div>
          </div>
          <div className="mobileCandidateProfileDetailsButton">
            <button className="candidateGetInTouch">
              <IoArrowBackSharp />
              Get in Touch
            </button>
            <button className="candidateReserve">
              <IoArrowBackSharp />
              Reserve Candidate
            </button>
          </div>
          <div className="mobileCandidateProfileDetailSkills">
            <div className="profileLeftMiddle">
              <h3>TOP SKILLS</h3>
              {singleuser[0].preference_info !== null ? (
                <div className="proSkills">
                  {singleuser[0].preference_info.skills.length !== 0
                    ? singleuser[0].preference_info.skills.map((data, index) =>
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
                  {singleuser[0].work_preference_info !== null ? (
                    <h5>
                      {
                        singleuser[0].work_preference_info
                          .preferred_mode_of_engagement
                      }{" "}
                      availability
                    </h5>
                  ) : null}
                </div>
                {singleuser[0].address !== null ? (
                  <div className="proExperience">
                    <img src={map} alt="" />
                    <h5>
                      {singleuser[0].address.city},{" "}
                      {singleuser[0].address.state},{" "}
                      {singleuser[0].address.country}
                    </h5>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="demographic">
          <div className="demographicHead">
            <h1>Demographics</h1>
          </div>
          <div className="demographicTab">
            <h2
              onClick={ActiveHandler}
              id="personaldetails"
              className={
                isActive == "personaldetails" ? "tabActive" : "tabInAvtive"
              }
            >
              Personal Details
            </h2>
            <h2
              onClick={ActiveHandler}
              id="backgroundverification"
              className={
                isActive == "backgroundverification"
                  ? "tabActive"
                  : "tabInAvtive"
              }
            >
              Background Verification
            </h2>
          </div>
          <div className="demographicBody">
            {isActive == "personaldetails" && (
              <>
                <div className="demographicBodyContent">
                  <h4>First Name</h4>
                  <h5>{singleuser[0].first_name}</h5>
                </div>
                <div className="demographicBodyContent">
                  <h4>Last Name</h4>
                  <h5>-</h5>
                </div>
                <div className="demographicBodyContent">
                  <h4>Email ID</h4>
                  <h5>{singleuser[0].email}</h5>
                </div>
                <div className="demographicBodyContent">
                  <h4>Phone no.</h4>
                  <h5>{singleuser[0].phone}</h5>
                </div>
                <div className="demographicBodyContent">
                  <h4>Date of birth</h4>
                  <h5>
                    Sur
                    {singleuser[0].date_of_birth.length === 0
                      ? "-"
                      : singleuser[0].date_of_birth}
                    ya
                  </h5>
                </div>
                <div className="demographicBodyContent">
                  <h4>Address Line 1</h4>
                  <h5>
                    {singleuser[0].address !== null
                      ? singleuser[0].address.address.length !== 0
                        ? singleuser[0].address.address
                        : "-"
                      : ""}
                  </h5>
                </div>
                <div className="demographicBodyContent">
                  <h4>Address Line 2</h4>
                  <h5>-</h5>
                </div>
                <div className="demographicBodyContent">
                  <h4>Country</h4>
                  <h5>
                    {singleuser[0].address !== null
                      ? singleuser[0].address.country.length !== 0
                        ? singleuser[0].address.country
                        : "-"
                      : ""}
                  </h5>
                </div>
                <div className="demographicBodyContent">
                  <h4>City</h4>
                  <h5>
                    {singleuser[0].address !== null
                      ? singleuser[0].address.city.length !== 0
                        ? singleuser[0].address.city
                        : "-"
                      : "-"}
                  </h5>
                </div>
                <div className="demographicBodyContent">
                  <h4>State</h4>
                  <h5>
                    {singleuser[0].address !== null
                      ? singleuser[0].address.state.length !== 0
                        ? singleuser[0].address.state
                        : "-"
                      : "-"}
                  </h5>
                </div>
                <div className="demographicBodyContent">
                  <h4>Pincode</h4>
                  <h5>
                    {singleuser[0].address !== null
                      ? singleuser[0].address.pincode.length !== 0
                        ? singleuser[0].address.pincode
                        : "-"
                      : "-"}
                  </h5>
                </div>
              </>
            )}
            {isActive == "backgroundverification" && (
              <>
                <div className="demographicBodyContent">
                  <h4>Aadhaar number</h4>
                  <h5>
                    {singleuser[0].kyc_info !== null
                      ? singleuser[0].kyc_info.aadhar_number.length !== 0
                        ? singleuser[0].kyc_info.aadhar_number
                        : "-"
                      : "-"}
                  </h5>
                </div>
                <div className="demographicBodyContent">
                  <h4>PAN number</h4>
                  <h5>
                    {singleuser[0].kyc_info !== null
                      ? singleuser[0].kyc_info.pan_number.length !== 0
                        ? singleuser[0].kyc_info.pan_number
                        : "-"
                      : "-"}
                  </h5>
                </div>
                <div className="demographicBodyContent">
                  <h4> Background Verification</h4>
                  <h5>Not Uploaded</h5>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="demographic">
          <div className="demographicHead">
            <h1>Assessments</h1>
          </div>
          <div className="demographicTab">
            <h2
              onClick={ActiveHandler}
              id="technical"
              className={isActive == "technical" ? "tabActive" : "tabInAvtive"}
            >
              Technical
            </h2>
            <h2
              onClick={ActiveHandler}
              id="certifications"
              className={
                isActive == "certifications" ? "tabActive" : "tabInAvtive"
              }
            >
              Certifications
            </h2>
            <h2
              onClick={ActiveHandler}
              id="hacker"
              className={isActive == "hacker" ? "tabActive" : "tabInAvtive"}
            >
              Hacker rank
            </h2>
          </div>
          {isActive == "technical" && (
            <>
              <div className="demographicBody paddingRL20">
                <div className="video">
                  {/* <video controls src={vedio}></video> */}
                  {/* <img src={vedio} alt="" /> */}
                  {singleuser[0].video_resume !== null ? (
                    singleuser[0].video_resume.length !== 0 ? (
                      <video controls>
                        <source
                          src={singleuser[0].video_resume}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={vedio} alt="" />
                    )
                  ) : (
                    <img src={vedio} alt="" />
                  )}

                  <h1>{singleuser[0].first_name}’s Video Resume</h1>
                  <h2>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </h2>
                </div>
                <div className="demographicBodyContent1">
                  <span>Bio</span>
                  <h6>
                    “Lorem ipsum dolor sit amet consectetur. Mauris auctor
                    faucibus suspendisse purus tristique morbi mattis nec. Neque
                    sollicitudin proin egestas malesuada iaculis. Ultrices
                    vulputate quis egestas sit metus velit leo a nibh. Amet odio
                    purus risus sodales nunc tellus felis aliquam. Elit
                    fringilla semper amet ut euismod.”
                  </h6>
                </div>
              </div>
            </>
          )}
          {isActive == "hacker" && (
            <>
              <div className="demographicBodyContent">
                <h4>Link to Hackerrank score</h4>
                <h5>{singleuser[0].preference_info.hackerrank}</h5>
              </div>
            </>
          )}
        </div>
        <div className="demographic">
          <div className="demographicHead">
            <h1>Work History</h1>
          </div>
          <div className="demographicTab">
            <h2
              onClick={ActiveHandler}
              id="Employment"
              className={isActive == "Employment" ? "tabActive" : "tabInAvtive"}
            >
              Employment
            </h2>
            <h2
              onClick={ActiveHandler}
              id="Projects"
              className={isActive == "Projects" ? "tabActive" : "tabInAvtive"}
            >
              Projects
            </h2>
            <h2
              onClick={ActiveHandler}
              id="Achievements"
              className={
                isActive == "Achievements" ? "tabActive" : "tabInAvtive"
              }
            >
              Achievements
            </h2>
          </div>
          {isActive == "Employment" && (
            <>
              <div className="demographicBody">
                <>
                  <div className="employ">
                    <h2>Java Developer</h2>
                    <h3>PhonePe </h3>
                    <h4>January 2018 - June 2024</h4>
                    <h4>Hyderabad, India</h4>
                    <h5>
                      As always, all Htmlstream products are excellent with a
                      very good personalization.
                    </h5>
                    <h6>
                      Key Skills:
                      <h5>Java, User Research, React, JSS </h5>
                    </h6>
                  </div>{" "}
                  <div className="employ">
                    <h2>Java Developer</h2>
                    <h3>PhonePe </h3>
                    <h4>January 2018 - June 2024</h4>
                    <h4>Hyderabad, India</h4>
                    <h5>
                      As always, all Htmlstream products are excellent with a
                      very good personalization.
                    </h5>
                    <h6>
                      Key Skills:
                      <h5>Java, User Research, React, JSS </h5>
                    </h6>
                    <h6>
                      Gross Annual Salary:
                      <h5>20,000 </h5>
                    </h6>
                  </div>
                </>
              </div>
            </>
          )}
          {isActive == "hacker" && (
            <>
              <div className="demographicBodyContent">
                <h4>Link to Hackerrank score</h4>
                <h5>{singleuser[0].preference_info.hackerrank}</h5>
              </div>
            </>
          )}
        </div>
        <div className="demographic">
          <div className="demographicHead">
            <h1>Availability</h1>
          </div>
          <div className="demographicTab">
            <h2
              onClick={ActiveHandler}
              id="Availability"
              className={
                isActive == "Availability" ? "tabActive" : "tabInAvtive"
              }
            >
              Availability
            </h2>
            <h2
              onClick={ActiveHandler}
              id="Travel History"
              className={
                isActive == "Travel History" ? "tabActive" : "tabInAvtive"
              }
            >
              Travel History
            </h2>
          </div>

          {isActive == "Availability" && (
            <>
              <div className="demographicBodyContent">
                <h4>Availability </h4>
                <h5>Yes</h5>
              </div>
              <div className="demographicBodyContent">
                <h4>Available from </h4>
                <h5>03 / 08 / 2024</h5>
              </div>
              <div className="demographicBodyContent">
                <h4>Full time /Part time?ility </h4>
                <h5>-</h5>
              </div>
              <div className="demographicBodyContent">
                <h4>Preferred Work Timing </h4>
                <h5>-</h5>
              </div>
              <div className="demographicBodyContent">
                <h4>Preferred method of working </h4>
                <h5>-</h5>
              </div>
              <div className="demographicBodyContent">
                <h4>Preferred Work Locations </h4>
                <h5>-</h5>
              </div>
            </>
          )}
        </div>{" "}
        <div className="demographic">
          <div className="demographicHead">
            <h1>Rate Card</h1>
          </div>
          <div className="demographicTab">
            <h2
              onClick={ActiveHandler}
              id="Remote"
              className={isActive == "Remote" ? "tabActive" : "tabInAvtive"}
            >
              Remote{" "}
            </h2>
            <h2
              onClick={ActiveHandler}
              id="On-Site"
              className={isActive == "On-Site" ? "tabActive" : "tabInAvtive"}
            >
              On-Site
            </h2>
          </div>
          {isActive == "Remote" && (
            <>
              <div className="demographicBody">
                <>
                  <div className="demographicBodyContent">
                    <h4>Hourly</h4>
                    <h5>USD 80</h5>
                  </div>
                  <div className="demographicBodyContent">
                    <h4>Monthly</h4>
                    <h5>USD 80</h5>
                  </div>
                  <div className="demographicBodyContent">
                    <h4>Annual</h4>
                    <h5>USD 80</h5>
                  </div>
                </>
              </div>
            </>
          )}
          {isActive == "On-Site" && (
            <>
              <div className="demographicBody">
                <>
                  <div className="demographicBodyContent">
                    <h4>Hourly On-Site</h4>
                    <h5>USD 80</h5>
                  </div>
                  <div className="demographicBodyContent">
                    <h4>Monthly</h4>
                    <h5>USD 80</h5>
                  </div>
                  <div className="demographicBodyContent">
                    <h4>Annual</h4>
                    <h5>USD 80</h5>
                  </div>
                </>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileCandidateProfile;
