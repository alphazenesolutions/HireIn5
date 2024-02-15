/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Table.css";
import tabImg from "../../../assests/table.png";
import tabFirst from "../../../assests/colar.png";
import { useSelector } from "react-redux";
import axios from "axios";

const Table = (props) => {
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
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
  useEffect(() => {
    getUserinfo();
  }, [bookmarkdata]);
  const getUserinfo = async () => {
    let data = JSON.stringify({
      users_list: bookmarkdata,
    });
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://hirein5-server.onrender.com/getUsersInformation/5/",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                          <h2>Surya Narreddi</h2>
                        </div>
                      </td>
                      <td>
                        <h2>Java Developer</h2>
                      </td>
                      <td>
                        <h2>2 years</h2>
                      </td>
                      <td className="skillData">
                        <p>Java EEE</p>
                        <p>JavaScript</p>
                        <p>Java</p>
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
