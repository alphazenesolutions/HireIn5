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

  const [isSelect, setIsSelect] = useState("Shortlisted");
  const [alluserdata, setalluserdata] = useState([]);

  useEffect(() => {
    getUserinfo();
  }, [bookmarkdata]);

  const getUserinfo = async () => {
    let data = JSON.stringify({
      users_list: bookmarkdata,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://hirein5-server.onrender.com/getUsersInformation/${userid}`,
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setalluserdata(response.data);
      })
      .catch((error) => {
        return error;
      });
  };
  console.log(alluserdata, "alluserdata");
  return (
    <div>
      {bookmarkdata.length !== 0 ? (
        <div className={props.class}>
          <h1>Candidates on review</h1>
          <div className="tableButton marginTop20 marginBottom20">
            <button
              onClick={() => {
                setIsSelect("Shortlisted");
              }}
              className={
                isSelect === "Shortlisted"
                  ? "shortListedActive"
                  : "shortListedInActive"
              }
            >
              Shortlisted
            </button>
            <button
              onClick={() => {
                setIsSelect("Hired");
              }}
              className={
                isSelect === "Hired"
                  ? "shortListedActive"
                  : "shortListedInActive"
              }
            >
              Hired
            </button>
          </div>
          {isSelect === "Shortlisted" ? (
            <div className="innerTable">
              <table className="table">
                <tr className="tableHead">
                  <th className="tableFirst"></th>
                  <th>Candidate Name</th>
                  <th>Qualification</th>
                  <th>Experience</th>
                  <th>Key Skills</th>
                  <th></th>
                </tr>
                {alluserdata.length !== 0
                  ? alluserdata.map((data, index) => {
                      return (
                        <tr className="tableRow" key={index}>
                          <td className="profileBookMark">
                            <img src={tabFirst} alt="" />
                          </td>
                          <td>
                            <div className="profileData ">
                              <img src={tabImg} alt="" />
                              <h2>{data.first_name}</h2>
                            </div>
                          </td>
                          {data.preference_info !== null ? (
                            <>
                              {" "}
                              <td>
                                <h2>{data.preference_info.qualification}</h2>
                              </td>
                              <td>
                                <h2>
                                  {data.preference_info.year_of_experience}{" "}
                                  years
                                </h2>
                              </td>
                              <td className="skillData">
                                {data.preference_info.skills.length !== 0
                                  ? data.preference_info.skills.map(
                                      (data, index) => <p key={index}>{data}</p>
                                    )
                                  : "-"}
                              </td>
                            </>
                          ) : (
                            <>
                              <td>-</td> <td>-</td> <td>-</td>
                            </>
                          )}

                          <td>
                            <div>
                              <button className="tdBtn">
                                Schedule interview
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </table>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Table;
