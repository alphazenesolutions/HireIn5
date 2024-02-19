import React, { useRef, useState } from "react";
import "./ForgetPasswordComp.css";
import Head from "../Reusable/LogoHead/Head";
import SectionHead from "../Reusable/SectionHead/SectionHead";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetComp = () => {
  const navigate = useNavigate();
  const emailRef = useRef("null");
  const [email, setemail] = useState(null);
  const [isButton, setIsButton] = useState(true);
  const [finalerror, setfinalerror] = useState(null);

  const ButtonHandler = () => {
    if (emailRef.current.value.length > 3) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
    setemail(emailRef.current.value);
  };

  const [isPage, setIsPage] = useState("page1");
  const PageHandler = async (event) => {
    if (isPage === "page2") {
      const mailtoLink = `mailto:${email}`;
      window.location.href = mailtoLink;
      // navigate("/resetpassword");
    } else {
      if (isPage === "page1") {
        setfinalerror(null);
        setIsButton(true);
        var sendurl = await axios
          .post(`${process.env.REACT_APP_LOCAL_HOST_URL}/user/resetlink/`, {
            email: email,
          })
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err.response.data;
          });
        if (sendurl.message === "Reset password link sent successfully.") {
          setIsPage("page2");
          setIsButton(false);
        } else {
          setfinalerror(sendurl.email[0]);
          setIsButton(false);
        }
      } else {
        setIsPage(event.target.id);
      }
    }
  };
  return (
    <>
      {/* ========================== page1 ================================= */}
      {isPage === "page1" && (
        <div className="forgetComp">
          <div className="clientForgetComp">
            <div className="clientForgetCompInner">
              <Head />
              <SectionHead
                head="Forgot password?"
                desc="We will send a password reset link to your email"
              />

              {/* ======================= Body ====================== */}
              <div className="clientForgetCompBody">
                <div className="clientForgetCompBodyEmail">
                  {/* ======================= Email ====================== */}
                  <h4>Email</h4>
                  <input
                    ref={emailRef}
                    onChange={ButtonHandler}
                    placeholder="you@gmail.com"
                    type="text"
                  />
                </div>
                {finalerror !== null ? (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Enter a valid email address.
                  </h6>
                ) : null}

                {/* ======================= Button ====================== */}
                <div className="clientForgetCompBodyButton">
                  {isButton === true ? (
                    <button
                      className="clientForgetCompBodyButtonDisable"
                      disabled
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      id="page2"
                      onClick={PageHandler}
                      className="clientForgetCompBodyButtonEnable"
                    >
                      Submit
                    </button>
                  )}
                  <h4 onClick={() => navigate("/login")}>Back to login</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ========================== page2 ================================= */}
      {isPage === "page2" && (
        <div className="forgotVerificationSuccess">
          <div className="forgotVerificationInner">
            <Head />
            <h1 className="forgotVerificationInnerHead marginBottom15">
              Check your email inbox
            </h1>
            <p>
              We’ve sent you a confirmation link to <span>{email}</span>
            </p>
            <p title="">Please click the link to confirm your email address.</p>
            <div className="forgotemailBox">
              <button id="page3" onClick={PageHandler}>
                Open Gmail
              </button>
              <button id="page3" onClick={PageHandler}>
                Open Outlook
              </button>
              <button id="page3" onClick={PageHandler}>
                Open Yahoo
              </button>
            </div>
            <div className="forgotVerificationBottom">
              <p>Check your spam folder if you can’t see an email.</p>
              <p title="">
                Incorrect email?
                <span
                  onClick={() => {
                    setIsPage("page1");
                  }}
                >
                  Re-enter your email id
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetComp;
