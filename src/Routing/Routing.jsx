import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OnBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/clientsignup" element={<Signup />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/meeting" element={<OnBoardMeeting />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Routing;
