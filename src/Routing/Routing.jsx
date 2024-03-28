/* eslint-disable no-unused-vars */
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import OnBoard from "../pages/OnBoard";
import Signup from "../pages/Signup";
import Verification from "../pages/Verification";
import Pricing from "../pages/Pricing";
import Registration from "../pages/Registration";
import OnBoardMeeting from "../pages/OnBoardMeeting";
import ForgotPassword from "../pages/ForgotPassword";
import DashBoard from "../pages/DashBoard";
import Discover from "../pages/Discover";
import Interview from "../pages/Interview";
import Contract from "../pages/Contract";
import Billing from "../pages/Billing";
import { Resetpassword } from "../pages/Resetpassword";
import Profile from "../pages/Profile";
import Emailverification from "../Components/Reusable/Verification/Emailverification";
import Upgrade from "../pages/Upgrade";
import AdminCustomerProfile from "../pages/AdminCustomerProfile";
import AClientProfileView from "../Components/AdminScreen/AdminProfile/AClientProfileview/AClientProfileView";
import AClientProfile from "../pages/AClientProfile";
import ACandidateProfile from "../pages/ACandidateProfile";
import AdminContractCards from "../pages/AdminContractCards";
import AdminTeamMember from "../pages/AdminTeamMember";
import AdminHomePage from "../pages/AdminHomePage";
import AdminSignUp from "../pages/AdminSignUp";
import { useSelector } from "react-redux";
import ErrorPage from "../pages/Error";

const Routing = () => {
  const loginrole = useSelector((store) => store.loginrole);
  console.log(loginrole, "loginrole");
  return (
    <div>
      <Routes>
        <Route path="/error" element={<ErrorPage />} />
        {loginrole === "2" && (
          <>
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/meeting" element={<OnBoardMeeting />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/upgrade" element={<Upgrade />} />
          </>
        )}
        {loginrole === "3" && (
          <>
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/error" replace />} />
        <Route path="/" element={<OnBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/clientsignup" element={<Signup />} />
        <Route path="/verification/:id" element={<Verification />} />
        <Route path="/emailverification" element={<Emailverification />} />

        <Route path="/registration" element={<Registration />} />

        <Route path="/resetpassword/:hash" element={<Resetpassword />} />

        <Route path="/customerProfile" element={<AdminCustomerProfile />} />
        <Route path="/adminteam" element={<AdminTeamMember />} />
        <Route path="/admincontracts" element={<AdminContractCards />} />
        <Route path="/adminclientview" element={<AClientProfile />} />
        <Route path="/admincandidateview" element={<ACandidateProfile />} />
        <Route path="/adminhome" element={<AdminHomePage />} />
        <Route path="/adminsignUp/:email" element={<AdminSignUp />} />
      </Routes>
    </div>
  );
};

export default Routing;
