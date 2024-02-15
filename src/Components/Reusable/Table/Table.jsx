import React, { useState } from "react";
import "./Table.css";
import tabImg from "../../../assests/table.png";
import tabFirst from "../../../assests/colar.png";
import { useSelector } from "react-redux";

const Table = (props) => {
  const bookmarkdata = useSelector((store) => store.bookmarkdata);
  const [isSelect, setIsSelect] = useState(false);
  const buttonHandler = () => {
    setIsSelect(true);
    setIsSelect2(false);
  };

  const [isSelect2, setIsSelect2] = useState(false);
  const buttonHandler2 = () => {
    setIsSelect(false);
    setIsSelect2(true);
  };

  const profileData = [
    {
      name: "Surya Narreddi",
      role: "Java Developer",
      Experience: "2 years",
      Skill1: "Java EEE",
      Skill2: "JavaScript",
      Skill3: "Java",
    },
    {
      name: "Surya Narreddi",
      role: "Java Developer",
      Experience: "2 years",
      Skill1: "Java EEE",
      Skill2: "JavaScript",
      Skill3: "Java",
    },
    {
      name: "Surya Narreddi",
      role: "Java Developer",
      Experience: "2 years",
      Skill1: "Java EEE",
      Skill2: "JavaScript",
      Skill3: "Java",
    },
  ];
  console.log(bookmarkdata, "bookmarkdata 111");
  return (
    <div>
      {/* tableOne */}
      <div className={props.class}>
        <h1>Candidates on review</h1>
        <div className="tableButton marginTop20 marginBottom20">
          <button
            onClick={buttonHandler}
            className={
              isSelect === true ? "shortListedActive" : "shortListedInActive"
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
        </div>
        <div className="innerTable">
          <table className="table">
            <tr className="tableHead">
              <th className="tableFirst"></th>
              <th>Candidate Name</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Key Skills</th>
              <th></th>
              {/* <th></th> */}
            </tr>
            {bookmarkdata.length !== 0
              ? bookmarkdata.map((data, index) => {
                  return (
                    <tr className="tableRow" key={index}>
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
                      <td>
                        <div>
                          <button className="tdBtn">Schedule interview</button>
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
  );
};

export default Table;
