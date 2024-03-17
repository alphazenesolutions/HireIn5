/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./AdminCandidateProfile.css";
import search from "../../../../assests/search.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Avatar from "react-avatar";
import { storeAction } from "../../../../Store/Store";
import Pagination from "./Pagination";

const AdminCandidateProfile = ({ country }) => {
  const token = useSelector((store) => store.token);
  const alluserdata = useSelector((store) => store.alluserdata);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alldata, setalldata] = useState([]);
  const [totaldata, settotaldata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    GetallCandidate();
  }, []);
  const GetallCandidate = async () => {
    if (alluserdata.length !== 0) {
      setloading(false);
      setalldata(alluserdata);
      settotaldata(alluserdata);
      var allfacility = await axios
        .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/getFaculties`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
      setalldata(allfacility.faculties);
      settotaldata(allfacility.faculties);
      dispatch(
        storeAction.alluserdataHander({ alluserdata: allfacility.faculties })
      );
    } else {
      var allfacility1 = await axios
        .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/getFaculties`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
      setalldata(allfacility1.faculties);
      settotaldata(allfacility1.faculties);
      dispatch(
        storeAction.alluserdataHander({ alluserdata: allfacility1.faculties })
      );
      setloading(false);
    }
  };
  const viewbtn = (data) => {
    dispatch(storeAction.singleuserHander({ singleuser: [data] }));
    navigate("/admincandidateview");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = alldata.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(alldata.length / recordsPerPage);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const searchvalue = async (e) => {
    if (e.length !== 0) {
      const matchingSkills = totaldata.filter((skill) => {
        return skill.first_name.toLowerCase().includes(e);
      });
      setalldata(matchingSkills);
    } else {
      setalldata(totaldata);
    }
  };
  useEffect(() => {
    Getfilter();
  }, [country]);
  const Getfilter = async () => {
    if (country.length !== 0) {
      const matchingSkills = totaldata.filter((skill) => {
        return skill.current_place_of_residence == country;
      });
      setalldata(matchingSkills);
    } else {
      setTimeout(() => {
        setalldata(alluserdata);
      }, 10);
      setalldata(totaldata);
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
              <th>NAME</th>
              <th>LOCATION</th>
              <th>EMPLOYEE ID</th>
              <th>STATUS</th>
              <th>PROFILE COMPLETION</th>
              <th></th>
            </tr>
            {!loading && currentRecords.length !== 0
              ? currentRecords.map((data, index) => {
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
                          {/* <img src={tableProfile} alt="" /> */}
                          <h1>{data.current_place_of_residence}</h1>
                        </div>
                      </td>
                      <td>
                        <h1>ID{data.id}</h1>
                      </td>
                      <td>
                        <p className="status benched">Benched</p>
                      </td>
                      <td>
                        <h1>80%</h1>
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
              : null}
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

export default AdminCandidateProfile;
