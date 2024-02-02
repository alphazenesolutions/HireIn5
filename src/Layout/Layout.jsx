import React from "react";
import "./Layout.css";
import Routing from "../Routing/Routing";
import SideBar from "../Components/SideBar/SideBar";
import { useSelector } from "react-redux";

const Layout = () => {
  const islogin = useSelector((store) => store.islogin);
  return (
    <div>
      {islogin && (
        <div className="dashboard">
          <div className="sideNavComp">
            <SideBar />
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
