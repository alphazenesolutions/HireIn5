/* eslint-disable eqeqeq */
import React from "react";
import "./Layout.css";
import Routing from "../Routing/Routing";
import SideBar from "../Components/Reusable/SideBar/SideBar";
import { useSelector } from "react-redux";
import discover from "../assests/Discover.svg";

const Layout = () => {
  const issidebar = useSelector((store) => store.issidebar);
  const loginrole = useSelector((store) => store.loginrole);
  return (
    <div>
      {issidebar && (
        <div className="dashboard">
          <div className="sideNavComp">
            {loginrole == 2 && (
              <SideBar
                role={1}
                menu={[
                  { title: "Discover", icon: discover, router: "discover" },
                  { title: "Interview", icon: discover, router: "interview" },
                  { title: "Contracts", icon: discover, router: "contract" },
                  { title: "Billing", icon: discover, router: "billing" },
                  { title: "Help & FAQs", icon: discover, router: "faq" },
                ]}
              />
            )}
            {loginrole == 3 && (
              <SideBar
                role={2}
                menu={[
                  { title: "Help & FAQs", icon: discover, router: "faq" },
                  {
                    title: "Profile",
                    icon: discover,
                    router: "profile",
                  },
                  {
                    title: "AdminProfile",
                    icon: discover,
                    router: "customerProfile",
                  },
                  {
                    title: "Contracts",
                    icon: discover,
                    router: "admincontracts",
                  },
                  {
                    title: "Team members",
                    icon: discover,
                    router: "adminteam",
                  },
                ]}
              />
            )}
            {loginrole == 1 && (
              <SideBar
                role={2}
                menu={[
                  {
                    title: "Home",
                    icon: discover,
                    router: "adminHome",
                  },
                  {
                    title: "Profile",
                    icon: discover,
                    router: "customerProfile",
                  },
                  {
                    title: "Contracts",
                    icon: discover,
                    router: "admincontracts",
                  },
                  {
                    title: "Team members",
                    icon: discover,
                    router: "adminteam",
                  },
                  {
                    title: "Settings",
                    icon: discover,
                    router: "settings",
                  },
                ]}
              />
            )}
          </div>

          <div className="main">
            <Routing />
          </div>
        </div>
      )}
      {!issidebar && <Routing />}
    </div>
  );
};

export default Layout;
