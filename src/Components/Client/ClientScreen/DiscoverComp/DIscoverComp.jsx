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
// import { ScrollTrigger } from "gsap/ScrollTrigger";

const DiscoverComp = () => {
  const token = useSelector((store) => store.token);
  const [isInput, setIsInput] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [alldata, setalldata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);

  const InputHandler = async (e) => {
    if (e.target.value.length !== 0) {
      setIsInput(true);
      var filterdata = await alldata.filter((data) => {
        return data.first_name.toLowerCase().includes(e.target.value);
      });
      setfilterdata(filterdata);
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
    console.log(card);
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

  return (
    <div>
      <div className="dashBoardMain paddingLeft100">
        <DashHead
          head="Discover Candidates"
          desc="Search and find the right fit for your company. If you need instant help in shortlisting candidates,"
          highLight="Contact us"
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
              <div className="recentWrap">
                <SearchProfileCard />
              </div>
              <div className="recentWrap">
                <SearchProfileCard />
              </div>
              <div className="recentWrap">
                <SearchProfileCard />
              </div>
              <div className="recentWrap">
                <SearchProfileCard />
              </div>
              <div className="recentWrap">
                <SearchProfileCard />
              </div>
              <div className="recentWrap">
                <SearchProfileCard />
              </div>
            </div>
            <Table class="tableOne paddingRight100" />
          </div>
        ) : (
          <ProfileCard filterdata={filterdata} />
        )}
      </div>
      {/* <div contenteditable="true" className="h-[100px] w-full bg-grey-400">
        <div contenteditable="true">I'm Editable. Edit me!</div>
      </div> */}
    </div>
  );
};

export default DiscoverComp;
