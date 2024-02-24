/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import "./SideBar.css";
import profile from "../../../assests/profile.png";
import wallet from "../../../assests/wallet.png";
import logout from "../../../assests/logout.png";

import logo from "../../../assests/Logo.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeAction } from "../../../Store/Store";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SideBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  const userdata = useSelector((store) => store.userdata);

  useEffect(() => {
    setTimeout(() => {
      getUserinfo();
    }, 1000);
  }, [token, userid]);
  const getUserinfo = useCallback(async () => {
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
          return err.response.data;
        });
      if (userinfo.id !== undefined) {
        dispatch(storeAction.userdataHander({ userdata: [userinfo] }));
      } else {
        dispatch(storeAction.isloginHandler({ islogin: false }));
        dispatch(storeAction.tokenHandler({ token: null }));
        dispatch(storeAction.useridHandler({ userid: 5 }));
        window.location.replace("/login");
      }
    } else {
      dispatch(storeAction.isloginHandler({ islogin: false }));
      dispatch(storeAction.tokenHandler({ token: null }));
      dispatch(storeAction.useridHandler({ userid: 5 }));
      window.location.replace("/login");
    }
  }, [token, userid]);
  const logoutbtn = () => {
    dispatch(storeAction.isloginHandler({ islogin: false }));
    dispatch(storeAction.tokenHandler({ token: null }));
    dispatch(storeAction.useridHandler({ userid: 5 }));
    window.location.replace("/login");
  };

  const [isHover, setIsHover] = useState("discover");
  const HoverHandler = (e) => {
    navigate(e.target.id);
    setIsHover(e.target.id);
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

                {/* <p>Apple Inc.</p> */}
              </div>
              <div className="profilePic">
                <img src={profile} alt="" />
              </div>
            </div>
            <div className="navMenu">
              {props.menu.map((data) => {
                if (data.title == isHover) {
                  return (
                    <div
                      onClick={HoverHandler}
                      id={data.router}
                      className="menu1Active"
                    >
                      <img
                        id={data.router}
                        className="menuImg"
                        src={data.icon}
                        alt=""
                      />
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
                      <img
                        id={data.router}
                        className="menuImg"
                        src={data.icon}
                        alt=""
                      />
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
          <div className="sideNavBottom">
            <div className="cash">
              <div className="cashLeft">
                <img src={wallet} alt="" />
              </div>
              <div className="cashRight">
                <p>H5 Cash</p>
                <h5>
                  <span>₹</span>5000
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="logout cursor-pointer" onClick={logoutbtn}>
          <img src={logout} alt="" />
          <h6>Log out</h6>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
