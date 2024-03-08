import React, { useState } from "react";
import AdminClientProfileComp from "../Components/AdminScreen/AdminProfile/AdminClientProfile/AdminClientProfileComp";
import AdminCandidateProfile from "../Components/AdminScreen/AdminProfile/AdminCandidateProfile/AdminCandidateProfile";
import DashHead from "../Components/Reusable/DashBoardReusable/DashHead/DashHead";
import "../Components/AdminScreen/AdminProfile/AdminCandidateProfile/AdminCandidateProfile.css";

const AdminCustomerProfile = () => {
  const [isButton, setIsButton] = useState("candidate");
  const buttonHandler = (event) => {
    setIsButton(event.target.id);
  };
  return (
    <div className=" paddingLeft100 paddingRight100">
      <DashHead
        head="Profile"
        desc="View and update profiles of onboarded clients and candidates"
        descClass="dashBoardMainHeadDescBetween"
      />
      <div className="shortListButton marginBottom20">
        <button
          id="candidate"
          onClick={buttonHandler}
          className={
            isButton === "candidate"
              ? "shortListButtonActive"
              : "shortListButtonDisable"
          }
        >
          Candidates
        </button>
        <button
          id="client"
          onClick={buttonHandler}
          className={
            isButton === "client"
              ? "shortListButtonActive"
              : "shortListButtonDisable"
          }
        >
          Clients
        </button>
      </div>
      {isButton === "client" && <AdminClientProfileComp />}
      {isButton === "candidate" && <AdminCandidateProfile />}
    </div>
  );
};

export default AdminCustomerProfile;
