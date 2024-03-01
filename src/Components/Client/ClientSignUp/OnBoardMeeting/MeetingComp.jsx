/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./MeetingComp.css";
import Head from "../../../Reusable/LogoHead/Head";
import call from "../../../../assests/call.png";
import SuccessResponse from "../../../Reusable/SuccessResponse/SuccessResponse";
import { InlineWidget } from "react-calendly";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeAction } from "../../../../Store/Store";

const MeetingComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPage, setIsPage] = useState("page1");
  const pageHandler = (event) => {
    setIsPage(event.target.id);
  };

  const routeHandler = () => {
    if (isPage === "successPage") {
      dispatch(storeAction.isloginHandler({ islogin: true }));
      navigate("/discover");
    } else {
    }
  };
  const routeTimeout = setTimeout(routeHandler, 5000);
  return (
    <>
      {isPage === "page1" && (
        <div className="meetingComp">
          <div className="meetTop">
            <Head />
          </div>
          <div className="meetBottom">
            <img src={call} alt="" />
            <h1>Schedule a meeting to complete your onboarding</h1>
            <p>
              Our representative will get in touch with you within 24hrs. <br />
              Schedule a meeting for a quick demo and complete your onboarding!
            </p>
            <div className="meetButton">
              <button onClick={pageHandler} id="calendly" className="schedule">
                Schedule a call
              </button>
              <button onClick={pageHandler} id="successPage" className="skip">
                Skip for now
              </button>
            </div>
          </div>
        </div>
      )}
      {/*======================== calendly ======================= */}
      {isPage === "calendly" && (
        <div className="calendly">
          <InlineWidget url="https://calendly.com/kaneeshvar" />
        </div>
      )}

      {isPage === "successPage" && (
        <div className="callSuccess">
          <Head />
          <SuccessResponse
            title="Your call has been successfully set up! "
            des="Please check your email to find the relevant details. Thank you for being patient with us, our sales representatives will onboard and give access to the platform in the call."
          />
        </div>
      )}
    </>
  );
};

export default MeetingComp;
