/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./VerificationComp.css";
import SuccessResponse from "../../Reusable/SuccessResponse/SuccessResponse";
import MobileInput from "../../PrelineComponent/MobileInput/MobileInput";
import Head from "../../Reusable/LogoHead/Head";
import { FiLoader } from "react-icons/fi";
import back from "../../../assests/back.png";
import { firebase, auth } from "../../../database/firebase";
import { useSelector } from "react-redux";
import axios from "axios";

const VerificationComp = () => {
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  const signupdata = useSelector((store) => store.signupdata);

  const [isButton, setIsButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);
  const [isPage, setIsPage] = useState("page2");
  const [final, setfinal] = useState(null);
  const [phone, setphone] = useState("");
  const [show, setshow] = useState(true);
  const [finalerror, setfinalerror] = useState(null);

  const PageHandler = (event) => {
    setfinalerror(false);
    if (isPage === "page1") {
      // const email = "dineshkit15@gmail.com";
      // window.location.href = `mailto:${email}`;
      setIsPage(event.target.id);
    } else if (isPage === "page2") {
      setfinalerror(false);
      if (phone.length !== 0) {
        if (phone.length === 10) {
          setIsChange(true);
          setTimeout(() => {
            setshow(false);
          }, 2000);
          let verify = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container"
          );
          auth
            .signInWithPhoneNumber(`+91${phone}`, verify)
            .then((result) => {
              setfinal(result);
              setshow(false);
              setIsChange(false);
              setIsPage("page3");
            })
            .catch((err) => {
              window.location.reload();
            });
        } else {
          setfinalerror(true);
          setIsChange(false);
        }
      } else {
        setfinalerror(true);
        setIsChange(false);
      }
    } else {
      setIsPage(event.target.id);
      setfinalerror(false);
      setIsChange(false);
    }
  };
  const backHandler = (event) => {
    setIsPage(event.target.id);
  };
  const routeHandler = () => {
    if (isPage === "page4") {
      window.location.replace("/#/registration");
    } else {
    }
  };
  const [isChange, setIsChange] = useState(false);
  const routeTimeout = setTimeout(routeHandler, 1500);

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    if (value.length === 1) {
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setInputValues(newInputValues);
      if (index < inputValues.length - 1) {
        document.getElementById(`digit-input-${index + 1}`).focus();
      }
    } else if (value.length === 0 && index > 0) {
      // If a digit is removed, delete the value and move focus to the previous input
      const newInputValues = [...inputValues];
      newInputValues[index] = "";
      setInputValues(newInputValues);
      document.getElementById(`digit-input-${index - 1}`).focus();
    }
  };

  const ButtonHandler1 = () => {
    var otp = inputValues.join("");
    final
      .confirm(otp)
      .then(async (result) => {
        let data = JSON.stringify({
          username: signupdata.username,
          email: signupdata.username,
          email_verification: true,
          mobile_verification: true,
        });
        let config = {
          method: "put",
          maxBodyLength: Infinity,
          url: `https://hirein5-server.onrender.com/user/update/${userid}/`,
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
          data: data,
        };

        await axios
          .request(config)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error;
          });
        setTimeout(() => {
          setIsLoading(true);
        }, 2000);
      })
      .catch((err) => {
        alert("Wrong code");
      });
    setIsLoading(true);
  };
  useEffect(() => {
    Updatedata();
  }, []);
  const Updatedata = async () => {
    let data = JSON.stringify({
      username: signupdata.username,
      email: signupdata.username,
      email_verification: false,
      mobile_verification: false,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://hirein5-server.onrender.com/user/update/${userid}/`,
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  };
  return (
    <>
      {isPage === "page2" && (
        <div className="mobileVerification">
          <div className="mobileInner">
            <Head />
            <SuccessResponse
              title="Email verification successful!"
              des="Please verify your mobile number before as the last step"
            />
            <div className="w-full mt-5">
              <MobileInput setphone={setphone} />
            </div>
            {finalerror && (
              <p className="text-red-500 text-xs font-semibold mt-2">
                Please Enter valid Phone number
              </p>
            )}
            <div id="recaptcha-container" className="forget mt-5"></div>
            {show === true ? (
              isChange === false ? (
                <button
                  id="page3"
                  onClick={PageHandler}
                  className="clientLoginCompBodyButtonEnable"
                >
                  Verify mobile number
                </button>
              ) : (
                <button className="clientLoginCompBodyButtonLoading mt-5">
                  <FiLoader className="loadingIcon" />
                </button>
              )
            ) : null}
          </div>
        </div>
      )}

      {/*======================= otp verification ===================== */}
      {isPage === "page3" && (
        <div className="optVerification">
          <button
            id="page2"
            onClick={backHandler}
            className="backButtonClientReg"
          >
            <img className="back" src={back} alt="" />
            Back
          </button>

          <div className="otpInner">
            <Head />
            <h2>Verify OTP</h2>
            <p>
              Enter the code we’ve sent to your phone number{" "}
              <span>+91 {phone}</span>
            </p>
            <form className="six-digit-form">
              {inputValues.map((value, index) => (
                <input
                  key={index}
                  id={`digit-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(event) => handleInputChange(index, event)}
                  class="block w-[38px] h-[38px] text-center border border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                />
              ))}
            </form>

            <div className="otpInput">
              <h6>
                {" "}
                <input type="checkbox" />
                You agree to be contacted via WhatsApp. We will not Spam you or
                share your contact details with anyone.
              </h6>
            </div>
            <div onClick={PageHandler} className="Btn marginTop15">
              {isButton === true ? (
                <button
                  id="page4"
                  onClick={ButtonHandler1}
                  className={isLoading === true ? "verifyBtn2" : "verifyBtn1"}
                >
                  {isLoading === true ? (
                    <FiLoader className="loadingIcon" />
                  ) : (
                    "Verify"
                  )}
                </button>
              ) : (
                <button disabled className="verifyBtn">
                  Verify
                </button>
              )}
              <p
                onClick={() => {
                  window.location.reload();
                }}
                className="cursor-pointer"
              >
                Didn’t receive OTP? <span>Resend</span>
              </p>
            </div>
          </div>
        </div>
      )}
      {/* ========================== page4 ================================= */}
      {isPage === "page4" && (
        <div className="h-[100vh] flex items-center justify-center">
          <SuccessResponse
            title="Verification successful!"
            des="Thank You! You are One Step Closer to start Hiring in 5. Easy hiring just ahead."
          />
        </div>
      )}
    </>
  );
};

export default VerificationComp;
