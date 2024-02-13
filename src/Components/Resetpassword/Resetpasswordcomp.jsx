/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Head from "../Reusable/LogoHead/Head";
import SectionHead from "../Reusable/SectionHead/SectionHead";
import { FiLoader } from "react-icons/fi";
import eye from "../../assests/eye.png";
import Foot from "../Reusable/Terms&Conditions/Foot";
import SuccessResponse from "../Reusable/SuccessResponse/SuccessResponse";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Resetpasswordcomp = () => {
  const navigate = useNavigate();
  const { hash } = useParams();
  const [isButton1, setIsButton1] = useState(false);
  const [isPage, setIsPage] = useState("page1");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [passworderror, setpassworderror] = useState(false);
  const [cpassworderror, setcpassworderror] = useState(false);
  const [compareerror, setcompareerror] = useState(false);

  const [isLoading1, setIsLoading1] = useState(false);
  const [finalerror, setfinalerror] = useState(null);

  const ButtonHandler2 = async (event) => {
    if (isPage === "page1") {
      if (password.length === 0) {
        setpassworderror(true);
        setcpassworderror(false);
      } else if (cpassword.length === 0) {
        setpassworderror(false);
        setcpassworderror(true);
      } else {
        setpassworderror(false);
        setcpassworderror(false);
        if (cpassword !== password) {
          setcompareerror(true);
        } else {
          setfinalerror(null);
          setcompareerror(false);
          var updatepassword = await axios
            .post(
              `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update_password/`,
              {
                new_password: password,
                hashed_email: hash,
              }
            )
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              return err.response.data;
            });
          if (updatepassword.message === "Password updated successfully") {
            setIsPage(event.target.id);
            setIsLoading1(true);
          } else {
            setfinalerror(updatepassword.error);
          }
        }
      }
    } else {
      setIsPage(event.target.id);
      setIsLoading1(true);
    }
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
                    <input
                      placeholder="**********"
                      type="password"
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                    />
                    <img className="eyeOne" src={eye} alt="" />
                  </div>
                  {passworderror === true ? (
                    <h6 className="text-red-500 text-xs font-semibold mt-2">
                      Enter Password
                    </h6>
                  ) : null}
                  {/* <Input /> */}
                </div>
                {/* ======================= Confirm Password ====================== */}
                <div className="resetPasswordCompBodyConfirmPassword">
                  <div className="resetPasswordCompBodyPasswordLabel">
                    <h4>Conform Password</h4>
                  </div>
                  <div className="resetPasswordCompBodyConfirmPasswordInput">
                    <input
                      type="password"
                      placeholder="**********"
                      onChange={(e) => {
                        setcpassword(e.target.value);
                        setIsButton1(true);
                      }}
                    />
                    {cpassworderror === true ? (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Enter Conform Password
                      </h6>
                    ) : null}
                    <img className="eyeTwo" src={eye} alt="" />
                  </div>
                </div>
                {compareerror === true ? (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Password & Confirm password not match
                  </h6>
                ) : null}
                {finalerror !== null ? (
                  <div className="flex  gap-1 items-center mt-2">
                    <h6 className="text-red-500 text-xs font-semibold">
                      {finalerror}. Please Try again
                    </h6>
                    <span
                      className="text-xs cursor-pointer"
                      onClick={() => {
                        window.location.replace("/forgotPassword");
                      }}
                    >
                      Click Here
                    </span>
                  </div>
                ) : null}
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
