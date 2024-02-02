import React from "react";
import "./DashBoardComp.css";
// import Head from "../Reusable/LogoHead/Head";
// import profile from "../../assests/profile.png";
// import wallet from "../../assests/wallet.png";
// import logout from "../../assests/logout.png";
// import discover from "../../assests/Discover.svg";
// import interview from "../../assests/User.svg";
// import contract from "../../assests/Contracts.svg";
// import billing from "../../assests/Billing.svg";
// import help from "../../assests/help.svg";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assests/Logo.png";
import DashHead from "../Reusable/DashBoardReusable/DashHead/DashHead";
import DashSearch from "../Reusable/DashBoardReusable/DashSearch/DashSearch";
import DashBody from "../Reusable/DashBoardReusable/DashBody/DashBody";
// import Table from "../Reusable/Table/Table";
// import SearchProfileCard from "../Reusable/SearchProfileCard/SearchProfileCard";
// import ProfileCard from "../Reusable/ProfileCard/ProfileCard";
import glasses from "../../assests/glasses.png";

const DashBoardComp = () => {
  // const navigate = useNavigate();
  return (
    <>
      <div className="dashBoardMain paddingLeft100 paddingRight100">
        <DashHead
          head="Discover Candidates"
          desc="Search and find the right fit for your company. If you need instant help in shortlisting candidates,"
          highLight="Contact us"
        />
        <DashSearch class="dashBoardMainSearch" />
        <DashBody
          Img={glasses}
          head="Begin your search to Hire in 5"
          desc="Find the right candidates, shortlist and schedule an interview with them here."
          button=""
          fun=""
        />
      </div>
      {/* </div> */}
    </>
  );
};

export default DashBoardComp;
