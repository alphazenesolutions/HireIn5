import React from "react";
import RegistrationComp from "../Components/Client/ClientSignUp/Registration/RegistrationComp";
import CandidateRegistration from "../Components/Candidate/CandidateSignUp/CandidateRegistration/CandidateRegistration";
import { useSelector } from "react-redux";

const Registration = () => {
  const role = useSelector((store) => store.role);

  return (
    <>{role === "Client" ? <RegistrationComp /> : <CandidateRegistration />}</>
  );
};

export default Registration;
