import React from "react";
import "./Notification.css";
import candidateNotificaion from "../../../assests/approveCandidate.svg";

const Notification = (props) => {
  return (
    <div>
      <div className="notification">
        <div className="notificationContent ">
          <div className="alert"></div>
          <div className="notificationImg">
            <img src={candidateNotificaion} alt="" />
            <img src={props.Img} alt="" />
          </div>
          <div className="notificationInfo">
            <div className="notificationName">
              <h1>{props.head}</h1>
              <h2>{props.desc}</h2>
              <h1>{props.head1}</h1>
              <h2>{props.desc2}</h2>
              <h1>{props.head2}</h1>
            </div>
            <h3>{props.date}</h3>
          </div>
        </div>
        <button className={props.btnClass}>{props.button}</button>
      </div>
    </div>
  );
};

export default Notification;
