/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./MeetingComp.css";
import Head from "../../../Reusable/LogoHead/Head";
import call from "../../../../assests/call.png";
import SuccessResponse from "../../../Reusable/SuccessResponse/SuccessResponse";
import { InlineWidget } from "react-calendly";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import axios from "axios";

const MeetingComp = () => {
  const userdata = useSelector((store) => store.userdata);
  const token = useSelector((store) => store.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPage, setIsPage] = useState("page1");

  const pageHandler = async (event) => {
    var newobj = {
      message: `<p>Interview scheduled between <b>${userdata[0].first_name}</b>, and sales team.</p>`,
      status: "false",
      on_type: "Client Meeting",

    };
    await axios
      .post(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/notification/${userdata[0].id}/`,
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

    setIsPage(event.target.id);
  };

  const routeHandler = () => {
    if (isPage === "successPage") {
      dispatch(storeAction.issidebarHandler({ issidebar: true }));
      dispatch(storeAction.isloginHandler({ islogin: true }));
      navigate("/discover");
    }
  };
  const skipbtn = async () => {
    dispatch(storeAction.issidebarHandler({ issidebar: true }));
    dispatch(storeAction.isloginHandler({ islogin: true }));
    navigate("/discover");
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
              <button onClick={skipbtn} id="successPage" className="skip">
                Skip for now
              </button>
            </div>
          </div>
        </div>
      )}
      {/*======================== calendly ======================= */}
      {isPage === "calendly" && (
        <div className="calendly">
          <InlineWidget url="https://calendly.com/hirein5" />
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
