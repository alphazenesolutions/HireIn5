/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import "./AdminCandidateProfile.css";
import search from "../../../../assests/search.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Avatar from "react-avatar";
import Pagination from "./Pagination";
import { storeAction } from "../../../../Store/Store";

const AdminCandidateProfile = ({ alldata, totaldata, loading, setalldata }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const viewbtn = (data) => {
    dispatch(storeAction.singleuserHander({ singleuser: [data] }));
    navigate("/admincandidateview");
  };

  const calculateProfileCompletion = (profile) => {
    console.log(profile,'profileprofile1111');
    var count = 0;
    if (profile.address !== null) {
      count += 1;
    }
    if (profile.work_preference_info !== null) {
      count += 1;
    }
    if (profile.professional_details_info.length !== 0) {
      count += 1;
    }
    if (profile.project_details_info.length !== 0) {
      count += 1;
    }
    if (profile.certificate_info.length !== 0) {
      count += 1;
    }
    if (profile.travel_info !== null) {
      count += 1;
    }
    if (profile.education_info.length !== 0) {
      count += 1;
    }
    if (profile.video_resume !== null) {
      if (profile.video_resume.length !== 0) {
        count += 1;
      }
    }
    return count;
  };

  const searchvalue = async (e) => {
    if (e.length !== 0) {
      const matchingSkills = totaldata.filter((skill) => {
        return skill.first_name.toLowerCase().includes(e.toLowerCase());
      });
      setalldata(matchingSkills);
    } else {
      setalldata(totaldata);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = alldata.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(alldata.length / recordsPerPage);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

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
            <thead>
              <tr className="AdminTableHead">
                <th>NAME</th>
                <th>LOCATION</th>
                <th>EMPLOYEE ID</th>
                <th>STATUS</th>
                <th>PROFILE COMPLETION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loading && currentRecords.length !== 0 ? (
                currentRecords.map((data, index) => {
                  const profileCompletion = calculateProfileCompletion(data);
                  let percent = Math.round((profileCompletion / 8) * 100);

                  return (
                    <tr className="adminTableRow" key={index}>
                      <td>
                        <div className="tableName">
                          {data.profile_picture.length !== 0 ? (
                            <img src={data.profile_picture} alt="" />
                          ) : (
                            <Avatar
                              name={data.first_name}
                              size={30}
                              round="50px"
                            />
                          )}

                          <h1>{data.first_name}</h1>
                        </div>
                      </td>
                      <td>
                        <div className="tableLocation">
                          {data.address !== null ? (
                            <h1>{data.address.country}</h1>
                          ) : (
                            <h1>-</h1>
                          )}
                        </div>
                      </td>
                      <td>
                        <h1>ID{data.id}</h1>
                      </td>
                      <td>
                        {data.status === "Benched" ? (
                          <p className="status benched">{data.status}</p>
                        ) : data.status === "Hired" ? (
                          <p className="status hiringActive">{data.status}</p>
                        ) : (
                          <p className="status contracted">{data.status}</p>
                        )}
                      </td>
                      <td>
                        <h1>{percent}%</h1>
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
            </tbody>
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

export default AdminCandidateProfile;
