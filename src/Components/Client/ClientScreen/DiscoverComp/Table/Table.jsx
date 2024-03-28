/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Table.css";
import tabImg from "../../../../../assests/table.png";
import tabFirst from "../../../../../assests/colar.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { storeAction } from "../../../../../Store/Store";
import { RxCross1 } from "react-icons/rx";
import { FiLoader } from "react-icons/fi";

const Table = (props) => {
  const dispatch = useDispatch();
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  const bookmarkdata = useSelector((store) => store.bookmarkdata);

  const [isSelect, setIsSelect] = useState("Shortlisted");
  const [alluserdata, setalluserdata] = useState([]);
  const [tabledata, settabledata] = useState([]);
  const [loading, setloading] = useState(false);
  const [singleuser, setsingleuser] = useState([]);
  const [date, setdate] = useState("");
  const [time, settime] = useState("");

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
        url: `https://hirein5-server.onrender.com/getUsersInformation/${userid}/`,
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          if (response.data.length !== 0) {
            setalluserdata(response.data);
          }
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
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });
  const overLayHandler = (e, data) => {
    dispatch(storeAction.isPopUpHander(e));
    setsingleuser([data]);
  };
  const submitbtn = async () => {
    if (singleuser.length !== 0) {
      setloading(true);
      var obj = {
        interview_info: {
          date: date,
          time: time,
          candidate: singleuser[0].id,
          meeting_url: "null",
        },
      };
      await axios
        .post(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/getInterview/${userid}/`,
          obj,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`,
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
      setloading(false);
      dispatch(storeAction.isPopUpHander());
      var userinfo = await axios
        .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${userid}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
      if (userinfo !== undefined) {
        if (userinfo.id !== undefined) {
          dispatch(storeAction.userdataHander({ userdata: [userinfo] }));
        }
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
                              <button
                                onClick={() => {
                                  overLayHandler("scheduleinterview", data);
                                }}
                                className="tdBtn"
                              >
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
      {isPopUp == "scheduleinterview" && (
        <>
          <div className="adminEditOverlay1">
            <div className="adminEditOverlayHead">
              <h1>Schedule Interview</h1>
              <RxCross1
                onClick={() => {
                  dispatch(storeAction.isPopUpHander());
                }}
              />
            </div>
            <div className="adminEditOverlayBody">
              <div className="adminEditOverlayContent">
                <h2>Interview Date </h2>
                <input
                  type="date"
                  onChange={(e) => {
                    setdate(e.target.value);
                  }}
                />
              </div>
              <div className="adminEditOverlayContent">
                <h2>Interview Time</h2>
                <input
                  type="time"
                  onChange={(e) => {
                    settime(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="editOverlayButton">
              <button
                className="discard"
                onClick={() => {
                  dispatch(storeAction.isPopUpHander());
                }}
              >
                Discard
              </button>

              {loading === false ? (
                <button className="save" onClick={submitbtn}>
                  Submit
                </button>
              ) : (
                <button className="save w-[10rem] flex justify-center items-center">
                  <FiLoader className="loadingIcon" />
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
