import React, { useEffect, useState } from "react";
import "./DiscoverComp.css";
import DashHead from "../../Reusable/DashBoardReusable/DashHead/DashHead";
import DashSearch from "../../Reusable/DashBoardReusable/DashSearch/DashSearch";
import Table from "../../Reusable/Table/Table";
import SearchProfileCard from "../../Reusable/SearchProfileCard/SearchProfileCard";
import recentLeft from "../../../assests/recentLeft.png";
import recentRight from "../../../assests/recentRight.png";
import ProfileCard from "../../Reusable/ProfileCard/ProfileCard";
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

const DiscoverComp = () => {
  const [isInput, setIsInput] = useState(true);
  const InputHandler = () => {
    setIsInput(!isInput);
  };

  const [isDisable, setIsDisable] = useState(false);

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
    console.log(card);
    if (card <= 0) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  };

  // forward
  const gsapHandler = () => {
    console.log(tl1);
    totalHandler();
    tl1.to(".recentWrap", { x: card * -530 });
  };

  // forward backward
  const gsapHandlerReverse = () => {
    totalHandler1();
    tl1.to(".recentWrap", { x: card * -530 });
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
        {isInput === true ? (
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
              <div className="recentWrap">
                <SearchProfileCard />
              </div>
            </div>
            <Table class="tableOne paddingRight100" />
          </div>
        ) : (
          <ProfileCard class="clientDiscoverOuter paddingRight100" />
        )}
      </div>
      {/* <div contenteditable="true" className="h-[100px] w-full bg-grey-400">
        <div contenteditable="true">I'm Editable. Edit me!</div>
      </div> */}
    </div>
  );
};

export default DiscoverComp;
