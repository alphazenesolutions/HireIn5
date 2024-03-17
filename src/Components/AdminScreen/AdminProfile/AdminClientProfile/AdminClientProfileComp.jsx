/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./AdminClientProfileComp.css";
import search from "../../../../assests/search.png";
import tableProfile from "../../../../assests/profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import { storeAction } from "../../../../Store/Store";
import Pagination from "../AdminCandidateProfile/Pagination";

const AdminClientProfileComp = ({
  alldata1,
  totaldata1,
  loading,
  setalldata1,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewbtn = (data) => {
    dispatch(storeAction.singleuserHander({ singleuser: [data] }));
    navigate("/adminclientview");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = alldata1.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(alldata1.length / recordsPerPage);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const searchvalue = async (e) => {
    if (e.length !== 0) {
      const matchingSkills = totaldata1.filter((skill) => {
        if (skill.company !== null) {
          return skill.company.company_name
            .toLowerCase()
            .includes(e.toLowerCase());
        }
      });
      setalldata1(matchingSkills);
    } else {
      setalldata1(totaldata1);
    }
  };
  return (
    <div>
      <div className="AdminClientProfileComp">
        <div className="AdminClientProfileCompSearch">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              searchvalue(e.target.value);
            }}
          />
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
              {/* <th>AGREEMENT STATUS</th> */}
              <th></th>
            </tr>
            {!loading && currentRecords.length !== 0
              ? currentRecords.map((data, index) => {
                  return (
                    <tr className="adminTableRow" key={index}>
                      <td>
                        <div className="tableName">
                         
                          {data.company !== null ? (
                            data.profile_picture.length !== 0 ? (
                              <img src={data.profile_picture} alt="" />
                            ) : (
                              <Avatar
                                name={
                                  data.company.company_name.length !== 0
                                    ? data.company.company_name
                                    : data.first_name
                                }
                                size={30}
                                round="50px"
                              />
                            )
                          ) : (
                            <img src={data.profile_picture} alt="" />
                          )}
                          {data.company !== null ? (
                            <h1>{data.company.company_name}</h1>
                          ) : (
                            <h1>{data.first_name}</h1>
                          )}
                        </div>
                      </td>
                      <td>
                        <h1>{data.first_name}</h1>
                      </td>
                      <td>
                        <h1>-</h1>
                      </td>
                      <td>
                        <h1>-</h1>
                      </td> */}
                    <td>
                      <p className={data.statusClass}>{data.clientStatus}</p>
                    </td>
                    <td>
                      {data.dissabled === true ? (
                        <p className="status inActive">Inactive</p>
                      ) : (
                        <p className="status Active">Active</p>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => viewbtn(data)}
                        className="viewButton"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td></td>
                <td></td>
                <td>
                  <h6 className="text-center py-8">No data found...</h6>
                </td>
                <td></td>
                <td></td>
              </tr>
            )}
            {loading && (
              <tr>
                <td></td>
                <td></td>
                <td>
                  <h6 className="text-center py-8">Please wait...</h6>
                </td>
                <td></td>
                <td></td>
              </tr>
            )}
          </table>
        </div>
        {pageNumbers.length !== 0 ? (
          <div className="tablePagination">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminClientProfileComp;
