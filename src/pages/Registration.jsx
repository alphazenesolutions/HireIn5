import React from "react";
import RegistrationComp from "../Components/ClientSignUp/Registration/RegistrationComp";
import CandidateRegistration from "../Components/CandidateSignUp/CandidateRegistration/CandidateRegistration";
import { useSelector } from "react-redux";

const Registration = () => {
  const role = useSelector((store) => store.role);

  return (
    <>{role === "Client" ? <RegistrationComp /> : <CandidateRegistration />}</>
  );
};

export default Registration;
