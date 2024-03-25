/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import correct from "../../../../../assests/correct.png";
import wrong from "../../../../../assests/wrong.svg";
import DashHead from "../../../../../Components/Reusable/DashBoardReusable/DashHead/DashHead";
import OptionAvailable from "../../../../../Components/Reusable/OptionAvailable/OptionAvailable";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../../Store/Store";
import { useNavigate } from "react-router-dom";
import closeicon from "../../../../../assests/billingX.png";
import SuccessResponse from "../../../../Reusable/SuccessResponse/SuccessResponse";
import Head from "../../../../Reusable/LogoHead/Head";

const UpgradeComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPage, setIsPage] = useState("billing");
  const PageHandler = (event) => {
    setIsPage(event.target.id);
  };
  const PageHandler2 = () => {
    navigate("/billing");
  };
  const PageHandler3 = () => {
    navigate("/upgrade");
  };

  const monthlyStarter = 499;
  const yearlyStarter = 399;

  const monthlyPro = 899;
  const yearlyPro = 719;

  const [isToggle, setIsToggle] = useState(false);
  const toggleHandler = () => {
    setIsToggle(!isToggle);
  };

  const [isSubscribe, setIsSubscribe] = useState("Choose");
  const subscribeHandler = (e) => {
    setIsSubscribe(e.target.id);
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = (e) => {
    dispatch(storeAction.isPopUpHander(e.target.id));
  };
  // console.log(isPopUp);
  return (
    <div>
      <div className="dashBoardMain paddingLeft100 paddingRight100">
        <div className="updradePlan">
          <DashHead
            left="Billing"
            center="/"
            right="Upgrade"
            head="Upgrade"
            billingId="billing"
            upgradeId="updrade"
            fun2={PageHandler2}
            fun3={PageHandler3}
            desc="Some caption which sets more context for this page Need help in selecting a plan?"
            highLight="Contact us"
            descClass="dashBoardMainHeadDescBetween"
          />
          <div className="billingToggle">
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
          <div className="billingBody">
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
                    Perfect for hiring on the go for your business with a hassle
                    free process
                  </p>
                  <div className="starterBottom">
                    <h2>
                      ${isToggle === true ? yearlyStarter : monthlyStarter}
                    </h2>
                    <p>/month, billed annually</p>
                  </div>
                  {/* <button
                    className="choosePlan"
                    id="page3"
                    onClick={PageHandler}
                  >
                    Choose plan
                  </button>

                  <div className="planButton">
                    <button className="currentPlanButton">Current plan</button>
                    <button className="cancelPlanButton">Cancel plan</button>
                  </div> */}{" "}
                  {isSubscribe === "Choose" ? (
                    <div className="planButton">
                      <button className="currentPlanButton">
                        Current plan
                      </button>
                      <button
                        id="cancel"
                        onClick={overLayHandler}
                        className="cancelPlanButton"
                      >
                        Cancel plan
                      </button>
                    </div>
                  ) : (
                    <button id="Choose" onClick={subscribeHandler}>
                      Choose plan
                    </button>
                  )}
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
                    For end-to-end hiring with utmost detail and insights about
                    the candidate
                  </p>
                  <div className="proBottom">
                    <h2>${isToggle === true ? yearlyPro : monthlyPro}</h2>
                    <p>/month, billed annually</p>
                  </div>
                  {isSubscribe === "Upgrade" ? (
                    <div className="planButton">
                      <button
                        id="paySuccess"
                        onClick={overLayHandler}
                        className="currentPlanButton"
                      >
                        Current plan
                      </button>
                      <button
                        id="cancel"
                        onClick={overLayHandler}
                        className="cancelPlanButton"
                      >
                        Cancel plan
                      </button>
                    </div>
                  ) : (
                    <button id="Upgrade" onClick={subscribeHandler}>
                      Upgrade to Pro
                    </button>
                  )}
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
                <OptionAvailable class="options" head="Unlimited scheduling" />
                <OptionAvailable
                  class="options"
                  head="Yes, post 6 months of contract"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopUp == "cancel" && (
        <div className="billingInfo1">
          <div className="billingClose">
            <img onClick={overLayHandler} src={closeicon} alt="" />
          </div>
          <div className="billingCycle">
            <div className="billingCycle1">
              <h1>Cancel your subscription</h1>
              <p>
                Our team will contact you within 2 working days to process the
                cancellation.
              </p>
            </div>
            <div className="subcriptionMessageBox">
              <div className="subMessageTitle">
                <h3>Message</h3>
                <p>0/100</p>
              </div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="7"
                placeholder="Write here ..."
              ></textarea>
            </div>
            <div className="billingBtn">
              <button onClick={overLayHandler} id="upgradesuccess" name="">
                Send message to team
              </button>
            </div>
          </div>
        </div>
      )}
      {isPopUp == "upgradesuccess" && (
        <div className="upgradeSuccess">
          <div className="billingClose">
            <img onClick={overLayHandler} src={closeicon} alt="" />
          </div>
          <SuccessResponse
            title="Request submitted"
            des="Our team will contact you shortly!"
          />
        </div>
      )}
      {isPopUp == "paySuccess" && (
        <div className="upgradeSuccess1">
          <div className="billingClose">
            <img onClick={overLayHandler} src={closeicon} alt="" />
          </div>
          {/* <div className="payment"> */}
          <div className="paymentTop">
            <Head />
          </div>
          <div className="paymentBottom">
            <SuccessResponse
              des="Our team will connect with you shortly to understand your requirements and complete your onboarding process.
                Look out for an email / call from our team or set up a meeting at your convenience using the Calendly link."
              title="Payment successful"
            />
            {/* {userdata.length !== 0 ? (
              <p>
                We’ve sent you a receipt at{" "}
                <span className="emailDarks">{userdata[0].email}</span>
              </p>
            ) : null} */}

            <button
              onClick={() => navigate("/discover")}
              className="marginTop20 marginBottom20 continue"
            >
              Continue
            </button>
            <h6 className="paymentTimer">
              Redirecting you to the next screen in{" "}
              {/* <span className="emailDarks">{formattedTime}s</span> */}
            </h6>
          </div>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default UpgradeComp;
