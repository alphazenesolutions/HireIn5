import React from "react";
import "./AdminHome.css";
import DashHead from "../../Reusable/DashBoardReusable/DashHead/DashHead";
import Notification from "../../Reusable/Notification/Notification";

const AdminHome = () => {
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
            <h5 className="adminNotificationTabActive">Activity</h5>
            <h5 className="adminNotificationTabActive">Read</h5>
          </div>
          <div className="adminNotificationLog">
            <Notification
              head="Surya Narreddi"
              desc="has onboarded as a candidate"
              button="Approve Candidate"
              btnClass="notificationButton"
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
              date="Sunday, Jan 22"
            />
            <Notification
              head="Surya Narreddi"
              desc="has onboarded as a candidate"
              button="Approve Candidate"
              btnClass="notificationButton"
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
              date="Sunday, Jan 22"
            />
          </div>
        </div>
        <div className="homeProgress">
          <div className="homeProgressCandidate"></div>
          <div className="homeProgressClient"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
