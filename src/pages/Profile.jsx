/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import CandidateProfile from "../Components/Candidate/CandidateDashBoard/CandidateProfile/CandidateProfile";
import { useSelector } from "react-redux";

const Profile = () => {
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
      <CandidateProfile />
    </div>
  );
};

export default Profile;
