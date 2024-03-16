/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React from "react";
import "./Layout.css";
import Routing from "../Routing/Routing";
import SideBar from "../Components/Reusable/SideBar/SideBar";
import { useSelector } from "react-redux";
import discover from "../assests/Discover.svg";
import { FiUsers } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FiCompass } from "react-icons/fi";
import { FiHelpCircle } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuUsers2 } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";

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
                  {
                    title: "Discover",
                    icon: <FiCompass />,
                    router: "discover",
                  },
                  {
                    title: "Interview",
                    icon: <FiUsers />,
                    router: "interview",
                  },
                  {
                    title: "Contracts",
                    icon: <FiFileText />,
                    router: "contract",
                  },
                  {
                    title: "Billing",
                    icon: <FiHelpCircle />,
                    router: "billing",
                  },
                  {
                    title: "Help & FAQs",
                    icon: <FiHelpCircle />,
                    router: "faq",
                  },
                ]}
              />
            )}
            {loginrole == 3 && (
              <SideBar
                role={2}
                menu={[
                  {
                    title: "Profile",
                    icon: <FaRegCircleUser />,
                    router: "profile",
                  },
                  {
                    title: "Help & FAQs",
                    icon: <FiHelpCircle />,
                    router: "faq",
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
                    icon: <FiHome />,
                    router: "adminHome",
                  },
                  {
                    title: "Profile",
                    icon: <FaRegCircleUser />,
                    router: "customerProfile",
                  },

                  {
                    title: "Team members",
                    icon: <LuUsers2 />,
                    router: "adminteam",
                  },
                  {
                    title: "Settings",
                    icon: <FiSettings />,
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
