import React from "react";
import "./Notification.css";
import HTMLReactParser from "html-react-parser";
import moment from "moment";

const Notification = (props) => {
  console.log(props, "kkk");
  return (
    <div>
      <div className="notification">
        <div className="notificationContent ">
          {props.type === "unread" ? <div className="alert"></div> : null}
          <div className="notificationImg">
            {/* <img src={candidateNotificaion} alt="" /> */}
            <img src={props.Img} alt="" />
          </div>
          <div className="notificationInfo">
            <div className="notificationName">
              <h1>{HTMLReactParser(props.message)}</h1>
            </div>
            <h3>{moment(props.date).format("dddd, MMM DD")}</h3>
          </div>
        </div>
        <button onClick={props.fun} className={props.btnClass}>
          {props.button}
        </button>
      </div>
    </div>
  );
};

export default Notification;
