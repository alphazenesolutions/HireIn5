import React, { useState } from "react";
import "./ContractComp.css";
import documentX from "../../../../assests/documentX.png";
import DashHead from "../../../Reusable/DashBoardReusable/DashHead/DashHead";
import DashBody from "../../../Reusable/DashBoardReusable/DashBody/DashBody";
import tabImg from "../../../../assests/table.png";
import ContractCard from "../../../Reusable/ContractCard/ContractCard";

const ContractComp = () => {
  const [isPage, setIsPage] = useState("page1");
  const PageHandler = (event) => {
    setIsPage(event.target.id);
  };

  const profileData = [
    {
      name: "Surya Narreddi",
      role: "Java Developer",
      Experience: "2 years",
      Skill1: "Java EEE",
      Skill2: "JavaScript",
      Skill3: "Java",
      time: "7:00 PM IST",
      date: "24/12/23",
      cycle: "Monthly",
      Duration: "12 Months",
    },
    {
      name: "Surya Narreddi",
      role: "Java Developer",
      Experience: "2 years",
      Skill1: "Java EEE",
      Skill2: "JavaScript",
      Skill3: "Java",
      time: "7:00 PM IST",
      date: "24/12/23",
      cycle: "Monthly",
      Duration: "12 Months",
    },
    {
      name: "Surya Narreddi",
      role: "Java Developer",
      Experience: "2 years",
      Skill1: "Java EEE",
      Skill2: "JavaScript",
      Skill3: "Java",
      time: "7:00 PM IST",
      date: "24/12/23",
      cycle: "Monthly",
      Duration: "12 Months",
    },
  ];
  return (
    <div>
      <div className="dashBoardMain paddingLeft100 paddingRight100">
        <DashHead
          head="Contracts with Hirein5"
          desc="All contracts in one place for ease of reference"
          highLight=""
          descClass="dashBoardMainHeadDescBetween"
        />
        <div className="tableButton marginBottom20">
          <button
            id="page2"
            onClick={PageHandler}
            className={
              isPage === "page2" ? "shortListedActive" : "shortListedInActive"
            }
          >
            Hiring related
          </button>
          <button
            id="page3"
            onClick={PageHandler}
            className={isPage === "page3" ? "hiredActive" : "hired"}
          >
            Standard
          </button>
        </div>
        {isPage === "page1" && (
          <DashBody
            Img={documentX}
            head="No interviews have been setup"
            desc="Find the right candidates, shortlist and schedule an interview with them. Start by doing your first search!"
            button="Search for candidates"
            fun={PageHandler}
            Id="page2"
            buttonClass="dashBoardMainBodyInnerButton"
          />
        )}
        {isPage === "page2" && (
          <div className="contractInnerTable">
            <table className="table">
              <tr className="contractTableHead">
                {/* <th className="tableFirst"></th> */}
                <th className="contractTableHead">Candidate Name</th>
                <th className="contractTableHead">HIred On</th>
                <th className="contractTableHead">
                  CONTRACT <br></br>DURATION
                </th>
                <th className="contractTableHead">
                  {" "}
                  Billing <br></br>CYCLE
                </th>
                <th className="contractTableHead">Key Skills</th>
                <th></th>
                {/* <th></th> */}
              </tr>
              {profileData.map((data) => {
                return (
                  <tr className="contractTableRow">
                    {/* <td className="profileBookMark">
                      <img src={tabFirst} alt="" />
                    </td> */}
                    <td>
                      <div className="profileData ">
                        <img src={tabImg} alt="" />
                        <h2>{data.name}</h2>
                      </div>
                    </td>
                    {/* <td>
                      <h2>{data.role}</h2>
                    </td> */}
                    <td>
                      <h2>{data.date}</h2>
                    </td>
                    <td>
                      <h2>{data.Duration}</h2>
                    </td>
                    <td>
                      <h2>{data.cycle}</h2>
                    </td>
                    <td className="skillData">
                      <p>{data.Skill1}</p>
                      <p>{data.Skill2}</p>
                      <p>{data.Skill3}</p>
                    </td>
                    <td>
                      <div>
                        <button
                          id="page3"
                          onClick={PageHandler}
                          className="tdBtn"
                        >
                          View Contract
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        )}
        {isPage === "page3" && (
          <div className="Contract">
            <ContractCard />
            <ContractCard />
            <ContractCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractComp;
