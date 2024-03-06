import React from "react";
import "./AdminCandidateProfile.css";
import search from "../../../../assests/search.png";
import tableProfile from "../../../../assests/profile.png";
import { useNavigate } from "react-router-dom";

const AdminCandidateProfile = () => {
  const navigate = useNavigate();
  const adminTableData = [
    {
      name: "Ramaswami Kumar",
      propic: "",
      location: "New York, USA",
      locImg: "",
      empId: "ID1234567890",
      completion: "80%",
      candidateStatus: "Reserved",
      statusClass: "status reserving",
    },
    {
      name: "Ramaswami Kumar",
      propic: "",
      location: "New York, USA",
      locImg: "",
      empId: "ID1234567890",
      completion: "80%",
      candidateStatus: "Reserved",
      statusClass: "status reserving",
    },
    {
      name: "Ramaswami Kumar",
      propic: "",
      location: "New York, USA",
      locImg: "",
      empId: "ID1234567890",
      completion: "80%",
      candidateStatus: "Hired",
      statusClass: "status hiringActive",
    },
    {
      name: "Ramaswami Kumar",
      propic: "",
      location: "New York, USA",
      locImg: "",
      empId: "ID1234567890",
      completion: "80%",
      candidateStatus: "On-Contract",
      statusClass: "status contracted",
    },
    {
      name: "Ramaswami Kumar",
      propic: "",
      location: "New York, USA",
      locImg: "",
      empId: "ID1234567890",
      completion: "80%",
      candidateStatus: "Benched",
      statusClass: "status benched",
    },
    {
      name: "Ramaswami Kumar",
      propic: "",
      location: "New York, USA",
      locImg: "",
      empId: "ID1234567890",
      completion: "80%",
      candidateStatus: "Benched",
      statusClass: "status benched",
    },
    {
      name: "Ramaswami Kumar",
      propic: "",
      location: "New York, USA",
      locImg: "",
      empId: "ID1234567890",
      completion: "80%",
      candidateStatus: "Benched",
      statusClass: "status benched",
    },
    {
      name: "Ramaswami Kumar",
      propic: "",
      location: "New York, USA",
      locImg: "",
      empId: "ID1234567890",
      completion: "80%",
      candidateStatus: "Benched",
      statusClass: "status benched",
    },
    {
      name: "Ramaswami Kumar",
      propic: "",
      location: "New York, USA",
      locImg: "",
      empId: "ID1234567890",
      completion: "80%",
      candidateStatus: "Benched",
      statusClass: "status benched",
    },
    {
      name: "Ramaswami Kumar",
      propic: "",
      location: "New York, USA",
      locImg: "",
      empId: "ID1234567890",
      completion: "80%",
      candidateStatus: "Benched",
      statusClass: "status benched",
    },
  ];
  return (
    <div>
      <div className="AdminClientProfileComp">
        <div className="AdminClientProfileCompSearch">
          <input type="text" placeholder="Search..." />
          <img src={search} alt="" />
        </div>
        <div className="AdminClientProfileCompTable">
          <table className="AdminClientTable">
            <tr className="AdminTableHead">
              <th>NAME</th>
              <th>LOCATION</th>
              <th>EMPLOYEE ID</th>
              <th>STATUS</th>
              <th>PROFILE COMPLETION</th>
              <th></th>
            </tr>
            {adminTableData.map((data) => {
              return (
                <tr className="adminTableRow">
                  <td>
                    <div className="tableName">
                      <img src={tableProfile} alt="" />
                      <h1>{data.name}</h1>
                    </div>
                  </td>
                  <td>
                    <div className="tableLocation">
                      <img src={tableProfile} alt="" />
                      <h1>{data.location}</h1>
                    </div>
                  </td>
                  <td>
                    <h1>{data.empId}</h1>
                  </td>
                  <td>
                    <p className={data.statusClass}>{data.candidateStatus}</p>
                  </td>
                  <td>
                    <h1>{data.completion}</h1>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate("/admincandidateview")}
                      className="viewButton"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
          <div className="tablePagination"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminCandidateProfile;
