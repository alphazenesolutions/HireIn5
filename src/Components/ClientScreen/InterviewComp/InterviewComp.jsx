import React, { useState } from "react";
import "./InterviewComp.css";
import userX from "../../../assests/userX.png";
import DashHead from "../../Reusable/DashBoardReusable/DashHead/DashHead";
import DashBody from "../../Reusable/DashBoardReusable/DashBody/DashBody";
import SearchProfileCard from "../../Reusable/SearchProfileCard/SearchProfileCard";
import tabImg from "../../../assests/table.png";
import tabFirst from "../../../assests/colar.png";

const InterviewComp = (props) => {
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
    },
  ];
  return (
    <div>
      <div className="dashBoardMain paddingLeft100 paddingRight100">
        <DashHead
          head="Interviews"
          desc="All your interviews kept in one place. If you need instant help in scheduling an interview,"
          highLight="Contact us"
        />
        <h1 className="interviewHead">Upcoming interviews</h1>
        {isPage === "page1" && (
          <DashBody
            Img={userX}
            head="No interviews have been setup"
            desc="Find the right candidates, shortlist and schedule an interview with them. Start by doing your first search!"
            button="Search for candidates"
            fun={PageHandler}
            Id="page2"
            buttonClass="dashBoardMainBodyInnerButton"
          />
        )}
        {isPage === "page2" && (
          <div className="">
            <div className="">
              {/* tableOne */}
              <div className={props.class}>
                {/* <h1>Candidates on review</h1> */}
                {/* <div className="tableButton marginTop20 marginBottom20">
                  <button
                    onClick={buttonHandler}
                    className={
                      isSelect === true
                        ? "shortListedActive"
                        : "shortListedInActive"
                    }
                  >
                    Shortlisted
                  </button>
                  <button
                    onClick={buttonHandler2}
                    className={isSelect2 === true ? "hiredActive" : "hired"}
                  >
                    Hired
                  </button>
                </div> */}
                <div className="innerTable">
                  <table className="table">
                    <tr className="tableHead">
                      <th className="tableFirst"></th>
                      <th>Candidate Name</th>
                      <th>Qualification</th>
                      <th>Experience</th>
                      <th>Key Skills</th>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>
                    {profileData.map((data) => {
                      return (
                        <tr className="tableRow">
                          <td className="profileBookMark">
                            <img src={tabFirst} alt="" />
                          </td>
                          <td>
                            <div className="profileData ">
                              <img src={tabImg} alt="" />
                              <h2>{data.name}</h2>
                            </div>
                          </td>
                          <td>
                            <h2>{data.role}</h2>
                          </td>
                          <td>
                            <h2>{data.Experience}</h2>
                          </td>
                          <td className="skillData">
                            <p>{data.Skill1}</p>
                            <p>{data.Skill2}</p>
                            <p>{data.Skill3}</p>
                          </td>
                          {/* <td>
                            <div>
                              <button className="tdBtn">
                                Schedule interview
                              </button>
                            </div>
                          </td> */}
                          <td>
                            <h2>{data.date}</h2>
                          </td>
                          <td>
                            <h2>{data.time}</h2>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
            <h1 className="interviewHead">
              Schedule call with your shortlisted candidates
            </h1>

            <div className="interviewCard">
              <SearchProfileCard />
              <SearchProfileCard />
              <SearchProfileCard />
              <SearchProfileCard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewComp;
