/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import "./CandidateProfileCard.css";
import back from "../../../assests/back.png";
import brief from "../../../assests/briefCase.png";
import user from "../../../assests/User.svg";
import map from "../../../assests/mapPin.png";
import vedio from "../../../assests/Image.jpg";
import gallery from "../../../assests/gallery.svg";
import info from "../../../assests/help.svg";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import axios from "axios";
import moment from "moment";
import { MdOutlineModeEdit } from "react-icons/md";
import { storeAction } from "../../../Store/Store";

const CandidateProfileCard = (props) => {
  const dispatch = useDispatch();
  const singleuser = useSelector((store) => store.singleuser);
  const loginrole = useSelector((store) => store.loginrole);
  const token = useSelector((store) => store.token);
  const userid = useSelector((store) => store.userid);
  const [isSelect, setIsSelect] = useState("demographic");
  const [expiredata, setexpiredata] = useState(null);
  const [status, setstatus] = useState(false);

  const buttonHandler = (e) => {
    if (e.target.id == "demographic") {
      setIsSelect1("personal");
    }
    if (e.target.id == "assessments") {
      setIsSelect1("technical");
    }
    if (e.target.id == "workhistory") {
      setIsSelect1("employ");
    }
    if (e.target.id == "availability") {
      setIsSelect1("available");
    }
    if (e.target.id == "Rate Card") {
      setIsSelect1("remote");
    }
    setIsSelect(e.target.id);
  };

  const [isSelect1, setIsSelect1] = useState("personal");
  const [availablefrom, setavailablefrom] = useState(null);
  const [profile, setprofile] = useState("");
  const buttonHandler1 = (e) => {
    setIsSelect1(e.target.id);
  };
  useEffect(() => {
    getUserinfo();
  }, [singleuser]);
  const getUserinfo = async () => {
    setstatus(false);
    if (singleuser.length !== 0) {
      setexpiredata(singleuser[0].block_expiry);
      setprofile(singleuser[0].profile_picture);
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      if (userinfo !== undefined) {
        setexpiredata(userinfo.block_expiry);
      }
    }
  };
  var today = moment().format("YYYY-MM-DD");

  const calculateDateDifference = () => {
    const date2 = new Date(moment(expiredata).format("YYYY-MM-DD"));
    const date1 = new Date(today);
    const timeDifference = date1 - date2;
    const isExtended = timeDifference > 0;
    const extendedOrBelow = isExtended ? "extended" : "below";
    return extendedOrBelow;
  };
  const reserveuser = async () => {
    setstatus(true);
    let data = JSON.stringify({
      candidate_id: singleuser[0].id,
      duration: 5,
      amount_paid: 15000,
      blocked_by_id: userid,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LOCAL_HOST_URL}/reservation/blockcandidate/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    getUserinfo();
  };
  const fileInputRef = useRef(null);

  const uploadHandler = (data) => {
    fileInputRef.current.click();
  };
  const [formData] = useState(new FormData());
  const handleFileInputChange = async (e) => {
    formData.append("image", e.target.files[0]);
    formData.append("name", `profile${userid}`);
    const response = await axios.post(
      "https://fileserver-21t2.onrender.com/api/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    fileInputRef.current.value = "";
    setprofile(response.data.img_url);
    var newobj = {
      username: singleuser[0].username,
      profile_picture: response.data.img_url,
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
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      dispatch(storeAction.userdataHander({ userdata: [] }));
      setTimeout(() => {
        dispatch(
          storeAction.singleuserHander({ singleuser: [updatedata.user] })
        );
        dispatch(storeAction.userdataHander({ userdata: [updatedata.user] }));
      }, 10);
    }
  };
  useEffect(() => {
    getavailabledata();
  }, [expiredata]);
  const getavailabledata = async () => {
    if (expiredata !== "null") {
      const differenceInDays = Math.ceil(
        Math.abs(
          (new Date(moment(expiredata).format("YYYY-MM-DD")) -
            new Date(moment().format("YYYY-MM-DD"))) /
            (1000 * 60 * 60 * 24)
        )
      );
      if (differenceInDays < 30) {
        setavailablefrom(
          moment(expiredata).add(1, "days").format("DD MMM YYYY")
        );
      } else {
        setavailablefrom(null);
      }
    } else {
      setavailablefrom(null);
    }
  };

  return (
    <div>
      <div className={props.main}>
        <div onClick={() => props.fun("page1")} className={props.back}>
          <img src={back} alt="" />
          <h2>Back to results</h2>
        </div>
        {/* <img src={star} alt="" /> */}
        {loginrole == 3 ? (
          <div className="vedioNotes">
            <div className="notes">
              <h4>
                If you don’t have a personality assessment certificate, you can
                take one here at{" "}
                <span className="certificateHighLight">Mettl</span>
              </h4>
            </div>
          </div>
        ) : null}
        {loginrole == 2 ? (
          status === false ? (
            expiredata !== "null" && calculateDateDifference() === "below" ? (
              <div className="vedioNotes">
                <div className="notes">
                  <h4>
                    This profile has been reserved by an employer. However you
                    can still view & bookmark this profile for later
                    <span className="certificateHighLight">Mettl</span>
                  </h4>
                </div>
              </div>
            ) : null
          ) : null
        ) : null}

        {singleuser.length !== 0 ? (
          <div className="mainProfile">
            <div className="profileLeft">
              <div className="profileLeftTop">
                {profile.length == 0 ? (
                  <Avatar
                    name={singleuser[0].first_name}
                    size={100}
                    round="50px"
                  />
                ) : (
                  <img src={profile} alt="" />
                )}
                {loginrole == 3 ? (
                  <div onClick={uploadHandler} className="editprofile">
                    <MdOutlineModeEdit className="editicon" />
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      name="aadhaarfront"
                      onChange={handleFileInputChange}
                    />
                  </div>
                ) : null}

                <h1>{singleuser[0].first_name}</h1>
                {singleuser[0].rate_card_info !== null ? (
                  <h2>USD {singleuser[0].rate_card_info.remote_hourly} / HR</h2>
                ) : (
                  <h2>0 / HR</h2>
                )}

                {expiredata !== "null" ? (
                  availablefrom !== null ? (
                    <div className="available">
                      <p>Available from</p>
                      <h5>{availablefrom}</h5>
                    </div>
                  ) : null
                ) : null}
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

              {status === false ? (
                expiredata !== "null" &&
                calculateDateDifference() === "below" ? (
                  <div className="profileLeftBottom">
                    <button className="touchButtondiable">
                      <img src={back} alt="" />
                      <h4>Interview</h4>
                    </button>
                    <button className="reserveButtondiable">
                      <img src={user} alt="" />
                      <h4>Reserve Candidate</h4>
                    </button>
                  </div>
                ) : (
                  <div className="profileLeftBottom">
                    <button className="touchButton">
                      <img src={back} alt="" />
                      <h4>Interview</h4>
                    </button>
                    <button className="reserveButton" onClick={reserveuser}>
                      <img src={user} alt="" />
                      <h4>Reserve Candidate</h4>
                    </button>
                  </div>
                )
              ) : (
                <div className="profileLeftBottom">
                  <button className="touchButtondiable">
                    <img src={back} alt="" />
                    <h4>Interview</h4>
                  </button>
                  <button className="reserveButtondiable">
                    <img src={user} alt="" />
                    <h4>Reserve Candidate</h4>
                  </button>
                </div>
              )}
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
                      <h5 onClick={buttonHandler1} id="technical">
                        Video Resume
                      </h5>
                      <h5 onClick={buttonHandler1} id="certificate">
                        Certifications
                      </h5>
                      <h5 onClick={buttonHandler1} id="hacker">
                        Hackerrank
                      </h5>
                      <h5 onClick={buttonHandler1} id="personality">
                        Personality
                      </h5>
                    </div>
                  )}
                  {isSelect === "workhistory" && (
                    <div className="work">
                      <h5 onClick={buttonHandler1} id="employ">
                        Employment
                      </h5>
                      <h5 onClick={buttonHandler1} id="project">
                        Projects
                      </h5>
                      {/* <h5 onClick={buttonHandler1} id="achievements">
                        Achievements
                      </h5> */}
                    </div>
                  )}
                  {isSelect === "availability" && (
                    <div className="work">
                      <h5 onClick={buttonHandler1} id="available">
                        Availability
                      </h5>
                      <h5 onClick={buttonHandler1} id="travel">
                        Travel History
                      </h5>
                    </div>
                  )}
                  {isSelect === "Rate Card" && (
                    <div className="work">
                      <h5 onClick={buttonHandler1} id="remote">
                        Remote
                      </h5>
                      <h5 onClick={buttonHandler1} id="onSite">
                        On-Site
                      </h5>
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
                      <h2>
                        {" "}
                        {singleuser[0].kyc_info !== null
                          ? singleuser[0].kyc_info.pan_number.length !== 0
                            ? singleuser[0].kyc_info.pan_number
                            : "-"
                          : "-"}
                      </h2>
                      {singleuser[0].background_verification !== null
                        ? singleuser[0].background_verification !== 0
                          ? singleuser[0].background_verification
                          : "-"
                        : "-"}
                      {singleuser[0].background_verification !== null ? (
                        singleuser[0].background_verification.length !== 0 ? (
                          <h2
                            onClick={() => {
                              window.open(
                                `${singleuser[0].background_verification}`,
                                "_blank"
                              );
                            }}
                          >
                            Uploaded
                          </h2>
                        ) : (
                          <h2>Not Uploaded</h2>
                        )
                      ) : (
                        <h2>Not Uploaded</h2>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {isSelect1 === "technical" && (
                <div className="technical">
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
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </h2>
                  </div>
                  <div className="bio">
                    <h3>Bio</h3>
                    <h4>{singleuser[0].bio}</h4>
                  </div>
                </div>
              )}
              {isSelect1 === "certificate" && (
                <div className="certification">
                  {singleuser[0].certificate_info !== null &&
                  singleuser[0].certificate_info.length !== 0
                    ? singleuser[0].certificate_info.map((data, index) => (
                        <div className="certify" key={index}>
                          <h1>{data.course_name}</h1>
                          <h2>Google India </h2>
                          <div className="date">
                            <h3>Date Issued:</h3>
                            <h4>{data.date_issued}</h4>
                          </div>
                          <div className="date">
                            <h3>Skills:</h3>
                            <h4>{data.skills.toString()}</h4>
                          </div>
                          <h5>{data.description}</h5>
                          {data.certificate_file.length !== 0
                            ? data.certificate_file.map((data, index) =>
                                data.length !== 0 ? (
                                  <div
                                    className="gradeCertificate"
                                    onClick={() => {
                                      window.open(`${data}`, "_blank");
                                    }}
                                    key={index}
                                  >
                                    <img src={gallery} alt="" />
                                    <div className="gradeCertificateDesc">
                                      <h2>
                                        {
                                          data
                                            .split("/images/")[1]
                                            .split("/")[1]
                                        }
                                      </h2>
                                    </div>
                                  </div>
                                ) : null
                              )
                            : null}
                        </div>
                      ))
                    : null}
                </div>
              )}
              {isSelect1 === "hacker" &&
                (singleuser[0].preference_info !== null ? (
                  <div className="hacker">
                    <div className="hackerInner">
                      <h1>Link to Hackerrank score</h1>
                      <a href={singleuser[0].preference_info.hackerrank}>
                        {singleuser[0].preference_info.hackerrank}
                      </a>
                    </div>
                  </div>
                ) : null)}
              {isSelect1 === "personality" && (
                <div className="personality">
                  <div className="personalityTest">
                    <h1>Personality assessment test result </h1>
                    {singleuser[0].personality_assessment !== null ? (
                      singleuser[0].personality_assessment.length !== 0 ? (
                        <div
                          className="gradeCertificate1"
                          onClick={() => {
                            window.open(
                              `${singleuser[0].personality_assessment}`,
                              "_blank"
                            );
                          }}
                        >
                          <img src={gallery} alt="" />
                          <div className="gradeCertificateDesc1">
                            <h6>PersonalityTestResult.PDF</h6>
                          </div>
                        </div>
                      ) : (
                        <h2>Not Uploaded</h2>
                      )
                    ) : (
                      <h2>Not Uploaded</h2>
                    )}
                  </div>
                </div>
              )}
              {isSelect1 === "employ" &&
              singleuser[0].professional_details_info !== null &&
              singleuser[0].professional_details_info.length !== 0
                ? singleuser[0].professional_details_info.map((data, index) => (
                    <div className="employ" key={index}>
                      <h2>{data.title}</h2>
                      <h3>{data.company_name} </h3>
                      <h4>{data.years_active}</h4>
                      <h4>{data.location}</h4>
                      <h5>{data.description}</h5>
                      <h6>
                        Key Skills : <h5> {data.skills.toString()}</h5>
                      </h6>
                    </div>
                  ))
                : null}

              {isSelect1 === "project" && (
                <div className="project">
                  {singleuser[0].project_details_info !== null &&
                  singleuser[0].project_details_info.length !== 0
                    ? singleuser[0].project_details_info.map((data, index) => (
                        <div className="projectInner mb-5" key={index}>
                          <h1>{data.project_title}</h1>
                          <div className="projectFlex">
                            <h2>Role : </h2>
                            <h3> {data.role}</h3>
                          </div>
                          <div className="projectFlex">
                            <h2>Reporting to:</h2>
                            <h3>{data.reporting_to}</h3>
                          </div>
                          <div className="projectFlex">
                            <h2>Duration:</h2>
                            <h3>{data.duration_of_project}</h3>
                          </div>
                          <div className="projectFlex">
                            <h2>Key Skills: </h2>
                            <h3>{data.skills.toString()}</h3>
                          </div>
                          <h4>{data.description}</h4>
                        </div>
                      ))
                    : null}
                </div>
              )}
              {isSelect1 === "achievements" && (
                <div className="achieve">
                  <h2>No achievements to show</h2>
                </div>
              )}
              {isSelect1 === "available" && (
                <div className="availableBody">
                  <div className="availableFlex">
                    <div className="availableFlexLeft">
                      <h1>Availability</h1>
                      {/* <h1>Available from </h1> */}
                      <h1>Full time /Part time?</h1>
                      <h1>Preferred Work Timings</h1>
                      <h1>Preferred method of working</h1>
                      <h1>Preferred Work Locations</h1>
                    </div>
                    {singleuser[0].work_preference_info !== null ? (
                      <div className="availableFlexRight">
                        <h2>Yes</h2>
                        {/* <h2>03 / 08 / 2024</h2> */}
                        <h2>
                          {
                            singleuser[0].work_preference_info
                              .preferred_mode_of_engagement
                          }
                        </h2>
                        <h4>
                          {
                            singleuser[0].work_preference_info
                              .preffered_work_timings
                          }
                        </h4>
                        <h4>
                          {singleuser[0].work_preference_info.preferred_method_of_work.toString()}
                        </h4>
                        <h4>
                          {singleuser[0].work_preference_info.preffered_work_location.toString()}
                        </h4>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
              {isSelect1 === "travel" && (
                <div className="travel">
                  {singleuser[0].travel_info !== null ? (
                    <div className="travelslider">
                      <div className="travelslider1">
                        <h3>Travel history</h3>
                        {singleuser[0].travel_info.travelled_to.length !== 0
                          ? singleuser[0].travel_info.travelled_to.map(
                              (data, index) => (
                                <div className="visaStatus" key={index}>
                                  <h1>{data.split(":")[0]}</h1>
                                  <p>
                                    Year of Travel :
                                    <span>{data.split(":")[1]}</span>
                                  </p>
                                  <p>
                                    Duration : <span>{data.split(":")[2]}</span>
                                  </p>
                                  <p>
                                    Purpose : <span>{data.split(":")[3]}</span>
                                  </p>
                                  <p>
                                    Type of Visa :
                                    <span>{data.split(":")[4]}</span>
                                  </p>
                                  <p>
                                    Validity of Visa :
                                    <span> {data.split(":")[5]}</span>
                                  </p>
                                </div>
                              )
                            )
                          : null}
                      </div>

                      <div className="travelslider1">
                        <h3>Countries willing to travel to for work</h3>
                        {singleuser[0].travel_info.travel_to_for_work.length !==
                        0
                          ? singleuser[0].travel_info.travel_to_for_work.map(
                              (data, index) => (
                                <>
                                  <div className="visaStatus" key={index}>
                                    <h1 title="">{data.split(":")[0]}</h1>
                                  </div>
                                  <div className="visaStatus">
                                    <p>
                                      Only for :{" "}
                                      <span>{data.split(":")[1]}</span>
                                    </p>
                                    <p>
                                      Duration :{" "}
                                      <span> {data.split(":")[2]}</span>
                                    </p>
                                    <p>
                                      Travel Readiness:{" "}
                                      <span>{data.split(":")[3]}</span>
                                    </p>
                                  </div>
                                </>
                              )
                            )
                          : null}
                      </div>
                      <div className="travelslider1">
                        <h3>Countries willing to relocate to</h3>
                        {singleuser[0].travel_info.relocate_for_work.length !==
                        0
                          ? singleuser[0].travel_info.relocate_for_work.map(
                              (data, index) => (
                                <>
                                  <div className="visaStatus">
                                    <p>
                                      Are you willing :{" "}
                                      <span>{data.split(":")[0]}</span>
                                    </p>
                                    <p>
                                      Preferred Countries :{" "}
                                      <span> {data.split(":")[1]}</span>
                                    </p>
                                    <p>
                                      How long are you willing to relocate ::{" "}
                                      <span>{data.split(":")[2]}</span>
                                    </p>
                                  </div>
                                </>
                              )
                            )
                          : null}
                      </div>

                      <div className="travelslider1">
                        <h3>Residency details</h3>
                        <div className="visaStatus">
                          <p>
                            Current Place of Residence:{" "}
                            {singleuser[0].current_place_of_residence}
                          </p>
                          <p>
                            Duration :{" "}
                            {singleuser[0].lived_at_current_residence}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
              {isSelect1 === "remote" && (
                <div className="remote">
                  <div className="remoteFlex">
                    <div className="remoteFlexLeft">
                      <h1>Hourly</h1>
                      <h1>Monthly</h1>
                      <h1>Annual</h1>
                    </div>
                    {singleuser[0].rate_card_info !== null ? (
                      <div className="remoteFlexRight">
                        <h2>{singleuser[0].rate_card_info.remote_hourly}</h2>
                        <h2>{singleuser[0].rate_card_info.remote_monthly}</h2>
                        <h2>{singleuser[0].rate_card_info.remote_annualy}</h2>
                      </div>
                    ) : (
                      <div className="remoteFlexRight">
                        <h2>Not Provided</h2>
                        <h2>Not Provided</h2>
                        <h2>Not Provided</h2>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isSelect1 === "onSite" && (
                <div className="remote">
                  <div className="remoteFlex">
                    <div className="remoteFlexLeft">
                      <h1>Hourly</h1>
                      <h1>Monthly</h1>
                      <h1>Annual</h1>
                    </div>
                    {singleuser[0].rate_card_info !== null ? (
                      <div className="remoteFlexRight">
                        <h2>{singleuser[0].rate_card_info.onsite_hourly}</h2>
                        <h2>{singleuser[0].rate_card_info.onsite_monthly}</h2>
                        <h2>{singleuser[0].rate_card_info.onsite_annualy}</h2>
                      </div>
                    ) : (
                      <div className="remoteFlexRight">
                        <h2>Not Provided</h2>
                        <h2>Not Provided</h2>
                        <h2>Not Provided</h2>
                      </div>
                    )}
                  </div>
                  <div className="onsiteNote">
                    <img src={info} alt="" />
                    <h5>
                      Should you want the candidate to be based out of your
                      location, and work on-site in your office, we can make
                      that happen (for most countries).
                      <h6>
                        Please connect with your Customer Success Manager for
                        further information.
                      </h6>
                    </h5>
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
