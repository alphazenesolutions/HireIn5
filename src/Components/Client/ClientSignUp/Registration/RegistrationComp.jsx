/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./RegistrationComp.css";
import Head from "../../../Reusable/LogoHead/Head";
import SuccessResponse from "../../../Reusable/SuccessResponse/SuccessResponse";
import back from "../../../../assests/back.png";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import { storeAction } from "../../../../Store/Store";
import country_and_states from "../../../../assests/country-states";

const RegistrationComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((store) => store.userdata);
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  const onboarding_status = useSelector((store) => store.onboarding_status);

  const [isPage, setIsPage] = useState("page2");

  const [isButton, setIsButton] = useState(false);
  const [checked, setchecked] = useState(false);
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
    }
  };
  setTimeout(routeHandler, 1500);
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
    country: "",
    pincode: "",
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
    country: false,
    pincode: false,
  });
  const [compareerror, setcompareerror] = useState({
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
  const [linkedinerror, setlinkedinerror] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    if (name === "linked_in") {
      const urlPattern =
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\.[a-z]{2,})?\/?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]+$/;
      if (value.length !== 0) {
        if (!urlPattern.test(value)) {
          setlinkedinerror(true);
        } else {
          setlinkedinerror(false);
        }
      } else {
        setlinkedinerror(false);
      }
      setregistationdata((values) => ({ ...values, [name]: value }));
    } else {
      setregistationdata((values) => ({ ...values, [name]: value }));
    }
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
      setregistationdataerror({
        company_name: false,
        company_location: false,
        company_url: false,
        first_name: false,
        phone: false,
        title: false,
        linked_in: false,
      });
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
      } else if (registationdata.first_name.length === 0) {
        setregistationdataerror((values) => ({
          ...values,
          company_location: false,
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
            username: userdata[0].username,
            first_name: registationdata.first_name,
            phone: registationdata.phone,
            linked_in: registationdata.linked_in,
            title: registationdata.title,
            role: 2,
            company: {
              company_email: userdata[0].username,
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
            onboarding_status: 2,
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
            dispatch(
              storeAction.onboarding_statusHander({
                onboarding_status: 2,
              })
            );
          } else {
            setIsButton(false);
          }
        }
      }
    } else {
      setbillingdataerror({
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
      } else {
        setbillingdataerror({
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
        setcompareerror({
          secondary_name: false,
          secondary_email: false,
          secondary_phone: false,
        });
        if (billingdata.primary_name == billingdata.secondary_name) {
          setcompareerror((values) => ({
            ...values,
            secondary_name: true,
          }));
        } else if (billingdata.primary_phone == billingdata.secondary_phone) {
          setcompareerror((values) => ({
            ...values,
            secondary_phone: true,
          }));
        } else if (billingdata.primary_email == billingdata.secondary_email) {
          setcompareerror((values) => ({
            ...values,
            secondary_email: true,
          }));
        } else {
          setcompareerror({
            secondary_name: false,
            secondary_email: false,
            secondary_phone: false,
          });
          setIsButton2(true);
          var new_obj1 = {
            username: userdata[0].username,
            first_name: registationdata.first_name,
            phone: registationdata.phone,
            linked_in: registationdata.linked_in,
            title: registationdata.title,
            role: 2,
            onboarding_status: 3,
            company: {
              company_email: userdata[0].username,
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
              country: billingdata.country,
              pincode: billingdata.pincode,
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
            setIsPage("page3");
            setIsButton2(false);
            dispatch(
              storeAction.onboarding_statusHander({
                onboarding_status: 3,
              })
            );
          } else {
            setIsButton2(false);
          }
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
  useEffect(() => {
    CheckStage();
  }, [onboarding_status]);
  const CheckStage = async () => {
    if (onboarding_status > 3) {
      window.location.replace("/#/discover");
    } else {
      if (onboarding_status == 1) {
        setIsPage("page1");
      } else if (onboarding_status == 2) {
        setIsPage("page2");
      } else if (onboarding_status == 3) {
        window.location.replace("/#/pricing");
      }
    }
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
                        placeholder="Company Location"
                      >
                        <option value="">Company Location</option>
                        <option value="United States">United States</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antartica">Antarctica</option>
                        <option value="Antigua and Barbuda">
                          Antigua and Barbuda
                        </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bosnia and Herzegowina">
                          Bosnia and Herzegowina
                        </option>
                        <option value="Botswana">Botswana</option>
                        <option value="Bouvet Island">Bouvet Island</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Territory">
                          British Indian Ocean Territory
                        </option>
                        <option value="Brunei Darussalam">
                          Brunei Darussalam
                        </option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">
                          Central African Republic
                        </option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">
                          Christmas Island
                        </option>
                        <option value="Cocos Islands">
                          Cocos (Keeling) Islands
                        </option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Congo">
                          Congo, the Democratic Republic of the
                        </option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                        <option value="Croatia">Croatia (Hrvatska)</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">
                          Dominican Republic
                        </option>
                        <option value="East Timor">East Timor</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">
                          Equatorial Guinea
                        </option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands">
                          Falkland Islands (Malvinas)
                        </option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="France Metropolitan">
                          France, Metropolitan
                        </option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">
                          French Polynesia
                        </option>
                        <option value="French Southern Territories">
                          French Southern Territories
                        </option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-Bissau">Guinea-Bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Heard and McDonald Islands">
                          Heard and Mc Donald Islands
                        </option>
                        <option value="Holy See">
                          Holy See (Vatican City State)
                        </option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran">Iran (Islamic Republic of)</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Democratic People's Republic of Korea">
                          Korea, Democratic People's Republic of
                        </option>
                        <option value="Korea">Korea, Republic of</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Lao">
                          Lao People's Democratic Republic
                        </option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libyan Arab Jamahiriya">
                          Libyan Arab Jamahiriya
                        </option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macau">Macau</option>
                        <option value="Macedonia">
                          Macedonia, The Former Yugoslav Republic of
                        </option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">
                          Marshall Islands
                        </option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia">
                          Micronesia, Federated States of
                        </option>
                        <option value="Moldova">Moldova, Republic of</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Netherlands Antilles">
                          Netherlands Antilles
                        </option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Northern Mariana Islands">
                          Northern Mariana Islands
                        </option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">
                          Papua New Guinea
                        </option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Pitcairn">Pitcairn</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russia">Russian Federation</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Kitts and Nevis">
                          Saint Kitts and Nevis
                        </option>
                        <option value="Saint Lucia">Saint LUCIA</option>
                        <option value="Saint Vincent">
                          Saint Vincent and the Grenadines
                        </option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome and Principe">
                          Sao Tome and Principe
                        </option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">
                          Slovakia (Slovak Republic)
                        </option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="South Georgia">
                          South Georgia and the South Sandwich Islands
                        </option>
                        <option value="Span">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="St. Helena">St. Helena</option>
                        <option value="St. Pierre and Miguelon">
                          St. Pierre and Miquelon
                        </option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Svalbard">
                          Svalbard and Jan Mayen Islands
                        </option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syrian Arab Republic</option>
                        <option value="Taiwan">
                          Taiwan, Province of China
                        </option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">
                          Tanzania, United Republic of
                        </option>
                        <option value="Thailand">Thailand</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">
                          Trinidad and Tobago
                        </option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks and Caicos">
                          Turks and Caicos Islands
                        </option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">
                          United Arab Emirates
                        </option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States Minor Outlying Islands">
                          United States Minor Outlying Islands
                        </option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Viet Nam</option>
                        <option value="Virgin Islands (British)">
                          Virgin Islands (British)
                        </option>
                        <option value="Virgin Islands (U.S)">
                          Virgin Islands (U.S.)
                        </option>
                        <option value="Wallis and Futana Islands">
                          Wallis and Futuna Islands
                        </option>
                        <option value="Western Sahara">Western Sahara</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
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
                        <option value="">Select</option>
                        <option value="93">+93</option>
                        <option value="355">+355</option>
                        <option value="213">+213</option>
                        <option value="376">+376</option>
                        <option value="244">+244</option>
                        <option value="1-268">+1-268</option>
                        <option value="54">+54</option>
                        <option value="374">+374</option>
                        <option value="61">+61</option>
                        <option value="43">+43</option>
                        <option value="994">+994</option>
                        <option value="1-242">+1-242</option>
                        <option value="973">+973</option>
                        <option value="880">+880</option>
                        <option value="1-246">+1-246</option>
                        <option value="375">+375</option>
                        <option value="32">+32</option>
                        <option value="501">+501</option>
                        <option value="229">+229</option>
                        <option value="975">+975</option>
                        <option value="591">+591</option>
                        <option value="387">+387</option>
                        <option value="267">+267</option>
                        <option value="55">+55</option>
                        <option value="673">+673</option>
                        <option value="359">+359</option>
                        <option value="226">+226</option>
                        <option value="257">+257</option>
                        <option value="855">+855</option>
                        <option value="237">+237</option>
                        <option value="1">+1</option>
                        <option value="238">+238</option>
                        <option value="236">+236</option>
                        <option value="235">+235</option>
                        <option value="56">+56</option>
                        <option value="86">+86</option>
                        <option value="57">+57</option>
                        <option value="269">+269</option>
                        <option value="506">+506</option>
                        <option value="385">+385</option>
                        <option value="53">+53</option>
                        <option value="357">+357</option>
                        <option value="420">+420</option>
                        <option value="243">+243</option>
                        <option value="45">+45</option>
                        <option value="253">+253</option>
                        <option value="1-767">+1-767</option>
                        <option value="1-809">+1-809</option>
                        <option value="670">+670</option>
                        <option value="593">+593</option>
                        <option value="20">+20</option>
                        <option value="503">+503</option>
                        <option value="240">+240</option>
                        <option value="291">+291</option>
                        <option value="372">+372</option>
                        <option value="251">+251</option>
                        <option value="679">+679</option>
                        <option value="358">+358</option>
                        <option value="33">+33</option>
                        <option value="241">+241</option>
                        <option value="220">+220</option>
                        <option value="995">+995</option>
                        <option value="49">+49</option>
                        <option value="233">+233</option>
                        <option value="30">+30</option>
                        <option value="1-473">+1-473</option>
                        <option value="502">+502</option>
                        <option value="224">+224</option>
                        <option value="245">+245</option>
                        <option value="592">+592</option>
                        <option value="509">+509</option>
                        <option value="504">+504</option>
                        <option value="36">+36</option>
                        <option value="354">+354</option>
                        <option value="91" selected>
                          +91
                        </option>
                        <option value="62">+62</option>
                        <option value="98">+98</option>
                        <option value="964">+964</option>
                        <option value="353">+353</option>
                        <option value="972">+972</option>
                        <option value="39">+39</option>
                        <option value="225">+225</option>
                        <option value="1-876">+1-876</option>
                        <option value="81">+81</option>
                        <option value="962">+962</option>
                        <option value="7">+7</option>
                        <option value="254">+254</option>
                        <option value="686">+686</option>
                        <option value="850">+850</option>
                        <option value="82">+82</option>
                        <option value="965">+965</option>
                        <option value="996">+996</option>
                        <option value="856">+856</option>
                        <option value="371">+371</option>
                        <option value="961">+961</option>
                        <option value="266">+266</option>
                        <option value="231">+231</option>
                        <option value="218">+218</option>
                        <option value="423">+423</option>
                        <option value="370">+370</option>
                        <option value="352">+352</option>
                        <option value="389">+389</option>
                        <option value="261">+261</option>
                        <option value="265">+265</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Number"
                        name="phone"
                        maxLength={12}
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
                    {linkedinerror && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Valid LinkedIn Url
                      </h6>
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
                  <div className="flex justify-between items-center">
                    <h3>
                      Do you have a bespoke hiring process? Please share the key
                      steps in hiring the resource? (Optional)
                    </h3>
                    <h5 className="text-xs">{notesdata.length}/200</h5>
                  </div>
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
                      maxLength={200}
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
                  checked === true ? (
                    <button
                      id="page2"
                      onClick={pageHandler}
                      className="nextbtn"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      id="page2"
                      onClick={pageHandler}
                      className="clientLoginCompBodyButtonLoading"
                    >
                      Next
                    </button>
                  )
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
                  <h3>Country</h3>
                  <select
                    name="country"
                    onChange={handlechangenew}
                    className="w-full"
                    defaultValue={billingdata.country}
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
                <div className="companyUrl1">
                  <h3>Pincode</h3>
                  <input
                    type="text"
                    placeholder="123456"
                    name="pincode"
                    maxLength={6}
                    onChange={handlechangenew}
                    defaultValue={billingdata.pincode}
                  />
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
                      type="text"
                      name="primary_phone"
                      maxLength={12}
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
                <div className="seconddiv">
                  <h2>SECONDARY CONTACT FOR BILLING</h2>
                  <h6 className="optionaltext">Optional</h6>
                </div>
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
                    {compareerror.secondary_name && (
                      <p className="text-red-500 text-xs font-semibold mt-2">
                        Primary and secondary names should not be the same.
                      </p>
                    )}
                  </div>
                  <div className="companyDetails2 h-full">
                    <h3>Contact Number</h3>
                    <input
                      type="text"
                      name="secondary_phone"
                      maxLength={12}
                      onChange={handlechangenew}
                      defaultValue={billingdata.secondary_phone}
                    />
                    {compareerror.secondary_phone && (
                      <p className="text-red-500 text-xs font-semibold mt-2">
                        The primary and secondary contact numbers should not be
                        the same.
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
                  {compareerror.secondary_email && (
                    <p className="text-red-500 text-xs font-semibold mt-2">
                      The primary and secondary email addresses should not be
                      the same.
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
                <button
                  className="skipbtn"
                  onClick={() => {
                    setIsPage("page3");
                  }}
                >
                  Skip for now
                </button>
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
