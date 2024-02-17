/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./DiscoverComp.css";
import DashHead from "../../../Reusable/DashBoardReusable/DashHead/DashHead";
import DashSearch from "../../../Reusable/DashBoardReusable/DashSearch/DashSearch";
import Table from "../../../Reusable/Table/Table";
import SearchProfileCard from "../../../Reusable/SearchProfileCard/SearchProfileCard";
import recentLeft from "../../../../assests/recentLeft.png";
import recentRight from "../../../../assests/recentRight.png";
import ProfileCard from "../../../Reusable/ProfileCard/ProfileCard";
import { gsap } from "gsap";
import axios from "axios";
import { useSelector } from "react-redux";
import CandidateProfileCard from "../../../Reusable/CandidateProfileCard/CandidateProfileCard";
import { useDispatch } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import DashBody from "../../../Reusable/DashBoardReusable/DashBody/DashBody";
import glasses from "../../../../assests/glasses.png";

const DiscoverComp = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.token);
  const userid = useSelector((store) => store.userid);
  const [isInput, setIsInput] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [alldata, setalldata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [searchuser, setsearchuser] = useState([]);
  const [isPage, setIsPage] = useState("page1");

  const pageHandler = async (event, id) => {
    if (event === "page2") {
      setIsPage(event);
      let data = JSON.stringify({
        new_entry: id.toString(),
      });
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `https://hirein5-server.onrender.com/user/recentlyvisited/${userid}`,
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
    } else if (event === "page1") {
      setIsInput(false);
      setIsDisable(false);
      setIsPage(event);
    } else {
      setIsPage(event);
    }
  };
  const InputHandler = async (e) => {
    if (e.target.value.length !== 0) {
      setIsInput(true);
      const searchTerm = e.target.value.toLowerCase();
      const filteredData = alldata.filter((data) => {
        const isFirstNameMatch = data.first_name
          .toLowerCase()
          .includes(searchTerm);
        if (data.preference_info !== null) {
          const isSkillMatch = data.preference_info.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm)
          );

          return isFirstNameMatch || isSkillMatch;
        }
      });
      setfilterdata(filteredData);
    } else {
      setIsInput(false);
      setfilterdata([]);
    }
  };

  // gsap

  var tl1 = gsap.timeline();
  var card = 0;
  // increment
  const totalHandler = () => {
    card += 1;
  };
  // decrement
  const totalHandler1 = () => {
    card -= 1;
    if (card <= 0) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  };
  const gsapHandler = () => {
    totalHandler();
    tl1.to(".recentWrap", { x: card * -530 });
  };

  const gsapHandlerReverse = () => {
    totalHandler1();
    tl1.to(".recentWrap", { x: card * -530 });
  };

  useEffect(() => {
    getAlldata();
  }, []);
  useEffect(() => {
    getSearchuser();
  }, [isPage]);

  const getAlldata = async () => {
    var allfacility = await axios
      .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/getFaculties`, {
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
    setalldata(allfacility.faculties);

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
  const getSearchuser = async () => {
    var allsearchfacility = await axios
      .get(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/recentlyvisited/${userid}`,
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
    if (allsearchfacility.recently_visited.length !== 0) {
      var unique = allsearchfacility.recently_visited.filter(
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
      var alluserdata = await axios
        .request(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
      setsearchuser(alluserdata);
    } else {
      setsearchuser([]);
    }
  };

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
    getAlldata();
  };
  const clearall = async () => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://hirein5-server.onrender.com/remove/recentlyvisited/${userid}`,
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    getSearchuser();
  };
  return (
    <div>
      <div className="dashBoardMain paddingLeft100">
        {isPage === "page1" && (
          <div className="">
            <DashHead
              head="Discover Candidates"
              desc="Search and find the right fit for your company. If you need instant help in shortlisting candidates,"
              highLight="Contact us"
              descClass="dashBoardMainHeadDescBetween"
            />
            <DashSearch
              class="dashBoardMainSearch paddingRight100"
              function={InputHandler}
            />
            {isInput === false ? (
              <div>
                {searchuser.length !== 0 ? (
                  <div className="recentHead paddingRight100">
                    <div className="recentHeadLeft">
                      <h1>Recent Searches</h1>
                      <button
                        disabled={isDisable === true ? true : false}
                        onClick={gsapHandlerReverse}
                      >
                        <img src={recentLeft} alt="" />
                      </button>
                      <button onClick={gsapHandler}>
                        <img src={recentRight} alt="" />
                      </button>
                    </div>
                    <div className="recentHeadRight">
                      <h2 onClick={clearall} className="cursor-pointer">
                        Clear All
                      </h2>
                    </div>
                  </div>
                ) : (
                  <DashBody
                    Img={glasses}
                    head="Begin your search to Hire in 5"
                    desc="Find the right candidates, shortlist and schedule an interview with them here."
                    button=""
                    fun=""
                  />
                )}

                <div className="recent ">
                  {searchuser.length !== 0
                    ? searchuser.map((datanew, index1) => (
                        <div className="recentWrap" key={index1}>
                          <SearchProfileCard
                            datanew={datanew}
                            addbookmark={addbookmark}
                          />
                        </div>
                      ))
                    : null}
                </div>
                <Table class="tableOne paddingRight100" />
              </div>
            ) : (
              <div className="">
                <ProfileCard fun={pageHandler} filterdata={filterdata} />
              </div>
            )}
          </div>
        )}
        {isPage === "page2" && (
          <CandidateProfileCard
            main="candidateProfile"
            fun={pageHandler}
            back="candidateBack"
          />
        )}
      </div>

      {/* <div contenteditable="true" className="h-[100px] w-full bg-grey-400">
        <div contenteditable="true">I'm Editable. Edit me!</div>
      </div> */}
    </div>
  );
};

export default DiscoverComp;
