import React, { useState } from "react";
import AdminClientProfileComp from "../Components/AdminScreen/AdminProfile/AdminClientProfile/AdminClientProfileComp";
import AdminCandidateProfile from "../Components/AdminScreen/AdminProfile/AdminCandidateProfile/AdminCandidateProfile";
import DashHead from "../Components/Reusable/DashBoardReusable/DashHead/DashHead";
import "../Components/AdminScreen/AdminProfile/AdminCandidateProfile/AdminCandidateProfile.css";
import country_and_states from "../assests/country-states";

const AdminCustomerProfile = () => {
  const [isButton, setIsButton] = useState("candidate");
  const [country, setcountry] = useState("");
  const buttonHandler = (event) => {
    setIsButton(event.target.id);
  };
  return (
    <div className="customerView paddingLeft100 paddingRight100">
      <div className="paddingXY10 ">
        <DashHead
          head="Profile"
          desc="View and update profiles of onboarded clients and candidates"
          descClass="dashBoardMainHeadDescBetween"
        />

        <div className="shortListButton marginBottom20">
          <div className="shortListButtonLeft">
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
          {isButton === "candidate" && (
            <div className="selectdiv">
              <select
                className="profileselect"
                onChange={(e) => {
                  setcountry(e.target.value);
                }}
              >
                <option value="">Country</option>
                {country_and_states.country.length !== 0
                  ? country_and_states.country.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))
                  : null}
              </select>
              <select className="profileselect" disabled>
                <option value="">Status</option>
                <option value="Benched">Benched</option>
              </select>
            </div>
          )}
          {isButton === "client" && (
            <div className="selectdiv">
              <select className="profileselect" disabled>
                <option>Subscription Type</option>
                <option value="Starter">Starter</option>
                <option value="Pro">Pro</option>
              </select>
              <select className="profileselect" disabled>
                <option value="">Status</option>
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
              </select>
            </div>
          )}
        </div>
      </div>
      {isButton === "client" && <AdminClientProfileComp />}
      {isButton === "candidate" && <AdminCandidateProfile country={country} />}
    </div>
  );
};

export default AdminCustomerProfile;
