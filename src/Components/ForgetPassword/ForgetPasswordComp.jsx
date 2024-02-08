import React, { useRef, useState } from "react";
import "./ForgetPasswordComp.css";
import Head from "../Reusable/LogoHead/Head";
import SectionHead from "../Reusable/SectionHead/SectionHead";
import { useNavigate } from "react-router-dom";

const ForgetComp = () => {
  const navigate = useNavigate();
  const emailRef = useRef("null");
  const [isButton, setIsButton] = useState(true);
  const ButtonHandler = () => {
    // setIsButton(false);
    if (emailRef.current.value.length > 3) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
  };

  const [isPage, setIsPage] = useState("page1");
  const PageHandler = (event) => {
    if (isPage === "page2") {
      navigate("/resetpassword");
    } else {
      setIsPage(event.target.id);
    }
  };

  return (
    <>
      {/* ========================== page1 ================================= */}
      {isPage === "page1" && (
        <div className="forgetComp">
          <div className="clientForgetComp">
            <div className="clientForgetCompInner">
              {/* ======================= Head ====================== */}
              <Head />
              <SectionHead
                head="Forgot password?"
                desc="We will send a password reset link to your email"
                // highLight="Sign up"
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
                {/* ======================= Button ====================== */}
                <div className="clientForgetCompBodyButton">
                  {isButton === true ? (
                    <button
                      className="clientForgetCompBodyButtonDisable"
                      disabled
                    >
                      Log in
                    </button>
                  ) : (
                    <button
                      id="page2"
                      onClick={PageHandler}
                      className="clientForgetCompBodyButtonEnable"
                    >
                      Log in
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
              We’ve sent you a confirmation link to{" "}
              <span>divyagupta@gmail.com.</span>
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
                Incorrect email? <span>Re-enter your email id </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetComp;
