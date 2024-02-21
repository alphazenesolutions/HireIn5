import React from "react";
import "./Layout.css";
import Routing from "../Routing/Routing";
import SideBar from "../Components/Reusable/SideBar/SideBar";
import { useSelector } from "react-redux";
import discover from "../assests/Discover.svg";

const Layout = () => {
  const islogin = useSelector((store) => store.islogin);
  var role = 1;
  return (
    <div>
      {islogin && (
        <div className="dashboard">
          <div className="sideNavComp">
            {role == 1 && (
              <SideBar
                role={1}
                menu={[
                  { title: "discover", icon: discover, router: "discover" },
                  { title: "Interview", icon: discover, router: "interview" },
                  { title: "Contracts", icon: discover, router: "contract" },
                  { title: "Billing", icon: discover, router: "billing" },
                  { title: "Help & FAQs", icon: discover, router: "faq" },
                  { title: "Profile", icon: discover, router: "profile" },
                ]}
              />
            )}
            {role == 2 && (
              <SideBar
                role={2}
                menu={[
                  { title: "discover", icon: discover, router: "discover" },
                  { title: "Interview", icon: discover, router: "interview" },
                  { title: "Contracts", icon: discover, router: "contract" },
                  { title: "Billing", icon: discover, router: "billing" },
                  { title: "Profile", icon: discover, router: "profile" },
                ]}
              />
            )}
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
