import React from "react";
import SignUpComp from "../Components/Client/ClientSignUp/SignUp/SignUpComp";
import CandidateSignUp from "../Components/Candidate/CandidateSignUp/SignUp/CandidateSignUp";
import { useSelector } from "react-redux";

const ClientSignup = () => {
  const role = useSelector((store) => store.role);
  return <>{role === "Client" ? <SignUpComp /> : <CandidateSignUp />}</>;
};

export default ClientSignup;
