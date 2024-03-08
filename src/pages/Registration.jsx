/* eslint-disable eqeqeq */
import React from "react";
import RegistrationComp from "../Components/Client/ClientSignUp/Registration/RegistrationComp";
import CandidateRegistration from "../Components/Candidate/CandidateSignUp/CandidateRegistration/CandidateRegistration";
import { useSelector } from "react-redux";

const Registration = () => {
  const loginrole = useSelector((store) => store.loginrole);

  return (
    <>{loginrole == "2" ? <RegistrationComp /> : <CandidateRegistration />}</>
  );
};

export default Registration;
