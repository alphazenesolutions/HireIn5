import React from "react";
import "./Layout.css";
import Routing from "../Routing/Routing";
import SideBar from "../Components/Reusable/SideBar/SideBar";
import { useSelector } from "react-redux";
import discover from "../assests/Discover.svg";

const Layout = () => {
  const islogin = useSelector((store) => store.islogin);
  return (
    <div>
      {islogin && (
        <div className="dashboard">
          <div className="sideNavComp">
            <SideBar
              one={islogin && "Discover"}
              img1={discover}
              two="Interviews"
              three="Contracts"
              four="Billing"
              five="Help & FAQs"
            />
          </div>
          <div className="main">
            <Routing />
          </div>
        </div>
      )}
      {!islogin && <Routing />}
    </div>
  );
};

export default Layout;
