/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import "./CandidateSignUp.css";
import Head from "../../../Reusable/LogoHead/Head";
import Foot from "../../../Reusable/Terms&Conditions/Foot";
import SectionHead from "../../../Reusable/SectionHead/SectionHead";
import eye from "../../../../assests/eye.png";
import { Link, useNavigate } from "react-router-dom";
import back from "../../../../assests/back.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";

const CandidateSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isButton, setIsButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const showPassword = () => {
    setShow(!show);
  };

  const backHandler = () => {
    navigate("/");
  };
  const [signupdata, setsignupdata] = useState({
    username: "",
    password: "",
  });
  const [usernameerror, setusernameerror] = useState(false);
  const [passworderror, setpassworderror] = useState(false);
  const [finalerror, setfinalerror] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setsignupdata((values) => ({ ...values, [name]: value }));
  };

  const ButtonHandler1 = async () => {
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
      } else {
        setpassworderror(false);
        setIsLoading(true);
        var newobj = {
          email: signupdata.username,
          username: signupdata.username,
          password: signupdata.password,
          role: 3,
        };
        var createuser = await axios
          .post(`https://hirein5-server.onrender.com/user/create/`, newobj)
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
          dispatch(storeAction.useridHandler({ userid: createuser.id }));
          dispatch(
            storeAction.signupdataHandler({
              signupdata: {
                username: signupdata.username,
                password: signupdata.password,
              },
            })
          );
          navigate("/#/emailverification");
        } else {
          setIsLoading(false);
          setfinalerror(true);
        }
      }
    } else {
      setusernameerror(true);
    }
  };

  return (
    <>
      <div className="candidateSignUp">
        <div className="candidateSignUpComp">
          <div className="candidateSignUpCompInner">
            <Head />
            {/* ======================= Head ====================== */}
            <SectionHead
              head="Sign up"
              desc="Already have an account?"
              highLight="Log in"
              route="/login"
            />

            <div className="candidateSignUpCompBody">
              <div className="candidateSignUpCompBodyEmail">
                <h4>Email</h4>
                <input
                  placeholder="you@gmail.com"
                  type="text"
                  name="username"
                  onChange={handlechange}
                />
                {usernameerror && (
                  <p className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Valid Email
                  </p>
                )}
              </div>

              <div className="candidateSignUpCompBodyPassword">
                <div className="candidateSignUpCompBodyPasswordLabel">
                  <h4>Create Password</h4>
                  <Link to="/forgotPassword">
                    <h5>Forget password</h5>
                  </Link>
                </div>
                <div className="candidateSignUpCompBodyPasswordInput">
                  <input
                    type={show === true ? "text" : "password"}
                    name="password"
                    onChange={handlechange}
                  />

                  {show === false ? (
                    <FiEyeOff
                      className="text-gray-500 candidateEye"
                      onClick={showPassword}
                    />
                  ) : (
                    <FiEye
                      className="text-gray-500 candidateEye"
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
              {finalerror && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  A user with that username already exists.
                </p>
              )}
              <div className="candidateSignUpCompBodyButton marginTop20 marginBottom20">
                {isButton === true ? (
                  <button
                    onClick={ButtonHandler1}
                    id="Signup"
                    className={
                      isLoading === true
                        ? "candidateSignUpCompBodyButtonLoading"
                        : "candidateSignUpCompBodyButtonEnable"
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
                    className="candidateSignUpCompBodyButtonDisable"
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

export default CandidateSignUp;
