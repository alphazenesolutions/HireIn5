/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./RegistrationComp.css";
import Head from "../../../Reusable/LogoHead/Head";
import SuccessResponse from "../../../Reusable/SuccessResponse/SuccessResponse";
import back from "../../../../assests/back.png";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FiLoader } from "react-icons/fi";

const RegistrationComp = () => {
  const navigate = useNavigate();
  const signupdata = useSelector((store) => store.signupdata);
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);

  const [isPage, setIsPage] = useState("page1");

  const [isButton, setIsButton] = useState(false);
  const [checked, setchecked] = useState(false);
  const buttonHandler = () => {
    setIsButton(true);
  };

  const [isButton2, setIsButton2] = useState(false);
  const buttonHandlernew = () => {
    setchecked(!checked);
  };
  const backHandler = (event) => {
    setIsPage(event.target.id);
  };

  const routeHandler = () => {
    if (isPage === "page3") {
      navigate("/pricing");
    } else {
    }
  };
  const routeTimeout = setTimeout(routeHandler, 1500);
  const [registationdata, setregistationdata] = useState({
    company_name: "",
    company_location: "",
    company_url: "",
    first_name: "",
    phone: "",
    title: "",
    linked_in: "",
  });
  const [billingdata, setbillingdata] = useState({
    billing_company: "",
    billing_address: "",
    company_pan: "",
    primary_name: "",
    primary_email: "",
    primary_phone: "",
    secondary_name: "",
    secondary_email: "",
    secondary_phone: "",
  });
  const [billingdataerror, setbillingdataerror] = useState({
    billing_company: false,
    billing_address: false,
    company_pan: false,
    primary_name: false,
    primary_email: false,
    primary_phone: false,
    secondary_name: false,
    secondary_email: false,
    secondary_phone: false,
  });
  const [registationdataerror, setregistationdataerror] = useState({
    company_name: false,
    company_location: false,
    company_url: false,
    first_name: false,
    phone: false,
    title: false,
    linked_in: false,
  });
  const [interestitems, setinterestItems] = useState([]);
  const [lookingdata, setlookingdata] = useState("");
  const [durationdata, setdurationdata] = useState("");
  const [agreedata, setagreedata] = useState("");
  const [notesdata, setnotesdata] = useState("");
  const [interestitemserror, setinterestItemserror] = useState(false);
  const [lookingdataerror, setlookingdataerror] = useState(false);
  const [durationdataerror, setdurationdataerror] = useState(false);
  const [agreedataerror, setagreedataerror] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setregistationdata((values) => ({ ...values, [name]: value }));
  };
  const handlechangenew = (e) => {
    const { name, value } = e.target;
    if (name === "secondary_email") {
      setbillingdata((values) => ({ ...values, [name]: value }));
    }
    setbillingdata((values) => ({ ...values, [name]: value }));
  };
  const pageHandler = async (event) => {
    if (isPage === "page1") {
      if (registationdata.company_name.length === 0) {
        setregistationdataerror((values) => ({
          ...values,
          company_name: true,
        }));
      } else if (registationdata.company_location.length === 0) {
        setregistationdataerror((values) => ({
          ...values,
          company_name: false,
        }));
        setregistationdataerror((values) => ({
          ...values,
          company_location: true,
        }));
      } else if (registationdata.company_url.length === 0) {
        setregistationdataerror((values) => ({
          ...values,
          company_location: false,
        }));
        setregistationdataerror((values) => ({ ...values, company_url: true }));
      } else if (registationdata.first_name.length === 0) {
        setregistationdataerror((values) => ({
          ...values,
          company_url: false,
        }));
        setregistationdataerror((values) => ({ ...values, first_name: true }));
      } else if (registationdata.phone.length === 0) {
        setregistationdataerror((values) => ({ ...values, first_name: false }));
        setregistationdataerror((values) => ({ ...values, phone: true }));
      } else if (registationdata.title.length === 0) {
        setregistationdataerror((values) => ({ ...values, phone: false }));
        setregistationdataerror((values) => ({ ...values, title: true }));
      } else if (registationdata.linked_in.length === 0) {
        setregistationdataerror((values) => ({ ...values, title: false }));
        setregistationdataerror((values) => ({ ...values, linked_in: true }));
      } else {
        setregistationdataerror((values) => ({ ...values, linked_in: false }));
        if (interestitems.length === 0) {
          setinterestItemserror(true);
        } else if (lookingdata.length === 0) {
          setlookingdataerror(true);
          setinterestItemserror(false);
        } else if (durationdata.length === 0) {
          setlookingdataerror(false);
          setdurationdataerror(true);
        } else if (agreedata.length === 0) {
          setdurationdataerror(false);
          setagreedataerror(true);
        } else {
          setagreedataerror(false);
          setregistationdataerror({
            company_name: false,
            company_location: false,
            company_url: false,
            first_name: false,
            phone: false,
            title: false,
            linked_in: false,
          });
          setIsButton(true);
          var new_obj = {
            username: signupdata.username,
            first_name: registationdata.first_name,
            phone: registationdata.phone,
            linked_in: registationdata.linked_in,
            title: registationdata.title,
            role: 2,
            company: {
              company_email: signupdata.username,
              company_name: registationdata.company_name,
              company_location: registationdata.company_location,
              verified: false,
              terms: true,
              interested_in: interestitems,
              looking_for: lookingdata,
              duration: durationdata,
              notes: notesdata,
              agree_terms: true,
            },
          };
          var updatedata = await axios
            .put(
              `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${userid}/`,
              new_obj,
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
            updatedata.message ===
            "User and Associated Info updated successfully"
          ) {
            setIsPage(event.target.id);
            setIsButton(false);
          } else {
            setIsButton(false);
          }
        }
      }
    } else {
      if (billingdata.billing_company.length === 0) {
        setbillingdataerror((values) => ({
          ...values,
          billing_company: true,
        }));
      } else if (billingdata.billing_address.length === 0) {
        setbillingdataerror((values) => ({
          ...values,
          billing_address: true,
        }));
        setbillingdataerror((values) => ({
          ...values,
          billing_company: false,
        }));
      } else if (billingdata.company_pan.length === 0) {
        setbillingdataerror((values) => ({
          ...values,
          company_pan: true,
        }));
        setbillingdataerror((values) => ({
          ...values,
          billing_address: false,
        }));
      } else if (billingdata.primary_name.length === 0) {
        setbillingdataerror((values) => ({
          ...values,
          primary_name: true,
        }));
        setbillingdataerror((values) => ({
          ...values,
          company_pan: false,
        }));
      } else if (billingdata.primary_phone.length === 0) {
        setbillingdataerror((values) => ({
          ...values,
          primary_phone: true,
        }));
        setbillingdataerror((values) => ({
          ...values,
          primary_name: false,
        }));
      } else if (billingdata.primary_email.length === 0) {
        setbillingdataerror((values) => ({
          ...values,
          primary_email: true,
        }));
        setbillingdataerror((values) => ({
          ...values,
          primary_phone: false,
        }));
      } else if (billingdata.secondary_name.length === 0) {
        setbillingdataerror((values) => ({
          ...values,
          secondary_name: true,
        }));
        setbillingdataerror((values) => ({
          ...values,
          primary_email: false,
        }));
      } else if (billingdata.secondary_phone.length === 0) {
        setbillingdataerror((values) => ({
          ...values,
          secondary_phone: true,
        }));
        setbillingdataerror((values) => ({
          ...values,
          secondary_name: false,
        }));
      } else if (billingdata.secondary_email.length === 0) {
        setbillingdataerror((values) => ({
          ...values,
          secondary_email: true,
        }));
        setbillingdataerror((values) => ({
          ...values,
          secondary_phone: false,
        }));
      } else {
        setbillingdataerror((values) => ({
          ...values,
          secondary_email: false,
        }));
        setIsButton2(true);
        var new_obj1 = {
          username: signupdata.username,
          first_name: registationdata.first_name,
          phone: registationdata.phone,
          linked_in: registationdata.linked_in,
          title: registationdata.title,
          role: 2,
          company: {
            company_email: signupdata.username,
            company_name: registationdata.company_name,
            company_location: registationdata.company_location,
            verified: false,
            terms: true,
            interested_in: interestitems,
            looking_for: lookingdata,
            duration: durationdata,
            notes: notesdata,
            agree_terms: true,
            billing_company: billingdata.billing_company,
            billing_address: billingdata.billing_address,
            company_pan: billingdata.company_pan,
            primary_name: billingdata.primary_name,
            primary_email: billingdata.primary_email,
            primary_phone: billingdata.primary_phone,
            secondary_name: billingdata.secondary_name,
            secondary_email: billingdata.secondary_email,
            secondary_phone: billingdata.secondary_phone,
          },
        };
        var updatedatabilling = await axios
          .put(
            `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${userid}/`,
            new_obj1,
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
          setIsPage(event.target.id);
          setIsButton2(false);
        } else {
          setIsButton2(false);
        }
      }
    }
    // setIsPage(event.target.id);
  };
  const handleCheckboxChange = (itemName) => {
    const updatedItems = interestitems.includes(itemName)
      ? interestitems.filter((data) => data !== itemName)
      : [...interestitems, itemName];

    setinterestItems(updatedItems);
  };
  return (
    <>
      {isPage === "page1" && (
        <div className="registerComp">
          <div className="registerComp1 ">
            <Head />
            <div className="registerInner">
              <div className="pageCount">
                <button className="pageBtn">1</button>
                <p></p>
                <button className="pageBtn1">2</button>
              </div>
              <div className="registerHead">
                <h1>Add your Company Profile to complete registration.</h1>
              </div>
              <div className="CompanyDetails">
                <h2>COMPANY DETAILS</h2>
                <div className="companyDetails1 items-center">
                  <div className="companyDetails2 h-full">
                    <h3>Company name</h3>
                    <input
                      type="text"
                      placeholder="E.g. Apple"
                      name="company_name"
                      onChange={handlechange}
                      defaultValue={registationdata.company_name}
                    />
                    {registationdataerror.company_name && (
                      <p className="text-red-500 text-xs font-semibold pt-2">
                        Please Enter Company name
                      </p>
                    )}
                  </div>
                  <div className="companyDetails2 h-full">
                    <h3>Company Location</h3>
                    <div className="company">
                      <select
                        id=""
                        name="company_location"
                        onChange={handlechange}
                        defaultValue={registationdata.company_location}
                      >
                        <option value="">Company Location</option>
                        <option value="India">India</option>
                      </select>
                    </div>
                    {registationdataerror.company_location && (
                      <p className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Company Location
                      </p>
                    )}
                  </div>
                </div>
                <div className="companyDetails2 h-full">
                  <h3>Company URL</h3>
                  <input
                    type="text"
                    placeholder="Website URL"
                    name="company_url"
                    onChange={handlechange}
                    defaultValue={registationdata.company_url}
                  />
                  {registationdataerror.company_url && (
                    <p className="text-red-500 text-xs font-semibold mt-2">
                      Please Enter Company URL
                    </p>
                  )}
                </div>
              </div>
              <div className="yourDetails">
                <h2>YOUR DETAILS</h2>
                <div className="detailsGrid">
                  <div className="companyDetails2 h-full">
                    <h3>Your Name</h3>
                    <input
                      type="text"
                      placeholder="Ramanujan"
                      name="first_name"
                      onChange={handlechange}
                      defaultValue={registationdata.first_name}
                    />
                    {registationdataerror.first_name && (
                      <p className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Name
                      </p>
                    )}
                  </div>
                  <div className="yourName h-full">
                    <h3>Phone no.</h3>
                    <p>
                      <select name="" id="">
                        <option value="">+91</option>
                      </select>
                      <input
                        pattern="[0-9]*" // Only allow numeric digits
                        maxLength="10"
                        type="number"
                        placeholder="Number"
                        name="phone"
                        onChange={handlechange}
                        defaultValue={registationdata.phone}
                      />
                    </p>
                    {registationdataerror.phone && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Phone
                      </h6>
                    )}
                  </div>
                  <div className="companyDetails2 h-full">
                    <h3>Job title</h3>
                    <input
                      type="text"
                      placeholder="E.g. HR Manager"
                      name="title"
                      onChange={handlechange}
                      defaultValue={registationdata.title}
                    />
                    {registationdataerror.title && (
                      <p className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Job title
                      </p>
                    )}
                  </div>
                  <div className="companyDetails2 h-full">
                    <h3>LinkedIn Profile</h3>
                    <input
                      type="text"
                      placeholder="URL"
                      name="linked_in"
                      onChange={handlechange}
                      defaultValue={registationdata.linked_in}
                    />
                    {registationdataerror.linked_in && (
                      <p className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter LinkedIn Profile
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="preferences">
                <h2>PREFERENCES</h2>
                <div className="hiring">
                  <h3>Interested in hiring</h3>
                  <p>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange("Full-time remote resources")
                      }
                      checked={interestitems.includes(
                        "Full-time remote resources"
                      )}
                    />
                    <h4
                      onClick={() =>
                        handleCheckboxChange("Full-time remote resources")
                      }
                    >
                      Full-time remote resources
                    </h4>
                  </p>
                  <p>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange("Part-time remote resources")
                      }
                      checked={interestitems.includes(
                        "Part-time remote resources"
                      )}
                    />
                    <h4
                      onClick={() =>
                        handleCheckboxChange("Part-time remote resources")
                      }
                    >
                      Part-time remote resources
                    </h4>
                  </p>
                  <p>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange(
                          "Onsite resources (at company office)"
                        )
                      }
                      checked={interestitems.includes(
                        "Onsite resources (at company office)"
                      )}
                    />
                    <h4
                      onClick={() =>
                        handleCheckboxChange(
                          "Onsite resources (at company office)"
                        )
                      }
                    >
                      Onsite resources (at company office)
                    </h4>
                  </p>
                  {interestitemserror && (
                    <h6 className="text-red-500 text-xs font-semibold mt-2">
                      Please Select Interested in hiring
                    </h6>
                  )}
                </div>
                <div className="hiring">
                  <h3>What are you looking for</h3>
                  <p>
                    <input
                      type="radio"
                      checked={lookingdata === "Hire someone in 5 days"}
                      onClick={() => {
                        setlookingdata("Hire someone in 5 days");
                      }}
                    />
                    <h4
                      onClick={() => {
                        setlookingdata("Hire someone in 5 days");
                      }}
                      className="cursor-pointer"
                    >
                      Hire someone in 5 days
                    </h4>
                  </p>
                  <p>
                    <input
                      type="radio"
                      checked={lookingdata === "Post an urgent job requirement"}
                      onClick={() => {
                        setlookingdata("Post an urgent job requirement");
                      }}
                    />
                    <h4
                      onClick={() => {
                        setlookingdata("Post an urgent job requirement");
                      }}
                      className="cursor-pointer"
                    >
                      Post an urgent job requirement{" "}
                    </h4>
                  </p>
                  <p>
                    <input
                      type="radio"
                      checked={
                        lookingdata ===
                        "Not sure which model will work for you? Let us call you!"
                      }
                      onClick={() => {
                        setlookingdata(
                          "Not sure which model will work for you? Let us call you!"
                        );
                      }}
                    />
                    <h4
                      onClick={() => {
                        setlookingdata(
                          "Not sure which model will work for you? Let us call you!"
                        );
                      }}
                      className="cursor-pointer"
                    >
                      Not sure which model will work for you? Let us call you!
                    </h4>
                  </p>
                  {lookingdataerror && (
                    <h6 className="text-red-500 text-xs font-semibold mt-2">
                      Please Select What are you looking for
                    </h6>
                  )}
                </div>
                <div className="hiring">
                  <h3>Duration you want to hire the Talent for</h3>
                  <p>
                    <input
                      type="radio"
                      onClick={() => {
                        setdurationdata(
                          "Short term project (6 months or less)"
                        );
                      }}
                      checked={
                        durationdata === "Short term project (6 months or less)"
                      }
                    />
                    <h4
                      onClick={() => {
                        setdurationdata(
                          "Short term project (6 months or less)"
                        );
                      }}
                      className="cursor-pointer"
                    >
                      Short term project (6 months or less)
                    </h4>
                  </p>
                  <p>
                    <input
                      type="radio"
                      onClick={() => {
                        setdurationdata("6-12 months");
                      }}
                      checked={durationdata === "6-12 months"}
                    />
                    <h4
                      onClick={() => {
                        setdurationdata("6-12 months");
                      }}
                      className="cursor-pointer"
                    >
                      6-12 months
                    </h4>
                  </p>
                  <p>
                    <input
                      type="radio"
                      onClick={() => {
                        setdurationdata("More than 12 months");
                      }}
                      checked={durationdata === "More than 12 months"}
                    />
                    <h4
                      onClick={() => {
                        setdurationdata("More than 12 months");
                      }}
                      className="cursor-pointer"
                    >
                      More than 12 months
                    </h4>
                  </p>
                  {durationdataerror && (
                    <h6 className="text-red-500 text-xs font-semibold mt-2">
                      Please Select Duration you want to hire the Talent for
                    </h6>
                  )}
                </div>
                <div className="RegisterCheck">
                  <h3>
                    Do you agree that the resource will have a minimum of 4
                    hours overlap with your team, and not necessarily a full
                    overlap of your business day
                  </h3>
                  <div className="RegisterCheck1">
                    <p>
                      <input
                        type="checkbox"
                        onClick={() => {
                          setagreedata(true);
                        }}
                        checked={agreedata === true}
                      />
                      <h4
                        onClick={() => {
                          setagreedata(true);
                        }}
                        className="cursor-pointer"
                      >
                        Yes
                      </h4>
                    </p>
                    <p>
                      <input
                        type="checkbox"
                        onClick={() => {
                          setagreedata(false);
                        }}
                        checked={agreedata === false}
                      />
                      <h4
                        onClick={() => {
                          setagreedata(false);
                        }}
                        className="cursor-pointer"
                      >
                        No
                      </h4>
                    </p>
                  </div>
                  {agreedataerror && (
                    <h6 className="text-red-500 text-xs font-semibold mt-2">
                      Please Select agree that the resource
                    </h6>
                  )}
                </div>
                <div className="RegisterCheck">
                  <h3>
                    Do you have a bespoke hiring process? Please share the key
                    steps in hiring the resource? (Optional)
                  </h3>
                  <div className="RegisterFeedBack">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      placeholder="Write here..."
                      onChange={(e) => {
                        setnotesdata(e.target.value);
                      }}
                      defaultValue={notesdata}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="agree marginBottom20">
                <input
                  onClick={buttonHandlernew}
                  type="checkbox"
                  name=""
                  id=""
                  checked={checked === true}
                />
                <h5 className="terms">
                  I agree to the Hirein5
                  <span className="spanighLight">terms & condition </span>and
                  <span className="spanighLight">privacy policy</span>
                </h5>
              </div>
              <div className="registerBottom">
                {isButton === false ? (
                  <button id="page2" onClick={pageHandler} className="nextbtn">
                    Next
                  </button>
                ) : (
                  <button
                    id="page2"
                    className="clientLoginCompBodyButtonLoading"
                    disabled
                  >
                    <FiLoader className="loadingIcon" />
                  </button>
                )}

                <h5>
                  If you require any help or clarification, please connect with
                  our team at <br />
                  <span title="">
                    {" "}
                    {"<"} name {">"} @hirein5.com{" "}
                  </span>{" "}
                  or call us at{" "}
                  <span>
                    +44 {"<"} number{">"}
                  </span>
                </h5>
              </div>
              <div className="termsAndConditions">
                <h6>Terms & Conditions</h6>
                <h6>Privacy Policy</h6>
                <h6>Extra Doc</h6>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* page2 */}
      <button
        id="page1"
        onClick={backHandler}
        className={
          isPage === "page2" ? "backButtonClientReg" : "backButtonClientRegNone"
        }
      >
        <img className="back" src={back} alt="" />
        Back
      </button>
      {isPage === "page2" && (
        <div className="registerComp">
          <div className="registerComp1">
            <div className="registerInner">
              <Head />
              <div className="pageCount">
                <button className="pageBtn3">
                  <FaCheck className="tickIcon" />
                </button>
                <p></p>
                <button className="pageBtn4">2</button>
              </div>
              <div className="registerHead1">
                <h1>Add your Billing Profile to complete registration</h1>
              </div>
              <div className="billingDetails1">
                <h2>BILLING INFORMATION</h2>
                <div className="companyUrl1">
                  <h3>Registered Company Name (for billing)</h3>
                  <input
                    type="text"
                    placeholder="E.g. Apple"
                    name="billing_company"
                    onChange={handlechangenew}
                    defaultValue={billingdata.billing_company}
                  />
                  {billingdataerror.billing_company && (
                    <p className="text-red-500 text-xs font-semibold mt-2">
                      Please Enter Registered Company Name
                    </p>
                  )}
                </div>
                <div className="companyUrl1">
                  <h3>Company Billing Address</h3>
                  <input
                    type="text"
                    placeholder="e.g. Richmond Par, Avenue 2"
                    name="billing_address"
                    onChange={handlechangenew}
                    defaultValue={billingdata.billing_address}
                  />
                  {billingdataerror.billing_address && (
                    <p className="text-red-500 text-xs font-semibold mt-2">
                      Please Enter Company Billing Address
                    </p>
                  )}
                </div>
                <div className="companyUrl1">
                  <h3>Company PAN / TAX Identification No</h3>
                  <input
                    type="text"
                    placeholder="Website URL"
                    name="company_pan"
                    onChange={handlechangenew}
                    defaultValue={billingdata.company_pan}
                  />
                  {billingdataerror.company_pan && (
                    <p className="text-red-500 text-xs font-semibold mt-2">
                      Please Enter Company PAN
                    </p>
                  )}
                </div>
              </div>
              <div className="CompanyDetails">
                <h2>PRIMARY CONTACT FOR BILLING</h2>
                <div className="companyDetails1">
                  <div className="companyDetails2 h-full">
                    <h3>Full Name</h3>
                    <input
                      type="text"
                      placeholder=""
                      name="primary_name"
                      onChange={handlechangenew}
                      defaultValue={billingdata.primary_name}
                    />
                    {billingdataerror.primary_name && (
                      <p className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Full Name
                      </p>
                    )}
                  </div>
                  <div className="companyDetails2 h-full">
                    <h3>Contact Number</h3>
                    <input
                      type="number"
                      name="primary_phone"
                      onChange={handlechangenew}
                      defaultValue={billingdata.primary_phone}
                    />
                    {billingdataerror.primary_phone && (
                      <p className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Contact Number
                      </p>
                    )}
                  </div>
                </div>
                <div className="companyUrl">
                  <h3>Email Address</h3>
                  <input
                    type="text"
                    placeholder="e.g. Richmond Par, Avenue 2"
                    name="primary_email"
                    onChange={handlechangenew}
                    defaultValue={billingdata.primary_email}
                  />
                  {billingdataerror.primary_email && (
                    <p className="text-red-500 text-xs font-semibold mt-2">
                      Please Enter Email Address
                    </p>
                  )}
                </div>
              </div>
              <div className="CompanyDetails">
                <h2>SECONDARY CONTACT FOR BILLING</h2>
                <div className="companyDetails1">
                  <div className="companyDetails2 h-full">
                    <h3>Full Name</h3>
                    <input
                      type="text"
                      placeholder=""
                      name="secondary_name"
                      onChange={handlechangenew}
                      defaultValue={billingdata.secondary_name}
                    />
                    {billingdataerror.secondary_name && (
                      <p className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Full Name
                      </p>
                    )}
                  </div>
                  <div className="companyDetails2 h-full">
                    <h3>Contact Number</h3>
                    <input
                      type="number"
                      name="secondary_phone"
                      onChange={handlechangenew}
                      defaultValue={billingdata.secondary_phone}
                    />
                    {billingdataerror.secondary_phone && (
                      <p className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Contact Number
                      </p>
                    )}
                  </div>
                </div>
                <div className="companyUrl">
                  <h3>Email Address</h3>
                  <input
                    type="text"
                    placeholder="e.g. Richmond Par, Avenue 2"
                    name="secondary_email"
                    onChange={handlechangenew}
                    defaultValue={billingdata.secondary_email}
                  />
                  {billingdataerror.secondary_email && (
                    <p className="text-red-500 text-xs font-semibold mt-2">
                      Please Enter Email Address
                    </p>
                  )}
                </div>
              </div>

              <div className="registerBottom">
                {isButton2 === false ? (
                  <button id="page2" onClick={pageHandler} className="nextbtn">
                    Next
                  </button>
                ) : (
                  <button
                    id="page2"
                    className="clientLoginCompBodyButtonLoading"
                    disabled
                  >
                    <FiLoader className="loadingIcon" />
                  </button>
                )}
                <button className="skipbtn">Skip for now</button>
                <h5>
                  If you require any help or clarification, please connect with
                  our team at <br />
                  <span title="">
                    {"<"} name {">"} @hirein5.com{" "}
                  </span>{" "}
                  or call us at{" "}
                  <span>
                    +44 {"<"} number{">"}
                  </span>
                </h5>
              </div>
              <div className="termsAndConditions">
                <h6>Terms & Conditions</h6>
                <h6>Privacy Policy</h6>
                <h6>Extra Doc</h6>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* page3 */}
      {isPage === "page3" && (
        <div className="h-[100vh] flex items-center justify-center">
          <SuccessResponse
            title="Verification successful!"
            des="Thank You! You are One Step Closer to start Hiring in 5. Easy hiring just ahead."
          />
        </div>
      )}
    </>
  );
};

export default RegistrationComp;
