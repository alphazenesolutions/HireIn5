/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "./BillingComp.css";
import billingTable from "../../../../assests/billingTable.png";
import closeicon from "../../../../assests/billingX.png";
import tickicon from "../../../../assests/BillingTick.png";
import penSquare from "../../../../assests/penSquare.png";
import documentX from "../../../../assests/documentX.png";
import DashHead from "../../../Reusable/DashBoardReusable/DashHead/DashHead";
import DashBody from "../../../Reusable/DashBoardReusable/DashBody/DashBody";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const BillingComp = () => {
  const userdata = useSelector((store) => store.userdata);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPage, setIsPage] = useState("page2");
  const PageHandler = (event) => {
    setIsPage(event.target.id);
  };
  const PageHandler2 = () => {
    navigate("/billing");
  };
  const PageHandler3 = () => {
    navigate("/upgrade");
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = (e) => {
    dispatch(storeAction.isPopUpHander(e.target.id));
  };
  const overLayHandler1 = () => {
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
              fun2={PageHandler2}
              fun3={PageHandler3}
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

        {isPage === "page2" &&
          (userdata[0].pricing_info !== null ? (
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
                descClass="dashBoardMainHeadDescBetween"
              />
              {userdata[0].pricing_info.length !== 0 ? (
                <div className="billingCard">
                  <div className="billCard">
                    <div className="billHead">
                      <h1>Details</h1>
                    </div>
                    <div className="billDesc">
                      <div className="billDescOne">
                        <h3>Billing cycle</h3>
                        <div className="billRight">
                          <h4>{userdata[0].pricing_info[0].plan_duration}</h4>
                          <img
                            id="monthly"
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
                          <h4>{userdata[0].username}</h4>
                          <img src={penSquare} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="billCard">
                    <div className="billHead">
                      <h1>Current plan</h1>
                      <h2 onClick={() => navigate("/upgrade")}>Upgrade plan</h2>
                    </div>
                    <div className="billDesc">
                      <div className="billDescOne">
                        <h3>Type</h3>
                        <div className="billRight">
                          <h4>{userdata[0].pricing_info[0].pricing_plan}</h4>
                        </div>
                      </div>
                      <div className="billDescOne">
                        <h3>Amount</h3>
                        <div className="billRight">
                          <h4>
                            {" "}
                            ₹ {userdata[0].pricing_info[0].plan_price}/
                            {userdata[0].pricing_info[0].plan_duration}
                          </h4>
                        </div>
                      </div>
                      <div className="billDescOne">
                        <h3>Next billing</h3>
                        <div className="billRight">
                          <h4>
                            {moment(
                              userdata[0].pricing_info[0].plan_validity
                            ).format("DD/MM/YYYY")}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

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
                    {userdata[0].pricing_info.length !== 0
                      ? userdata[0].pricing_info.map((data, index) => {
                          return (
                            <tr className="tableRow" key={index}>
                              <td>
                                <div className="profileData ">
                                  <img src={billingTable} alt="" />
                                  <h2>
                                    {
                                      data.invoice_url
                                        .split("/images/")[1]
                                        .split("/")[0]
                                    }
                                  </h2>
                                </div>
                              </td>
                              <td>
                                <h2>
                                  {moment(data.plan_start).format("DD/MM/YYYY")}
                                </h2>
                              </td>
                              <td>
                                <h2>
                                  {moment(data.plan_validity).format(
                                    "DD/MM/YYYY"
                                  )}
                                </h2>
                              </td>
                              <td>
                                <h2>{data.plan_price}</h2>
                              </td>
                              <td className="paidData">
                                <p>{data.plan_status}</p>
                              </td>
                              <td>
                                <div>
                                  <button
                                    className="tdBtn"
                                    onClick={() => {
                                      window.open(
                                        `${data.invoice_url}`,
                                        "_blank"
                                      );
                                    }}
                                  >
                                    Download
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <DashHead
                left="Billing"
                center="/"
                right="Upgrade"
                head="Billing"
                billingId="billing"
                upgradeId="upgrade"
                fun2={PageHandler2}
                fun3={PageHandler3}
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
          ))}
        {isPopUp == "monthly" && (
          // <div className="billingInfo">
          <div className="billingInfo1">
            <div className="billingClose">
              <img
                id="page2"
                onClick={overLayHandler1}
                src={closeicon}
                alt=""
              />
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
      </div>
    </>
  );
};

export default BillingComp;
