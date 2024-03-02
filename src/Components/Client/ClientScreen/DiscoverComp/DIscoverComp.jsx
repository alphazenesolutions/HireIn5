/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./DiscoverComp.css";
import DashHead from "../../../Reusable/DashBoardReusable/DashHead/DashHead";
import DashSearch from "../../../Reusable/DashBoardReusable/DashSearch/DashSearch";
import Table from "./Table/Table";
import SearchProfileCard from "../../../Reusable/SearchProfileCard/SearchProfileCard";
import recentLeft from "../../../../assests/recentLeft.png";
import recentRight from "../../../../assests/recentRight.png";
import ProfileCard from "../../../Reusable/ProfileCard/ProfileCard";
import { gsap } from "gsap";
import axios from "axios";
import { useSelector } from "react-redux";
import CandidateProfileCard from "../../../Reusable/CandidateProfileCard/CandidateProfileCard";
import { useDispatch } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import DashBody from "../../../Reusable/DashBoardReusable/DashBody/DashBody";
import glasses from "../../../../assests/glasses.png";
import close from "../../../../assests/billingX.png";
import courseIcons from "../../../../assests/userCard.png";
import brief from "../../../../assests/briefCase.png";
import SingleRange from "../../../MaterialUi/SingleRange/SingleRange";
import userCheck from "../../../../assests/userCheck.png";
import success from "../../../../assests/Succcess.png";
import moment from "moment";
import Skilllist from "../../../../assests/skillsJSON.json";
import Avatar from "react-avatar";

const DiscoverComp = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.token);
  const userid = useSelector((store) => store.userid);
  const [isInput, setIsInput] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [alldata, setalldata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [searchuser, setsearchuser] = useState([]);
  const [reserveduser, setreserveduser] = useState([]);
  const [isPage, setIsPage] = useState("page1");
  const [startdate, setstartdate] = useState(moment().format("YYYY-MM-DD"));
  const [month, setmonth] = useState(3);

  const pageHandler = async (event, id) => {
    var checkdata = await filterdata.filter((data) => {
      return data.id == id;
    });
    setreserveduser(checkdata);
    dispatch(storeAction.singleuserHander({ singleuser: checkdata }));
    if (event === "page2") {
      setIsPage(event);
      let data = JSON.stringify({
        new_entry: id.toString(),
      });
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `https://hirein5-server.onrender.com/user/recentlyvisited/${userid}`,
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios
        .request(config)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });
    } else if (event === "page1") {
      setIsInput(false);
      setIsDisable(false);
      setIsPage(event);
    } else {
      setIsPage(event);
    }
  };

  // gsap

  var tl1 = gsap.timeline();
  var card = 0;
  // increment
  const totalHandler = () => {
    card += 1;
  };
  // decrement
  const totalHandler1 = () => {
    card -= 1;
    if (card <= 0) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  };
  const gsapHandler = () => {
    totalHandler();
    tl1.to(".recentWrap", { x: card * -530 });
  };
  const gsapHandlerReverse = () => {
    totalHandler1();
    tl1.to(".recentWrap", { x: card * -530 });
  };

  useEffect(() => {
    getAlldata();
  }, []);
  useEffect(() => {
    getSearchuser();
  }, [isPage]);

  const getAlldata = async () => {
    var allfacility = await axios
      .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/getFaculties`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response;
      });
    setalldata(allfacility.faculties);

    var config1 = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://hirein5-server.onrender.com/bookmark/users/${userid}`,
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    var tabledata = await axios(config1)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    if (tabledata.length !== 0) {
      const bookmarkedUserArray = tabledata.map((item) => item.bookmarked_user);
      dispatch(
        storeAction.bookmarkdataHander({ bookmarkdata: bookmarkedUserArray })
      );
    }
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = (e, data) => {
    dispatch(storeAction.isPopUpHander(e));
    setreserveduser([data]);
    dispatch(storeAction.singleuserHander({ singleuser: [data] }));
  };

  const overLayHandler1 = () => {
    let data = JSON.stringify({
      candidate_id: reserveduser[0].id,
      duration: month,
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
    setmonth(3);
    dispatch(storeAction.isPopUpHander("reserveSuccess"));
  };

  const profileRouter = () => {
    setIsPage("page2");
    dispatch(storeAction.isPopUpHander());
  };

  const getSearchuser = async () => {
    var allsearchfacility = await axios
      .get(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/recentlyvisited/${userid}`,
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
    if (allsearchfacility.recently_visited.length !== 0) {
      var unique = allsearchfacility.recently_visited.filter(
        (value, index, array) => array.indexOf(value) === index
      );
      let data = JSON.stringify({
        users_list: unique,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://hirein5-server.onrender.com/getUsersInformation/${userid}`,
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      var alluserdata = await axios
        .request(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
      setsearchuser(alluserdata);
    } else {
      setsearchuser([]);
    }
  };

  const addbookmark = async (id) => {
    let data = JSON.stringify({
      user: userid.toString(),
      bookmarked_user: id.toString(),
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://hirein5-server.onrender.com/bookmark/`,
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    await axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    getAlldata();
  };
  const clearall = async () => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://hirein5-server.onrender.com/remove/recentlyvisited/${userid}`,
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    getSearchuser();
  };
  const searchHandler = () => {
    // setselectseacrh(true);
  };
  const [isButton, setIsButton] = useState(null);
  const [selectseacrh, setselectseacrh] = useState(false);
  const [searchvalue, setsearchvalue] = useState("");
  const [skilldata, setskilldata] = useState([]);

  const buttonHandler = async (e) => {
    setsearchvalue(e);
    if (e.length !== 0) {
      // var myHeaders = new Headers();
      // myHeaders.append("apikey", "m6DPZFayQKB7uHJSfmv3toiM7sjfodaG");
      // var requestOptions = {
      //   method: "GET",
      //   redirect: "follow",
      //   headers: myHeaders,
      // };
      // var skilldata = await fetch(
      //   `https://api.apilayer.com/skills?q=${e}`,
      //   requestOptions
      // ).then((response) => {
      //   return response.text();
      // });
      // var newarray = JSON.parse(skilldata);
      var skillarrray = Skilllist;
      const uniqueSkills = Array.from(
        new Set(skillarrray.map((skill) => skill.Skill))
      );
      const inputvalueLower = e.toLowerCase();
      const matchingSkills = uniqueSkills.filter(
        (skill) =>
          typeof skill === "string" &&
          skill.toLowerCase().includes(inputvalueLower)
      );
      setskilldata(matchingSkills);
      setIsButton(true);
    } else {
      setselectseacrh(false);
      setIsButton(false);
      setskilldata([]);
    }
  };
  const seachuser = async () => {
    if (searchvalue.length !== 0) {
      setIsInput(true);
      const searchTerm = searchvalue.toLowerCase();
      const filteredData = alldata.filter((data) => {
        // const isFirstNameMatch = data.first_name
        //   .toLowerCase()
        //   .includes(searchTerm);
        if (data.preference_info !== null) {
          const isSkillMatch = data.preference_info.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm)
          );

          return isSkillMatch;
          // return isFirstNameMatch || isSkillMatch;
        }
      });
      setfilterdata(filteredData);
    } else {
      setIsInput(false);
      setfilterdata([]);
      setselectseacrh(false);
    }
  };
  return (
    <div>
      <div className="dashBoardMain paddingLeft100">
        {isPage === "page1" && (
          <div className="">
            <DashHead
              head="Discover Candidates"
              desc="Search and find the right fit for your company. If you need instant help in shortlisting candidates,"
              highLight="Contact us"
              descClass="dashBoardMainHeadDescBetween"
            />
            <DashSearch
              class="dashBoardMainSearch paddingRight100"
              function2={searchHandler}
              buttonHandler={buttonHandler}
              skilldata={skilldata}
              isButton={isButton}
              seachuser={seachuser}
              alldata={alldata}
              setfilterdata={setfilterdata}
              setIsInput={setIsInput}
              setsearchvalue={setsearchvalue}
            />
            {isInput === false ? (
              <div>
                {selectseacrh === false ? (
                  searchuser.length !== 0 ? (
                    <div className="recentHead paddingRight100">
                      <div className="recentHeadLeft">
                        <h1>Recent Searches</h1>
                        <button
                          disabled={isDisable === true ? true : false}
                          onClick={gsapHandlerReverse}
                        >
                          <img src={recentLeft} alt="" />
                        </button>
                        <button onClick={gsapHandler}>
                          <img src={recentRight} alt="" />
                        </button>
                      </div>
                      <div className="recentHeadRight">
                        <h2 onClick={clearall} className="cursor-pointer">
                          Clear All
                        </h2>
                      </div>
                    </div>
                  ) : (
                    <DashBody
                      Img={glasses}
                      head="Begin your search to Hire in 5"
                      desc="Find the right candidates, shortlist and schedule an interview with them here."
                      button=""
                      fun=""
                    />
                  )
                ) : (
                  <DashBody
                    Img={glasses}
                    head="Begin your search to Hire in 5"
                    desc="Find the right candidates, shortlist and schedule an interview with them here."
                    button=""
                    fun=""
                  />
                )}

                <div className="recent ">
                  {searchuser.length !== 0
                    ? searchuser.map((datanew, index1) => (
                        <div className="recentWrap" key={index1}>
                          <SearchProfileCard
                            datanew={datanew}
                            addbookmark={addbookmark}
                            reserve={overLayHandler}
                            setIsPage={setIsPage}
                          />
                        </div>
                      ))
                    : null}
                </div>
                <Table class="tableOne paddingRight100" />
              </div>
            ) : (
              <div className="">
                <ProfileCard fun={pageHandler} filterdata={filterdata} />
              </div>
            )}
          </div>
        )}
        {isPage === "page2" && (
          <CandidateProfileCard
            main="candidateProfile"
            fun={pageHandler}
            back="candidateBack"
          />
        )}
      </div>
      {isPopUp === "reserve" && (
        <div className="reserveCandidate">
          <div className="reserveHead">
            <h1>Reserve candidate</h1>
            <img src={close} alt="" />
          </div>
          {reserveduser.length !== 0 ? (
            <div className="reserveCandidateFlex">
              <div className="reserveCandidateFlexLeft">
                <h2>What is reserving?</h2>
                <ul>
                  <li>
                    By paying the Reserve Fees, the candidate will be{" "}
                    <span className="darkHighter">
                      blocked for you exclusively for a period of 5 days.
                    </span>{" "}
                    This feature is available only to Pro Subscribers.
                  </li>
                  <li>
                    During the 5 days, our{" "}
                    <span className="darkHighter">
                      {" "}
                      Customer Success team will work to ensure{" "}
                    </span>
                    that you are able to sign the engagement contract for the
                    candidate.
                  </li>
                  <li>
                    The amount paid towards reserving the candidate will be
                    <span className="darkHighter">
                      {" "}
                      adjusted against the first invoice
                    </span>{" "}
                    against the same candidate.
                  </li>
                  <li>
                    Start date of the engagement for a candidate who has been
                    "Reserved" on the system, cannot be more than 30 days.
                  </li>
                  <li>
                    After reserving a candidate, in case you are unable to
                    complete the signing formalities within 5 days, the
                    candidate's profile will be automatically opened up for
                    others to hire / reserve, and the reserve fees shall be
                    refunded to you within 3-4 working days.
                  </li>
                  <li>
                    For any reason whatsoever, if the candidate shortlisted by
                    you is not available, you will have the choice to either get
                    the refund or use that credit against the next invoice.
                  </li>
                </ul>
              </div>
              <div className="reserveCandidateFlexRight">
                <div className="reserveCandidateFlexRightHead">
                  <div className="reserveCandidateFlexRightHeadLeft">
                    {/* <img src={profile} alt="" /> */}
                    <Avatar
                      name={reserveduser[0].first_name}
                      size={50}
                      round="50px"
                    />
                    <div className="reserveCandidateFlexRightHeadLeftDesc">
                      <h3>{reserveduser[0].first_name}</h3>
                      <h4>{reserveduser[0].title}</h4>
                    </div>
                  </div>
                  <div className="reserveCandidateFlexRightHeadRight">
                    <h5 className="rateHour">
                      {reserveduser[0].hourly_rate}/hr
                    </h5>
                  </div>
                </div>
                {reserveduser[0].preference_info !== null ? (
                  <>
                    {" "}
                    <div className="candidateCartSkills">
                      {reserveduser[0].preference_info.skills.length !== 0
                        ? reserveduser[0].preference_info.skills.map(
                            (data, index) => (
                              <h4 key={index}>
                                <img src={courseIcons} alt="" />
                                {data}
                              </h4>
                            )
                          )
                        : null}
                    </div>
                    <div className="reserveCandidateBrief">
                      <h6 className="briefH5">
                        <img src={brief} alt="" />
                        <p>
                          {reserveduser[0].preference_info.year_of_experience}{" "}
                          years of experience{" "}
                        </p>
                      </h6>
                      <h6 className="briefH5">
                        <img src={userCheck} alt="" />
                        <p>Part-time availability</p>
                      </h6>
                    </div>
                  </>
                ) : null}

                <h2>Start date</h2>
                <input
                  type="date"
                  onChange={(e) => {
                    setstartdate(searchvalue);
                  }}
                  defaultValue={startdate}
                />
                <h2 className="marginBottom35">Duration of engagement</h2>
                <SingleRange setmonth={setmonth} />
                <div className="durationmMonths">
                  <h4>3 months</h4>
                  <h4>1 year</h4>
                </div>
                <h5>
                  Candidate will be reserved from{" "}
                  {startdate !== null ? (
                    <span className="darkHighter">
                      {moment(startdate).format("MMM DD, YYYY")} -{" "}
                      {moment(startdate)
                        .add(month, "month")
                        .format("MMM DD, YYYY")}
                    </span>
                  ) : null}
                </h5>
                <div className="fees">
                  <h4>Reserve Fees</h4>
                  <h4>₹ 15,000</h4>
                </div>
                <button onClick={overLayHandler1}>Continue to Payment</button>
                <p>
                  You’ll be taken to{" "}
                  <span className="darkHighter">Razorpay</span> to complete the
                  transaction
                </p>
              </div>
            </div>
          ) : null}
        </div>
      )}
      {isPopUp === "reserveSuccess" && (
        <div className="reserveSuccess">
          <div className="reserveSuccessClose">
            {/* <img className="closeImage" src={close} alt="" /> */}
          </div>
          <img src={success} alt="" />
          <h1>Candidate reserved</h1>
          <p>Our customer success team will contact you shortly! </p>
          <button onClick={profileRouter}>Check candidate</button>
        </div>
      )}
      {/* <div contenteditable="true" className="h-[100px] w-full bg-grey-400">
        <div contenteditable="true">I'm Editable. Edit me!</div>
      </div> */}
    </div>
  );
};

export default DiscoverComp;
