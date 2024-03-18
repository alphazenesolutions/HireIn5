/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import OnBoardComp from "../Components/OnBoarding/OnBoardComp";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../Store/Store";

const OnBoard = () => {
  const dispatch = useDispatch();
  const islogin = useSelector((store) => store.islogin);
  const loginrole = useSelector((store) => store.loginrole);
  useEffect(() => {
    Checkuser();
  }, [islogin]);
  const Checkuser = () => {
    if (islogin === true) {
      if (loginrole == "2") {
        dispatch(storeAction.issidebarHandler({ issidebar: true }));
        window.location.replace("/#/discover");
      } else if (loginrole == "3") {
        dispatch(storeAction.issidebarHandler({ issidebar: true }));
        window.location.replace("/#/profile");
      } else {
        window.location.replace("/#/adminHome");
      }
    }
  };
  return (
    <div className="sectionWidth">
      <OnBoardComp />
    </div>
  );
};

export default OnBoard;
