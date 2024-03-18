/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import AdminClientProfileComp from "../Components/AdminScreen/AdminProfile/AdminClientProfile/AdminClientProfileComp";
import AdminCandidateProfile from "../Components/AdminScreen/AdminProfile/AdminCandidateProfile/AdminCandidateProfile";
import DashHead from "../Components/Reusable/DashBoardReusable/DashHead/DashHead";
import "../Components/AdminScreen/AdminProfile/AdminCandidateProfile/AdminCandidateProfile.css";
import country_and_states from "../assests/country-states";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../Store/Store";
import axios from "axios";

const AdminCustomerProfile = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.token);
  const alluserdata = useSelector((store) => store.alluserdata);
  const allcompanydata = useSelector((store) => store.allcompanydata);

  const [isButton, setIsButton] = useState("candidate");
  const [alldata, setalldata] = useState([]);
  const [totaldata, settotaldata] = useState([]);
  const [loading, setloading] = useState(true);
  const [alldata1, setalldata1] = useState([]);
  const [totaldata1, settotaldata1] = useState([]);

  const buttonHandler = (event) => {
    setIsButton(event.target.id);
  };

  useEffect(() => {
    GetallCandidate();
    getallclient();
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
  const getallclient = async () => {
    if (allcompanydata.length !== 0) {
      setloading(false);
      setalldata1(allcompanydata);
      settotaldata1(allcompanydata);
      var allfacility__1 = await axios
        .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/getCompanies`, {
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
      setalldata1(allfacility__1.companies);
      settotaldata1(allfacility__1.companies);

      dispatch(
        storeAction.allcompanydataHander({
          allcompanydata: allfacility__1.companies,
        })
      );
    } else {
      var allfacility_1 = await axios
        .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/getCompanies`, {
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
      setalldata1(allfacility_1.companies);
      settotaldata1(allfacility_1.companies);
      dispatch(
        storeAction.allcompanydataHander({
          allcompanydata: allfacility_1.companies,
        })
      );
      setloading(false);
    }
  };
  const changecountry = async (e) => {
    if (e.length !== 0) {
      const matchingSkills = totaldata.filter((skill) => {
        if (skill.address !== null) {
          return skill.address.country.toLowerCase().includes(e.toLowerCase());
        }
      });
      setalldata(matchingSkills);
    } else {
      setTimeout(() => {
        setalldata(alluserdata);
      }, 10);
      setalldata(totaldata);
    }
  };
  const changestatus = async (value) => {
    if (totaldata1.length !== 0) {
      if (value === "Active") {
        var active = await totaldata1.filter((data) => {
          return data.dissabled === false;
        });
        setalldata1(active);
      } else if (value === "Inactive") {
        var inactive = await totaldata1.filter((data) => {
          return data.dissabled === true;
        });
        setalldata1(inactive);
      } else {
        setalldata1(totaldata1);
      }
    }
  };
  const change_status = async (e) => {
    if (totaldata.length !== 0) {
      if (e === "Benched") {
        var benchuser = await totaldata.filter((data) => {
          return data.status === "Benched";
        });
        setalldata(benchuser);
      } else if (e === "Hired") {
        var hireduser = await totaldata.filter((data) => {
          return data.status === "Hired";
        });
        setalldata(hireduser);
      } else if (e === "On-contract") {
        var contrctuser = await totaldata.filter((data) => {
          return data.status === "On-contract";
        });
        setalldata(contrctuser);
      } else {
        setalldata(totaldata);
      }
    } else {
      setalldata(totaldata);
    }
  };
  console.log(alldata,'lll');
  return (
    <div className=" paddingLeft100 paddingRight100">
      <DashHead
        head="Profile"
        desc="View and update profiles of onboarded clients and candidates"
        descClass="dashBoardMainHeadDescBetween"
      />
      <div className="shortListButton marginBottom20 flex justify-between items-center">
        <div>
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
                change_status(e.target.value);
              }}
            >
              <option value="">Status</option>
              <option value="Benched">Benched</option>
              <option value="Hired">Hired</option>
              <option value="On-contract">On-contract</option>
            </select>
            <select
              className="profileselect"
              onChange={(e) => {
                changecountry(e.target.value);
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
          </div>
        )}
        {isButton === "client" && (
          // <div className="selectdiv">
          //   <select className="profileselect">
          //     <option>Subscription Type</option>
          //     <option value="Starter">Starter</option>
          //     <option value="Pro">Pro</option>
          //   </select>
          //   <select
          //     className="profileselect"
          //     onChange={(e) => {
          //       changestatus(e.target.value);
          //     }}
          //   >
          //     <option value="">Status</option>
          //     <option value="Inactive">Inactive</option>
          //     <option value="Active">Active</option>
          //   </select>
          // </div>
          <div className="selectdiv">
            <select
              className="profileselect"
              onChange={(e) => {
                changestatus(e.target.value);
              }}
            >
              <option value="">Status</option>
              <option value="Inactive">Inactive</option>
              <option value="Active">Active</option>
            </select>
            {/* <select
              className="profileselect"
              onChange={(e) => {
                changecountry(e.target.value);
              }}
            >
              <option value="">Subscription Type</option>
              <option value="Starter">Starter</option>
              <option value="Pro">Pro</option>
            </select> */}
          </div>
        )}
      </div>
      {isButton === "client" && (
        <AdminClientProfileComp
          alldata1={alldata1}
          totaldata1={totaldata1}
          loading={loading}
          setalldata1={setalldata1}
        />
      )}
      {isButton === "candidate" && (
        <AdminCandidateProfile
          alldata={alldata}
          totaldata={totaldata}
          loading={loading}
          setalldata={setalldata}
        />
      )}
    </div>
  );
};

export default AdminCustomerProfile;
