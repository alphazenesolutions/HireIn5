/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./AClientProfileView.css";
import clientProfile from "../../../../assests/gpay.png";
import back from "../../../../assests/back.png";
import editOutline from "../../../../assests/pencil.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import { FiLoader } from "react-icons/fi";
import Avatar from "react-avatar";
import axios from "axios";
import ContractCard from "../../../Reusable/ContractCard/ContractCard";
import { IoMdArrowBack } from "react-icons/io";

const AClientProfileView = () => {
  const singleuser = useSelector((store) => store.singleuser);
  const token = useSelector((store) => store.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isToggle, setIsToggle] = useState("basic");
  const toggleHandler = (e) => {
    setIsToggle(e.target.id);
  };
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });
  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("candidateRate"));
  };
  const editHandler1 = (e) => {
    dispatch(storeAction.isPopUpHander(e.target.id));
  };
  const [loading, setIsLoading] = useState(false);
  const displayHandler = () => {
    setIsLoading(true);
  };
  const [companydata, setcompanydata] = useState({
    billing_address: "",
    billing_company: "",
    company_email: "",
    company_location: "",
    company_name: "",
    company_pan: "",
    company_url: "",
    country: "",
    duration: "",
    primary_email: "",
    primary_name: "",
    primary_phone: "",
    secondary_email: "",
    secondary_name: "",
    secondary_phone: "",
  });
  const [basicdata, setbasicdata] = useState({
    first_name: "",
    linked_in: "",
    title: "",
    phone: "",
  });
  useEffect(() => {
    getAllinfo();
  }, [singleuser]);
  const getAllinfo = async () => {
    if (singleuser.length !== 0) {
      if (singleuser[0].company !== null) {
        setcompanydata({
          billing_address:
            singleuser[0].company !== null
              ? singleuser[0].company.billing_address !== null
                ? singleuser[0].company.billing_address
                : ""
              : "",
          billing_company:
            singleuser[0].company !== null
              ? singleuser[0].company.billing_company !== null
                ? singleuser[0].company.billing_company
                : ""
              : "",
          company_email:
            singleuser[0].company !== null
              ? singleuser[0].company.company_email !== null
                ? singleuser[0].company.company_email
                : ""
              : "",
          company_location:
            singleuser[0].company !== null
              ? singleuser[0].company.company_location !== null
                ? singleuser[0].company.company_location
                : ""
              : "",
          company_name:
            singleuser[0].company !== null
              ? singleuser[0].company.company_name !== null
                ? singleuser[0].company.company_name
                : ""
              : "",
          company_pan:
            singleuser[0].company !== null
              ? singleuser[0].company.company_pan !== null
                ? singleuser[0].company.company_pan
                : ""
              : "",
          company_url:
            singleuser[0].company !== null
              ? singleuser[0].company.company_url !== null
                ? singleuser[0].company.company_url
                : ""
              : "",
          country:
            singleuser[0].company !== null
              ? singleuser[0].company.country !== null
                ? singleuser[0].company.country
                : ""
              : "",
          duration:
            singleuser[0].company !== null
              ? singleuser[0].company.duration !== null
                ? singleuser[0].company.duration
                : ""
              : "",
          primary_email:
            singleuser[0].company !== null
              ? singleuser[0].company.primary_email !== null
                ? singleuser[0].company.primary_email
                : ""
              : "",
          primary_name:
            singleuser[0].company !== null
              ? singleuser[0].company.primary_name !== null
                ? singleuser[0].company.primary_name
                : ""
              : "",
          primary_phone:
            singleuser[0].company !== null
              ? singleuser[0].company.primary_phone !== null
                ? singleuser[0].company.primary_phone
                : ""
              : "",
          secondary_email:
            singleuser[0].company !== null
              ? singleuser[0].company.secondary_email !== null
                ? singleuser[0].company.secondary_email
                : ""
              : "",
          secondary_name:
            singleuser[0].company !== null
              ? singleuser[0].company.secondary_name !== null
                ? singleuser[0].company.secondary_name
                : ""
              : "",
          secondary_phone:
            singleuser[0].company !== null
              ? singleuser[0].company.secondary_phone !== null
                ? singleuser[0].company.secondary_phone
                : ""
              : "",
        });
      }
      setbasicdata({
        first_name: singleuser[0].first_name,
        linked_in: singleuser[0].linked_in,
        title: singleuser[0].title,
        phone: singleuser[0].phone,
      });
    }
  };
  const handlechange = async (e) => {
    const { name, value } = e.target;
    setcompanydata((values) => ({ ...values, [name]: value }));
  };
  const handle_change = async (e) => {
    const { name, value } = e.target;
    setbasicdata((values) => ({ ...values, [name]: value }));
  };
  const save1 = async () => {
    setIsLoading(true);
    var obj = {
      username: singleuser[0].username,
      company: {
        company_name: companydata.company_name,
        company_location: companydata.company_location,
        company_url: companydata.company_url,
      },
    };
    var updatedatabilling = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
        return err;
      });
    if (
      updatedatabilling.message ===
      "User and Associated Info updated successfully"
    ) {
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata();
      setTimeout(() => {
        dispatch(
          storeAction.singleuserHander({ singleuser: [updatedatabilling.user] })
        );
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const savebilling = async () => {
    setIsLoading(true);
    var obj = {
      username: singleuser[0].username,
      company: {
        primary_name: companydata.primary_name,
        primary_email: companydata.primary_email,
        primary_phone: companydata.primary_phone,
        secondary_name: companydata.secondary_name,
        secondary_email: companydata.secondary_email,
        secondary_phone: companydata.secondary_phone,
      },
    };
    var updatedatabilling = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
        return err;
      });
    if (
      updatedatabilling.message ===
      "User and Associated Info updated successfully"
    ) {
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata();
      setTimeout(() => {
        dispatch(
          storeAction.singleuserHander({ singleuser: [updatedatabilling.user] })
        );
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const save_billing = async () => {
    setIsLoading(true);
    var obj = {
      username: singleuser[0].username,
      company: {
        billing_company: companydata.billing_company,
        billing_address: companydata.billing_address,
      },
    };
    var updatedatabilling = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
        return err;
      });
    if (
      updatedatabilling.message ===
      "User and Associated Info updated successfully"
    ) {
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata();
      setTimeout(() => {
        dispatch(
          storeAction.singleuserHander({ singleuser: [updatedatabilling.user] })
        );
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const savebasic = async () => {
    setIsLoading(true);
    var obj = {
      username: singleuser[0].username,
      first_name: basicdata.first_name,
      linked_in: basicdata.linked_in,
      title: basicdata.title,
      phone: basicdata.phone,
    };
    var updatedatabilling = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
        return err;
      });
    if (
      updatedatabilling.message ===
      "User and Associated Info updated successfully"
    ) {
      let updatedObject = {
        ...singleuser[0],
        first_name: basicdata.first_name,
        linked_in: basicdata.linked_in,
        title: basicdata.title,
        phone: basicdata.phone,
      };
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata();
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [updatedObject] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const getalldata = async () => {
    var allfacility = await axios
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
    dispatch(
      storeAction.allcompanydataHander({
        allcompanydata: allfacility.companies,
      })
    );
  };
  return (
    <div>
      {singleuser.length !== 0 ? (
        <div className="paddingLeft100 paddingRight100 ">
          <div className="clientProfileViewHeader">
            <div className="ClientProfileBackButton">
              <span onClick={() => navigate("/customerProfile")}>
                {" "}
                <IoMdArrowBack />
              </span>
              <h5 onClick={() => navigate("/customerProfile")}>
                Back to profile page
              </h5>
            </div>
            <div className="clientProfileViewFlex">
              <div className="clientProfileViewFlexLeft">
                <div className="clientProfileViewFlexLeftImg">
                  {singleuser[0].profile_picture.length !== 0 ? (
                    <img src={singleuser[0].profile_picture} alt="" />
                  ) : singleuser[0].company !== null ? (
                    singleuser[0].company.company_name.length !== 0 ? (
                      <Avatar
                        name={singleuser[0].company.company_name}
                        size={100}
                        round="50px"
                      />
                    ) : (
                      <Avatar
                        name={singleuser[0].first_name}
                        size={100}
                        round="50px"
                      />
                    )
                  ) : (
                    <Avatar
                      name={singleuser[0].first_name}
                      size={100}
                      round="50px"
                    />
                  )}
                </div>
                <div className="clientProfileViewFlexLeftDesc">
                  {singleuser[0].company !== null ? (
                    singleuser[0].company.company_name.length !== 0 ? (
                      <h1>{singleuser[0].company.company_name}</h1>
                    ) : null
                  ) : null}

                  <div className="clientProfileViewFlexLeftDescRole">
                    <h2>{singleuser[0].first_name},</h2>
                    <h2>{singleuser[0].title}</h2>
                  </div>
                  <div className="clientProfileViewFlexLeftDescLocation">
                    {/* <img src={clientProfile} alt="" /> */}
                    <h2>{singleuser[0].current_place_of_residence}</h2>
                  </div>
                </div>
              </div>
              <div className="clientProfileViewFlexRight">
                <button className="disableProfile">Disable profile</button>
              </div>
            </div>
          </div>
          <div className="clientViewTab">
            <h5
              onClick={toggleHandler}
              id="basic"
              className={
                isToggle === "basic"
                  ? "clientViewTabActive"
                  : "clientViewTabInactive"
              }
            >
              Basic
            </h5>
            <h5
              onClick={toggleHandler}
              id="billing"
              className={
                isToggle === "billing"
                  ? "clientViewTabActive"
                  : "clientViewTabInactive"
              }
            >
              Billing
            </h5>
            <h5
              onClick={toggleHandler}
              id="adminclientcontracts"
              className={
                isToggle === "adminclientcontracts"
                  ? "clientViewTabActive"
                  : "clientViewTabInactive"
              }
            >
              Contracts
            </h5>
          </div>
          {isToggle === "basic" && (
            <>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>Company details</h1>
                  <button id="admincompanydetails" onClick={editHandler1}>
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>

                <div className="ClientProfileViewCardBody">
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Company name</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.company_name !== null ? (
                        singleuser[0].company.company_name.length !== 0 ? (
                          <h3>{singleuser[0].company.company_name}</h3>
                        ) : (
                          <h3>-</h3>
                        )
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Company Location</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.billing_address !== null ? (
                        singleuser[0].company.billing_address.length !== 0 ? (
                          <h3>{singleuser[0].company.billing_address}</h3>
                        ) : (
                          <h3>-</h3>
                        )
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Company URL</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.company_url !== null ? (
                        singleuser[0].company.company_url.length !== 0 ? (
                          <h3
                            onClick={() => {
                              window.open(
                                `${singleuser[0].company.company_url}`,
                                "_blank"
                              );
                            }}
                          >
                            {singleuser[0].company.company_url}
                          </h3>
                        ) : (
                          <h3>-</h3>
                        )
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                </div>
              </div>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>billing contact details</h1>
                  <button id="adminbillingcontact" onClick={editHandler1}>
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                <div className="ClientProfileViewCardBody">
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Name</h2>
                    <h3>{singleuser[0].first_name}</h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Phone no.</h2>
                    <h3>{singleuser[0].phone}</h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Job Title</h2>
                    <h3>{singleuser[0].title}</h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Linknedin Profile</h2>
                    <h3>{singleuser[0].linked_in}</h3>
                  </div>
                </div>
              </div>
            </>
          )}
          {isPopUp == "admincompanydetails" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>Company Name</h1>
                </div>
                <div className="adminEditOverlayBody">
                  <div className="adminEditOverlayContent">
                    <h2>Company name</h2>
                    <input
                      type="text"
                      name="company_name"
                      onChange={handlechange}
                      defaultValue={companydata.company_name}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Company Location</h2>
                    <input
                      type="text"
                      name="company_location"
                      onChange={handlechange}
                      defaultValue={companydata.company_location}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Company URL</h2>
                    <input
                      type="text"
                      name="company_url"
                      onChange={handlechange}
                      defaultValue={companydata.company_url}
                    />
                  </div>
                </div>
                {/* <button className="adminEditAddMore">Add More</button> */}
                <div className="editOverlayButton">
                  <button
                    className="discard"
                    onClick={() => {
                      dispatch(storeAction.isPopUpHander());
                    }}
                  >
                    Discard Changes
                  </button>

                  {loading === false ? (
                    <button className="save" onClick={save1}>
                      Save & Close
                    </button>
                  ) : (
                    <button className="save w-[10rem] flex justify-center items-center">
                      <FiLoader className="loadingIcon" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
          {isPopUp == "adminbillingcontact" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>billing contact details</h1>
                </div>
                <div className="adminEditOverlayBody">
                  <div className="adminEditOverlayContent">
                    <h2>Name</h2>
                    <input
                      type="text"
                      name="first_name"
                      onChange={handle_change}
                      defaultValue={basicdata.first_name}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Phone no.</h2>
                    <input
                      type="text"
                      name="phone"
                      onChange={handle_change}
                      defaultValue={basicdata.phone}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Job Title</h2>
                    <input
                      type="text"
                      name="title"
                      onChange={handle_change}
                      defaultValue={basicdata.title}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Linknedin Profile</h2>
                    <input
                      type="text"
                      name="linked_in"
                      onChange={handle_change}
                      defaultValue={basicdata.linked_in}
                    />
                  </div>
                </div>
                {/* <button className="adminEditAddMore">Add More</button> */}
                <div className="editOverlayButton">
                  <button
                    className="discard"
                    onClick={() => {
                      dispatch(storeAction.isPopUpHander());
                    }}
                  >
                    Discard Changes
                  </button>

                  {loading === false ? (
                    <button className="save" onClick={savebasic}>
                      Save & Close
                    </button>
                  ) : (
                    <button className="save w-[10rem] flex justify-center items-center">
                      <FiLoader className="loadingIcon" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
          {/* page 2 */}
          {/* card 1 */}
          {isToggle === "billing" && (
            <>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>Billing Information</h1>
                  <button id="adminbillinginformation" onClick={editHandler1}>
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                <div className="ClientProfileViewCardBody">
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Registered Company Name (for billing)</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.billing_company !== null ? (
                        singleuser[0].company.billing_company.length !== 0 ? (
                          <h3>{singleuser[0].company.billing_company}</h3>
                        ) : (
                          <h3>-</h3>
                        )
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Company Billing Address</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.billing_address !== null ? (
                        singleuser[0].company.billing_address.length !== 0 ? (
                          <h3>{singleuser[0].company.billing_address}</h3>
                        ) : (
                          <h3>-</h3>
                        )
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  {/* <div className="ClientProfileViewCardBodyTable">
                    <h2>Company Registration No.</h2>
                    <h3>-</h3>
                  </div> */}
                </div>
              </div>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>Primary contact for billing</h1>
                  <button id="adminprimarycontact" onClick={editHandler1}>
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                <div className="ClientProfileViewCardBody">
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Full Name</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.primary_name !== null ? (
                        singleuser[0].company.primary_name.length !== 0 ? (
                          <h3>{singleuser[0].company.primary_name}</h3>
                        ) : (
                          <h3>-</h3>
                        )
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Contact Number</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.primary_phone !== null ? (
                        singleuser[0].company.primary_phone.length !== 0 ? (
                          <h3>{singleuser[0].company.primary_phone}</h3>
                        ) : (
                          <h3>-</h3>
                        )
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Email Address</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.primary_email !== null ? (
                        singleuser[0].company.primary_email.length !== 0 ? (
                          <h3>{singleuser[0].company.primary_email}</h3>
                        ) : (
                          <h3>-</h3>
                        )
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Location</h2>
                    <h3>-</h3>
                  </div>
                </div>
              </div>

              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>SECONDARY contact for billing</h1>
                  <button id="adminsecondarycontact" onClick={editHandler1}>
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                <div className="ClientProfileViewCardBody">
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Full Name</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.secondary_name !== null ? (
                        singleuser[0].company.secondary_name.length !== 0 ? (
                          <h3>{singleuser[0].company.secondary_name}</h3>
                        ) : (
                          <h3>-</h3>
                        )
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Contact Number</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.secondary_phone !== null ? (
                        singleuser[0].company.secondary_phone.length !== 0 ? (
                          <h3>{singleuser[0].company.secondary_phone}</h3>
                        ) : (
                          <h3>-</h3>
                        )
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Email Address</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.secondary_email !== null ? (
                        singleuser[0].company.secondary_email.length !== 0 ? (
                          <h3>{singleuser[0].company.secondary_email}</h3>
                        ) : (
                          <h3>-</h3>
                        )
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Location</h2>
                    <h3>-</h3>
                  </div>
                </div>
              </div>
            </>
          )}
          {isPopUp == "adminbillinginformation" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>Billing Information</h1>
                </div>
                <div className="adminEditOverlayBody">
                  <div className="adminEditOverlayContent">
                    <h2>Registered Company Name (for billing)</h2>
                    <input
                      type="text"
                      name="billing_company"
                      onChange={handlechange}
                      defaultValue={companydata.billing_company}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Company Billing Address</h2>
                    <input
                      type="text"
                      name="billing_address"
                      onChange={handlechange}
                      defaultValue={companydata.billing_address}
                    />
                  </div>
                  {/* <div className="adminEditOverlayContent">
                    <h2>Company Registration No.</h2>
                    <input type="text" />
                  </div> */}
                </div>
                {/* <button className="adminEditAddMore">Add More</button> */}
                <div className="editOverlayButton">
                  <button
                    className="discard"
                    onClick={() => {
                      dispatch(storeAction.isPopUpHander());
                    }}
                  >
                    Discard Changes
                  </button>

                  {loading === false ? (
                    <button className="save" onClick={save_billing}>
                      Save & Close
                    </button>
                  ) : (
                    <button className="save w-[10rem] flex justify-center items-center">
                      <FiLoader className="loadingIcon" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
          {isPopUp == "adminprimarycontact" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>Primary contact for billing</h1>
                </div>
                <div className="adminEditOverlayBody">
                  <div className="adminEditOverlayContent">
                    <h2>Full Name</h2>
                    <input
                      type="text"
                      name="primary_name"
                      onChange={handlechange}
                      defaultValue={companydata.primary_name}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Contact Number</h2>
                    <input
                      type="text"
                      name="primary_phone"
                      onChange={handlechange}
                      defaultValue={companydata.primary_phone}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Email Address</h2>
                    <input
                      type="text"
                      name="primary_email"
                      onChange={handlechange}
                      defaultValue={companydata.primary_email}
                    />
                  </div>
                  {/* <div className="adminEditOverlayContent">
                    <h2>Location</h2>
                    <input type="text" />
                  </div> */}
                </div>
                {/* <button className="adminEditAddMore">Add More</button> */}
                <div className="editOverlayButton">
                  <button
                    className="discard"
                    onClick={() => {
                      dispatch(storeAction.isPopUpHander());
                    }}
                  >
                    Discard Changes
                  </button>

                  {loading === false ? (
                    <button className="save" onClick={savebilling}>
                      Save & Close
                    </button>
                  ) : (
                    <button className="save w-[10rem] flex justify-center items-center">
                      <FiLoader className="loadingIcon" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
          {isPopUp == "adminsecondarycontact" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>SECONDARY contact for billing</h1>
                </div>
                <div className="adminEditOverlayBody">
                  <div className="adminEditOverlayContent">
                    <h2>Full Name</h2>
                    <input
                      type="text"
                      name="secondary_name"
                      onChange={handlechange}
                      defaultValue={companydata.secondary_name}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Contact Number</h2>
                    <input
                      type="text"
                      name="secondary_phone"
                      onChange={handlechange}
                      defaultValue={companydata.secondary_phone}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Email Address</h2>
                    <input
                      type="text"
                      name="secondary_email"
                      onChange={handlechange}
                      defaultValue={companydata.secondary_email}
                    />
                  </div>
                  {/* <div className="adminEditOverlayContent">
                    <h2>Location</h2>
                    <input type="text" />
                  </div> */}
                </div>
                {/* <button className="adminEditAddMore">Add More</button> */}
                <div className="editOverlayButton">
                  <button
                    className="discard"
                    onClick={() => {
                      dispatch(storeAction.isPopUpHander());
                    }}
                  >
                    Discard Changes
                  </button>

                  {loading === false ? (
                    <button className="save" onClick={savebilling}>
                      Save & Close
                    </button>
                  ) : (
                    <button className="save w-[10rem] flex justify-center items-center">
                      <FiLoader className="loadingIcon" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
          {isToggle == "adminclientcontracts" && (
            <>
              <div className="paddingTop50">
                <div className="adminContractCard">
                  <ContractCard />
                  <ContractCard />
                  <ContractCard />
                  <div className="addContractCard">
                    <p>+ Add contract</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AClientProfileView;
