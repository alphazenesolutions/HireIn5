/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./PricingComp.css";
import OptionAvailable from "../../../Reusable/OptionAvailable/OptionAvailable";
import correct from "../../../../assests/correct.png";
import wrong from "../../../../assests/wrong.svg";
import arrowDown from "../../../../assests/arrowDown.png";
import Head from "../../../Reusable/LogoHead/Head";
import SuccessResponse from "../../../Reusable/SuccessResponse/SuccessResponse";
import { useNavigate } from "react-router-dom";
import DashHead from "../../../Reusable/DashBoardReusable/DashHead/DashHead";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import axios from "axios";

const PricingComp = () => {
  const userdata = useSelector((store) => store.userdata);
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isToggle, setIsToggle] = useState(false);
  const toggleHandler = () => {
    setIsToggle(!isToggle);
  };
  const [isPage, setIsPage] = useState("page1");
  const pageHandler = (event) => {
    setIsPage(event.target.id);
  };

  const [isActive, setIsActive] = useState(false);
  const activeState = () => {
    setIsActive(true);
    setIsActive2(false);
    Buttonhandler();
  };

  const [isActive2, setIsActive2] = useState(false);
  const activeState2 = () => {
    setIsActive2(true);
    setIsActive(false);
    Buttonhandler();
  };

  const [isDesc, setIsDesc] = useState(false);
  const showDesc = () => {
    setIsDesc(!isDesc);
  };

  const [isDesc2, setIsDesc2] = useState(false);
  const showDesc2 = () => {
    setIsDesc2(!isDesc2);
  };

  const [isButton, setIsButton] = useState(false);
  const Buttonhandler = () => {
    setIsButton(true);
  };

  const monthlyStarter = 499;
  const yearlyStarter = 399;

  const monthlyPro = 899;
  const yearlyPro = 719;

  useEffect(() => {
    checkuser();
  }, [isPage]);
  const checkuser = async () => {
    if (isPage === "page3") {
      dispatch(
        storeAction.onboarding_statusHander({
          onboarding_status: 4,
        })
      );
      var newobj1 = {
        username: userdata[0].username,
        onboarding_status: 4,
      };
      await axios
        .put(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${userid}/`,
          newobj1,
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
      setTimeout(() => {
        navigate("/meeting");
      }, 3000);
    }
  };
  return (
    <>
      {isPage === "page1" && (
        <div className="pricingComp">
          <div className="pricingCompInner">
            <Head />
            <div className="pricingCompHead">
              <div className="pricingDashHead">
                <DashHead
                  head="Pricing"
                  desc="Get the best hires for your company, with complete transparency and ease Need help in selecting a plan?"
                  highLight="Contact us"
                  descClass="dashBoardMainHeadDescBetween"
                />
              </div>

              {/* <h1>Pricing</h1>
              <div className="pricingCompHeadDesc">
                <p>
                  Get the best hires for your company, with complete
                  transparency and ease Need help in selecting a plan?
                </p>
                
              </div> */}

              <div className="pricingToggle">
                <p>Monthly</p>
                <div
                  onClick={toggleHandler}
                  className={
                    isToggle === true ? "toggleBodyRight" : "toggleBodyLeft"
                  }
                >
                  <div className="toggle"></div>
                </div>
                <p>
                  Annually {"("} Save 20%{")"}
                </p>
              </div>
            </div>
            <div className="pricingBody">
              <div className="pricingDesc">
                <div className="pricingDescHead"></div>
                <div className="pricingDescOptionFirst">
                  <OptionAvailable class="optionsLeft" head="Number of users" />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Access to candidate basic data"
                  />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Technical skills with self-assesment"
                  />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Personality assessment"
                  />
                  <OptionAvailable class="optionsLeft" head="Access to BGV" />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Access to External Technical Assessments (Hacker Rank)"
                  />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Access to interview videos"
                  />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Reserve candidates at a small fee that will be adjusted against the final invoice"
                  />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Candidate work history"
                  />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Candidate’s project details"
                  />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Candidate’s availability"
                  />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Candidate’s travel history"
                  />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Candidate’s active Visa status"
                  />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Candidate’s availability for onsite agreement"
                  />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Online interview scheduling"
                  />
                  <OptionAvailable
                    class="optionsLeft"
                    head="Hire candidates directly on payroll"
                  />
                </div>
              </div>
              <div className="starter">
                <div className="starterHead">
                  <div className="startHead">
                    <h1>Starter</h1>
                    {isToggle === true ? <p>Save 20%</p> : ""}
                  </div>
                  <div className="starterBody">
                    <p>
                      Perfect for hiring on the go for your business with a
                      hassle free process
                    </p>
                    <div className="starterBottom">
                      <h2>
                        ${isToggle === true ? yearlyStarter : monthlyStarter}
                      </h2>
                      <p>/month, billed annually</p>
                    </div>
                    <button id="page3" onClick={pageHandler}>
                      Choose plan
                    </button>
                  </div>
                </div>
                <div className="pricingDescOption">
                  <OptionAvailable
                    class="options"
                    head="1 User / No concurrent login"
                  />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={wrong} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={wrong} />
                  <OptionAvailable class="options" img={wrong} />
                  <OptionAvailable class="options" img={wrong} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={wrong} />
                  <OptionAvailable class="options" img={wrong} />
                  <OptionAvailable class="options" img={wrong} />
                  <OptionAvailable
                    class="options"
                    head="Limited to 10 interviews"
                  />
                  <OptionAvailable class="options" img={wrong} />
                </div>
              </div>
              <div className="pro">
                <div className="proPricingHead">
                  <div className="proHead">
                    <h1>Pro</h1>
                    {isToggle === true ? <p>Save 20%</p> : ""}
                  </div>
                  <div className="proBody">
                    <p>
                      For end-to-end hiring with utmost detail and insights
                      about the candidate
                    </p>
                    <div className="proBottom">
                      <h2>${isToggle === true ? yearlyPro : monthlyPro}</h2>
                      <p>/month, billed annually</p>
                    </div>
                    <button id="page3" onClick={pageHandler}>
                      Choose plan
                    </button>
                  </div>
                </div>
                <div className="pricingDescOption">
                  <OptionAvailable
                    class="options"
                    head="2 Global users / 2 Concurrent logins/user"
                  />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable
                    class="options"
                    head="For 5 days from date of reserving"
                  />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable class="options" img={correct} />
                  <OptionAvailable
                    class="options"
                    head="Unlimited scheduling"
                  />
                  <OptionAvailable
                    class="options"
                    head="Yes, post 6 months of contract"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pricingTerms">
            <p>Pricing Terms & Conditions</p>
          </div>
        </div>
      )}
      {/* page 3 */}
      {isPage === "page3" && (
        <div className="payment">
          <div className="paymentTop">
            <Head />
          </div>
          <div className="paymentBottom">
            <SuccessResponse
              des="Our team will connect with you shortly to understand your requirements and complete your onboarding process.
                Look out for an email / call from our team or set up a meeting at your convenience using the Calendly link."
              title="Payment successful"
            />
            <p>
              We’ve sent you a receipt at{" "}
              <span className="emailDarks">divyagupta@gmail.com</span>
            </p>
            <button
              onClick={() => navigate("/meeting")}
              className="marginTop20 marginBottom20"
            >
              Continue
            </button>
            <h6 className="paymentTimer">
              Redirecting you to the next screen in{" "}
              <span className="emailDarks">00:54s</span>
            </h6>
          </div>
        </div>
      )}
      {/* =================== mobileComponent =================== */}
      {isPage === "page1" && (
        <div className="mobPricingComp">
          <div className="mobPricingCompInner">
            <Head />
            <div className="mobPricingCompHead">
              <h1>Pricing</h1>
              <p>
                Get the best hires for your company, with complete transparency
                and ease
              </p>
              <div className="pricingToggle">
                <p>Monthly</p>
                <div
                  onClick={toggleHandler}
                  className={
                    isToggle === true ? "toggleBodyRight" : "toggleBodyLeft"
                  }
                >
                  <div className="toggle"></div>
                </div>
                <p>
                  Annually {"("} Save 20%{")"}
                </p>
              </div>
            </div>
            <div onClick={activeState} className="mobStarter">
              <div className="mobStarterHead">
                <div
                  className={isActive === true ? "radioDivActive" : "radioDiv"}
                ></div>
                <div className="mobStartHead">
                  <h1>Starter</h1>
                  {isToggle === true ? <p>Save 20%</p> : ""}
                </div>
                <div className="mobStarterBody">
                  <p>
                    Perfect for hiring on the go for your business with a hassle
                    free process
                  </p>
                  <div className="mobStarterBottom">
                    <h2>
                      ${isToggle === true ? yearlyStarter : monthlyStarter}
                    </h2>
                    <p>/month, billed annually</p>
                  </div>
                  {/* <button id="page3" onClick={pageHandler}>
                  Choose plan
                </button> */}
                  <button onClick={showDesc}>
                    See Benefits <img src={arrowDown} alt="" />
                  </button>
                  {isDesc === true ? (
                    <div className="mobStartedDesc">
                      <ul>
                        <li>
                          Access to candidates’ basic data & technical skills
                          with self assessment
                        </li>
                        <li>Access to BGV</li>
                        <li>
                          Access to candidates’ work history, project details &
                          availability
                        </li>
                        <li>Scheduling interviews with 10 candidates</li>
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div onClick={activeState2} className="mobPro">
              <div className="mobProHeader">
                <div
                  className={isActive2 === true ? "radioDivActive" : "radioDiv"}
                ></div>
                <div className="mobProHead">
                  <h1>Pro</h1>
                  {isToggle === true ? <p>Save 20%</p> : ""}
                </div>
                <div className="mobProBody">
                  <p>
                    For end-to-end hiring with utmost detail and insights about
                    the candidate
                  </p>
                  <div className="mobProBottom">
                    <h2>${isToggle === true ? yearlyPro : monthlyPro}</h2>
                    <p>/month, billed annually</p>
                  </div>
                  {/* <button id="page3" onClick={pageHandler}>
                  Choose plan
                </button> */}
                  <button onClick={showDesc2}>
                    See Benefits <img src={arrowDown} alt="" />
                  </button>

                  {isDesc2 === true ? (
                    <div className="mobProDesc">
                      <h6>All the benefits of Starter and more!</h6>
                      <ul>
                        <li>Access to candidates’ entire profile</li>
                        <li>Scheduling interviews with unlimited candidates</li>
                        <li>Access to candidates’ interview videos</li>
                        <li>Reserve candidates</li>
                        <li>Hire candidates directly on payroll</li>
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <button
              className={
                isButton === true ? "mobButtonActive" : "mobButtonDisable"
              }
              id="page3"
              onClick={pageHandler}
            >
              Choose plan
            </button>
          </div>
          <div className="mobPricingTerms">
            <p>Pricing Terms & Conditions</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PricingComp;
