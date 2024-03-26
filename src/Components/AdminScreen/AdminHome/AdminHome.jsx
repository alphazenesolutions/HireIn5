/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "./AdminHome.css";
import DashHead from "../../Reusable/DashBoardReusable/DashHead/DashHead";
import Notification from "../../Reusable/Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../Store/Store";
import back from "../../../assests/billingX.png";
import ProgressBar from "../../PrelineComponent/ProgressBar/ProgressBar";
import candidateNotificaionApprove from "../../../assests/approveCandidate.svg";
import candidateNotificaionInterview from "../../../assests/office.svg";
import Profile from "../../../assests/Iconimg.png";
import greenArrow from "../../../assests/greenArrow.svg";
import redArrow from "../../../assests/redArrow.svg";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminHome = () => {
  const token = useSelector((store) => store.token);
  const userid = useSelector((store) => store.userid);
  const alluserdata = useSelector((store) => store.alluserdata);
  const allcompanydata = useSelector((store) => store.allcompanydata);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });
  const [interviewdata, setinterviewdata] = useState([]);

  const overLayHandler = async (data) => {
    var checkdata = await allcompanydata.filter((item) => {
      return item.id == data.user;
    });
    setinterviewdata(checkdata);
    dispatch(storeAction.isPopUpHander("interviewDetails"));
    let newdata = JSON.stringify({
      status: "true",
    });
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://hirein5-server.onrender.com/notification/${data.id}/`,
      headers: {
        Authorization: `JWT ${token}`,
      },
      data: newdata,
    };
    axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    Getnotification();
  };

  const overLayHandler1 = async (data) => {
    var checkuser = await alluserdata.filter((item) => {
      return item.id == data.user;
    });
    if (checkuser.length !== 0) {
      dispatch(storeAction.singleuserHander({ singleuser: checkuser }));
      dispatch(storeAction.isPopUpHander("approveconformation"));
      let newdata = JSON.stringify({
        status: "true",
      });
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `https://hirein5-server.onrender.com/notification/${data.id}/`,
        headers: {
          Authorization: `JWT ${token}`,
        },
        data: newdata,
      };

      axios
        .request(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
      Getnotification();
    }
  };
  const [target, setTarget] = useState("activity");
  const targetHandler = (e) => {
    setTarget(e.target.id);
  };

  const CloseOverlay = () => {
    dispatch(storeAction.isPopUpHander());
  };

  const popUpHandler = () => {
    navigate("/admincandidateview");
    dispatch(storeAction.isPopUpHander());
  };
  const [readnoti, setreadnoti] = useState([]);
  const [unreadnoti, setunreadnoti] = useState([]);
  const [hireddata, sethireddata] = useState([]);
  const [nothired, setnothired] = useState([]);
  useEffect(() => {
    Getnotification();
  }, []);
  const Getnotification = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://hirein5-server.onrender.com/notification/${userid}`,
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    try {
      const response = await axios.request(config);
      const allnotification = response.data;
      if (allnotification) {
        const filterData = (arr) => {
          const filteredData = [];
          const userMap = {}; // To keep track of users and their types
          arr.forEach((item) => {
            const { user, on_type } = item;
            if (!userMap[user]) {
              userMap[user] = [on_type]; // Initialize with the first on_type encountered
              filteredData.push(item);
            } else {
              if (!userMap[user].includes(on_type)) {
                userMap[user].push(on_type);
                filteredData.push(item);
              }
            }
          });
          return filteredData;
        };
        const filteredNotifications = filterData(allnotification);
        if (filteredNotifications.length !== 0) {
          var unreaddata = await filteredNotifications.filter((data) => {
            return data.status === "false";
          });
          var readdata = await filteredNotifications.filter((data) => {
            return data.status === "true";
          });
          setunreadnoti(unreaddata);
          setreadnoti(readdata);
        }
      }
    } catch (error) {
      return error;
    }
    var hireduser = await alluserdata.filter((data) => {
      return data.status === "Hired";
    });
    var nothireduser = await alluserdata.filter((data) => {
      return data.status !== "Hired";
    });
    sethireddata(hireduser);
    setnothired(nothireduser);
  };
  const markread = async () => {
    if (unreadnoti.length !== 0) {
      for (var i = 0; i < unreadnoti.length; i++) {
        let newdata = JSON.stringify({
          status: "true",
        });
        let config = {
          method: "put",
          maxBodyLength: Infinity,
          url: `https://hirein5-server.onrender.com/notification/${unreadnoti[i].id}/`,
          headers: {
            Authorization: `JWT ${token}`,
          },
          data: newdata,
        };
        axios
          .request(config)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error;
          });
      }
      Getnotification();
    }
  };
  return (
    <div>
      <div className="adminHomePage paddingLeft100 paddingRight100 marginBottom20">
        <DashHead
          head="Home"
          desc="placeholder text here"
          descClass="dashBoardMainHeadDescBetween"
        />
        <div className="adminNotification">
          <div className="innerAdminNotification">
            <div className="adminNotificationHead">
              <h1>Notifications</h1>
              <h6
                onClick={() => {
                  markread();
                }}
              >
                Mark all as read
              </h6>
            </div>
            <div className="adminNotificationTab">
              <h5
                id="activity"
                onClick={targetHandler}
                className={
                  target == "activity"
                    ? "adminNotificationTabActive"
                    : "adminNotificationTabInactive"
                }
              >
                Activity
              </h5>
              <h5
                id="read"
                onClick={targetHandler}
                className={
                  target == "read"
                    ? "adminNotificationTabActive"
                    : "adminNotificationTabInactive"
                }
              >
                Read
              </h5>
            </div>
          </div>
          {target == "activity" ? (
            <div className="adminNotificationLog">
              {unreadnoti.length !== 0 ? (
                unreadnoti.map((data, index) =>
                  data.on_type === "Candidate has onboarded" ? (
                    <Notification
                      Img={candidateNotificaionApprove}
                      message={data.message}
                      button="Approve Candidate"
                      btnClass="notificationButton"
                      fun={() => {
                        overLayHandler1(data);
                      }}
                      date={data.created_at}
                      key={index}
                      type="unread"
                    />
                  ) : data.on_type === "Client has onboarded" ? (
                    <Notification
                      Img={candidateNotificaionInterview}
                      message={data.message}
                      button="has onboarded as a client subscribed to Starter plan"
                      btnClass="hideButton"
                      date={data.created_at}
                      key={index}
                      type="unread"
                    />
                  ) : data.on_type === "Client Meeting" ? (
                    <Notification
                      Img={Profile}
                      message={data.message}
                      date={data.created_at}
                      fun={() => {
                        overLayHandler(data);
                      }}
                      button="Review Candidate"
                      btnClass="notificationButton"
                      key={index}
                      type="unread"
                    />
                  ) : (
                    <Notification
                      Img={Profile}
                      message={data.message}
                      date={data.created_at}
                      fun={overLayHandler}
                      // button="Review Candidate"
                      // btnClass="notificationButton"
                      key={index}
                      type="unread"
                    />
                  )
                )
              ) : (
                <p className="text-center flex justify-center pt-12 texfontfott-semibold">
                  Notification Not Available...
                </p>
              )}
            </div>
          ) : null}
          {target == "read" ? (
            <div className="adminNotificationLog">
              {readnoti.length !== 0 ? (
                readnoti.map((data, index) =>
                  data.on_type === "Candidate has onboarded" ? (
                    <Notification
                      Img={candidateNotificaionApprove}
                      message={data.message}
                      // button="Approve Candidate"
                      // btnClass="notificationButton"
                      // fun={overLayHandler1}
                      date={data.created_at}
                      key={index}
                      type="read"
                    />
                  ) : data.on_type === "Client has onboarded" ? (
                    <Notification
                      Img={candidateNotificaionInterview}
                      message={data.message}
                      button="has onboarded as a client subscribed to Starter plan"
                      btnClass="hideButton"
                      date={data.created_at}
                      key={index}
                      type="read"
                    />
                  ) : (
                    <Notification
                      Img={Profile}
                      message={data.message}
                      date={data.created_at}
                      key={index}
                      type="read"
                    />
                  )
                )
              ) : (
                <p className="text-center flex justify-center pt-12 texfontfott-semibold">
                  Notification Not Available...
                </p>
              )}
            </div>
          ) : null}
        </div>
        <div className="homeProgress">
          <div className="homeProgressCandidate">
            <h1>Candidates</h1>
            <div className="homeProgressCandidateFlex">
              <div className="homeProgressCandidateLeft">
                <ProgressBar />
              </div>
              <div className="homeProgressCandidateRight">
                <div className="homeProgressCandidateRightOne">
                  <div className="indication candidateHomeHired"></div>
                  <h2>Hired</h2>
                  <h3>- {hireddata.length}</h3>
                </div>
                <div className="homeProgressCandidateRightOne">
                  <div className="indication yetToBeHired"></div>
                  <h2>Yet to be hired</h2>
                  <h3>- {nothired.length}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="homeProgressClient">
            <h1>Clients</h1>
            <div className="homeProgressClientFlex">
              <div className="homeProgressClientFlexContent">
                <div className="progressHike">
                  <img src={greenArrow} alt="" />
                  <h3>12.54%</h3>
                </div>
                <h4>100</h4>
                <h2>Onboarded</h2>
              </div>
              <div className="homeProgressClientFlexContent">
                <div className="progressDecrement">
                  <img src={redArrow} alt="" />
                  <h3>5.67%</h3>
                </div>
                <h4>5</h4>
                <h2>Dropped</h2>
              </div>
              <div className="homeProgressClientFlexContent">
                <div className="progressHike">
                  <img src={greenArrow} alt="" />
                  <h3>2.87%</h3>
                </div>
                <h4>₹2.35 L</h4>
                <h2>Profit</h2>
              </div>
            </div>
            <div className="homeProgressClientSubscribe">
              <h2>PLANS SUBSCRIBED TO</h2>
              <div className="homeProgressClientSubscribeFlex">
                <div className="homeProgressClientFlexContent">
                  <h5>60</h5>
                  <h6>Starter</h6>
                </div>
                <div className="homeProgressClientFlexContent">
                  <h5>40</h5>
                  <h6>Pro</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopUp == "interviewDetails" && (
        <div className="interViewDetailOverlay">
          <div className="interViewDetailOverlayHead">
            <h1>Interview details</h1>
            <img src={back} alt="" />
          </div>
          {interviewdata.length !== 0 ? (
            <div className="interViewDetailOverlayContent">
              <h2>Candidate:</h2>
              <h3>{interviewdata[0].first_name}</h3>
              <h2>Company (client):</h2>
              <h3>{interviewdata[0].company.company_name}</h3>
              {/* <h2>Date & time:</h2>
              <h3>12 February, 2024 at 5:30 PM IST</h3>
              <h2>Meeting link:</h2>
              <h3>https://calendly.com/meet/usernamelink</h3> */}
            </div>
          ) : null}
        </div>
      )}
      {isPopUp == "approveconformation" && (
        <>
          <div className="approveCandidateOverlay">
            <div className="candidateRateCardOverlayHead">
              <h1>Approve Candidate</h1>
              <span onClick={CloseOverlay}>
                <RxCross2 />
              </span>
            </div>
            <div className="approveCandidateOverlayBody">
              <p>
                You’ve checked all the details and have confirmed that this
                candidate has completed their profile.
              </p>
              <div className="approveCandidateOverlayButton">
                <button className="discard">Cancel</button>
                <button onClick={popUpHandler} className="save">
                  Yes, Approve
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHome;
