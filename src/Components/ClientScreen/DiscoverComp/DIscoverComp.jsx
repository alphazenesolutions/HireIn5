import React, { useState } from "react";
import "./DiscoverComp.css";
import DashHead from "../../Reusable/DashBoardReusable/DashHead/DashHead";
import DashSearch from "../../Reusable/DashBoardReusable/DashSearch/DashSearch";
import Table from "../../Reusable/Table/Table";
import SearchProfileCard from "../../Reusable/SearchProfileCard/SearchProfileCard";
import recentLeft from "../../../assests/recentLeft.png";
import recentRight from "../../../assests/recentRight.png";
import ProfileCard from "../../Reusable/ProfileCard/ProfileCard";

const DiscoverComp = () => {
  const [isInput, setIsInput] = useState(true);
  const InputHandler = () => {
    setIsInput(!isInput);
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
                <button>
                  <img src={recentLeft} alt="" />
                </button>
                <button>
                  <img src={recentRight} alt="" />
                </button>
              </div>
              <div className="recentHeadRight">
                <h2>Clear All</h2>
              </div>
            </div>
            <div className="recent">
              <SearchProfileCard />
              <SearchProfileCard />
              <SearchProfileCard />
            </div>
            <Table class="tableOne paddingRight100" />
          </div>
        ) : (
          <ProfileCard class="clientDiscoverOuter paddingRight100" />
        )}
      </div>
    </div>
  );
};

export default DiscoverComp;
