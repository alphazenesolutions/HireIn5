/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import DiscoverComp from "../Components/Client/ClientScreen/DiscoverComp/DIscoverComp";
import { useSelector } from "react-redux";

const Discover = () => {
  const islogin = useSelector((store) => store.islogin);
  useEffect(() => {
    Checkuser();
  }, [islogin]);
  const Checkuser = () => {
    if (islogin === false) {
      window.location.replace("/");
    }
  };
  sessionStorage.removeItem("phone");
  return (
    <div>
      <DiscoverComp />
    </div>
  );
};

export default Discover;
