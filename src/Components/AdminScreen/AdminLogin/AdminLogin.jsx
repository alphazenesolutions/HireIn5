/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../../Client/ClientSignUp/SignUp/SignUpComp.css";
import Head from "../../Reusable/LogoHead/Head";
import Foot from "../../Reusable/Terms&Conditions/Foot";
import SectionHead from "../../Reusable/SectionHead/SectionHead";
import { useNavigate, useParams } from "react-router-dom";
import back from "../../../assests/back.png";
import axios from "axios";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isButton, setIsButton] = useState(false);
  const [updateid, setupdateid] = useState(null);
  const [token, settoken] = useState(null);

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
        status: "Success",
      };
      var updatedata = await axios
        .put(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${updateid}/`,
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
      if (
        updatedata.message === "User and Associated Info updated successfully"
      ) {
        setIsLoading(false);
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    Checkdata();
  }, []);
  let { email } = useParams();
  const Checkdata = async () => {
    if (email.length !== 0) {
      setsignupdata((values) => ({ ...values, username: email }));
      var newobj = {
        username: email,
        email: email,
        password: "admin",
      };
      var loginuser = await axios
        .post(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/token/obtain/`,
          newobj
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
      if (loginuser.access !== undefined) {
        const token = loginuser.access;
        const decoded = jwtDecode(token);
        setupdateid(decoded.user_id);
        settoken(token);
      }
    }
  };
  return (
    <>
      <div className="SignUpComp">
        <div className="clientSignUpComp">
          <div className="clientSignUpCompInner">
            <Head />
            <SectionHead
              head="Create Password 11"
              desc=""
              highLight=""
              route=""
            />
            <div className="clientSignUpCompBody">
              <div className="clientSignUpCompBodyEmail">
                <h4>Email</h4>
                <input
                  placeholder="you@gmail.com"
                  type="text"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  name="username"
                  onChange={handlechange}
                  defaultValue={signupdata.username}
                  disabled
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
                      "Set Password"
                    )}
                  </button>
                ) : (
                  <button
                    disabled
                    id="Signup"
                    className="signUpCompBodyButtonDisable"
                  >
                    Set Password
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
