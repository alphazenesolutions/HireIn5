import React, { useState } from "react";
import "./BillingComp.css";
import billingTable from "../../../assests/billingTable.png";
import tabFirst from "../../../assests/colar.png";
import penSquare from "../../../assests/penSquare.png";
import documentX from "../../../assests/documentX.png";
import DashHead from "../../Reusable/DashBoardReusable/DashHead/DashHead";
import DashBody from "../../Reusable/DashBoardReusable/DashBody/DashBody";

const BillingComp = () => {
  const [isPage, setIsPage] = useState("page1");
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
  return (
    <div>
      <div className="dashBoardMain paddingLeft100 paddingRight100">
        <DashHead
          head="Billing"
          desc="Some caption which sets more context for this page"
          highLight=""
        />
        {isPage === "page1" && (
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
        {isPage === "page2" && (
          <div className="billing">
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
                      <img src={penSquare} alt="" />
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
                          <h2>{data.amount}</h2>
                        </td>
                        <td className="skillData">
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
      </div>
    </div>
  );
};

export default BillingComp;
