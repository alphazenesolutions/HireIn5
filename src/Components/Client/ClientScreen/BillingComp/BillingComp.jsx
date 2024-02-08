import React, { useState } from "react";
import "./BillingComp.css";
import billingTable from "../../../../assests/billingTable.png";
import tabFirst from "../../../../assests/colar.png";
import closeicon from "../../../../assests/billingX.png";
import tickicon from "../../../../assests/BillingTick.png";
import penSquare from "../../../../assests/penSquare.png";
import documentX from "../../../../assests/documentX.png";
import correct from "../../../../assests/correct.png";
import wrong from "../../../../assests/wrong.png";
import DashHead from "../../../Reusable/DashBoardReusable/DashHead/DashHead";
import DashBody from "../../../Reusable/DashBoardReusable/DashBody/DashBody";
import PricingComp from "../../ClientSignUp/Pricing/PricingComp";
import OptionAvailable from "../../../Reusable/OptionAvailable/OptionAvailable";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";

const BillingComp = () => {
  const dispatch = useDispatch();
  const [isPage, setIsPage] = useState("billing");
  const PageHandler = (event) => {
    setIsPage(event.target.id);
  };

  const profileData = [
    {
      name: "Invoice_no.123456",
      role: "Java Developer",
      Experience: "2 years",
      Skill1: "Java EEE",
      Skill2: "JavaScript",
      Skill3: "Java",
      status: "paid",
      Date: "24/12/23",
      amount: "₹ 24,999",
    },
    {
      name: "Invoice_no.123456",
      role: "Java Developer",
      Experience: "2 years",
      Skill1: "Java EEE",
      Skill2: "JavaScript",
      Skill3: "Java",
      status: "paid",
      Date: "24/12/23",
      amount: "₹ 24,999",
    },
    {
      name: "Invoice_no.123456",
      role: "Java Developer",
      Experience: "2 years",
      Skill1: "Java EEE",
      Skill2: "JavaScript",
      Skill3: "Java",
      status: "paid",
      Date: "24/12/23",
      amount: "₹ 24,999",
    },
  ];

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
    dispatch(storeAction.isPopUpHander());
  };
  return (
    <>
      <div className="dashBoardMain paddingLeft100 paddingRight100">
        {isPage === "billing" && (
          <div>
            <DashHead
              left="Billing"
              center="/"
              right="Upgrade"
              head="Billing"
              billingId="billing"
              upgradeId="upgrade"
              fun={PageHandler}
              desc="Some caption which sets more context for this page"
              highLight=""
              descClass="dashBoardMainHeadDescBetween"
            />
            {isPage === "billing" && (
              <DashBody
                Img={documentX}
                head="No documents for hired candidates"
                desc="Find the right candidates, shortlist and schedule an interview with them. Start by doing your first search!"
                button="Search Now"
                fun={PageHandler}
                Id="page2"
                buttonClass="dashBoardMainBodyInnerButton"
              />
            )}
          </div>
        )}
        {isPage === "page2" && (
          <div className="billing">
            <DashHead
              left="Billing"
              center="/"
              right="Upgrade"
              head="Billing"
              billingId="billing"
              upgradeId="upgrade"
              fun={PageHandler}
              desc="Some caption which sets more context for this page"
              highLight=""
            />
            <div className="billingCard">
              <div className="billCard">
                <div className="billHead">
                  <h1>Details</h1>
                  <h2></h2>
                </div>
                <div className="billDesc">
                  <div className="billDescOne">
                    <h3>Billing cycle</h3>
                    <div className="billRight">
                      <h4>Monthly</h4>
                      <img
                        id="monthly"
                        // onClick={PageHandler}
                        onClick={overLayHandler}
                        src={penSquare}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="billDescOne">
                    <h3>Payment method</h3>
                    <div className="billRight">
                      <h4>Mastercard ending in 0076</h4>
                      <img src={penSquare} alt="" />
                    </div>
                  </div>
                  <div className="billDescOne">
                    <h3>Billing email</h3>
                    <div className="billRight">
                      <h4>divyagupta@gmail.com</h4>
                      <img src={penSquare} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="billCard">
                <div className="billHead">
                  <h1>Current plan</h1>
                  <h2>Upgrade plan</h2>
                </div>
                <div className="billDesc">
                  <div className="billDescOne">
                    <h3>Type</h3>
                    <div className="billRight">
                      <h4>Starter</h4>
                      {/* <img src={penSquare} alt="" /> */}
                    </div>
                  </div>
                  <div className="billDescOne">
                    <h3>Amount</h3>
                    <div className="billRight">
                      <h4>₹ 24999/month</h4>
                      {/* <img src={penSquare} alt="" /> */}
                    </div>
                  </div>
                  <div className="billDescOne">
                    <h3>Next billing</h3>
                    <div className="billRight">
                      <h4>24/12/23</h4>
                      {/* <img src={penSquare} alt="" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoiceTable">
              <div className="innerTable">
                <table className="table">
                  <tr className="tableHead">
                    <th className="firstTableHead">Name</th>
                    <th>INVOICE DATE</th>
                    <th>DUE DATE</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                    <th className="lastTableHead"></th>
                  </tr>
                  {profileData.map((data) => {
                    return (
                      <tr className="tableRow">
                        {/* <td className="profileBookMark">
                      <img src={tabFirst} alt="" />
                    </td> */}
                        <td>
                          <div className="profileData ">
                            <img src={billingTable} alt="" />
                            <h2>{data.name}</h2>
                          </div>
                        </td>
                        <td>
                          <h2>{data.Date}</h2>
                        </td>
                        <td>
                          <h2>{data.Date}</h2>
                        </td>
                        <td>
                          <h2>{data.amount}</h2>
                        </td>
                        <td className="paidData">
                          {/* <p>{data.Skill1}</p>
                      <p>{data.Skill2}</p>
                      <p>{data.Skill3}</p> */}
                          <p>{data.status}</p>
                        </td>
                        <td>
                          <div>
                            <button className="tdBtn">Download</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        )}
        {isPopUp && (
          // <div className="billingInfo">
          <div className="billingInfo1">
            <div className="billingClose">
              <img id="page2" onClick={overLayHandler} src={closeicon} alt="" />
            </div>
            <div className="billingCycle">
              <div className="billingCycle1">
                <h1>Change billing cycle</h1>
                <p>
                  Once Annual billing cycle has been activated, it cannot be
                  downgraded automatically. Please connect with us at
                  <span> billing@hirein5.com</span> for further help.
                </p>
              </div>
              <div className="billinglist">
                <p>
                  <img src={tickicon} alt="" />
                  Copy for subscription renewal
                </p>
                <p>
                  <img src={tickicon} alt="" />
                  Copy for when the user will get charged
                </p>
                <p>
                  <img src={tickicon} alt="" />
                  Copy for subsequent charges
                </p>
                <p>
                  <img src={tickicon} alt="" />
                  Copy for plan activation time
                </p>
              </div>
              <div className="billingBtn">
                <div className="billingSub">
                  <button>
                    <input type="radio" name="sub" />
                    <h2>Monthly</h2>
                  </button>
                  <button>
                    <input type="radio" name="sub" />
                    <h2>Yearly</h2>
                  </button>
                </div>
                <button name="">Confirm change</button>
              </div>
            </div>
          </div>
          // </div>
        )}
        {isPage === "cancel" && (
          <div className="billingInfo">
            <div className="billingInfo1">
              <div className="billingClose">
                <img src={closeicon} alt="" />
              </div>
              <div className="billingCycle">
                <div className="billingCycle1">
                  <h1>Cancel your subscription</h1>
                  <p>
                    Our team will contact you within 2 working days to process
                    the cancellation.
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
                  <button name="">Send message to team</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isPage === "upgrade" && (
          <div className="updradePlan">
            <DashHead
              left="Billing"
              center="/"
              right="Upgrade"
              head="Upgrade"
              billingId="billing"
              upgradeId="updrade"
              fun={PageHandler}
              desc="Some caption which sets more context for this page"
              highLight=""
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
                      Perfect for hiring on the go for your business with a
                      hassle free process
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
                      For end-to-end hiring with utmost detail and insights
                      about the candidate
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
                        <button className="cancelPlanButton">
                          Cancel plan
                        </button>
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
        )}
      </div>
    </>
  );
};

export default BillingComp;
