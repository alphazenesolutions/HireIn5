import React from "react";
import "./AdminClientProfileComp.css";
import search from "../../../../assests/search.png";
import tableProfile from "../../../../assests/profile.png";
import { useNavigate } from "react-router-dom";

const AdminClientProfileComp = () => {
  const navigate = useNavigate();
  const adminTableData = [
    {
      name: "Yasir Quazi",
      company: "Google Pay",
      location: "New York, USA",
      type: "Starter",
      cycle: "Monthly",
      clientStatus: "Active",
      statusClass: "status hiringActive",
      agreeStatusClass: "agreementStatus inComplete",
      agreementStatus: "Yet to sign",
    },
    {
      name: "Yasir Quazi",
      company: "Dribbble",
      location: "New York, USA",
      type: "Starter",
      cycle: "Monthly",
      clientStatus: "Inactive",
      statusClass: "status inActive",
      agreeStatusClass: "agreementStatus inComplete",
      agreementStatus: "Yet to sign",
    },
    {
      name: "Yasir Quazi",
      company: "Behance",
      location: "New York, USA",
      type: "Pro",
      cycle: "yearly",
      clientStatus: "Inactive",
      statusClass: "status inActive",
      agreeStatusClass: "agreementStatus inComplete",
      agreementStatus: "Yet to sign",
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
              <th>COMPANY</th>
              <th>NAME</th>
              <th>SUBSCRIPTION TYPE</th>
              <th>BILLING CYCLE</th>
              <th>STATUS</th>
              <th>AGREEMENT STATUS</th>
              <th></th>
            </tr>
            {adminTableData.map((data) => {
              return (
                <tr className="adminTableRow">
                  <td>
                    <div className="tableName">
                      <img src={tableProfile} alt="" />
                      <h1>{data.company}</h1>
                    </div>
                  </td>
                  <td>
                    <h1>{data.name}</h1>
                  </td>
                  <td>
                    <h1>{data.type}</h1>
                  </td>
                  <td>
                    <h1>{data.cycle}</h1>
                  </td>
                  <td>
                    <p className={data.statusClass}>{data.clientStatus}</p>
                  </td>
                  <td>
                    <p className={data.agreeStatusClass}>
                      {data.agreementStatus}
                    </p>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate("/adminclientview")}
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

export default AdminClientProfileComp;
