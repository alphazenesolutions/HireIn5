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
          console.log(error);
        });
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
        const isSkillMatch = data.skill.some((skill) =>
          skill.toLowerCase().includes(searchTerm)
        );

        return isFirstNameMatch || isSkillMatch;
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
    getSearchuser();
  }, []);

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
    var newobj = [
      "PHP",
      "Pytorch",
      "Javascript",
      "Node.Js",
      "Firebase Cloud Firestore",
    ];
    if (allfacility.faculties.length !== 0) {
      var newarray = [];
      for (let i = 0; i < allfacility.faculties.length; i++) {
        allfacility.faculties[i]["skill"] = newobj;
        newarray.push(allfacility.faculties[i]);
      }
      setalldata(newarray);
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
      // let data = JSON.stringify({
      //   users_list: unique,
      // });

      // let config = {
      //   method: "get",
      //   maxBodyLength: Infinity,
      //   url: "https://hirein5-server.onrender.com/getUsersInformation/5",
      //   headers: {
      //     Authorization:
      //       "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3OTgyMzQ5LCJpYXQiOjE3MDc5Nzg3NDksImp0aSI6ImVmOTZhNTdiZjZhNDRkODdhMmJiOGJkMjk2YjJiOTA5IiwidXNlcl9pZCI6NSwiZmlyc3RfbmFtZSI6IkRpbmVzaCBLdW1hciIsImVtYWlsIjoiZGtAZ21haWwuY29tIiwicGhvbmUiOiIxMjM0NTY3ODkwIiwidGl0bGUiOiJNYW5hZ2VyIiwibGlua2VkX2luIjoibGlua2VkaW4uY29tL2pvaG5kb2UiLCJyb2xlIjoiMyJ9.80cwUYD3rhmtg9JoqXFupmiSGK0UbsbB4pTVukXBun0",
      //     "Content-Type": "application/json",
      //   },
      //   data: data,
      // };

      // axios
      //   .request(config)
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      var searchuser = [];
      for (var i = 0; i < unique.length; i++) {
        var userinfo = await axios
          .get(
            `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${unique[i]}`,
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
            return err.response.data;
          });
        searchuser.push(userinfo);
      }
      setsearchuser(searchuser);
    }
  };

  const [newstate, setnewstate] = useState([]);
  const addbookmark = async (id, datanew) => {
    // var newarray = [...newstate, datanew];
    // setnewstate(newarray);
    // dispatch(storeAction.bookmarkdataHander({ bookmarkdata: newarray }));
    // let data = JSON.stringify({
    //   user: userid.toString(),
    //   bookmarked_user: id.toString(),
    // });
    // let config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: `https://hirein5-server.onrender.com/bookmark/`,
    //   headers: {
    //     Authorization: `JWT ${token}`,
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };
    // await axios
    //   .request(config)
    //   .then((response) => {
    //     return response;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://hirein5-server.onrender.com/bookmark/users/${userid}`,
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    var updateddata = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(updateddata, "updateddata");
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
                    <h2>Clear All</h2>
                  </div>
                </div>
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
