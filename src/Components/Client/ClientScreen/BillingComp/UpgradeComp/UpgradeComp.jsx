import React, { useState } from "react";
import correct from "../../../../../assests/correct.png";
import wrong from "../../../../../assests/wrong.svg";
import DashHead from "../../../../../Components/Reusable/DashBoardReusable/DashHead/DashHead";
import OptionAvailable from "../../../../../Components/Reusable/OptionAvailable/OptionAvailable";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../../Store/Store";
import { useNavigate } from "react-router-dom";

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

  const [isSubscribe, setIsSubscribe] = useState(false);
  const subscribeHandler = () => {
    setIsSubscribe(true);
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("monthly"));
  };
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
                  <button id="page3" onClick={PageHandler}>
                    Choose plan
                  </button>
                  {/* <div className="planButton">
                      <button>Current plan</button>
                      <button>Cancel plan</button>
                    </div> */}
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
                  {isSubscribe === true ? (
                    <div className="planButton">
                      <button className="currentPlanButton">
                        Current plan
                      </button>
                      <button className="cancelPlanButton">Cancel plan</button>
                    </div>
                  ) : (
                    <button onClick={subscribeHandler}>Choose plan</button>
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
    </div>
  );
};

export default UpgradeComp;
