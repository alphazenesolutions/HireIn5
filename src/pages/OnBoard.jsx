/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import OnBoardComp from "../Components/OnBoarding/OnBoardComp";
import { useSelector } from "react-redux";

const OnBoard = () => {
  const islogin = useSelector((store) => store.islogin);
  const loginrole = useSelector((store) => store.loginrole);
  useEffect(() => {
    Checkuser();
  }, [islogin]);
  const Checkuser = () => {
    if (islogin === true) {
      if (loginrole == "2") {
        window.location.replace("/#/discover");
      } else {
        window.location.replace("/#/profile");
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
