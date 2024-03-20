/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { HashRouter, BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout/Layout";
import { storeAction } from "./Store/Store";
import { useEffect } from "react";
import axios from "axios";
import { LuAlignJustify } from "react-icons/lu";

function App() {
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });
  const isPopUp2 = useSelector((store) => {
    return store.isPopUp;
  });
  const CloseOverlay = () => {
    dispatch(storeAction.isPopUpHander());
    dispatch(storeAction.isPopUpHander2(false));
  };
  // const CloseOverlay2 = () => {
  //   dispatch(storeAction.isPopUpHander2(false));
  // };
  const navbarHandler = () => {
    dispatch(storeAction.isPopUpHander("navbar"));
  };
  useEffect(() => {
    Getuserinfo();
  }, [token, userid]);
  const Getuserinfo = async () => {
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
      if (userinfo.id !== undefined) {
        dispatch(storeAction.userdataHander({ userdata: [userinfo] }));
      }
    }
  };
  return (
    <>
      <div className="App">
        <HashRouter>
          <Layout />
        </HashRouter>
      </div>
      <div onClick={navbarHandler} className="navButton">
        <LuAlignJustify />
      </div>
      {isPopUp == "video" ||
      isPopUp == "addcontract" ||
      isPopUp == "approvedropdownMob" ||
      isPopUp == "mobfilter" ||
      isPopUp == "navbar" ||
      isPopUp == "personal" ||
      isPopUp == "professional" ||
      isPopUp == "Experience" ||
      isPopUp == "education" ||
      isPopUp == "certificate" ||
      isPopUp == "travel" ||
      isPopUp == "reserve" ||
      isPopUp == "filter" ||
      isPopUp == "monthly" ||
      isPopUp == "reserveSuccess" ||
      isPopUp == "achievements" ||
      isPopUp == "candidateRate" ||
      isPopUp == "interviewDetails" ||
      isPopUp == "logoutPopUp" ||
      isPopUp == "adminpersonal" ||
      isPopUp == "adminbasicdetails" ||
      isPopUp == "adminprofessionaldetails" ||
      isPopUp == "countriestravelledto" ||
      isPopUp == "adminresidencydetails" ||
      isPopUp == "willingnesstorelocate" ||
      isPopUp == "travelforwork" ||
      isPopUp == "adminprojectdetails" ||
      isPopUp == "admincertification" ||
      isPopUp == "admineducation" ||
      isPopUp == "adminvedioresume" ||
      isPopUp == "admincompanydetails" ||
      isPopUp == "adminbillingcontact" ||
      isPopUp == "adminbillinginformation" ||
      isPopUp == "adminprimarycontact" ||
      isPopUp == "adminsecondarycontact" ||
      isPopUp == "aadhar" ||
      isPopUp == "passport" ||
      isPopUp == "approveconformation" ||
      isPopUp == "project" ? (
        <div onClick={CloseOverlay} id="overlay"></div>
      ) : null}
      {isPopUp == "hourly" ||
      isPopUp == "location" ||
      isPopUp == "mobfilter" ||
      isPopUp == "access1" ||
      isPopUp == "approvedropdown" ? (
        <div onClick={CloseOverlay} id="overlayTransparent"></div>
      ) : null}
    </>
  );
}

export default App;
