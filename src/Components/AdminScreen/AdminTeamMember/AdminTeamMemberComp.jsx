/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import React, { useEffect } from "react";
import { useState } from "react";
import DashHead from "../../Reusable/DashBoardReusable/DashHead/DashHead";
import "./AdminTeamMemberComp.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import Billingtick from "../../../assests/Vector1.png";
import { FiLoader } from "react-icons/fi";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminTeamMemberComp = () => {
  const token = useSelector((store) => store.token);
  const userid = useSelector((store) => store.userid);
  const [show, setshow] = useState(false);
  const [setvalue, setvalue1] = useState("Admin");
  const [loading, setloading] = useState(false);
  const [setvalue2, setvalue22] = useState("Edit access");
  const [setvalue3, setvalue33] = useState("Edit access");
  const [updateid, setupdateid] = useState(null);
  const [shownew, setshownew] = useState(false);

  function toggleDropdown(event) {
    setshow(!show);
  }
  function toggle_Dropdown(event) {
    setupdateid(event);
    setshownew(!shownew);
  }

  function getvalue(e) {
    setvalue1(e);
    setvalue22(e);
    setshow(false);
  }
  async function getpendingvalue(e) {
    let getdata = e;
    if (getdata === "Remove user") {
      var deleteuser = await axios
        .delete(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/getTeamMembers/${updateid}/`,

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`,
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
      setshownew(false);
      if (deleteuser !== null) {
        toast.success("User removed", {
          autoClose: 2000,
          transition: Slide,
          style: customToastStyle,
        });
        var alldata = await axios
          .get(
            `${process.env.REACT_APP_LOCAL_HOST_URL}/getTeamMembers/${userid}/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`,
              },
            }
          )
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err.response;
          });
        setalldata(alldata);
      }
    } else {
      var obj = {
        level_of_access: getdata,
        status: "Pending",
      };
      var updatedata = await axios
        .put(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/getTeamMembers/${updateid}/`,
          obj,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`,
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
      if (updatedata !== null) {
        toast.success("User access changed", {
          autoClose: 2000,
          transition: Slide,
          style: customToastStyle,
        });
        setshownew(false);
        var alldata = await axios
          .get(
            `${process.env.REACT_APP_LOCAL_HOST_URL}/getTeamMembers/${userid}/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`,
              },
            }
          )
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err.response;
          });
        setalldata(alldata);
      }
    }
  }
  async function getpendingvalue1(e) {
    let getdata = e;
    if (getdata === "Remove user") {
      var deleteuser = await axios
        .delete(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/getTeamMembers/${updateid}/`,

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`,
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
      setshownew(false);
      if (deleteuser !== null) {
        toast.success("User removed", {
          autoClose: 2000,
          transition: Slide,
          style: customToastStyle,
        });
        var alldata = await axios
          .get(
            `${process.env.REACT_APP_LOCAL_HOST_URL}/getTeamMembers/${userid}/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`,
              },
            }
          )
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err.response;
          });
        setalldata(alldata);
      }
    } else {
      var obj = {
        level_of_access: getdata,
        status: "Success",
      };
      var updatedata = await axios
        .put(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/getTeamMembers/${updateid}/`,
          obj,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`,
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
      if (updatedata !== null) {
        toast.success("User access changed", {
          autoClose: 2000,
          transition: Slide,
          style: customToastStyle,
        });
        setshownew(false);
        var alldata = await axios
          .get(
            `${process.env.REACT_APP_LOCAL_HOST_URL}/getTeamMembers/${userid}/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`,
              },
            }
          )
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err.response;
          });
        setalldata(alldata);
      }
    }
  }
  const [formdata, setformdata] = useState({
    name: "",
    email_id: "",
  });
  const [alldata, setalldata] = useState([]);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((values) => ({ ...values, [name]: value }));
  };
  const customToastStyle = {
    background: "#14B8A6", // Change this to the desired background color
    // color: "#FFFFF", // Text color
    "& .Toastify__toast-body svg": {
      fill: "var(--toastify-color-light)", // Color of the success icon
    },
    color: "white", // Text color
    "--toastify-icon-color-success": "white",
  };
  const sendinvite = async () => {
    setloading(true);
    var obj = {
      name: formdata.name,
      email_id: formdata.email_id,
      level_of_access: setvalue,
      status: "Pending",
    };
    var createdata = await axios
      .post(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/getTeamMembers/${userid}/`,
        obj,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response;
      });
    if (createdata !== null) {
      toast.success("Invite Sent...", {
        autoClose: 2000,
        transition: Slide,
        style: customToastStyle,
      });
      setshownew(false);
      var alldata = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/getTeamMembers/${userid}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`,
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
      document.getElementById("email").value = "";
      document.getElementById("name").value = "";
      setalldata(alldata);
    }
    setloading(false);
  };
  useEffect(() => {
    Getalldata();
  }, []);
  const Getalldata = async () => {
    var alldata = await axios
      .get(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/getTeamMembers/${userid}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response;
      });
    setalldata(alldata);
  };
  return (
    <div>
      <div className="paddingLeft100 paddingRight100 ">
        <DashHead
          head="Team members"
          desc="Share access with your staff and team members by inviting them to this platform. "
          descClass="dashBoardMainHeadDescBetween"
        />
        <div className="adminTeamMember">
          <h3>Add members</h3>
          <div className="teamMemberInputs">
            <h4>Name</h4>
            <input
              type="text"
              placeholder="E.g. Jhon Doe"
              onChange={handlechange}
              name="name"
              id="name"
              defaultValue={formdata.name}
            />
          </div>
          <div className="teamMember">
            <div className="teamMemberInputs">
              <h4>Email ID</h4>
              <input
                type="text"
                placeholder="E.g. johndoe@gmail.com"
                onChange={handlechange}
                name="email_id"
                id="email"
                defaultValue={formdata.email_id}
              />
            </div>
            <div className="teamMemberLevel">
              <h4>Level of Access</h4>
              <div className="editAccess">
                <div className="editAccess1">
                  <button
                    onClick={toggleDropdown}
                    placeholder="Admin"
                    id="access1"
                  >
                    {setvalue}
                    <MdKeyboardArrowDown className="checkicon" />
                  </button>
                  {show && (
                    <div className="dropHandler">
                      <h3
                        onClick={() => {
                          getvalue("Admin");
                        }}
                      >
                        Admin <img src={Billingtick} alt="" />
                      </h3>
                      <h3
                        onClick={() => {
                          getvalue("Sales");
                        }}
                      >
                        Sales <img src={Billingtick} alt="" />
                      </h3>
                      <h3
                        onClick={() => {
                          getvalue("HR");
                        }}
                      >
                        HR <img src={Billingtick} alt="" />
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="TeamSend">
            {loading === false ? (
              <button onClick={sendinvite}>Send invite</button>
            ) : (
              <button className="save w-[10rem] flex justify-center items-center">
                <FiLoader className="loadingIcon" />
              </button>
            )}
          </div>
        </div>
        <div className="adminTeamMember">
          <h3>Manage members</h3>
          <div className="manageMember">
            <h2>Pending invites</h2>

            {alldata.length !== 0
              ? alldata.map((data, index) =>
                  data.status === "Pending" || data.status !== "Success" ? (
                    <div className="manageMemberEdit" key={index}>
                      <h4>{data.name}</h4>
                      <p>{data.level_of_access}</p>
                      <div className="editAccess">
                        <div className="editAccess1">
                          <button
                            onClick={() => {
                              toggle_Dropdown(data.id);
                            }}
                          >
                            {setvalue3}
                            <MdKeyboardArrowDown className="checkicon" />
                          </button>
                          {shownew && updateid === data.id && (
                            <div className="dropHandler">
                              <h3
                                onClick={() => {
                                  getpendingvalue("Admin");
                                }}
                              >
                                Admin
                                <img src={Billingtick} alt="" />
                              </h3>
                              <h3
                                onClick={() => {
                                  getpendingvalue("Sales");
                                }}
                              >
                                Sales
                                <img src={Billingtick} alt="" />
                              </h3>
                              <h3
                                onClick={() => {
                                  getpendingvalue("HR");
                                }}
                              >
                                HR
                                <img src={Billingtick} alt="" />
                              </h3>
                              <h3
                                title=""
                                onClick={() => {
                                  getpendingvalue("Remove user");
                                }}
                              >
                                Remove user{" "}
                              </h3>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null
                )
              : null}
          </div>
          <div className="manageMember">
            <h2>users</h2>
            {alldata.length !== 0
              ? alldata.map((data, index) =>
                  data.status === "Success" ? (
                    <div className="manageMemberEdit" key={index}>
                      <h4>{data.name}</h4>
                      <p>{data.level_of_access}</p>
                      <div className="editAccess">
                        <div className="editAccess1">
                          <button
                            onClick={() => {
                              toggle_Dropdown(data.id);
                            }}
                          >
                            {setvalue3}
                            <MdKeyboardArrowDown className="checkicon" />
                          </button>
                          {shownew && updateid === data.id && (
                            <div className="dropHandler">
                              <h3
                                onClick={() => {
                                  getpendingvalue1("Admin");
                                }}
                              >
                                Admin <img src={Billingtick} alt="" />
                              </h3>
                              <h3
                                onClick={() => {
                                  getpendingvalue1("Sales");
                                }}
                              >
                                Sales <img src={Billingtick} alt="" />
                              </h3>
                              <h3
                                onClick={() => {
                                  getpendingvalue1("HR");
                                }}
                              >
                                HR <img src={Billingtick} alt="" />
                              </h3>
                              <h3
                                title=""
                                onClick={() => {
                                  getpendingvalue1("Remove user");
                                }}
                              >
                                Remove user
                              </h3>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null
                )
              : null}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminTeamMemberComp;
