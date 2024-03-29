/* eslint-disable eqeqeq */
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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MobileHeader from "../../MobileScreens/MobileHeader/MobileHeader";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeAction } from "../../../Store/Store";

const AdminTeamMemberComp = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.token);
  const userid = useSelector((store) => store.userid);
  const [show, setshow] = useState(false);
  const [setvalue, setvalue1] = useState("Admin");
  const [loading, setloading] = useState(false);
  const [setvalue2, setvalue22] = useState("Edit access");
  const [setvalue3, setvalue33] = useState("Edit access");
  const [updateid, setupdateid] = useState(null);
  const [shownew, setshownew] = useState(false);
  const [singleuserdata, setsingleuserdata] = useState(null);

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
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const accessHandler = (e) => {
    dispatch(storeAction.isPopUpHander(e.target.id));
  };
  const openmodel = (item) => {
    dispatch(storeAction.isPopUpHander(item));
  };
  async function getpendingvalue(e) {
    let getdata = e;
    if (getdata === "Remove user") {
      var deleteuser = await axios
        .delete(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${updateid}/`,

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
        Getalldata();
      }
    } else {
      var obj = {
        role: getdata === "Admin" ? 1 : getdata === "HR" ? 4 : 5,
        status: "Pending",
        username: singleuserdata.username,
      };
      var updatedata = await axios
        .put(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${updateid}/`,
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
        Getalldata();
      }
    }
  }
  async function getpendingvalue1(e) {
    let getdata = e;
    if (getdata === "Remove user") {
      var deleteuser = await axios
        .delete(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${updateid}/`,
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
        Getalldata();
      }
    } else {
      var obj = {
        role: getdata === "Admin" ? 1 : getdata === "HR" ? 4 : 5,
        status: "Success",
        username: singleuserdata.username,
      };
      var updatedata = await axios
        .put(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${updateid}/`,
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
        Getalldata();
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
      first_name: formdata.name,
      username: formdata.email_id,
      email: formdata.email_id,
      role: setvalue === "Admin" ? 1 : setvalue === "HR" ? 4 : 5,
      status: "Pending",
      password: "admin",
    };
    var newobj = {
      email: formdata.email_id,
    };
    var createuser = await axios
      .post(`https://hirein5-server.onrender.com/user/create/`, obj)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response;
      });
    if (createuser !== null) {
      await axios
        .post(`${process.env.REACT_APP_LOCAL_HOST_URL}/sendEmail/`, newobj, {
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
      toast.success("Invite Sent...", {
        autoClose: 2000,
        transition: Slide,
        style: customToastStyle,
      });
      setshownew(false);
      document.getElementById("email").value = "";
      document.getElementById("name").value = "";
      setalldata(alldata);
    }
    Getalldata();
    setloading(false);
  };
  useEffect(() => {
    Getalldata();
  }, []);
  const Getalldata = async () => {
    var alldata = await axios
      .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/role/staffusers/`, {
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
    if (alldata.faculties.length !== 0) {
      setalldata(alldata.faculties);
    }
  };

  return (
    <div>
      <div className="displayHandlerMob">
        <MobileHeader />
      </div>
      <div className="teamMembers paddingLeft100 paddingRight100 ">
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
                    onClick={accessHandler}
                    placeholder="Admin"
                    id="access1"
                  >
                    {setvalue}
                    <MdKeyboardArrowDown className="checkicon" />
                  </button>
                  {isPopUp == "access1" && (
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
                      <h4>{data.first_name}</h4>
                      <p>
                        {data.role == 1
                          ? "Admin"
                          : data.role == 4
                          ? "HR"
                          : "Sales"}
                      </p>
                      <div className="editAccess">
                        <div className="editAccess1">
                          <button
                            onClick={() => {
                              toggle_Dropdown(data.id);
                              openmodel("access2");
                              setsingleuserdata(data);
                            }}
                          >
                            {setvalue3}
                            <MdKeyboardArrowDown className="checkicon" />
                          </button>
                          {isPopUp == "access2" && updateid === data.id && (
                            <div className="dropHandler">
                              <h3
                                onClick={() => {
                                  getpendingvalue("Admin");
                                }}
                              >
                                Admin 1
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
                      <h4>{data.first_name}</h4>
                      <p>
                        {data.role == 1
                          ? "Admin"
                          : data.role == 4
                          ? "HR"
                          : "Sales"}
                      </p>
                      <div className="editAccess">
                        <div className="editAccess1">
                          <button
                            onClick={() => {
                              toggle_Dropdown(data.id);
                              openmodel("access2");
                              setsingleuserdata(data);
                            }}
                          >
                            {setvalue3}
                            <MdKeyboardArrowDown className="checkicon" />
                          </button>
                          {isPopUp == "access2" && updateid === data.id && (
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
