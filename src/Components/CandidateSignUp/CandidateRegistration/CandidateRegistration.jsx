/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import "./CandidateRegistration.css";
import aadhaarimg from "../../../assests/info.png";
import { FaAngleDown } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiStar } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useRef } from "react";
import back from "../../../assests/back.png";
import SuccessResponse from "../../Reusable/SuccessResponse/SuccessResponse";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { storeAction } from "../../../Store/Store";

const CandidateRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputref = useRef("");
  const inputref1 = useRef("");
  const signupdata = useSelector((store) => store.signupdata);
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);

  const [isPage, setIsPage] = useState("page2");
  const [dropDown, setdropDown] = useState(false);
  const [dropDown1, setdropDown1] = useState(false);
  const [dropDownList, setdropDownList] = useState([
    "PHP",
    "Pytorch",
    "Javascript",
    "Node.Js",
  ]);
  const [dropDownOpen, setdropDownClose] = useState(dropDownList);
  const [dropDownList1, setdropDownList1] = useState([
    "Basic",
    "Conversational",
    "Proficient",
    "Fluent",
  ]);
  const [dropDownOpen1, setdropDownClose1] = useState(dropDownList1);
  const [finalerror, setfinalerror] = useState(null);
  const [finalerrorstatus, setfinalerrorstatus] = useState(false);
  const [finalerrortype, setfinalerrortype] = useState(null);

  function dropDownHandler(params) {
    const inputvalue = inputref.current.value.toLowerCase();
    const dropdownvalue = dropDownList.filter((getvalue) =>
      getvalue.toLowerCase().includes(inputvalue)
    );
    setdropDownClose(dropdownvalue);
    setdropDown(inputvalue.length > 0 && dropdownvalue.length > 0);
  }
  function dropDownHandler1(params) {
    const inputvalue = inputref1.current.value.toLowerCase();
    const dropdownvalue = dropDownList1.filter((getvalue) =>
      getvalue.toLowerCase().includes(inputvalue)
    );
    setdropDownClose1(dropdownvalue);
    setdropDown1(inputvalue.length > 0 && dropdownvalue.length > 0);
  }
  const backHandler = (event) => {
    setIsPage(event.target.id);
  };
  const routeHandler = () => {
    if (isPage === "page4") {
      dispatch(storeAction.isloginHandler({ islogin: true }));
      navigate("/dashboard");
    } else {
    }
  };
  const routeTimeout = setTimeout(routeHandler, 1500);
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dob: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    title: "",
    aadhaar_number: "",
    aadhaarfront: "1",
    aadhaarback: "1",
    pan_number: "",
    pan_front: "1",
    passport_no: "",
    valid_until: "",
    country_of_citizenship: "",
    country_of_issue: "",
    passport_front: "11",
    passport_back: "22",
    qualification: "",
    experience: "",
    skill: "",
    linkedin: "",
    hackerrank: "",
    github: "",
    website: "",
    languages: "",
  });
  const [formdataerror, setformdataerror] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    dob: false,
    address1: false,
    address2: false,
    city: false,
    state: false,
    title: false,
    aadhaar_number: false,
    aadhaarfront: false,
    aadhaarback: false,
    pan_number: false,
    pan_front: false,
    passport_no: false,
    valid_until: false,
    country: false,
    passport_front: false,
    passport_back: false,
    qualification: false,
    experience: false,
    skill: false,
    linkedin: false,
    hackerrank: false,
    github: false,
    website: false,
    languages: false,
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((values) => ({ ...values, [name]: value }));
  };
  async function pageHandler(e) {
    setfinalerrorstatus(false);
    if (isPage === "page1") {
      if (formdata.firstname.length === 0) {
        setformdataerror((values) => ({
          ...values,
          firstname: true,
        }));
      } else if (formdata.lastname.length === 0) {
        setformdataerror((values) => ({
          ...values,
          firstname: false,
        }));
        setformdataerror((values) => ({
          ...values,
          lastname: true,
        }));
      } else if (formdata.email.length === 0) {
        setformdataerror((values) => ({
          ...values,
          lastname: false,
        }));
        setformdataerror((values) => ({
          ...values,
          email: true,
        }));
      } else if (formdata.phone.length === 0) {
        setformdataerror((values) => ({
          ...values,
          email: false,
        }));
        setformdataerror((values) => ({
          ...values,
          phone: true,
        }));
      } else if (formdata.dob.length === 0) {
        setformdataerror((values) => ({
          ...values,
          phone: false,
        }));
        setformdataerror((values) => ({
          ...values,
          dob: true,
        }));
      } else if (formdata.address1.length === 0) {
        setformdataerror((values) => ({
          ...values,
          dob: false,
        }));
        setformdataerror((values) => ({
          ...values,
          address1: true,
        }));
      } else if (formdata.address2.length === 0) {
        setformdataerror((values) => ({
          ...values,
          address1: false,
        }));
        setformdataerror((values) => ({
          ...values,
          address2: true,
        }));
      } else if (formdata.city.length === 0) {
        setformdataerror((values) => ({
          ...values,
          address2: false,
        }));
        setformdataerror((values) => ({
          ...values,
          city: true,
        }));
      } else if (formdata.state.length === 0) {
        setformdataerror((values) => ({
          ...values,
          city: false,
        }));
        setformdataerror((values) => ({
          ...values,
          state: true,
        }));
      } else if (formdata.title.length === 0) {
        setformdataerror((values) => ({
          ...values,
          state: false,
        }));
        setformdataerror((values) => ({
          ...values,
          title: true,
        }));
      } else if (formdata.aadhaar_number.length === 0) {
        setformdataerror((values) => ({
          ...values,
          title: false,
        }));
        setformdataerror((values) => ({
          ...values,
          aadhaar_number: true,
        }));
      } else if (formdata.aadhaarfront.length === 0) {
        setformdataerror((values) => ({
          ...values,
          aadhaar_number: false,
        }));
        setformdataerror((values) => ({
          ...values,
          aadhaarfront: true,
        }));
      } else if (formdata.aadhaarback.length === 0) {
        setformdataerror((values) => ({
          ...values,
          aadhaarfront: false,
        }));
        setformdataerror((values) => ({
          ...values,
          aadhaarback: true,
        }));
      } else if (formdata.pan_number.length === 0) {
        setformdataerror((values) => ({
          ...values,
          aadhaarback: false,
        }));
        setformdataerror((values) => ({
          ...values,
          pan_number: true,
        }));
      } else if (formdata.pan_front.length === 0) {
        setformdataerror((values) => ({
          ...values,
          pan_number: false,
        }));
        setformdataerror((values) => ({
          ...values,
          pan_front: true,
        }));
      } else {
        setformdataerror((values) => ({
          ...values,
          pan_front: false,
        }));
        setformdataerror({
          firstname: false,
          lastname: false,
          email: false,
          phone: false,
          dob: false,
          address1: false,
          address2: false,
          city: false,
          state: false,
          title: false,
          aadhaar_number: false,
          aadhaarfront: false,
          aadhaarback: false,
          pan_number: false,
          pan_front: false,
          passport_no: false,
          valid_until: false,
          country: false,
          passport_front: false,
          passport_back: false,
          qualification: false,
          experience: false,
          skill: false,
          linkedin: false,
          hackerrank: false,
          github: false,
          website: false,
          languages: false,
        });
        var newobj = {
          username: signupdata.username,
          phone: formdata.phone,
          title: formdata.title,
          first_name: `${formdata.firstname} ${formdata.lastname}`,
          role: "3",
          address: {
            address: `${formdata.address1} ${formdata.address2}`,
            city: formdata.city,
            state: formdata.state,
          },
          kyc_info: {
            aadhar_number: formdata.aadhaar_number,
            aadhar_front: formdata.aadhaarfront,
            aadhar_back: formdata.aadhaarback,
            pan_number: formdata.pan_number,
            pan_front: formdata.pan_front,
          },
          passport_info: {
            passport_number: formdata.passport_no,
            passport_validity: formdata.valid_until,
            country_of_citizenship: formdata.country_of_citizenship,
            country_of_issue: formdata.country_of_issue,
            passport_front: formdata.passport_front,
            passport_back: formdata.passport_back,
          },
        };
        var updatedata = await axios
          .put(
            `${process.env.REACT_APP_LOCAL_HOST_URL}/user/${userid}`,
            newobj,
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
            return err.response.data;
          });
        if (
          updatedata.message === "User and Associated Info updated successfully"
        ) {
          setIsPage(e.target.id);
          routeHandler();
          setfinalerrorstatus(false);
          setfinalerror(null);
          setfinalerrortype(null);
        } else {
          if (updatedata.username === undefined) {
            if (updatedata.phone === undefined) {
              if (updatedata.title === undefined) {
                if (updatedata.first_name === undefined) {
                  if (updatedata.passport_info === undefined) {
                    if (updatedata.kyc_info === undefined) {
                    } else {
                      setfinalerrorstatus(true);
                      setfinalerror(updatedata.kyc_info.aadhar_number);
                      setfinalerrortype("aadhar_number");
                    }
                  } else {
                    if (
                      updatedata.passport_info.passport_number === undefined
                    ) {
                      if (
                        updatedata.passport_info.passport_validity === undefined
                      ) {
                        if (
                          updatedata.passport_info.country_of_citizenship ===
                          undefined
                        ) {
                          if (
                            updatedata.passport_info.country_of_issue ===
                            undefined
                          ) {
                          } else {
                            setfinalerrorstatus(true);
                            setfinalerror(
                              updatedata.passport_info.country_of_issue
                            );
                            setfinalerrortype("country_of_issue");
                          }
                        } else {
                          setfinalerrorstatus(true);
                          setfinalerror(
                            updatedata.passport_info.country_of_citizenship
                          );
                          setfinalerrortype("country_of_citizenship");
                        }
                      } else {
                        setfinalerrorstatus(true);
                        setfinalerror(
                          updatedata.passport_info.passport_validity
                        );
                        setfinalerrortype("passport_validity");
                      }
                    } else {
                      setfinalerrorstatus(true);
                      setfinalerror(updatedata.passport_info.passport_number);
                      setfinalerrortype("passport_number");
                    }
                  }
                } else {
                  setfinalerrorstatus(true);
                  setfinalerror(updatedata.first_name);
                  setfinalerrortype("first_name");
                }
              } else {
                setfinalerrorstatus(true);
                setfinalerror(updatedata.title);
                setfinalerrortype("title");
              }
            } else {
              setfinalerrorstatus(true);
              setfinalerror(updatedata.phone);
              setfinalerrortype("phone");
            }
          } else {
            setfinalerrorstatus(true);
            setfinalerror(updatedata.username);
            setfinalerrortype("username");
          }
        }
      }
    } else if (isPage === "page2") {
      if (formdata.qualification.length === 0) {
        setformdataerror((values) => ({
          ...values,
          qualification: true,
        }));
      } else if (formdata.experience.length === 0) {
        setformdataerror((values) => ({
          ...values,
          qualification: false,
        }));
        setformdataerror((values) => ({
          ...values,
          experience: true,
        }));
      } else if (formdata.linkedin.length === 0) {
        setformdataerror((values) => ({
          ...values,
          experience: false,
        }));
        setformdataerror((values) => ({
          ...values,
          linkedin: true,
        }));
      } else if (formdata.hackerrank.length === 0) {
        setformdataerror((values) => ({
          ...values,
          linkedin: false,
        }));
        setformdataerror((values) => ({
          ...values,
          hackerrank: true,
        }));
      } else if (formdata.github.length === 0) {
        setformdataerror((values) => ({
          ...values,
          hackerrank: false,
        }));
        setformdataerror((values) => ({
          ...values,
          github: true,
        }));
      } else if (formdata.website.length === 0) {
        setformdataerror((values) => ({
          ...values,
          github: false,
        }));
        setformdataerror((values) => ({
          ...values,
          website: true,
        }));
      }
      setIsPage(e.target.id);
      routeHandler();
    } else if (isPage === "page3") {
      setIsPage(e.target.id);
      routeHandler();
    }
    // setIsPage(e.target.id);
    // routeHandler();
  }
  const fileInputRef = useRef(null);
  const [formtype, setformtype] = useState(null);

  const handleFileSelectClick = (data) => {
    fileInputRef.current.click();
    setformtype(data);
  };
  const [formData, setFormData] = useState(new FormData());
  const handleFileInputChange = async (e) => {
    formData.append("image", e.target.files[0]);
    formData.append("name", formtype);
    try {
      const response = await axios.post(
        "https://fileserver-21t2.onrender.com/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setformdata((values) => ({
        ...values,
        [formtype]: response.data.img_url,
      }));
      fileInputRef.current.file = "";
    } catch (error) {
      console.error("Error sending FormData:", error);
    }
  };
  return (
    <>
      <div className="candidateRegistration">
        {/* ====================== page1 ============================= */}
        {isPage === "page1" && (
          <div className="candidateRegistration1">
            <div className="candidateRegistrationInner">
              <div className="CandidatePages">
                <button className="candidateBtn1">1</button>
                <p></p>
                <button className="candidateBtn2">2</button>
                <p></p>
                <button className="candidateBtn3">3</button>
              </div>
              <div className="CandidateHead">
                <h1>Share your Personal Details</h1>
              </div>
              <div className="basicDetails">
                <h2>BASIC DETAILS</h2>
                <div className="CandidateDetails">
                  <div className="candidateInfo">
                    <h3>First Name</h3>
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstname"
                      onChange={handlechange}
                      defaultValue={formdata.firstname}
                    />
                    {formdataerror.firstname && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter First Name
                      </h6>
                    )}
                  </div>
                  <div className="candidateInfo">
                    <h3>Last Name</h3>
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastname"
                      onChange={handlechange}
                      defaultValue={formdata.lastname}
                    />
                    {formdataerror.lastname && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Last Name
                      </h6>
                    )}
                  </div>
                  <div className="candidateInfo">
                    <h3>Email ID</h3>
                    <input
                      type="text"
                      placeholder="divyagupta@gmail.com"
                      name="email"
                      onChange={handlechange}
                      defaultValue={formdata.email}
                    />
                    {formdataerror.email && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Email ID
                      </h6>
                    )}
                  </div>
                  <div className="candidateInfo">
                    <h3>Phone no.</h3>
                    <p>
                      <select name="" id="">
                        <option value="">+91</option>
                      </select>
                      <input
                        type="number"
                        placeholder="9876543210"
                        name="phone"
                        onChange={handlechange}
                        defaultValue={formdata.phone}
                      />
                    </p>
                    {formdataerror.phone && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Phone
                      </h6>
                    )}
                  </div>
                </div>
                <div className="candidateDetails1">
                  <div className="candidateInfo">
                    <h3>Date of birth</h3>
                    <input
                      type="date"
                      placeholder="DD/MM/YYYY"
                      name="dob"
                      onChange={handlechange}
                      defaultValue={formdata.dob}
                    />
                    {formdataerror.dob && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Date of birth
                      </h6>
                    )}
                  </div>
                  <div className="candidateInfo">
                    <h3>Address line 1</h3>
                    <input
                      type="text"
                      placeholder="e.g. Richmond Par, Avenue 2"
                      name="address1"
                      onChange={handlechange}
                      defaultValue={formdata.address1}
                    />
                    {formdataerror.address1 && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Address line 1
                      </h6>
                    )}
                  </div>
                  <div className="candidateInfo">
                    <div className="addressLine">
                      <h3>Address line 2</h3>
                      <h3>Optional</h3>
                    </div>
                    <input
                      type="text"
                      placeholder="Optional"
                      name="address2"
                      onChange={handlechange}
                      defaultValue={formdata.address2}
                    />
                    {formdataerror.address2 && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Address line 2
                      </h6>
                    )}
                  </div>
                </div>
                <div className="candidateAddress">
                  <div className="candidatePlace">
                    <div className="candidateInfo">
                      <h3>City</h3>
                      <input
                        type="text"
                        placeholder="Bangalore"
                        name="city"
                        onChange={handlechange}
                        defaultValue={formdata.city}
                      />
                      {formdataerror.city && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Enter City
                        </h6>
                      )}
                    </div>
                    <div className="candidateInfo">
                      <h3>State</h3>
                      <div className="candidateState">
                        <select
                          id=""
                          name="state"
                          onChange={handlechange}
                          defaultValue={formdata.state}
                        >
                          <option value="">Select State</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="TamilNadu">TamilNadu</option>
                        </select>
                      </div>
                      {formdataerror.state && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Select State
                        </h6>
                      )}
                    </div>
                  </div>
                  <div className="candidateInfo">
                    <h3>Job title</h3>
                    <input
                      type="text"
                      placeholder="E.g. HR Manager"
                      name="title"
                      onChange={handlechange}
                      defaultValue={formdata.title}
                    />
                    {formdataerror.title && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Job title
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="candidateRegistrationInner">
              <div className="DocumentDetails">
                <h2>DOCUMENTS</h2>

                <div className="documentDetails1">
                  <div className="candidateInfo">
                    <h3>Aadhaar number / Nationality Id proof</h3>
                    <input
                      type="text"
                      placeholder="e.g. 00000000000"
                      name="aadhaar_number"
                      onChange={handlechange}
                      defaultValue={formdata.aadhaar_number}
                    />
                    {formdataerror.aadhaar_number && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Aadhaar number / Id proof
                      </h6>
                    )}
                  </div>
                  <div className="aadhaarDetails">
                    <div
                      className="aadhaar cursor-pointer"
                      onClick={() => {
                        handleFileSelectClick("aadhaarfront");
                      }}
                    >
                      <h3>
                        Aadhaar Card Front / Id proof
                        <img src={aadhaarimg} alt="" />
                      </h3>
                      <div className="aadhaarFront">
                        <h3>
                          Drop your files here or <a href=".">browse</a>
                        </h3>
                        <p>Maximum size: 5MB</p>
                        <p title=""> PDF JPEG and PNG accepted</p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        name="aadhaarfront"
                        onChange={handleFileInputChange}
                      />
                      {formdataerror.aadhaarfront && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Upload Aadhaar Card Front
                        </h6>
                      )}
                    </div>
                    <div
                      className="aadhaar cursor-pointer"
                      onClick={() => {
                        handleFileSelectClick("aadhaarback");
                      }}
                    >
                      <h3>
                        Aadhaar Card Back / Id proof{" "}
                        <img src={aadhaarimg} alt="" />
                      </h3>

                      <div className="aadhaarFront">
                        <h3>
                          Drop your files here or <a href=".">browse</a>
                        </h3>
                        <p>Maximum size: 5MB</p>
                        <p title=""> PDF JPEG and PNG accepted</p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        name="aadhaarback"
                        onChange={handleFileInputChange}
                      />
                      {formdataerror.aadhaarback && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Upload Aadhaar Card Back / Id Proof
                        </h6>
                      )}
                    </div>
                  </div>
                  <div className="candidateInfo">
                    <h3>PAN number / Tax Id</h3>
                    <input
                      type="text"
                      placeholder="e.g. 00000000000"
                      name="pan_number"
                      onChange={handlechange}
                      defaultValue={formdata.pan_number}
                    />
                    {formdataerror.pan_number && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter PAN number / Tax Id
                      </h6>
                    )}
                  </div>
                  <div
                    className="aadhaar1 cursor-pointer"
                    onClick={() => {
                      handleFileSelectClick("pan_front");
                    }}
                  >
                    <h3>
                      PAN Card Front / Tax Id <img src={aadhaarimg} alt="" />
                    </h3>
                    <div className="aadhaarFront">
                      <h3>
                        Drop your files here or <a href=".">browse</a>
                      </h3>
                      <p>Maximum size: 5MB</p>
                      <p title=""> PDF JPEG and PNG accepted</p>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      name="pan_front"
                      onChange={handleFileInputChange}
                    />
                    {formdataerror.pan_front && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Upload PAN Front / Tax Id
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="candidateRegistrationInner">
              <div className="passPortDetails">
                <div className="documentTitle">
                  <h2>DOCUMENTS</h2>
                  <h2>OPTIONAL</h2>
                </div>
                <div className="basicDetails">
                  <div className="CandidateDetails">
                    <div className="candidateInfo">
                      <h3>Passport no.</h3>
                      <input
                        type="text"
                        placeholder="e.g. 000000000"
                        name="passport_no"
                        onChange={handlechange}
                        defaultValue={formdata.passport_no}
                      />
                      {formdataerror.passport_no && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Enter Passport no
                        </h6>
                      )}
                    </div>
                    <div className="candidateInfo">
                      <h3>Valid until</h3>
                      <input
                        type="date"
                        placeholder="DD/MM/YYYY"
                        name="valid_until"
                        onChange={handlechange}
                        defaultValue={formdata.valid_until}
                      />
                      {formdataerror.valid_until && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Enter Valid until
                        </h6>
                      )}
                    </div>

                    <div className="candidateInfo">
                      <h3>Country of Citizenship</h3>
                      <p>
                        <input
                          type="text"
                          placeholder="e.g. India"
                          name="country_of_citizenship"
                          onChange={handlechange}
                          defaultValue={formdata.country_of_citizenship}
                        />
                      </p>
                      {formdataerror.country_of_citizenship && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Enter Country of Citizenship
                        </h6>
                      )}
                    </div>
                    <div className="candidateInfo">
                      <h3>Country of Issue</h3>
                      <p>
                        <input
                          type="text"
                          placeholder="e.g. Zimbabwe"
                          name="country_of_issue"
                          onChange={handlechange}
                          defaultValue={formdata.country_of_issue}
                        />
                      </p>
                      {formdataerror.country_of_issue && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Enter Country of Issue
                        </h6>
                      )}
                    </div>
                  </div>
                </div>

                <div className="documentDetails1">
                  <div className="aadhaarDetails">
                    <div
                      className="aadhaar1 cursor-pointer"
                      onClick={() => {
                        handleFileSelectClick("passport_front");
                      }}
                    >
                      <h3>
                        Passport Card Front <img src={aadhaarimg} alt="" />
                      </h3>
                      <div className="aadhaarFront">
                        <h3>
                          Drop your files here or <a href=".">browse</a>
                        </h3>
                        <p>Maximum size: 5MB</p>
                        <p title=""> PDF JPEG and PNG accepted</p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        name="passport_front"
                        onChange={handleFileInputChange}
                      />
                    </div>
                    <div
                      className="aadhaar1 cursor-pointer"
                      onClick={() => {
                        handleFileSelectClick("passport_back");
                      }}
                    >
                      <h3>
                        Passport Card Back <img src={aadhaarimg} alt="" />
                      </h3>

                      <div className="aadhaarFront">
                        <h3>
                          Drop your files here or <a href=".x">browse</a>
                        </h3>
                        <p>Maximum size: 5MB</p>
                        <p title=""> PDF JPEG and PNG accepted</p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        name="passport_back"
                        onChange={handleFileInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {finalerrorstatus && (
                <p className="text-red-500 text-md font-semibold mt-2 capitalize">
                  {finalerrortype} : {finalerror}
                </p>
              )}
            </div>

            <div className="candidateBottom">
              <button className="nextbtn" id="page2" onClick={pageHandler}>
                Next
              </button>
            </div>
            <div className="candidateTermsAndConditions">
              <h6>Terms & Conditions</h6>
              <h6>Privacy Policy</h6>
              <h6>Extra Doc</h6>
            </div>
          </div>
        )}
        {/* =================== page2 ====================== */}
        <button
          id="page1"
          onClick={backHandler}
          className={isPage === "page2" ? "backButton" : "backButtonNone"}
        >
          <img className="back" src={back} alt="" />
          Back
        </button>
        {isPage === "page2" && (
          <div className="candidateRegistration1">
            <div className="candidateRegistrationInner">
              <div className="CandidateSkills">
                <button className="candidateBtn1">
                  <FaCheck className="tickIcon" />
                </button>
                <p></p>
                <button className="candidateBtn2">2</button>
                <p></p>
                <button className="candidateBtn3">3</button>
              </div>
              <div className="CandidateHead">
                <h1>Share your Personal Details</h1>
              </div>
              <div className="basicDetails">
                <div className="CandidateInformation">
                  <div className="candidateInfo">
                    <h3>Your Current Qualification</h3>
                    <input type="text" placeholder="e.g. Java Developer" />
                    {formdataerror.qualification && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Your Current Qualification
                      </h6>
                    )}
                  </div>

                  <div className="candidateInfo">
                    <h3>Years of Experience (all time)</h3>
                    <p>
                      <input type="number" placeholder="0-1" />
                      <select name="" id="">
                        <option value=""></option>
                      </select>
                    </p>
                    {formdataerror.experience && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Years of Experience
                      </h6>
                    )}
                  </div>
                </div>
                <div className="courseSearch">
                  <div className="search">
                    <h3>
                      List at least 5 skills, then star 3 as your top skills
                    </h3>
                    <div className="searchBar">
                      <CiSearch />
                      <input
                        type="text"
                        ref={inputref}
                        onChange={dropDownHandler}
                      />
                      <FaAngleDown onClick={dropDownHandler} />
                    </div>
                    {dropDown && (
                      <div className="searchContent1">
                        <div className="searchContent">
                          {dropDownOpen.map((option, index) => (
                            <h3 key={index}>{option}</h3>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="Skills1">
                  <div className="Skills">
                    <div className="SkillsHead">
                      <h2>SKILLS</h2>
                      <h2>Minimum 5 skills and 3 top skills</h2>
                    </div>
                    <div className="skillSets">
                      <div className="skillList">
                        <div className="skillSet">
                          <div className="skillbtn">
                            <RxHamburgerMenu />
                            <button>
                              <CiStar />
                              <h3>Top Skill</h3>
                            </button>
                            <h3>Python</h3>
                          </div>
                        </div>
                        <MdDeleteOutline className="deleteIcon" />
                      </div>
                      <div className="skillList">
                        <div className="skillSet">
                          <div className="skillbtn">
                            <RxHamburgerMenu />
                            <button>
                              <CiStar />
                              <h3>Top Skill</h3>
                            </button>
                            <h3>PHP</h3>
                          </div>
                        </div>
                        <MdDeleteOutline className="deleteIcon" />
                      </div>
                      <div className="skillList">
                        <div className="skillSet">
                          <div className="skillbtn">
                            <RxHamburgerMenu />
                            <button>
                              <CiStar />
                              <h3>Top Skill</h3>
                            </button>
                            <h3>HTML</h3>
                          </div>
                        </div>
                        <MdDeleteOutline className="deleteIcon" />
                      </div>
                      <div className="skillList">
                        <div className="skillSet">
                          <div className="skillbtn">
                            <RxHamburgerMenu />
                            <button>
                              <CiStar />
                              <h3>Top Skill</h3>
                            </button>
                            <h3>HTML</h3>
                          </div>
                        </div>
                        <MdDeleteOutline className="deleteIcon" />
                      </div>
                      <div className="skillList">
                        <div className="skillSet">
                          <div className="skillbtn">
                            <RxHamburgerMenu />
                            <button>
                              <CiStar />
                              <h3>Top Skill</h3>
                            </button>
                            <h3>HTML</h3>
                          </div>
                        </div>
                        <MdDeleteOutline className="deleteIcon" />
                      </div>
                      <div className="skillList">
                        <div className="skillSet">
                          <div className="skillbtn">
                            <RxHamburgerMenu />
                            <button title="">
                              <CiStar />
                              <h3>Top Skill</h3>
                            </button>
                            <h3>jQuery</h3>
                          </div>
                        </div>
                        <MdDeleteOutline className="deleteIcon" />
                      </div>
                    </div>
                  </div>
                </div>
                {formdataerror.skill && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Skills
                  </h6>
                )}
              </div>
            </div>

            <div className="Accounts">
              <div className="candidateInfo">
                <div className="addressLine">
                  <h3>LinkedIn</h3>
                </div>
                <input type="text" placeholder="Linkedin.com/in/yourusername" />
                {formdataerror.linkedin && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter LinkedIn
                  </h6>
                )}
              </div>
              <div className="candidateInfo">
                <div className="addressLine">
                  <h3>HackerRank</h3>
                  <h3>Optional</h3>
                </div>
                <input type="text" placeholder="Link to proifle" />
                {formdataerror.hackerrank && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter HackerRank
                  </h6>
                )}
              </div>
              <div className="candidateInfo">
                <div className="addressLine">
                  <h3>GitHub</h3>
                  <h3>Optional</h3>
                </div>
                <input type="text" placeholder="github.com/yourusername" />
                {formdataerror.github && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter GitHub
                  </h6>
                )}
              </div>
              <div className="candidateInfo">
                <div className="addressLine">
                  <h3>Personal Website</h3>
                  <h3>Optional</h3>
                </div>
                <input type="text" placeholder="http://" />
                {formdataerror.website && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Personal Website
                  </h6>
                )}
              </div>
            </div>
            <div className="languages">
              <div className="addLanguages">
                <h3>Languages</h3>
                <input type="text" placeholder="e.g. Kannada" />
                <button>+ Add more</button>
              </div>
              <div className="selectLanguages">
                <h3>Proficiency</h3>
                <div className="lanSearch">
                  <input
                    type="text"
                    ref={inputref1}
                    onChange={dropDownHandler1}
                    placeholder="My level is"
                  />
                  <FaAngleDown onClick={dropDownHandler1} />
                </div>
                {dropDown1 && (
                  <div className="Level">
                    {dropDownOpen1.map((option, index) => (
                      <h3 key={index}>{option}</h3>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="candidateBottom">
              <button className="Agree">
                <input type="checkbox" />I agree to the Hirein5{" "}
                <span>terms & conditions </span> and{" "}
                <span> privacy policy</span>
              </button>
              <button className="Next" id="page3" onClick={pageHandler}>
                Next
              </button>
            </div>

            <div className="candidateTermsAndConditions">
              <h6>Terms & Conditions</h6>
              <h6>Privacy Policy</h6>
              <h6>Extra Doc</h6>
            </div>
          </div>
        )}
        {/* ======================== page3 =========================== */}
        <button
          id="page2"
          onClick={backHandler}
          className={isPage === "page3" ? "backButton" : "backButtonNone"}
        >
          <img className="back" src={back} alt="" />
          Back
        </button>
        {isPage === "page3" && (
          <div className="candidateRegistration1">
            <div className="candidateRegistrationInner">
              <div className="CandidateSkills">
                <button className="candidateBtn1">
                  <FaCheck className="tickIcon" />
                </button>
                <p></p>
                <button className="candidateBtn2">
                  <FaCheck className="tickIcon" />
                </button>
                <p></p>
                <button className="candidateBtn3" title="">
                  3
                </button>
              </div>
              <div className="CandidateHead">
                <h1>Share your Travel History</h1>
              </div>
              <div className="basicDetails">
                <div className="travelDetails">
                  <div className="candidateInfo">
                    <h3>Country</h3>
                    <p>
                      <input type="text" placeholder="Country" />
                      <select name="" id="">
                        <option value=""></option>
                      </select>
                    </p>
                  </div>
                  <div className="candidateInfo">
                    <h3>Year of travel</h3>
                    <input type="text" placeholder="YYYY" />
                  </div>

                  <div className="candidateInfo">
                    <h3>Duration</h3>
                    <p>
                      <input type="number" placeholder="" />
                      <select name="" id="">
                        <option value=""></option>
                      </select>
                    </p>
                  </div>
                </div>
                <div className="travelInfo">
                  <div className="candidateInfo">
                    <h3>Purpose</h3>
                    <p>
                      <input type="text" placeholder="Work" />
                      <select name="" id="">
                        <option value=""></option>
                      </select>
                    </p>
                  </div>
                  <div className="candidateInfo">
                    <h3>Type of Visa</h3>
                    <input type="text" placeholder="H-1B" />
                  </div>
                  <div className="candidateInfo">
                    <h3>Validity of Visa</h3>
                    <input type="text" placeholder="DD/MM/YYYY" />
                  </div>
                  <button>+ Add more</button>
                </div>
              </div>
            </div>

            <div className="travelResidence">
              <h2>RESIDENCY DETAILS</h2>
              <div className="candidateInfo">
                <h3>Current place of residence</h3>
                <p>
                  <input type="text" placeholder="Country" />
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                </p>
              </div>
              <div className="candidateInfo">
                <h3>How long have you lived at your current residence?</h3>
                <p>
                  <input type="text" placeholder="" />
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                </p>
              </div>
            </div>

            <div className="travelResidence">
              <h2>COUNTRIES YOU'RE WILLING TO TRAVEL TO FOR WORK</h2>
              <div className="candidateInfo">
                <div className="infoHead">
                  <h3>Country</h3>
                  <h3 title="">Select upto 3 countries</h3>
                </div>
                <p>
                  <input type="text" placeholder="Country" />
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                </p>
              </div>
              <div className="candidateInfo">
                <h3>How long have you lived at your current residence?</h3>
                <p>
                  <input type="text" placeholder="" />
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                </p>
              </div>
              <div className="travelDuration">
                <div className="candidateInfo">
                  <h3>Duration</h3>
                  <p>
                    <input type="number" placeholder="Short Term - 6 months" />
                    <select name="" id="">
                      <option value=""></option>
                    </select>
                  </p>
                </div>
                <div className="candidateInfo">
                  <h3>Travel Readlines</h3>
                  <p>
                    <input type="text" placeholder="Immediate" />
                    <select name="" id="">
                      <option value=""></option>
                    </select>
                  </p>
                </div>
              </div>
            </div>
            <div className="travelBottom">
              <h2>COUNTRIES YOU'RE WILLING TO RELOCATE FOR WORK</h2>

              <div className="candidateInfo">
                <h3>Are you willing to relocate?</h3>
                <p>
                  <input type="text" placeholder="Yes" />
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                </p>
              </div>
              <div className="candidateInfo">
                <div className="infoDetails">
                  <h3>What are your preferred countries to relocate to?</h3>
                  <h3 title="">Select up to 3 countries</h3>
                </div>

                <p>
                  <input type="text" placeholder="" />
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                </p>
              </div>
              <div className="candidateInfo">
                <h3>How long are you willing to relocate for?</h3>
                <p>
                  <input type="text" placeholder="Country" />
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                </p>
              </div>

              <button>+ Add more</button>
            </div>

            <div className="Bottombtns">
              <button onClick={pageHandler} id="page4" className="nextbtn1">
                Next
              </button>
              <button onClick={pageHandler} id="page4" className="skipbtn">
                Skip for now
              </button>
            </div>

            <div className="candidateTermsAndConditions">
              <h6>Terms & Conditions</h6>
              <h6>Privacy Policy</h6>
              <h6>Extra Doc</h6>
            </div>
          </div>
        )}
        {/* ===================== page4 ====================== */}
        {isPage === "page4" && (
          <div className="h-[100vh] flex items-center justify-center">
            <SuccessResponse
              title="Welcome aboard!"
              des="You are One Step Closer to getting hired in 5. Complete your profile to maximize your chances of landing exciting opportunities!"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CandidateRegistration;
