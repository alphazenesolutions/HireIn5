/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./CandidateRegistration.css";
import aadhaarimg from "../../../../assests/info.png";
import { FaAngleDown } from "react-icons/fa6";
import { PiWarningCircle } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiStar } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useRef } from "react";
import back from "../../../../assests/back.png";
import SuccessResponse from "../../../Reusable/SuccessResponse/SuccessResponse";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { storeAction } from "../../../../Store/Store";
import Dragoption from "./Dragoption";
import { FiLoader } from "react-icons/fi";
import Skilllist from "../../../../assests/skillsJSON.json";
import Select from "react-select";
import country_and_states from "../../../../assests/country-states";

const CandidateRegistration = () => {
  const [validity, setValidity] = useState("");
  const validityHandler = (e) => {
    setValidity(e.target.id);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputref = useRef("");
  const inputref1 = useRef("");
  const userdata = useSelector((store) => store.userdata);
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  const onboarding_status = useSelector((store) => store.onboarding_status);

  const [isPage, setIsPage] = useState("page1");
  const [dropDown, setdropDown] = useState("");
  const [userdata_new, setuserdata_new] = useState([]);
  const [dropDown1, setdropDown1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownList, setdropDownList] = useState([]);
  const [dropDownOpen, setdropDownClose] = useState(dropDownList);
  const [dropDownList1, setdropDownList1] = useState([
    "Basic",
    "Conversational",
    "Proficient",
    "Fluent",
  ]);
  const [dropDownOpen1, setdropDownClose1] = useState(dropDownList1);
  const [lanuageerror, setlanuageerror] = useState(false);
  const [levelerror, setlevelerror] = useState(false);
  const [finalerror, setfinalerror] = useState(null);
  const [finalerrorstatus, setfinalerrorstatus] = useState(false);
  const [finalerrortype, setfinalerrortype] = useState(null);
  const [skill, setskill] = useState([]);
  const [indexvalue, setindexvalue] = useState(null);
  const [displaymessages, setdisplaymessages] = useState(false);
  const [statelist, setstatelist] = useState([]);
  function displaymsg(params) {
    setdisplaymessages(!displaymessages);
  }
  function displaymsg1(params) {
    setdisplaymessages(false);
  }
  async function dropDownHandler(params) {
    const inputvalue = inputref.current.value.toLowerCase();
    setdropDown("");
    if (inputvalue.length !== 0) {
      var skillarrray = Skilllist;
      const uniqueSkills = Array.from(
        new Set(skillarrray.map((skill) => skill.Skill))
      );
      const inputvalueLower = inputvalue.toLowerCase();
      const matchingSkills = uniqueSkills.filter(
        (skill) =>
          typeof skill === "string" &&
          skill.toLowerCase().includes(inputvalueLower)
      );
      setdropDownClose(matchingSkills);
      setdropDown(inputvalue.length > 0 && matchingSkills.length > 0);
    } else {
      setdropDown(inputvalue.length > 0);
    }
  }
  function dropDownHandler1(index) {
    setindexvalue(index);
    setdropDown1(!dropDown1);
  }
  function filterdata(event, index) {
    // const selectvalue = event.target.textContent.toLowerCase();
    // setselectedvalue(selectvalue);
    setdropDown1(false);
    row[index]["level"] = event;
    setrow([...row]);
  }
  function filterdata1(params) {
    setdropDown(!dropDown);
  }
  function getdata(event) {
    const getvalue = event;
    setdropDown(false);
    const updatedItems = skill.includes(getvalue)
      ? skill.filter((data) => data !== getvalue)
      : [...skill, getvalue];
    setskill(updatedItems);
    inputref.current.value = "";
  }
  const backHandler = (event) => {
    setIsPage(event.target.id);
  };
  const routeHandler = async () => {
    if (isPage === "page4") {
      if (userdata_new.length !== 0) {
        dispatch(storeAction.issidebarHandler({ issidebar: true }));
        dispatch(storeAction.isloginHandler({ islogin: true }));
        dispatch(
          storeAction.onboarding_statusHander({
            onboarding_status: 4,
          })
        );
        var newobj1 = {
          username: userdata_new[0].username,
          onboarding_status: 4,
        };
        await axios
          .put(
            `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${userid}/`,
            newobj1,
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

        window.location.replace("/#/profile");
      }
    }
  };
  const routeTimeout = setTimeout(routeHandler, 1500);
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    email: userdata[0].username,
    phone: sessionStorage.getItem("phone"),
    dob: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    title: "null",
    aadhaar_number: "",
    aadhaarfront: "",
    aadhaarback: "",
    pan_number: "",
    pan_front: "",
    passport_no: "",
    valid_until: "",
    country_of_citizenship: "",
    country_of_issue: "",
    passport_front: "",
    passport_back: "",
    qualification: "",
    experience: "",
    skill: "",
    linkedin: "",
    hackerrank: "null",
    github: "null",
    website: "null",
    languages: "",
    pincode: "",
    countryaddress: "",
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
    pincode: false,
    countryaddress: false,
  });
  const [websiterror, setwebsiterror] = useState(false);
  const [githuberror, setgithuberror] = useState(false);
  const [linkedinerror, setlinkedinerror] = useState(false);

  const handlechange = async (e) => {
    const { name, value } = e.target;
    if (name === "countryaddress") {
      setstatelist([]);
      var country = await country_and_states.country.filter((data) => {
        return data.code == value;
      });
      setformdata((values) => ({ ...values, [name]: country[0].name }));
      setstatelist(country_and_states.states[value]);
    } else if (name === "website") {
      const urlPattern =
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\.[a-z]{2,})?\/?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]+$/;
      if (value.length !== 0) {
        if (!urlPattern.test(value)) {
          setwebsiterror(true);
        } else {
          setwebsiterror(false);
        }
      } else {
        setwebsiterror(false);
      }
      setformdata((values) => ({ ...values, [name]: value }));
    } else if (name === "github") {
      const urlPattern =
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\.[a-z]{2,})?\/?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]+$/;
      if (value.length !== 0) {
        if (!urlPattern.test(value)) {
          setgithuberror(true);
        } else {
          setgithuberror(false);
        }
      } else {
        setgithuberror(false);
      }
      setformdata((values) => ({ ...values, [name]: value }));
    } else if (name === "linkedin") {
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
      setformdata((values) => ({ ...values, [name]: value }));
    } else if (name === "phone") {
      const newValue = Math.max(1, Math.min(10, value));
      setformdata((values) => ({ ...values, [name]: newValue }));
    } else {
      setformdata((values) => ({ ...values, [name]: value }));
    }
  };
  async function pageHandler(e) {
    setfinalerrorstatus(false);
    if (isPage === "page1") {
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
        pincode: false,
        countryaddress: false,
      });
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
      } else if (formdata.email.match(validRegex)) {
        if (formdata.phone.length === 0) {
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
        } else if (formdata.city.length === 0) {
          setformdataerror((values) => ({
            ...values,
            address1: false,
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
        } else if (formdata.pincode.length === 0) {
          setformdataerror((values) => ({
            ...values,
            state: false,
          }));
          setformdataerror((values) => ({
            ...values,
            pincode: true,
          }));
        } else if (formdata.aadhaar_number.length === 0) {
          setformdataerror((values) => ({
            ...values,
            pincode: false,
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
            pincode: false,
            countryaddress: false,
          });
          setIsLoading(true);

          var newobj = {
            username: userdata[0].username,
            phone: formdata.phone,
            title: formdata.title,
            date_of_birth: formdata.dob,
            first_name: `${formdata.firstname} ${formdata.lastname}`,
            role: "3",
            onboarding_status: 2,
            address: {
              address: `${formdata.address1} ${formdata.address2}`,
              city: formdata.city,
              state: formdata.state,
              pincode: formdata.pincode,
              country: formdata.countryaddress,
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
              `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${userid}/`,
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
              return err.response;
            });

          if (
            updatedata.message ===
            "User and Associated Info updated successfully"
          ) {
            setIsPage("page2");
            routeHandler();
            dispatch(
              storeAction.onboarding_statusHander({
                onboarding_status: 2,
              })
            );
            setfinalerrorstatus(false);
            setfinalerror(null);
            setfinalerrortype(null);
            setIsLoading(false);
          } else {
            setIsLoading(false);
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
                          updatedata.passport_info.passport_validity ===
                          undefined
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
        setformdataerror((values) => ({
          ...values,
          email: false,
        }));
      } else {
        setformdataerror((values) => ({
          ...values,
          lastname: false,
        }));
        setformdataerror((values) => ({
          ...values,
          email: true,
        }));
      }
    } else if (isPage === "page2") {
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
        skilllength: false,
      });

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
      } else if (skill.length === 0) {
        setformdataerror((values) => ({
          ...values,
          experience: false,
        }));
        setformdataerror((values) => ({
          ...values,
          skill: true,
        }));
      } else if (skill.length < 5) {
        setformdataerror((values) => ({
          ...values,
          skill: false,
        }));
        setformdataerror((values) => ({
          ...values,
          skilllength: true,
        }));
      } else if (formdata.linkedin.length === 0) {
        setformdataerror((values) => ({
          ...values,
          skilllength: false,
        }));
        setformdataerror((values) => ({
          ...values,
          linkedin: true,
        }));
      } else {
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
          skilllength: false,
        });
        setIsLoading(true);
        if (row[0].languages.length === 0) {
          setlanuageerror(true);
          setlevelerror(false);
        } else if (row[0].level.length === 0) {
          setlanuageerror(false);
          setlevelerror(true);
        } else {
          setlanuageerror(false);
          setlevelerror(false);
          const arrayOfStrings = row.map(
            (obj) => `${obj.languages}: ${obj.level}`
          );
          if (
            githuberror === false &&
            linkedinerror === false &&
            websiterror === false
          ) {
            var newObj = {
              username: userdata[0].username,
              onboarding_status: 3,
              preference_info: {
                qualification: formdata.qualification,
                year_of_experience: formdata.experience,
                skills: skill,
                linkedin: formdata.linkedin,
                hackerrank: formdata.hackerrank,
                github: formdata.github,
                personal_website: formdata.website,
                language: arrayOfStrings,
              },
            };
            var update_data = await axios
              .put(
                `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${userid}/`,
                newObj,
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
              update_data.message ===
              "User and Associated Info updated successfully"
            ) {
              dispatch(
                storeAction.onboarding_statusHander({
                  onboarding_status: 3,
                })
              );
              setIsPage("page3");
              routeHandler();
              setfinalerrorstatus(false);
              setfinalerror(null);
              setfinalerrortype(null);
              setlanuageerror(false);
              setlevelerror(false);
              setIsLoading(false);
            }
          }
        }
        setIsLoading(false);
      }
    } else if (isPage === "page3") {
      setIsLoading(true);
      const arrayOfStrings = travelrow.map(
        (obj) =>
          `${obj.country}:${obj.year_of_travel}:${obj.duration}:${obj.purpose}:${obj.type_of_visa}:${obj.validity_of_visa}`
      );
      const arrayOfStrings1 = relocate.map(
        (obj) =>
          `${obj.are_you_willing}:${obj.preferred_countries}:${obj.how_long}`
      );
      const arrayOfStrings2 = travelwork.map(
        (obj) =>
          `${obj.country}:${obj.only_for}:${obj.duration}:${obj.readlines}`
      );
      var valuesArray = [];
      if (selectedOption !== null && selectedOption !== undefined) {
        valuesArray = selectedOption.map((country) => country.value);
      }
      var newobj1 = {
        username: userdata[0].username,
        onboarding_status: 4,
        travel_info: {
          travelled_to: arrayOfStrings,
          relocate_for_work: arrayOfStrings1,
          travel_to_for_work: arrayOfStrings2,
        },
        current_place_of_residence: travelform.current_place_of_residence,
        lived_at_current_residence: travelform.lived_at_current_residence,
      };
      var update1_data = await axios
        .put(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${userid}/`,
          newobj1,
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
      if (
        update1_data.message === "User and Associated Info updated successfully"
      ) {
        var new_obj = {
          message: `<p><b>${update1_data.user.first_name}</b> has onboarded as a candidate</p>`,
          status: "false",
          on_type: "Candidate has onboarded",
        };
        await axios
          .post(
            `${process.env.REACT_APP_LOCAL_HOST_URL}/notification/${update1_data.user.id}/`,
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
            return err.response;
          });
        let updatedObject = {
          ...userdata[0],
          travel_info: update1_data.user.travel_info,
        };
        setuserdata_new([updatedObject]);
        setIsLoading(false);
        setTimeout(() => {
          dispatch(storeAction.userdataHander({ userdata: [updatedObject] }));
        }, 2000);
        setIsPage("page4");
        routeHandler();
      }
    }
  }
  const fileInputRef = useRef(null);
  const [formtype, setformtype] = useState(null);

  const handleFileSelectClick = (data) => {
    fileInputRef.current.click();
    setformtype(data);
  };
  const [formData, setFormData] = useState(new FormData());
  const [fileuploadsuccess, setfileuploadsuccess] = useState({
    aadhaarfront: false,
    aadhaarback: false,
    pan_front: false,
    passport_front: false,
    passport_back: false,
  });
  const handleFileInputChange = async (e) => {
    formData.append("image", e.target.files[0]);
    const selectedImage = e.target.files[0];
    if (selectedImage.size > 5 * 1024 * 1024) {
      fileInputRef.current.value = "";
      alert("Image size exceeds 5 MB limit.");
    } else {
      formData.append("name", `${formtype}_${userid}`);
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
      setfileuploadsuccess((values) => ({
        ...values,
        [formtype]: true,
      }));
    }

    fileInputRef.current.value = "";
  };
  const [row, setrow] = useState([{ languages: "", level: "" }]);

  const [travelrow, settravelrow] = useState([
    {
      country: "",
      year_of_travel: "",
      duration: "",
      purpose: "",
      type_of_visa: "",
      validity_of_visa: "",
    },
  ]);

  const [travelform, settravelform] = useState({
    current_place_of_residence: "",
    lived_at_current_residence: "",
  });

  const handlechange_travel = (e) => {
    const { name, value } = e.target;
    settravelform((values) => ({ ...values, [name]: value }));
  };

  const [relocate, setrelocate] = useState([
    {
      are_you_willing: "",
      preferred_countries: "",
      how_long: "",
    },
  ]);
  const [travelwork, settravelwork] = useState([
    {
      country: "",
      only_for: "",
      duration: "",
      readlines: "",
    },
  ]);
  const addcount = () => {
    var newobj = {
      languages: "",
      level: "",
    };
    setrow((prevState) => [...prevState, newobj]);
  };

  const addcounttravel = () => {
    var newobj = {
      country: "",
      year_of_travel: "",
      duration: "",
      purpose: "",
      type_of_visa: "",
      validity_of_visa: "",
    };
    settravelrow((prevState) => [...prevState, newobj]);
  };
  const addcountwork = () => {
    var newobj = {
      country: "",
      only_for: "",
      duration: "",
      readlines: "",
    };
    settravelwork((prevState) => [...prevState, newobj]);
  };

  const addcountrelocate = () => {
    var newobj = {
      are_you_willing: "",
      preferred_countries: "",
      how_long: "",
    };
    setrelocate((prevState) => [...prevState, newobj]);
  };

  const get_value = (e, index) => {
    row[index]["languages"] = e;
    setrow([...row]);
  };

  const handlechangetravel = (value, index, name) => {
    travelrow[index][name] = value;
    settravelrow([...travelrow]);
  };

  const handlechangerelocate = (value, index, name) => {
    relocate[index][name] = value;
    setrelocate([...relocate]);
  };

  const handlechangework = (value, index, name) => {
    travelwork[index][name] = value;
    settravelwork([...travelwork]);
  };
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    CheckStage();
  }, [onboarding_status]);
  const CheckStage = async () => {
    if (onboarding_status > 3) {
      window.location.replace("/#/profile");
    } else {
      if (onboarding_status == 1) {
        setIsPage("page1");
      } else if (onboarding_status == 2) {
        setIsPage("page2");
      } else if (onboarding_status == 3) {
        setIsPage("page3");
      }
    }
  };
  const skipbtn = () => {
    setIsPage("page4");
    routeHandler();
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
                  <div className="candidateInfo h-full">
                    <h3>First & Middle Name</h3>
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
                  <div className="candidateInfo h-full">
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
                  <div className="candidateInfo h-full">
                    <h3>Email ID</h3>
                    <input
                      type="text"
                      placeholder="divyagupta@gmail.com"
                      name="email"
                      disabled
                      onChange={handlechange}
                      defaultValue={formdata.email}
                    />
                    {formdataerror.email && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Valid Email ID
                      </h6>
                    )}
                  </div>
                  <div className="candidateInfo h-full">
                    <h3>Phone no.</h3>
                    <p>
                      <select
                        className="w-[28% !important]"
                        name=""
                        id=""
                        // disabled
                      >
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
                        placeholder="9876543210"
                        name="phone"
                        defaultValue={formdata.phone}
                        maxLength={12}
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        onChange={handlechange}
                      />
                    </p>
                    {formdataerror.phone && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Valid Phone
                      </h6>
                    )}
                  </div>
                </div>
                <div className="candidateDetails1">
                  <div className="candidateInfo h-full">
                    <h3>Date of birth</h3>
                    <input
                      type="date"
                      placeholder="DD/MM/YYYY"
                      name="dob"
                      max="2024-12-31"
                      min="1979-12-31"
                      onChange={handlechange}
                      defaultValue={formdata.dob}
                    />
                    {formdataerror.dob && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Date of birth
                      </h6>
                    )}
                  </div>
                  <div className="candidateInfo h-full">
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
                  <div className="candidateInfo h-full">
                    <div className="addressLine">
                      <h3>Address line 2</h3>
                      <h3 className="option">Optional</h3>
                    </div>
                    <input
                      type="text"
                      placeholder="Optional"
                      name="address2"
                      onChange={handlechange}
                      defaultValue={formdata.address2}
                    />
                  </div>
                </div>
                <div className="candidateAddress">
                  <div className="candidatePlace">
                    <div className="candidateInfo h-full">
                      <h3>Country</h3>
                      <div className="candidateState">
                        <select
                          name="countryaddress"
                          onChange={handlechange}
                          defaultValue={formdata.countryaddress}
                        >
                          <option value="">Country</option>
                          {country_and_states.country.length !== 0
                            ? country_and_states.country.map((item, index) => (
                                <option value={item.code} key={index}>
                                  {item.name}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                      {formdataerror.countryaddress && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Select country
                        </h6>
                      )}
                    </div>
                    <div className="candidateInfo h-full">
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
                  </div>
                  <div className="candidatePlace">
                    <div className="candidateInfo h-full">
                      <h3>State</h3>
                      <div className="candidateState">
                        <select
                          id=""
                          name="state"
                          onChange={handlechange}
                          defaultValue={formdata.state}
                        >
                          <option value="">Select</option>
                          {statelist.length !== 0 ? (
                            statelist.map((data, index) => (
                              <option value={data.name} key={index}>
                                {data.name}
                              </option>
                            ))
                          ) : (
                            <option value="">Select</option>
                          )}
                        </select>
                      </div>
                      {formdataerror.state && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Select State
                        </h6>
                      )}
                    </div>
                    <div className="candidateInfo h-full">
                      <h3>Pinode</h3>
                      <input
                        type="text"
                        placeholder="e.g. 560013"
                        name="pincode"
                        onChange={handlechange}
                        defaultValue={formdata.pincode}
                        maxLength={6}
                      />
                      {formdataerror.pincode && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Enter Pincode
                        </h6>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="candidateRegistrationInner">
              <div className="DocumentDetails">
                <h2>DOCUMENTS</h2>

                <div className="documentDetails1">
                  <div className="candidateInfo h-full">
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
                          Drop your files here or{" "}
                          <span className="browser">browse</span>
                        </h3>
                        <p>Maximum size: 5MB</p>
                        <p title=""> PDF JPEG and PNG accepted</p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        name="aadhaarfront"
                        accept=".pdf,.jpeg,.jpg,.png"
                        onChange={handleFileInputChange}
                      />
                      {formdataerror.aadhaarfront && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Upload Aadhaar Card Front / Id proof
                        </h6>
                      )}
                      {fileuploadsuccess.aadhaarfront && (
                        <h6 className="text-green-500 text-xs font-semibold mt-2">
                          Aadhaar Card Front / Id Proof Uploaded Successfully
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
                          Drop your files here or{" "}
                          <span className="browser">browse</span>
                        </h3>
                        <p>Maximum size: 5MB</p>
                        <p title=""> PDF JPEG and PNG accepted</p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        name="aadhaarback"
                        accept=".pdf,.jpeg,.jpg,.png"
                        onChange={handleFileInputChange}
                      />
                      {formdataerror.aadhaarback && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Upload Aadhaar Card Back / Id Proof
                        </h6>
                      )}
                      {fileuploadsuccess.aadhaarback && (
                        <h6 className="text-green-500 text-xs font-semibold mt-2">
                          Aadhaar Card Back / Id Proof Uploaded Successfully
                        </h6>
                      )}
                    </div>
                  </div>
                  <div className="candidateInfo h-full">
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
                        Drop your files here or{" "}
                        <span className="browser">browse</span>
                      </h3>
                      <p>Maximum size: 5MB</p>
                      <p title=""> PDF JPEG and PNG accepted</p>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      name="pan_front"
                      accept=".pdf,.jpeg,.jpg,.png"
                      onChange={handleFileInputChange}
                    />
                    {formdataerror.pan_front && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Upload PAN Front / Tax Id
                      </h6>
                    )}
                    {fileuploadsuccess.pan_front && (
                      <h6 className="text-green-500 text-xs font-semibold mt-2">
                        PAN Card Front / Tax Id Proof Uploaded Successfully
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
                    <div className="candidateInfo h-full">
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
                    <div className="candidateInfo h-full">
                      <h3>Valid until</h3>
                      <input
                        type="date"
                        placeholder="DD/MM/YYYY"
                        name="valid_until"
                        onChange={handlechange}
                        pattern="\d{4}-\d{2}-\d{2}"
                        defaultValue={formdata.valid_until}
                      />
                      {formdataerror.valid_until && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Enter Valid until
                        </h6>
                      )}
                    </div>

                    <div className="candidateInfo h-full">
                      <h3>Country of Citizenship</h3>
                      {/* <p>
                        <input
                          type="text"
                          placeholder="e.g. India"
                          name="country_of_citizenship"
                          onChange={handlechange}
                          defaultValue={formdata.country_of_citizenship}
                        />
                      </p> */}
                      <div className="w-full">
                        <select
                          name="country_of_citizenship"
                          onChange={handlechange}
                          className="w-full"
                          defaultValue={formdata.country_of_citizenship}
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
                      {formdataerror.country_of_citizenship && (
                        <h6 className="text-red-500 text-xs font-semibold mt-2">
                          Please Enter Country of Citizenship
                        </h6>
                      )}
                    </div>
                    <div className="candidateInfo h-full">
                      <h3>Country of Issue</h3>
                      {/* <p>
                        <input
                          type="text"
                          placeholder="e.g. Zimbabwe"
                          name="country_of_issue"
                          onChange={handlechange}
                          defaultValue={formdata.country_of_issue}
                        />
                      </p> */}
                      <div className="w-full">
                        {" "}
                        <select
                          name="country_of_issue"
                          className="w-full"
                          onChange={handlechange}
                          defaultValue={formdata.country_of_issue}
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
                          Drop your files here or{" "}
                          <span className="browser">browse</span>
                        </h3>
                        <p>Maximum size: 5MB</p>
                        <p title=""> PDF JPEG and PNG accepted</p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        name="passport_front"
                        accept=".pdf,.jpeg,.jpg,.png"
                        onChange={handleFileInputChange}
                      />
                      {fileuploadsuccess.passport_front && (
                        <h6 className="text-green-500 text-xs font-semibold mt-2">
                          Passport Card Front Uploaded Successfully
                        </h6>
                      )}
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
                          Drop your files here or{" "}
                          <span className="browser">browse</span>
                        </h3>
                        <p>Maximum size: 5MB</p>
                        <p title=""> PDF JPEG and PNG accepted</p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        name="passport_back"
                        accept=".pdf,.jpeg,.jpg,.png"
                        onChange={handleFileInputChange}
                      />
                      {fileuploadsuccess.passport_back && (
                        <h6 className="text-green-500 text-xs font-semibold mt-2">
                          Passport Card Back Uploaded Successfully
                        </h6>
                      )}
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
              {isLoading === false ? (
                <button className="nextbtn" id="page2" onClick={pageHandler}>
                  Next
                </button>
              ) : (
                <button id="Signup" className="signUpCompBodyButtonLoading">
                  <FiLoader className="loadingIcon" />
                </button>
              )}
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
          <div className="candidateRegistration1" title="">
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
                  <div className="candidateInfo h-full">
                    <h3>Primary Technical Skill</h3>
                    <input
                      type="text"
                      placeholder="e.g. Java Developer"
                      name="qualification"
                      onChange={handlechange}
                    />
                    {formdataerror.qualification && (
                      <h6 className="text-red-500 text-xs font-semibold mt-2">
                        Please Enter Your Current Qualification
                      </h6>
                    )}
                  </div>

                  <div className="candidateInfo h-full">
                    <h3>Total years of Experience</h3>
                    <p>
                      <input
                        type="number"
                        placeholder="0-1"
                        name="experience"
                        onChange={handlechange}
                      />
                      {/* <select id=""
                       name="experience"
                       onChange={handlechange}>
                        <option value="">Year and Months</option>
                        <option value="">0-6 Months</option>
                        <option value="">6-12 Months</option>
                      </select> */}
                      {/* <select name="experience" onChange={handlechange}>
                        <option value="">Year and Months</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>{" "}
                        <option value="4">4</option>
                      </select> */}
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
                      <FaAngleDown onClick={filterdata1} />
                    </div>
                    {dropDown && (
                      <div className="searchContent1">
                        <div className="searchContent">
                          {dropDownOpen.map((option, index) => (
                            <h3
                              onClick={() => {
                                getdata(option);
                              }}
                              key={index}
                            >
                              {option}
                            </h3>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* <div className="Skills1">
                  <div className="Skills">
                    <div className="SkillsHead">
                      <h2>SKILLS</h2>
                      <h2>Minimum 5 skills and 3 top skills</h2>
                    </div>
                    <div className="skillSets">
                      {skill.length !== 0
                        ? skill.map((data, index) => (
                            <div className="skillList" key={index}>
                              <div className="skillSet">
                                <div className="skillbtn">
                                  <RxHamburgerMenu />
                                  <button>
                                    <CiStar />
                                    <h3>Top Skill</h3>
                                  </button>
                                  <h3>{data}</h3>
                                </div>
                              </div>
                              <MdDeleteOutline
                                className="deleteIcon cursor-pointer"
                                onClick={() => {
                                  getdata(data);
                                }}
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div> */}
                <Dragoption skill={skill} getdata={getdata} />
                {formdataerror.skill && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Skills
                  </h6>
                )}
                {formdataerror.skilllength && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Minimum 5 skills Required
                  </h6>
                )}
              </div>
            </div>

            <div className="Accounts">
              <div className="candidateInfo h-full">
                <div className="addressLine">
                  <h3>LinkedIn</h3>
                </div>
                <input
                  type="text"
                  placeholder="Linkedin.com/in/yourusername"
                  name="linkedin"
                  onChange={handlechange}
                />
                {formdataerror.linkedin && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter LinkedIn
                  </h6>
                )}
                {linkedinerror && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Valid LinkedIn Url
                  </h6>
                )}
              </div>
              <div className="candidateInfo h-full">
                <div className="addressLine">
                  {displaymessages && (
                    <div className="warningmessage">
                      <h6>
                        In case you have not taken a HackerRack Test but have
                        undertaken another globally recognised test, please
                        mention the name of the test and the score
                      </h6>
                    </div>
                  )}
                  {/* <h3>
                    HackerRank{" "}
                    <PiWarningCircle
                      className="warningicon"
                      onMouseLeave={displaymsg1}
                      onMouseOver={displaymsg}
                    />
                  </h3>
                  <h3>Optional</h3> */}
                  <h3>Hacker Rank Score</h3>
                  <h3 className="option">Optional</h3>

                  {displaymessages && (
                    <div className="warningmessage">
                      <h6>
                        In case you have not taken a HackerRack Test but have
                        undertaken another globally recognised test, please
                        mention the name of the test and the score
                      </h6>
                    </div>
                  )}
                  {/* <h3>
                    HackerRank{" "}
                    <PiWarningCircle
                      className="warningicon"
                      onMouseLeave={displaymsg1}
                      onMouseOver={displaymsg}
                    />
                  </h3>
                  <h3>Optional</h3> */}
                </div>
                <input
                  type="number"
                  placeholder="Link to proifle"
                  name="hackerrank"
                  onChange={handlechange}
                />
                {/* {formdataerror.hackerrank && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter HackerRank
                  </h6>
                )} */}
              </div>
              <div className="candidateInfo h-full">
                <div className="addressLine">
                  <h3>GitHub</h3>
                  <h3 className="option">Optional</h3>
                </div>
                <input
                  type="text"
                  placeholder="github.com/yourusername"
                  name="github"
                  onChange={handlechange}
                />
                {formdataerror.github && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter GitHub
                  </h6>
                )}
                {githuberror && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Valid GitHub Link
                  </h6>
                )}
              </div>
              <div className="candidateInfo h-full">
                <div className="addressLine">
                  <h3>Personal Website</h3>
                  <h3 className="option">Optional</h3>
                </div>
                <input
                  type="text"
                  placeholder="http://"
                  name="website"
                  onChange={handlechange}
                />
                {formdataerror.website && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Personal Website
                  </h6>
                )}
                {websiterror && (
                  <h6 className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Valid Website Link
                  </h6>
                )}
              </div>
            </div>
            <div className="languages">
              {row.length !== 0
                ? row.map((datanew, index) => (
                    <div className="addLanguages" key={index}>
                      <div className="addLanguageInner">
                        <h3>Languages</h3>
                        <input
                          type="text"
                          placeholder="e.g. Kannada"
                          name="language"
                          onChange={(e) => {
                            get_value(e.target.value, index);
                          }}
                          defaultValue={datanew.languages}
                        />
                      </div>
                      <div className="selectLanguages">
                        <h3>Proficiency</h3>

                        <div className="candidateState">
                          {/* <input
                            type="text"
                            defaultValue={datanew.level}
                            // ref={inputref1}
                            // onChange={dropDownHandler1}
                            placeholder="My level is"
                          /> */}

                          <select
                            defaultValue={datanew.level}
                            ref={inputref1}
                            onChange={(e) => {
                              filterdata(e.target.value, index);
                            }}
                          >
                            <option value="">Select</option>
                            <option value="Basic">Basic</option>
                            <option value="Conversational">
                              Conversational
                            </option>
                            <option value="Proficient">Proficient</option>
                            <option value="Fluent">Fluent</option>
                          </select>
                          {/* <FaAngleDown
                            onClick={() => {
                              dropDownHandler1(index);
                            }}
                          /> */}
                        </div>
                        {levelerror && (
                          <h6 className="text-red-500 text-xs font-semibold mt-2">
                            Please Enter Proficiency
                          </h6>
                        )}
                        {/* <div className="Level">
                          {dropDownOpen1.map((option, index1) => (
                            <h3
                              onClick={() => {
                                filterdata(option, index);
                              }}
                              key={index1}
                            >
                              {option}
                            </h3>
                          ))}
                        </div> */}
                        {indexvalue == index
                          ? dropDown1 && (
                              <div className="Level">
                                {dropDownOpen1.map((option, index1) => (
                                  <h3
                                    onClick={() => {
                                      filterdata(option, index);
                                    }}
                                    key={index1}
                                  >
                                    {option}
                                  </h3>
                                ))}
                              </div>
                            )
                          : null}
                      </div>
                    </div>
                  ))
                : null}

              {lanuageerror && (
                <h6 className="text-red-500 text-xs font-semibold mt-2">
                  Please Enter Languages
                </h6>
              )}

              <button className="addLanguagesButton" onClick={addcount}>
                + Add more
              </button>
            </div>

            <div className="candidateBottom mt-5">
              {/* <button className="Agree">
                <input type="checkbox" />I agree to the Hirein5{" "}
                <span>terms & conditions </span> and{" "}
                <span> privacy policy</span>
              </button> */}

              {isLoading === false ? (
                <button className="nextbtn" id="page3" onClick={pageHandler}>
                  Next
                </button>
              ) : (
                <button id="Signup" className="signUpCompBodyButtonLoading">
                  <FiLoader className="loadingIcon" />
                </button>
              )}
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
          <div className="candidateRegistration1" title="">
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
                {travelrow.length !== 0
                  ? travelrow.map((data, index) => (
                      <div key={index}>
                        <div className="travelDetails">
                          <div className="candidateInfo h-full">
                            <h3>Country</h3>
                            <div className="candidateState">
                              <select
                                id=""
                                name="country"
                                onChange={(e) => {
                                  handlechangetravel(
                                    e.target.value,
                                    index,
                                    "country"
                                  );
                                }}
                                defaultValue={data.country}
                              >
                                <option value="">Country</option>
                                {country_and_states.country.length !== 0
                                  ? country_and_states.country.map(
                                      (item, index) => (
                                        <option value={item.name} key={index}>
                                          {item.name}
                                        </option>
                                      )
                                    )
                                  : null}
                              </select>
                            </div>
                            {formdataerror.country && (
                              <h6 className="text-red-500 text-xs font-semibold mt-2">
                                Please Select Country
                              </h6>
                            )}
                          </div>
                          <div className="candidateInfo h-full">
                            <h3>Year of travel</h3>
                            <input
                              type="text"
                              placeholder="YYYY"
                              onChange={(e) => {
                                handlechangetravel(
                                  e.target.value,
                                  index,
                                  "year_of_travel"
                                );
                              }}
                              defaultValue={data.year_of_travel}
                            />
                          </div>

                          <div className="candidateInfo h-full">
                            <h3>Duration (In Weeks)</h3>
                            <p>
                              <input
                                type="number"
                                placeholder=""
                                onChange={(e) => {
                                  handlechangetravel(
                                    e.target.value,
                                    index,
                                    "duration"
                                  );
                                }}
                                defaultValue={data.duration}
                              />
                              {/* <select
                                id=""
                                name="duration"
                                onChange={(e) => {
                                  handlechangetravel(
                                    e.target.value,
                                    index,
                                    "duration"
                                  );
                                }}
                                defaultValue={data.duration}
                              >
                                <option value="">Select duration</option>
                                <option value="3-6 months">3-6 months</option>
                                <option value="6-12 month">6-12 months</option>
                                <option value="12 months"> 12 months</option>
                              </select> */}
                            </p>
                          </div>
                        </div>
                        <div className="travelInfo">
                          <div className="candidateInfo h-full">
                            <h3>Purpose</h3>
                            <p>
                              <input
                                type="text"
                                placeholder="Work"
                                onChange={(e) => {
                                  handlechangetravel(
                                    e.target.value,
                                    index,
                                    "purpose"
                                  );
                                }}
                                defaultValue={data.purpose}
                              />
                            </p>
                          </div>
                          <div className="candidateInfo h-full">
                            <h3>Type of Visa</h3>
                            <input
                              type="text"
                              placeholder="H-1B"
                              onChange={(e) => {
                                handlechangetravel(
                                  e.target.value,
                                  index,
                                  "type_of_visa"
                                );
                              }}
                              defaultValue={data.type_of_visa}
                            />
                          </div>
                          <div className="candidateInfo h-full">
                            <h3>Do your Visa Valid?</h3>
                            <div className="validityButton">
                              <button
                                onClick={validityHandler}
                                id="no"
                                className={
                                  validity == "no"
                                    ? "validityNo"
                                    : "validityNoDisable"
                                }
                              >
                                NO
                              </button>
                              <button
                                onClick={validityHandler}
                                id="yes"
                                className={
                                  validity == "yes"
                                    ? "validityYes"
                                    : "validityYesDisable"
                                }
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                          {validity == "yes" && (
                            <div className="candidateInfo h-full">
                              <h3>Validity of Visa</h3>
                              <input
                                type="date"
                                placeholder="DD/MM/YYYY"
                                onChange={(e) => {
                                  handlechangetravel(
                                    e.target.value,
                                    index,
                                    "validity_of_visa"
                                  );
                                }}
                                defaultValue={data.validity_of_visa}
                              />
                            </div>
                          )}
                        </div>
                        <hr className="border border-gray-400 my-5" />
                      </div>
                    ))
                  : null}

                <button className="travelInfoButton" onClick={addcounttravel}>
                  + Add more
                </button>
              </div>
            </div>

            <div className="travelResidence">
              <h2>RESIDENCY DETAILS</h2>
              <div className="candidateInfo h-full">
                <h3>Current place of residence</h3>
                <p>
                  {/* <input
                    type="text"
                    placeholder="Country"
                    name="current_place_of_residence"
                    defaultValue={travelform.current_place_of_residence}
                    onChange={handlechange_travel}
                  /> */}

                  <select
                    name="current_place_of_residence"
                    defaultValue={travelform.current_place_of_residence}
                    onChange={handlechange_travel}
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
                </p>
              </div>
              <div className="candidateInfo h-full">
                <h3>How long have you lived at your current residence?</h3>
                <p>
                  <input
                    type="number"
                    placeholder=""
                    name="lived_at_current_residence"
                    defaultValue={travelform.lived_at_current_residence}
                    onChange={handlechange_travel}
                  />
                </p>
              </div>
            </div>

            <div className="travelResidence">
              <h2>COUNTRIES YOU'RE WILLING TO TRAVEL TO FOR WORK</h2>
              {travelwork.length !== 0
                ? travelwork.map((data, index) => (
                    <>
                      <div className="candidateInfo h-full" key={index}>
                        <div className="infoHead">
                          <h3>Country</h3>
                          <h3 title="">Select upto 3 countries</h3>
                        </div>
                        <select
                          id=""
                          name="country"
                          onChange={(e) => {
                            handlechangework(e.target.value, index, "country");
                          }}
                          defaultValue={data.country}
                        >
                          <option value="">Select Country</option>
                          <option value="Japan">Japan</option>
                          <option value="Dubai">Dubai</option>
                          <option value="Saudi Arabia"> Saudi Arabia</option>
                          <option value="Singapore"> Singapore</option>
                          <option value="Malaysia"> Malaysia</option>
                        </select>
                      </div>
                      <div className="candidateInfo h-full">
                        <h3>Only for</h3>
                        <p>
                          <select
                            name="only_for"
                            onChange={(e) => {
                              handlechangework(
                                e.target.value,
                                index,
                                "only_for"
                              );
                            }}
                            defaultValue={data.only_for}
                            className="w-full"
                          >
                            <option value="">Only for</option>
                            <option value="Work Onsite">Work Onsite</option>
                            <option value="Short-term business visit">
                              Short-term business visit
                            </option>
                          </select>
                        </p>
                      </div>
                      <div className="travelDuration">
                        <div className="candidateInfo h-full">
                          <h3>Duration</h3>
                          <p>
                            <select
                              id=""
                              name="duration"
                              onChange={(e) => {
                                handlechangework(
                                  e.target.value,
                                  index,
                                  "duration"
                                );
                              }}
                              defaultValue={data.duration}
                            >
                              <option value="">Select duration</option>
                              <option value="3-6 months">3-6 months</option>
                              <option value="6-12 months">6-12 months</option>
                              <option value=">12 months">
                                {" "}
                                {">"}12 months
                              </option>
                            </select>
                          </p>
                        </div>
                        <div className="candidateInfo h-full">
                          <h3>Readlines to Travel</h3>
                          <p>
                            <select
                              id=""
                              name="readlines"
                              onChange={(e) => {
                                handlechangework(
                                  e.target.value,
                                  index,
                                  "readlines"
                                );
                              }}
                              defaultValue={data.readlines}
                            >
                              <option value="">Select Travel Readlines</option>
                              <option value="Immediate">Immediate</option>
                              <option value="In the next 6 months">
                                In the next 6 months
                              </option>
                              <option value="6 months">6 months</option>
                            </select>
                          </p>
                        </div>
                      </div>
                    </>
                  ))
                : null}
              <button className="travelBottomButton" onClick={addcountwork}>
                + Add more
              </button>
            </div>
            <div className="travelBottom">
              <h2>COUNTRIES YOU'RE WILLING TO RELOCATE FOR WORK</h2>
              {relocate.map((data, index) => (
                <div key={index}>
                  <div className="candidateInfo h-full">
                    <h3>Willingness to relocate</h3>
                    <p>
                      {/* <input
                        type="text"
                        placeholder="Yes"
                        onChange={(e) => {
                          handlechangerelocate(
                            e.target.value,
                            index,
                            "are_you_willing"
                          );
                        }}
                        defaultValue={relocate.are_you_willing}
                      /> */}
                      <select
                        name=""
                        id=""
                        onChange={(e) => {
                          handlechangerelocate(
                            e.target.value,
                            index,
                            "are_you_willing"
                          );
                        }}
                        defaultValue={relocate.are_you_willing}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </p>
                  </div>
                  <div className="candidateInfo h-full">
                    <div className="infoDetails">
                      <h3>Preferred countries</h3>
                      {/* <h3 title="">Select up to 3 countries</h3> */}
                    </div>
                    <p>
                      {/* <input
                        type="text"
                        placeholder=""
                        onChange={(e) => {
                          handlechangerelocate(
                            e.target.value,
                            index,
                            "preferred_countries"
                          );
                        }}
                        defaultValue={relocate.preferred_countries}
                      /> */}
                      <select
                        name=""
                        id=""
                        onChange={(e) => {
                          handlechangerelocate(
                            e.target.value,
                            index,
                            "preferred_countries"
                          );
                        }}
                        defaultValue={relocate.preferred_countries}
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
                    </p>
                  </div>
                  <div className="candidateInfo h-full">
                    <h3>Preferred duration for relocation</h3>
                    <p>
                      <select
                        name=""
                        id=""
                        onChange={(e) => {
                          handlechangerelocate(
                            e.target.value,
                            index,
                            "how_long"
                          );
                        }}
                        defaultValue={relocate.how_long}
                      >
                        <option value="">Select duration</option>
                        <option value="6-12 months">6-12 months</option>
                        <option value="> 12months"> {">"}12months</option>
                      </select>
                    </p>
                  </div>
                  <hr className="border border-gray-400 mt-5" />
                </div>
              ))}

              <button className="travelBottomButton" onClick={addcountrelocate}>
                + Add more
              </button>
            </div>

            <div className="Bottombtns">
              {isLoading === false ? (
                <button className="nextbtn" id="page4" onClick={pageHandler}>
                  Next
                </button>
              ) : (
                <button id="Signup" className="signUpCompBodyButtonLoading">
                  <FiLoader className="loadingIcon" />
                </button>
              )}
              <button onClick={skipbtn} id="page4" className="skipbtn">
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
