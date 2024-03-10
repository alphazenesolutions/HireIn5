import React, { useState } from "react";
import "./AdminHome.css";
import DashHead from "../../Reusable/DashBoardReusable/DashHead/DashHead";
import Notification from "../../Reusable/Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../Store/Store";
import back from "../../../assests/billingX.png";

const AdminHome = () => {
  const dispatch = useDispatch();
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("interviewDetails"));
  };
  const [target, setTarget] = useState("activity");
  const targetHandler = (e) => {
    setTarget(e.target.id);
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
              head="Surya Narreddi"
              desc="has onboarded as a candidate"
              button="Approve Candidate"
              btnClass="notificationButton"
              fun={overLayHandler}
              date="Sunday, Jan 22"
            />
            <Notification
              head="Office for digital design "
              desc="has onboarded as a candidate"
              button="has onboarded as a client subscribed to Starter plan"
              btnClass="hideButton"
              date="Sunday, Jan 22"
            />
            <Notification
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
              head="Surya Narreddi"
              desc="has onboarded as a candidate"
              button="Approve Candidate"
              btnClass="notificationButton"
              fun={overLayHandler}
              date="Sunday, Jan 22"
            />
            <Notification
              head="Office for digital design "
              desc="has onboarded as a candidate"
              button="has onboarded as a client subscribed to Starter plan"
              btnClass="hideButton"
              date="Sunday, Jan 22"
            />
            <Notification
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
          <div className="homeProgressCandidate"></div>
          <div className="homeProgressClient"></div>
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
    </div>
  );
};

export default AdminHome;
