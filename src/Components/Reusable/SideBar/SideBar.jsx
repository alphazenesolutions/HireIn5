/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import "./SideBar.css";
import profile from "../../../assests/profile.png";
import wallet from "../../../assests/wallet.png";
import logout from "../../../assests/logout.png";
import discover from "../../../assests/Discover.svg";
import interview from "../../../assests/User.svg";
import contract from "../../../assests/Contracts.svg";
import billing from "../../../assests/Billing.svg";
import help from "../../../assests/help.svg";
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

  const [username, setusername] = useState("");
  useEffect(() => {
    setTimeout(() => {
      getUserinfo();
    }, 2000);
  }, [token, userid]);
  const getUserinfo = useCallback(async () => {
    if (token !== null && userid !== null) {
      var userinfo = await axios
        .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/user/${userid}`, {
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
        setusername(userinfo.first_name);
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

  const [isHover, setIsHover] = useState(false);
  const HoverHandler = () => {
    navigate("/discover");
    setIsHover(true);
    setIsHover1(false);
    setIsHover2(false);
    setIsHover3(false);
    setIsHover4(false);
  };

  const [isHover1, setIsHover1] = useState(false);
  const HoverHandler1 = () => {
    navigate("/interview");
    setIsHover(false);
    setIsHover1(true);
    setIsHover2(false);
    setIsHover3(false);
    setIsHover4(false);
  };

  const [isHover2, setIsHover2] = useState(false);
  const HoverHandler2 = () => {
    navigate("/contract");
    setIsHover(false);
    setIsHover1(false);
    setIsHover2(true);
    setIsHover3(false);
    setIsHover4(false);
  };

  const [isHover3, setIsHover3] = useState(false);
  const HoverHandler3 = () => {
    navigate("/billing");
    setIsHover(false);
    setIsHover1(false);
    setIsHover2(false);
    setIsHover3(true);
    setIsHover4(false);
  };

  const [isHover4, setIsHover4] = useState(false);
  const HoverHandler4 = () => {
    navigate("");
    setIsHover(false);
    setIsHover1(false);
    setIsHover2(false);
    setIsHover3(false);
    setIsHover4(true);
  };

  const [isHover5, setIsHover5] = useState(false);
  const HoverHandler5 = () => {
    navigate("/profile");
    setIsHover(false);
    setIsHover1(false);
    setIsHover2(false);
    setIsHover3(false);
    setIsHover4(false);
    setIsHover5(true);
  };
  return (
    <div>
      <div className="sideNav">
        <div className="sideNavInner">
          <div className="sideNavTop">
            <div
              onClick={() => navigate("/dashboard")}
              className="sideNavHead marginBottom15"
            >
              <img src={logo} alt="" />
              <h1>HireIn5</h1>
            </div>
            <div className="dashProfile">
              <div className="profileName">
                <h2>{username}</h2>
                {/* <p>Apple Inc.</p> */}
              </div>
              <div className="profilePic">
                <img src={profile} alt="" />
              </div>
            </div>
            <div className="navMenu">
              <div
                onClick={HoverHandler}
                className={isHover === true ? "menu1Active" : "menu1"}
              >
                <img className="menuImg" src={props.img1} alt="" />
                <h4 onClick={() => navigate("/discover")} className="menuName">
                  {props.one}
                </h4>
                <p className="number">5</p>
              </div>
              <div
                onClick={HoverHandler1}
                className={isHover1 === true ? "menu1Active" : "menu1"}
              >
                <img className="menuImg" src={props.img1} alt="" />
                <h4 className="menuName">{props.two}</h4>
                <p className="number">5</p>
              </div>
              <div
                onClick={HoverHandler2}
                className={isHover2 === true ? "menu1Active" : "menu1"}
              >
                <img className="menuImg" src={props.img1} alt="" />
                <h4 className="menuName">{props.three}</h4>
                <p className="number">5</p>
              </div>
              <div
                onClick={HoverHandler3}
                className={isHover3 === true ? "menu1Active" : "menu1"}
              >
                <img className="menuImg" src={props.img1} alt="" />
                <h4 className="menuName">{props.four}</h4>
                <p className="number">5</p>
              </div>
              <div
                onClick={HoverHandler4}
                className={isHover4 === true ? "menu1Active" : "menu1"}
              >
                <img className="menuImg" src={props.img1} alt="" />
                <h4 className="menuName">{props.five}</h4>
                <p className="number">5</p>
              </div>
              <div
                onClick={HoverHandler5}
                className={isHover5 === true ? "menu1Active" : "menu1"}
              >
                <img className="menuImg" src={props.img1} alt="" />
                <h4 className="menuName">{props.six}</h4>
                <p className="number">5</p>
              </div>
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
