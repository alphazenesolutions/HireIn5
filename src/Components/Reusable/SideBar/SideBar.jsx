/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import "./SideBar.css";
import logout from "../../../assests/logout.png";
import logo from "../../../assests/Logo.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeAction } from "../../../Store/Store";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import back from "../../../assests/billingX.png";
import { RxCross1 } from "react-icons/rx";
import ProgressBar from "../../PrelineComponent/ProgressBar/Circlebar";
import { CircularProgress } from "@mui/material";

const SideBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  const userdata = useSelector((store) => store.userdata);
  const loginrole = useSelector((store) => store.loginrole);

  useEffect(() => {
    setTimeout(() => {
      getUserinfo();
    }, 1000);
  }, [token, userid, loginrole]);

  const getUserinfo = useCallback(async () => {
    if (loginrole == 2) {
      setIsHover("discover");
    } else if (loginrole == 3) {
      setIsHover("profile");
    } else {
      setIsHover("adminHome");
    }
    if (token !== null && userid !== null) {
      var userinfo = await axios
        .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${userid}`, {
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
      if (userinfo !== undefined) {
        if (userinfo.id !== undefined) {
          dispatch(storeAction.userdataHander({ userdata: [userinfo] }));
        } else {
          dispatch(storeAction.isloginHandler({ islogin: false }));
          dispatch(storeAction.issidebarHandler({ issidebar: false }));
          dispatch(storeAction.tokenHandler({ token: null }));
          dispatch(storeAction.useridHandler({ userid: 5 }));
          window.location.replace("/#/login");
        }
      }
    } else {
      dispatch(storeAction.isloginHandler({ islogin: false }));
      dispatch(storeAction.issidebarHandler({ issidebar: false }));
      dispatch(storeAction.tokenHandler({ token: null }));
      dispatch(storeAction.useridHandler({ userid: 5 }));
      window.location.replace("/#/login");
    }
  }, [token, userid, loginrole]);
  const logoutbtn = () => {
    dispatch(storeAction.isloginHandler({ islogin: false }));
    dispatch(storeAction.issidebarHandler({ issidebar: false }));
    dispatch(storeAction.tokenHandler({ token: null }));
    dispatch(storeAction.useridHandler({ userid: 5 }));
    dispatch(storeAction.isPopUpHander(""));
    dispatch(storeAction.searchuserHander({ searchuser: [] }));
    dispatch(storeAction.singleuserHander({ singleuser: [] }));
    dispatch(storeAction.userdataHander({ userdata: [] }));
    dispatch(storeAction.loginroleHander({ islogin: null }));
    dispatch(storeAction.bookmarkdataHander({ bookmarkdata: [] }));

    window.location.replace("/#/login");
  };

  const [isHover, setIsHover] = useState(
    "discover" || "profile" || "adminHome"
  );
  const HoverHandler = (e) => {
    navigate(e.target.id);
    setIsHover(e.target.id);
  };
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });
  const overLayHandler = (e) => {
    dispatch(storeAction.isPopUpHander(e.target.id));
  };

  const exitOverlayHandler = () => {
    dispatch(storeAction.isPopUpHander());
  };
  return (
    <div>
      <div className="sideNav">
        <div className="sideNavInner">
          <div className="sideNavTop">
            <div
              onClick={() => navigate("/discover")}
              className="sideNavHead marginBottom15"
            >
              <img src={logo} alt="" />
              <h1>HireIn5</h1>
            </div>
            <div className="dashProfile">
              <div className="profileName">
                {userdata.length !== 0 ? (
                  <h2>{userdata[0].first_name}</h2>
                ) : null}
                {userdata.length !== 0 ? (
                  userdata[0].company !== null ? (
                    <p>{userdata[0].company.company_name}</p>
                  ) : null
                ) : null}
              </div>
              <div className="profilePic">
                {userdata.length !== 0 ? (
                  userdata[0].profile_picture !== null ? (
                    userdata[0].profile_picture.length !== 0 ? (
                      <img src={userdata[0].profile_picture} alt="" />
                    ) : (
                      <Avatar
                        name={userdata[0].first_name}
                        size={50}
                        round="50px"
                      />
                    )
                  ) : (
                    <Avatar
                      name={userdata[0].first_name}
                      size={50}
                      round="50px"
                    />
                  )
                ) : null}
                {/* <img src={profile} alt="" /> */}
              </div>
            </div>
            <div className="navMenu">
              {props.menu.map((data) => {
                if (data.router == isHover) {
                  return (
                    <div
                      onClick={HoverHandler}
                      id={data.router}
                      className="menu1Active"
                    >
                      <span id={data.router} className="menuIcon" alt="">
                        {data.icon}
                      </span>
                      <h4 id={data.router} className="menuName">
                        {data.title}
                      </h4>
                      {/* <p className="number">5</p> */}
                    </div>
                  );
                } else {
                  return (
                    <div
                      id={data.router}
                      onClick={HoverHandler}
                      className="menu1"
                    >
                      <span id={data.router} className="menuIcon" alt="">
                        {data.icon}
                      </span>
                      <h4 id={data.router} className="menuName">
                        {data.title}
                      </h4>
                      {/* <p className="number">5</p> */}
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className="sidebarProgressBar">
            <ProgressBar />
            <h1>Profile is completed</h1>
            <p>
              A completed profile has higher chance of getting an opportunity
            </p>
            <h2>Complete my profile</h2>
          </div>
        </div>
        <div id="logoutPopUp" className="logout" onClick={overLayHandler}>
          <img id="logoutPopUp" src={logout} alt="" onClick={overLayHandler} />
          <h6 id="logoutPopUp" onClick={overLayHandler}>
            Log out
          </h6>
        </div>
        {isPopUp == "logoutPopUp" && (
          <div className="logoutPopUp">
            <div className="logoutPopUpHead">
              <h1>Logout</h1>
              <img onClick={exitOverlayHandler} src={back} alt="" />
            </div>
            <h2>
              Are you sure you want to logout? You’ll have to log in again to
              use this platform
            </h2>
            <button onClick={logoutbtn} className="logoutActiveButton">
              Yes, logout
            </button>
            <button
              onClick={exitOverlayHandler}
              className="logoutInaciveButton"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div onClick={overLayHandler} className="IconClose">
        <RxCross1 />
      </div>
    </div>
  );
};

export default SideBar;
