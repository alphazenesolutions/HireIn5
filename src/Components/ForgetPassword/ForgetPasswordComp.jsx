import React, { useRef, useState } from "react";
import "./ForgetPasswordComp.css";
import Head from "../Reusable/LogoHead/Head";
import SectionHead from "../Reusable/SectionHead/SectionHead";
import { useNavigate } from "react-router-dom";
import Foot from "../Reusable/Terms&Conditions/Foot";
import SuccessResponse from "../Reusable/SuccessResponse/SuccessResponse";
import { FiLoader } from "react-icons/fi";
import eye from "../../assests/eye.png";

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
    setIsPage(event.target.id);
  };

  const [isButton1, setIsButton1] = useState(false);

  const ButtonHandler3 = () => {
    setIsButton1(true);
  };
  const [isLoading1, setIsLoading1] = useState(false);
  const ButtonHandler2 = (event) => {
    setIsPage(event.target.id);
    setIsLoading1(true);
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
      {/* ========================== page3 ================================= */}
      {/* ======================== Reset Password ====================== */}

      {isPage === "page3" && (
        <div className="resetPassword">
          <div className="resetPasswordComp">
            <div className="resetPasswordCompInner">
              <Head />
              {/* ======================= Head ====================== */}
              <SectionHead
                head="Reset Password"
                desc="write your new password"
                highLight=""
                route=""
              />

              {/* ======================= Body ====================== */}
              <div className="resetPasswordCompBody">
                <div className="resetPasswordCompBodyPassword">
                  {/* ======================= Password ====================== */}
                  <h4>Password</h4>
                  <div className="resetPasswordCompBodyPasswordInput">
                    <input placeholder="**********" type="password" />
                    <img className="eyeOne" src={eye} alt="" />
                  </div>

                  {/* <Input /> */}
                </div>
                {/* ======================= Confirm Password ====================== */}
                <div className="resetPasswordCompBodyConfirmPassword">
                  <div className="resetPasswordCompBodyPasswordLabel">
                    <h4>Conform Password</h4>
                  </div>
                  <div className="resetPasswordCompBodyConfirmPasswordInput">
                    <input
                      onChange={ButtonHandler3}
                      type="password"
                      placeholder="**********"
                    />
                    <img className="eyeTwo" src={eye} alt="" />
                  </div>
                </div>
                <div className="resetPasswordCompBodyButton marginTop20 marginBottom20">
                  {isButton1 && (
                    <button
                      id="page4"
                      onClick={ButtonHandler2}
                      className={
                        isLoading1 === true
                          ? "resetPasswordCompBodyButtonLoading  marginTop20 marginBottom20"
                          : "resetPasswordCompBodyButtonEnable marginTop20 marginBottom20"
                      }
                    >
                      <p id="page4">
                        {isLoading1 === true ? (
                          <FiLoader className="loadingIcon" />
                        ) : (
                          "Log in"
                        )}
                      </p>
                    </button>
                  )}
                  {!isButton1 && (
                    <button
                      disabled
                      className="resetPasswordCompBodyButtonDisable marginTop20 marginBottom20"
                    >
                      Log in
                    </button>
                  )}
                </div>
                <Foot />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ========================== page4 ================================= */}
      {isPage === "page4" && (
        <div className="h-[100vh] flex items-center justify-center">
          <SuccessResponse
            title="Password reset succesfully"
            des="Logging you in now..."
          />
        </div>
      )}
    </>
  );
};

export default ForgetComp;
