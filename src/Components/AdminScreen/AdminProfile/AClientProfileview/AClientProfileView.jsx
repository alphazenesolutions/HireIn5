/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
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
import contractCard from "../../../../assests/contractCard.png";
import moment from "moment";
import country_and_states from "../../../../assests/country-states";
import approvedTick from "../../../../assests/approvedTick.svg";
import { RxCross1 } from "react-icons/rx";
import Select from "react-select";

const AClientProfileView = () => {
  const singleuser = useSelector((store) => store.singleuser);
  const allcompanydata = useSelector((store) => store.allcompanydata);
  const alluserdata = useSelector((store) => store.alluserdata);
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
  const contractHandler = () => {
    dispatch(storeAction.isPopUpHander2(true));
  };
  const [loading, setIsLoading] = useState(false);
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
    pincode: "",
    company_register_no: "",
  });
  const [basicdata, setbasicdata] = useState({
    first_name: "",
    linked_in: "",
    title: "",
    phone: "",
  });
  const [formdata, setformdata] = useState([]);
  const [selectedOptionskill, setSelectedOptionskill] = useState(null);
  const [skilloption, setskilloption] = useState([]);
  useEffect(() => {
    getAllinfo();
  }, [singleuser, alluserdata]);
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
              ? singleuser[0].company.billing_address !== null
                ? singleuser[0].company.billing_address
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
          pincode:
            singleuser[0].company !== null
              ? singleuser[0].company.pincode !== null
                ? singleuser[0].company.pincode
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
          company_register_no:
            singleuser[0].company !== null
              ? singleuser[0].company.company_register_no !== null
                ? singleuser[0].company.company_register_no
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
    if (alluserdata.length !== 0) {
      var filter1 = [];
      for (var i = 0; i < alluserdata.length; i++) {
        if (alluserdata[i].first_name.length != 0) {
          filter1.push({
            value: alluserdata[i].id,
            label: alluserdata[i].first_name,
          });
        }
      }
      setskilloption(filter1);
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
        billing_address: companydata.company_location,
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
      getalldata(updatedatabilling.user);
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
      getalldata(updatedatabilling.user);
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
        country: companydata.country,
        pincode: companydata.pincode,
        company_register_no: companydata.company_register_no,
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
      getalldata(updatedatabilling.user);
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
      getalldata(updatedObject);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [updatedObject] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const getalldata = async (data) => {
    const index = allcompanydata.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      const updatedArray = [...allcompanydata];
      updatedArray[index] = { ...updatedArray[index], ...data };
      dispatch(
        storeAction.allcompanydataHander({ allcompanydata: updatedArray })
      );
    }
  };

  const fileInputRef = useRef(null);
  const fileInputRef1 = useRef(null);
  const [updateid, setupdateid] = useState(null);
  const [uploadstatus, setuploadstatus] = useState(false);
  const [name, setname] = useState(null);
  const [formData] = useState(new FormData());
  const handleFileInputChange = async (e) => {
    formData.append("image", e.target.files[0]);
    formData.append("name", `contract_${singleuser[0].id}`);
    const response = await axios.post(
      "https://fileserver-21t2.onrender.com/api/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.img_url.length !== 0) {
      var obj = {
        contracts_info: {
          file: response.data.img_url,
          name: e.target.files[0].name,
          user: singleuser[0].id,
        },
      };
      if (e.target.name === "upload") {
        var createdata = await axios
          .post(
            `${process.env.REACT_APP_LOCAL_HOST_URL}/getContracts/${singleuser[0].id}/`,
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
          fileInputRef.current.value = "";
          fileInputRef1.current.value = "";
          getAll_data();
        }
      } else {
        var create_data = await axios
          .put(
            `${process.env.REACT_APP_LOCAL_HOST_URL}/getContracts/${updateid}/`,
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
        if (create_data !== null) {
          fileInputRef.current.value = "";
          fileInputRef1.current.value = "";
          getAll_data();
        }
      }
    }
  };
  const handleFileInput_Change = async (e) => {
    formData.append("image", e.target.files[0]);
    formData.append("name", `contract_${singleuser[0].id}`);
    const response = await axios.post(
      "https://fileserver-21t2.onrender.com/api/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setname(e.target.files[0].name);
    if (response.data.img_url.length !== 0) {
      setuploadstatus(true);
      setaddcontractdata((values) => ({
        ...values,
        file: response.data.img_url,
      }));
      fileInputRef.current.value = "";
    }
  };
  const showhandler = (data) => {
    fileInputRef.current.click();
  };
  const showhandler1 = (data) => {
    setupdateid(data.id);
    fileInputRef1.current.click();
  };
  useEffect(() => {
    getAll_data();
  }, [singleuser]);
  const getAll_data = async () => {
    if (singleuser.length !== 0) {
      var contactdata = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/getContracts/${singleuser[0].id}`,
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
      setformdata(contactdata);
    }
  };
  const disablebtn = async (data) => {
    setIsLoading(true);
    var obj = {
      username: data.username,
      dissabled: true,
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${data.id}/`,
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
    if (
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      let updatedObject = {
        ...singleuser[0],
        dissabled: true,
      };
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(updatedObject);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [updatedObject] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const enablebtn = async (data) => {
    setIsLoading(true);
    var obj = {
      username: data.username,
      dissabled: false,
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${data.id}/`,
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
    if (
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      let updatedObject = {
        ...singleuser[0],
        dissabled: false,
      };
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(updatedObject);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [updatedObject] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const [addcontractdata, setaddcontractdata] = useState({
    contract_type: "",
    hired_on: "",
    contract_duration: "",
    billing_cycle: "",
    file: "",
  });
  const handlechange_contract = async (e) => {
    const { name, value } = e.target;
    setaddcontractdata((values) => ({ ...values, [name]: value }));
  };
  const createbtn = async () => {
    if (addcontractdata.contract_type === "Statement of Work (SOW)") {
      if (selectedOptionskill !== null) {
        var checkuser = await alluserdata.filter((data) => {
          return data.id == selectedOptionskill.value;
        });
        var obj_new = {
          username: checkuser[0].username,
          status: "Hired",
        };
        var updatedata = await axios
          .put(
            `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${checkuser[0].id}/`,
            obj_new,
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
        if (
          updatedata.message === "User and Associated Info updated successfully"
        ) {
         
          getalldata(updatedata.user);
        }
      } else {
        console.log("object");
      }
    }
    setIsLoading(true);
    setuploadstatus(false);
    dispatch(storeAction.isPopUpHander());
    var obj = {
      contracts_info: {
        file: addcontractdata.file,
        name: addcontractdata.contract_type,
        date: addcontractdata.hired_on,
        duration: addcontractdata.contract_duration,
        billing_cycle: addcontractdata.billing_cycle,
        candidate:
          selectedOptionskill !== null ? selectedOptionskill.value : null,
      },
    };
    await axios
      .post(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/getContracts/${singleuser[0].id}/`,
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

    setIsLoading(false);
    getAll_data();
    setTimeout(() => {
      dispatch(storeAction.isPopUpHander());
    }, 2000);
  };
  return (
    <div>
      {singleuser.length !== 0 ? (
        <div className="clientProfileOverview paddingLeft100 paddingRight100 ">
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
                {singleuser[0].dissabled == false ? (
                  loading === false ? (
                    <button
                      className="disableProfile"
                      onClick={() => {
                        disablebtn(singleuser[0]);
                      }}
                    >
                      Disable profile
                    </button>
                  ) : (
                    <button className="save w-[10rem] flex justify-center items-center">
                      <FiLoader className="loadingIcon" />
                    </button>
                  )
                ) : loading === false ? (
                  <button
                    className="disableProfile"
                    onClick={() => {
                      enablebtn(singleuser[0]);
                    }}
                  >
                    Activate profile
                  </button>
                ) : (
                  <button className="save w-[10rem] flex justify-center items-center">
                    <FiLoader className="loadingIcon" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="clientProfileViewHeaderMob">
            <div className="ClientProfileBackButton">
              <span onClick={() => navigate("/customerProfile")}>
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
                  ) : (
                    <Avatar
                      name={singleuser[0].first_name}
                      size={100}
                      round="50px"
                    />
                  )}
                </div>
                <div className="clientProfileViewFlexLeftDesc">
                  <div className="clientProfileViewFlexLeftDescHead">
                    <h1>{singleuser[0].first_name}</h1>
                    {singleuser[0].apprual === false ? (
                      <span className="pendingApproval">Approval Pending</span>
                    ) : (
                      <img src={approvedTick} alt="" />
                    )}
                  </div>
                  {singleuser[0].preference_info !== null ? (
                    <div className="clientProfileViewFlexLeftDescRole">
                      <h2>{singleuser[0].preference_info.qualification}</h2>
                    </div>
                  ) : null}

                  <div className="clientProfileViewFlexLeftDescLocation">
                    {/* <img src={candidateProfile} alt="" /> */}
                    <h2>{singleuser[0].current_place_of_residence}</h2>
                    {singleuser[0].rate_card_info !== null ? (
                      <h2>{singleuser[0].rate_card_info.remote_hourly}/hr</h2>
                    ) : (
                      <h2>Not provided ye</h2>
                    )}
                  </div>
                </div>
              </div>
              <div className="clientProfileViewFlexRightMob">
                {/* <button onClick={overLayHandler} className="editRate">
                  <img src={editOutline} alt="" />
                  Edit Rate (Pricing)
                </button> */}
                <div className="clientProfileViewFlexRightButtonMobClient">
                  <button
                    // id="approveconformation"
                    onClick={editHandler1}
                    className="disableProfile"
                  >
                    Delete profile
                  </button>
                  <button className="disableProfile">Disable Profile</button>
                </div>

                {isPopUp == "approvedropdown" &&
                  (singleuser.length !== 0 ? (
                    <div className="approvalMenu">
                      {singleuser[0].apprual === false ? (
                        <h3
                          id="approveconformation"
                          onClick={editHandler1}
                          className="approvalMenuActive"
                        >
                          Disable profile
                        </h3>
                      ) : null}

                      <h3 className="approvalMenuDisable">Disable Profile</h3>
                    </div>
                  ) : null)}
              </div>
              {/* <div className="calendlyLink">
                <h4>Calendly Link (for interview)</h4>
                <input
                  type="text"
                  placeholder="https://calendly.com/meet/usernamelink"
                />
                <h5>Edit</h5>
              </div> */}
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
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Company location</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.company_location !== null ? (
                        singleuser[0].company.country.length !== 0 ? (
                          <h3>{singleuser[0].company.country}</h3>
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
                    <h2>Company</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.pincode !== null ? (
                        singleuser[0].company.pincode.length !== 0 ? (
                          <h3>{singleuser[0].company.pincode}</h3>
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
                    <h2>Company Registration No.</h2>
                    {singleuser[0].company !== null ? (
                      singleuser[0].company.company_register_no !== null ? (
                        singleuser[0].company.company_register_no.length !==
                        0 ? (
                          <h3>{singleuser[0].company.company_register_no}</h3>
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
                  <div className="adminEditOverlayContent">
                    <h2>Company Country</h2>
                    {/* <input
                      type="text"
                      name="billing_address"
                      onChange={handlechange}
                      defaultValue={companydata.country}
                    /> */}
                    <select
                      onChange={handlechange}
                      defaultValue={companydata.country}
                      name="country"
                      selected={companydata.country}
                    >
                      <option value="">Country</option>
                      {country_and_states.country.length !== 0
                        ? country_and_states.country.map((item, index) => (
                            <option
                              value={item.name}
                              key={index}
                              selected={companydata.country}
                            >
                              {item.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Company Pincode</h2>
                    <input
                      type="text"
                      name="pincode"
                      onChange={handlechange}
                      defaultValue={companydata.pincode}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Company Registration No.</h2>
                    <input
                      type="text"
                      name="company_register_no"
                      onChange={handlechange}
                      defaultValue={companydata.company_register_no}
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
                  <ContractCard name="Non Disclosure Agreement (NDA)" />
                  <ContractCard name="Master Service Agreement (MSA)" />
                  <ContractCard name="Statement of Work (SOW)" />
                  {formdata.length !== 0
                    ? formdata.map((data, index) =>
                        data.name != "Non Disclosure Agreement (NDA)" &&
                        data.name != "Master Service Agreement (MSA)" &&
                        data.name != "Statement of Work (SOW)" ? (
                          <div className="contractCard" key={index}>
                            <div
                              className="contractInner"
                              onClick={() => {
                                window.open(`${data.file}`, "_blank");
                              }}
                            >
                              <div className="contractInnerImg">
                                <img src={contractCard} alt="" />
                              </div>
                              <div className="contractInnerDesc">
                                <h2>{data.name}</h2>
                                Updated on{" "}
                                {moment(data.uplaod_date).format("DD/MM/YYYY")}
                              </div>
                            </div>

                            <input
                              type="file"
                              ref={fileInputRef1}
                              style={{ display: "none" }}
                              name="uploadagain"
                              onChange={handleFileInputChange}
                            />
                            <button
                              title=""
                              onClick={() => {
                                showhandler1(data);
                              }}
                            >
                              Upload again
                            </button>
                          </div>
                        ) : null
                      )
                    : null}
                  <div className="addContractCard">
                    <p
                      className="pointer"
                      onClick={editHandler1}
                      id="addcontract"
                    >
                      + Add contract
                    </p>

                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      name="upload"
                      // onChange={handleFileInputChange}
                    />
                  </div>
                </div>
                {/* <p>Contract Uploaded Successfully</p> */}
                {isPopUp == "addcontract" && (
                  <>
                    <div className="adminEditOverlay">
                      <div className="adminEditOverlayHead">
                        <h1>Add New Contract</h1>
                        <RxCross1 />
                      </div>
                      <div className="adminEditOverlayBody">
                        <div className="adminEditOverlayContent">
                          <h2>Select Candidate</h2>
                          <Select
                            defaultValue={selectedOptionskill}
                            onChange={setSelectedOptionskill}
                            options={skilloption}
                          />
                        </div>
                        <div className="adminEditOverlayContent">
                          <h2>Contract Type</h2>
                          <select
                            name="contract_type"
                            onChange={handlechange_contract}
                            defaultValue={addcontractdata.contract_type}
                          >
                            <option value="">Select</option>
                            <option value="Non Disclosure Agreement (NDA)">
                              Non Disclosure Agreement (NDA)
                            </option>
                            <option value="Master Service Agreement (MSA)">
                              Master Service Agreement (MSA)
                            </option>
                            <option value="Statement of Work (SOW)">
                              Statement of Work (SOW)
                            </option>
                          </select>
                        </div>
                        <div className="adminEditOverlayContent">
                          <h2>Hired on</h2>
                          <input
                            type="date"
                            name="hired_on"
                            onChange={handlechange_contract}
                            defaultValue={addcontractdata.hired_on}
                          />
                        </div>
                        <div className="adminEditOverlayContent">
                          <h2>Contract duration</h2>
                          <select
                            name="contract_duration"
                            onChange={handlechange_contract}
                            defaultValue={addcontractdata.contract_duration}
                          >
                            <option value="">Select</option>
                            <option value="3 Months">3 Months</option>
                            <option value="6 Months">6 Months</option>
                            <option value="9 Months">9 Months</option>
                            <option value="12 Months">12 Months</option>
                          </select>
                        </div>
                        <div className="adminEditOverlayContent">
                          <h2>Billing cycle</h2>
                          <select
                            name="billing_cycle"
                            onChange={handlechange_contract}
                            defaultValue={addcontractdata.billing_cycle}
                          >
                            <option value="">Select</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                          </select>
                        </div>
                        <div className="adminEditOverlayContent"></div>
                      </div>
                      <div className="px-12">
                        <div
                          onClick={showhandler}
                          className="uploadCertificate w-full"
                        >
                          <h2 className="drop">
                            Drag your fies here to{" "}
                            <span className="browser">Browse</span>
                          </h2>
                          <h3>
                            Maximum size: 5MB MP4,
                            <br /> PDF, JPEG and PNG accepted
                          </h3>
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          name="aadhaarfront"
                          onChange={handleFileInput_Change}
                        />
                        {uploadstatus && (
                          <p className="text-green-500 text-sm">
                            File Uploaded Successfully
                          </p>
                        )}
                      </div>

                      <div className="editOverlayButton">
                        <button
                          className="discard"
                          onClick={() => {
                            dispatch(storeAction.isPopUpHander());
                          }}
                        >
                          Cancel
                        </button>

                        {loading === false ? (
                          <button className="save" onClick={createbtn}>
                            Create
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
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AClientProfileView;
