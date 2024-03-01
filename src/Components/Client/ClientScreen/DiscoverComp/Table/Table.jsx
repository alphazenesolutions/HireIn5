/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Table.css";
import tabImg from "../../../../../assests/table.png";
import tabFirst from "../../../../../assests/colar.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { storeAction } from "../../../../../Store/Store";

const Table = (props) => {
  const dispatch = useDispatch();
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  const bookmarkdata = useSelector((store) => store.bookmarkdata);

  const [isSelect, setIsSelect] = useState("Shortlisted");
  const [alluserdata, setalluserdata] = useState([]);
  const [tabledata, settabledata] = useState([]);

  useEffect(() => {
    getUserinfo();
  }, [bookmarkdata]);

  const getUserinfo = async () => {
    if (bookmarkdata.length !== 0) {
      var unique = bookmarkdata.filter(
        (value, index, array) => array.indexOf(value) === index
      );
      let data = JSON.stringify({
        users_list: unique,
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

      var config1 = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://hirein5-server.onrender.com/bookmark/users/${userid}`,
        headers: {
          Authorization: `JWT ${token}`,
        },
      };
      var tabledata = await axios(config1)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return error;
        });
      settabledata(tabledata);
    }
  };
  const removebtn = async (id) => {
    var checkdata = await tabledata.filter((data) => {
      return data.bookmarked_user == id;
    });
    if (checkdata.length !== 0) {
      var config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://hirein5-server.onrender.com/bookmark/${checkdata[0].id}`,
        headers: {
          Authorization: `JWT ${token}`,
        },
      };
      await axios(config)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });

      var config1 = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://hirein5-server.onrender.com/bookmark/users/${userid}`,
        headers: {
          Authorization: `JWT ${token}`,
        },
      };

      var table_data = await axios(config1)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return error;
        });

      if (table_data.length !== 0) {
        const bookmarkedUserArray = table_data.map(
          (item) => item.bookmarked_user
        );
        dispatch(
          storeAction.bookmarkdataHander({ bookmarkdata: bookmarkedUserArray })
        );
      } else {
        dispatch(storeAction.bookmarkdataHander({ bookmarkdata: [] }));
      }
    }
  };
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
                          <td
                            className="profileBookMark"
                            onClick={() => {
                              removebtn(data.id);
                            }}
                          >
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
                                      (data, index) =>
                                        index == 0 ||
                                        index == 1 ||
                                        index == 2 ? (
                                          <p key={index}>{data}</p>
                                        ) : null
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
