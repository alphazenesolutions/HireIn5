import React, { useState } from "react";
import Head from "../Reusable/LogoHead/Head";
import SectionHead from "../Reusable/SectionHead/SectionHead";
import { FiLoader } from "react-icons/fi";
import eye from "../../assests/eye.png";
import Foot from "../Reusable/Terms&Conditions/Foot";
import SuccessResponse from "../Reusable/SuccessResponse/SuccessResponse";
import { useNavigate } from "react-router-dom";

const Resetpasswordcomp = () => {
  const navigate = useNavigate();
  const [isButton1, setIsButton1] = useState(false);
  const [isPage, setIsPage] = useState("page1");

  const ButtonHandler3 = () => {
    setIsButton1(true);
  };
  const [isLoading1, setIsLoading1] = useState(false);
  const ButtonHandler2 = (event) => {
    setIsPage(event.target.id);
    setIsLoading1(true);
  };

  const routeHandler = () => {
    if (isPage === "page2") {
      navigate("/login");
    } else {
    }
  };
  const routeTimeout = setTimeout(routeHandler, 1500);
  return (
    <>
      {isPage === "page1" && (
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
                      id="page2"
                      onClick={ButtonHandler2}
                      className={
                        isLoading1 === true
                          ? "resetPasswordCompBodyButtonLoading  marginTop20 marginBottom20"
                          : "resetPasswordCompBodyButtonEnable marginTop20 marginBottom20"
                      }
                    >
                      <p id="page2">
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

      {isPage === "page2" && (
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

export default Resetpasswordcomp;
