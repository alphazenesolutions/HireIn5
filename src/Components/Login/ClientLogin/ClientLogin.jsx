import React, { useRef } from "react";
import { useState } from "react";
import Head from "../../Reusable/LogoHead/Head";
import "./ClientLogin.css";
import Foot from "../../Reusable/Terms&Conditions/Foot";
import SectionHead from "../../Reusable/SectionHead/SectionHead";
import eye from "../../../assests/eye.png";
import { Link, useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeAction } from "../../../Store/Store";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const ClientLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isButton, setIsButton] = useState(false);

  const passwordRef = useRef("null");

  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState("false");
  const showPassword = () => {
    setShow(!show);
  };
  const [logindata, setlogindata] = useState({
    username: "",
    password: "",
  });
  const [usernameerror, setusernameerror] = useState(false);
  const [passworderror, setpassworderror] = useState(false);
  const [finalerror, setfinalerror] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setlogindata((values) => ({ ...values, [name]: value }));
  };
  const ButtonHandler = (e) => {
    if (passwordRef.current.value.length > 3) {
      setIsButton(true);
    } else {
      setIsButton(false);
    }
    setlogindata((values) => ({ ...values, password: e.target.value }));
  };
  const ButtonHandler1 = async () => {
    setfinalerror(false);
    if (logindata.username.length === 0) {
      setusernameerror(true);
    } else if (logindata.password.length === 0) {
      setusernameerror(false);
      setpassworderror(true);
    } else {
      setIsLoading(true);

      var newobj = {
        username: logindata.username,
        email: logindata.username,
        password: logindata.password,
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
          return err.response.data;
        });
      if (loginuser.access !== undefined) {
        dispatch(storeAction.tokenHandler({ token: loginuser.access }));
        dispatch(storeAction.useridHandler({ userid: 11 }));
        dispatch(storeAction.isloginHandler({ islogin: true }));
        navigate("/discover");
      } else {
        setIsLoading(false);
        setfinalerror(true);
      }
    }
  };
  return (
    <>
      <div className="clientLogin">
        <div className="clientLoginComp">
          <div className="clientLoginCompInner">
            <Head />
            {/* ======================= Head ====================== */}
            <SectionHead
              head="Login"
              desc="Don’t have an account?"
              highLight="Sign up"
              route="/clientSignup"
            />

            <div className="clientLoginCompBody">
              <div className="clientLoginCompBodyEmail">
                <h4>Email</h4>
                <input
                  placeholder="you@gmail.com"
                  type="text"
                  name="username"
                  onChange={handlechange}
                />
                {usernameerror && (
                  <p className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Email
                  </p>
                )}
              </div>

              <div className="clientLoginCompBodyPassword">
                <div className="clientLoginCompBodyPasswordLabel">
                  <h4>Password</h4>
                  <Link to="/forgotPassword">
                    <h5>Forget password</h5>
                  </Link>
                </div>
                <div className="clientLoginCompBodyPasswordInput">
                  <input
                    id="password"
                    ref={passwordRef}
                    onChange={ButtonHandler}
                    type={show === true ? "text" : "password"}
                    name="password"
                  />
                  {show === false ? (
                    <FiEyeOff
                      className="text-gray-500 eyeOne"
                      onClick={showPassword}
                      id="loginPassword"
                    />
                  ) : (
                    <FiEye
                      className="text-gray-500 eyeOne"
                      onClick={showPassword}
                      id="loginPassword"
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
                  No active account found with the given credentials
                </p>
              )}
              <div className="clientLoginCompBodyButton marginTop20 marginBottom20">
                {isButton && (
                  <button
                    onClick={ButtonHandler1}
                    className={
                      isLoading === true
                        ? "clientLoginCompBodyButtonLoading"
                        : "clientLoginCompBodyButtonEnable"
                    }
                  >
                    {isLoading === true ? (
                      <FiLoader className="loadingIcon" />
                    ) : (
                      "Log in"
                    )}
                  </button>
                )}
                {!isButton && (
                  <button disabled className="clientLoginCompBodyButtonDisable">
                    Log in
                  </button>
                )}
              </div>
              <Foot />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientLogin;
