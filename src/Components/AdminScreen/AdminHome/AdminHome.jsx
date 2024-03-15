/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "./AdminHome.css";
import DashHead from "../../Reusable/DashBoardReusable/DashHead/DashHead";
import Notification from "../../Reusable/Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../Store/Store";
import back from "../../../assests/billingX.png";
import ProgressBar from "../../PrelineComponent/ProgressBar/ProgressBar";
import candidateNotificaionApprove from "../../../assests/approveCandidate.svg";
import candidateNotificaionInterview from "../../../assests/office.svg";
import candidateNotificaionOffice from "../../../assests/interview.svg";
import greenArrow from "../../../assests/greenArrow.svg";
import redArrow from "../../../assests/redArrow.svg";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("interviewDetails"));
  };

  const overLayHandler1 = () => {
    dispatch(storeAction.isPopUpHander("approveconformation"));
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

  return (
    <div>
      <div className="adminHomePage paddingLeft100 paddingRight100 marginBottom20">
        <DashHead
          head="Home"
          desc="placeholder text here"
          descClass="dashBoardMainHeadDescBetween"
        />
        <div className="adminNotification">
          <div className="adminNotificationHead">
            <h1>Notifications</h1>
            <h6>Mark all as read</h6>
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
          <div className="adminNotificationLog">
            <Notification
              Img={candidateNotificaionApprove}
              head="Surya Narreddi"
              desc="has onboarded as a candidate"
              button="Approve Candidate"
              btnClass="notificationButton"
              fun={overLayHandler1}
              date="Sunday, Jan 22"
            />
            <Notification
              Img={candidateNotificaionInterview}
              head="Office for digital design "
              desc="has onboarded as a candidate"
              button="has onboarded as a client subscribed to Starter plan"
              btnClass="hideButton"
              date="Sunday, Jan 22"
            />
            <Notification
              Img={candidateNotificaionOffice}
              head1="Yasir Quazi"
              head2="Nuva Corp"
              desc="Interview scheduled between"
              desc2="and"
              button="View details"
              btnClass="notificationButton"
              fun={overLayHandler}
              date="Sunday, Jan 22"
            />
            <Notification
              Img={candidateNotificaionApprove}
              head="Surya Narreddi"
              desc="has onboarded as a candidate"
              button="Approve Candidate"
              btnClass="notificationButton"
              fun={overLayHandler1}
              date="Sunday, Jan 22"
            />
            <Notification
              Img={candidateNotificaionInterview}
              head="Office for digital design "
              desc="has onboarded as a candidate"
              button="has onboarded as a client subscribed to Starter plan"
              btnClass="hideButton"
              date="Sunday, Jan 22"
            />
            <Notification
              Img={candidateNotificaionOffice}
              head1="Yasir Quazi"
              head2="Nuva Corp"
              desc="Interview scheduled between"
              desc2="and"
              button="View details"
              btnClass="notificationButton"
              fun={overLayHandler}
              date="Sunday, Jan 22"
            />
          </div>
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
                  <h3>- 20</h3>
                </div>
                <div className="homeProgressCandidateRightOne">
                  <div className="indication yetToBeHired"></div>
                  <h2>Yet to be hired</h2>
                  <h3>- 180</h3>
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
          <div className="interViewDetailOverlayContent">
            <h2>Candidate:</h2>
            <h3>Yasir Quazi</h3>
            <h2>Company (client):</h2>
            <h3>Nuva Corp</h3>
            <h2>Date & time:</h2>
            <h3>12 February, 2024 at 5:30 PM IST</h3>
            <h2>Meeting link:</h2>
            <h3>https://calendly.com/meet/usernamelink</h3>
          </div>
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
