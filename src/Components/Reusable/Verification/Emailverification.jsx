/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Head from "../LogoHead/Head";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Emailverification = () => {
  const navigate = useNavigate();
  const signupdata = useSelector((store) => store.signupdata);
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);

  const PageHandler = () => {
    // const email = signupdata.username;
    window.location.href = `https://mail.google.com/mail/u/0/#inbox`;
  };
  useEffect(() => {
    SendMail();
  }, [userid]);
  const SendMail = async () => {
    if (userid !== null) {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://hirein5-server.onrender.com/user/emailverification/${userid}`,
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
    }
  };
  return (
    <>
      <div className="verificationSuccess">
        <div className=" ">
          <Head />
          <h1 className="verificationInnerHead marginBottom15">
            Check your email inbox
          </h1>
          <p>
            We’ve sent you a confirmation link to{" "}
            <span className="font-semibold">{signupdata.username}.</span>
          </p>
          <p title="">Please click the link to confirm your email address.</p>
          <div className="emailBox">
            <button id="page2" onClick={PageHandler} className="text-5xl">
              Open Gmail
            </button>
            <button onClick={PageHandler}>Open Outlook</button>
            <button onClick={PageHandler}>Open Yahoo</button>
          </div>
          <div className="verificationBottom">
            <p>Check your spam folder if you can’t see an email.</p>
            <p title="">
              Incorrect email?{" "}
              <span
                onClick={() => {
                  navigate("/clientsignup");
                }}
              >
                Re-enter your email id{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Emailverification;
