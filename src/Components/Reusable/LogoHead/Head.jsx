import React from "react";
import "./Head.css";
// import { useEffect } from "react";
import logo from "../../../assests/Logo.png";
import { useNavigate } from "react-router-dom";

const Head = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div onClick={() => navigate("/")} className="head marginBottom15">
        <img src={logo} alt="" />
        <h1>HireIn5</h1>
      </div>
    </div>
  );
};

export default Head;
