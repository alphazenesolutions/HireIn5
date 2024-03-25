/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./InterviewComp.css";
import DashHead from "../../../Reusable/DashBoardReusable/DashHead/DashHead";
import SearchProfileCard from "../../../Reusable/SearchProfileCard/SearchProfileCard";
import tabImg from "../../../../assests/table.png";
import tabFirst from "../../../../assests/colar.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { storeAction } from "../../../../Store/Store";

const InterviewComp = (props) => {
  const [isPage, setIsPage] = useState("page1");
  const dispatch = useDispatch();
  const search_user = useSelector((store) => store.searchuser);
  const userdata = useSelector((store) => store.userdata);
  const token = useSelector((store) => store.token);
  const userid = useSelector((store) => store.userid);

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
  const addbookmark = async (id) => {
    let data = JSON.stringify({
      user: userid.toString(),
      bookmarked_user: id.toString(),
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://hirein5-server.onrender.com/bookmark/`,
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    await axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    getBookmarkdata();
  };
  const getBookmarkdata = async () => {
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

    if (tabledata.length !== 0) {
      const bookmarkedUserArray = tabledata.map((item) => item.bookmarked_user);
      dispatch(
        storeAction.bookmarkdataHander({ bookmarkdata: bookmarkedUserArray })
      );
    }
  };
  const overLayHandler = (e, data) => {
    dispatch(storeAction.isPopUpHander(e));
    dispatch(storeAction.singleuserHander({ singleuser: [data] }));
  };
  return (
    <div>
      <div className="dashBoardMain paddingLeft100 paddingRight100">
        <DashHead
          head="Interviews"
          desc="All your interviews kept in one place. If you need instant help in scheduling an interview,"
          highLight="Contact us"
          descClass="dashBoardMainHeadDescBetween"
        />
        <h1 className="interviewHead">Upcoming interviews</h1>
        <div className="">
          {userdata[0].interview_info.length !== 0 ? (
            <div className="">
              <div className={props.class}>
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
                    {userdata[0].interview_info.map((data) => {
                      return (
                        <tr className="tableRow">
                          <td className="profileBookMark">
                            {/* <img src={tabFirst} alt="" /> */}
                          </td>
                          <td>
                            <div className="profileData ">
                              <img src={tabImg} alt="" />
                              <h2>{data.candidate[0].first_name}</h2>
                            </div>
                          </td>
                          <td>
                            <h2>
                              {data.candidate[0].preference_info.qualification}
                            </h2>
                          </td>
                          <td>
                            <h2>
                              {
                                data.candidate[0].preference_info
                                  .year_of_experience
                              }
                            </h2>
                          </td>
                          {data.candidate[0].preference_info.skills.length !==
                          0 ? (
                            <td className="skillData -mt-16">
                              {data.candidate[0].preference_info.skills.map(
                                (datanew, index) =>
                                  index == 0 || index == 1 || index == 2 ? (
                                    <p key={index}>{datanew}</p>
                                  ) : null
                              )}
                            </td>
                          ) : (
                            <td>
                              <p>-</p>
                            </td>
                          )}

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
          ) : null}

          <h1 className="interviewHead">
            Schedule call with your shortlisted candidates
          </h1>
          <div className="interviewCard">
            {search_user.length !== 0
              ? search_user.map((datanew, index1) => (
                  <div className="recentWrap" key={index1}>
                    <SearchProfileCard
                      datanew={datanew}
                      addbookmark={addbookmark}
                      reserve={overLayHandler}
                      setIsPage={setIsPage}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewComp;
