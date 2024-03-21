/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./SignUpComp.css";
import Head from "../../../Reusable/LogoHead/Head";
import Foot from "../../../Reusable/Terms&Conditions/Foot";
import SectionHead from "../../../Reusable/SectionHead/SectionHead";
import { useNavigate } from "react-router-dom";
import back from "../../../../assests/back.png";
import { useDispatch } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import axios from "axios";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isButton, setIsButton] = useState(false);

  const ButtonHandler = (e) => {
    setIsButton(true);
    setsignupdata((values) => ({ ...values, cpassword: e.target.value }));
  };
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);
  const showPassword = () => {
    setShow(!show);
  };

  const [show1, setShow1] = useState(false);
  const showConfirmPassword = () => {
    setShow1(!show1);
  };

  const backHandler = () => {
    navigate("/");
  };
  const [signupdata, setsignupdata] = useState({
    username: "",
    password: "",
    cpassword: "",
  });
  const [usernameerror, setusernameerror] = useState(false);
  const [passworderror, setpassworderror] = useState(false);
  const [cpassworderror, setcpassworderror] = useState(false);
  const [passwordmatch, setpasswordmatch] = useState(false);
  const [finalerror, setfinalerror] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setsignupdata((values) => ({ ...values, [name]: value }));
  };
  const ButtonHandler1 = async () => {
    setcpassworderror(false);
    setpassworderror(false);
    setpasswordmatch(false);
    setfinalerror(false);
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (signupdata.username.length === 0) {
      setusernameerror(true);
    } else if (signupdata.username.match(validRegex)) {
      setusernameerror(false);
      if (signupdata.password.length === 0) {
        setusernameerror(false);
        setpassworderror(true);
      } else if (signupdata.cpassword.length === 0) {
        setcpassworderror(true);
        setpassworderror(false);
        setpasswordmatch(false);
      } else if (signupdata.password !== signupdata.cpassword) {
        setpasswordmatch(true);
        setcpassworderror(false);
      } else {
        setIsLoading(true);

        setusernameerror(false);
        setpassworderror(false);
        setcpassworderror(false);
        setpasswordmatch(false);
        var newobj = {
          email: signupdata.username,
          username: signupdata.username,
          password: signupdata.password,
          role: 2,
        };

        var createuser = await axios
          .post(`${process.env.REACT_APP_LOCAL_HOST_URL}/user/create/`, newobj)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err.response;
          });
        if (createuser.access_token !== undefined) {
          dispatch(
            storeAction.tokenHandler({ token: createuser.access_token })
          );
          dispatch(storeAction.loginroleHander({ loginrole: 2 }));
          dispatch(storeAction.isloginHandler({ islogin: true }));
          dispatch(storeAction.useridHandler({ userid: createuser.id }));
          dispatch(
            storeAction.onboarding_statusHander({
              onboarding_status: 1,
            })
          );
          dispatch(
            storeAction.signupdataHandler({
              signupdata: {
                username: signupdata.username,
                password: signupdata.password,
              },
            })
          );

          navigate("/emailverification");
        } else {
          setIsLoading(false);
          setfinalerror(true);
        }
      }
    } else {
      setusernameerror(true);
    }
  };
  useEffect(() => {
    Checkdata();
  }, [signupdata]);
  const Checkdata = async () => {
    setIsButton(false);
    if (
      signupdata.username.length !== 0 &&
      signupdata.password.length !== 0 &&
      signupdata.cpassword.length !== 0
    ) {
      setIsButton(true);
    }
  };
  return (
    <>
      <div className="SignUpComp">
        <div className="clientSignUpComp">
          <div className="clientSignUpCompInner">
            <Head />
            {/* <SectionHead
              head="Create Password"
              desc="Already have an account?"
              highLight="Log in"
              route="/login"
            /> */}
            <div className="clientSignUpCompBody">
              <div className="clientSignUpCompBodyEmail">
                <h4>Email</h4>
                <input
                  placeholder="you@gmail.com"
                  type="text"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  name="username"
                  onChange={handlechange}
                />
                {usernameerror && (
                  <p className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Valid Company Email
                  </p>
                )}
              </div>
              <div className="clientSignUpCompBodyPassword">
                <div className="clientSignUpCompBodyPasswordLabel">
                  <h4>Create Password</h4>
                </div>
                <div className="clientSignUpCompBodyPasswordInput">
                  <input
                    type={show === true ? "text" : "password"}
                    name="password"
                    onChange={handlechange}
                  />
                  {show === false ? (
                    <FiEyeOff
                      className="text-gray-500 eyeOne"
                      onClick={showPassword}
                    />
                  ) : (
                    <FiEye
                      className="text-gray-500 eyeOne"
                      onClick={showPassword}
                    />
                  )}
                </div>
                {passworderror && (
                  <p className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Password
                  </p>
                )}
              </div>
              <div className="clientSignUpCompBodyConfirmPassword">
                <div className="clientSignUpCompBodyConfirmPasswordLabel">
                  <h4>Re-enter Password</h4>
                </div>
                <div className="clientSignUpCompBodyConfirmPasswordInput">
                  <input
                    onChange={ButtonHandler}
                    type={show1 === true ? "text" : "password"}
                    name="cpassword"
                  />

                  {show1 === false ? (
                    <FiEyeOff
                      className="text-gray-500 eyeTwo"
                      onClick={showConfirmPassword}
                    />
                  ) : (
                    <FiEye
                      className="text-gray-500 eyeTwo"
                      onClick={showConfirmPassword}
                    />
                  )}
                </div>
                {passwordmatch && (
                  <p className="text-red-500 text-xs font-semibold mt-2">
                    Password & Re-enter Password not match
                  </p>
                )}
                {cpassworderror && (
                  <p className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Re-enter Password
                  </p>
                )}
              </div>
              {finalerror && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  A user with that username already exists.
                </p>
              )}
              <div className="signUpCompBodyButton marginTop20 marginBottom20">
                {isButton === true ? (
                  <button
                    onClick={ButtonHandler1}
                    id="Signup"
                    className={
                      isLoading === true
                        ? "signUpCompBodyButtonLoading"
                        : "signUpCompBodyButtonEnable"
                    }
                  >
                    {isLoading === true ? (
                      <FiLoader className="loadingIcon" />
                    ) : (
                      "Sign up"
                    )}
                  </button>
                ) : (
                  <button
                    disabled
                    id="Signup"
                    className="signUpCompBodyButtonDisable"
                  >
                    Sign up
                  </button>
                )}
              </div>
              <Foot />
            </div>
          </div>
        </div>
        <button
          id="page1"
          onClick={backHandler}
          className="backButtonClientReg"
        >
          <img className="back" src={back} alt="" />
          Back
        </button>
      </div>
    </>
  );
};

export default AdminLogin;
