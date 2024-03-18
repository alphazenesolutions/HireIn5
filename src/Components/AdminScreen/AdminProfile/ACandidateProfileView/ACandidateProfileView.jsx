/* eslint-disable no-redeclare */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "./ACandidateProfileView.css";
import back from "../../../../assests/back.png";
import editOutline from "../../../../assests/pencil.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import RangeSlider from "../../../MaterialUi/Range/RangeSlider";
import { FiLoader } from "react-icons/fi";
import Avatar from "react-avatar";
import country_and_states from "../../../../assests/country-states";
import axios from "axios";
import file from "../../../../assests/file-text.png";
import { BsThreeDots } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import approvedTick from "../../../../assests/approvedTick.svg";
import { IoMdArrowBack } from "react-icons/io";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ACandidateProfileView = () => {
  const customToastStyle = {
    background: "#14B8A6", // Change this to the desired background color
    // color: "#FFFFF", // Text color
    "& .Toastify__toast-body svg": {
      fill: "var(--toastify-color-light)", // Color of the success icon
    },
    color: "white", // Text color
    "--toastify-icon-color-success": "white",
  };
  const singleuser = useSelector((store) => store.singleuser);
  const alluserdata = useSelector((store) => store.alluserdata);
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isToggle, setIsToggle] = useState("personal");
  const [isToggle1, setIsToggle1] = useState("remote");

  const toggleHandler = (e) => {
    setIsToggle(e.target.id);
  };
  const toggleHandler1 = (e) => {
    setIsToggle1(e.target.id);
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

  const dropDownHandler = () => {
    dispatch(storeAction.isPopUpHander("approvedropdown"));
  };
  const CloseOverlay = () => {
    dispatch(storeAction.isPopUpHander());
  };
  const approvrbtn = async () => {
    setIsLoading(true);
    var obj = {
      username: singleuser[0].username,
      apprual: true,
    };
    var updatedata = await axios
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
        return err.response;
      });
    if (
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      toast.success("Candidate approved", {
        autoClose: 2000,
        transition: Slide,
        style: customToastStyle,
      });
      let updatedObject = {
        ...singleuser[0],
        apprual: true,
      };
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(updatedObject);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [updatedObject] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
    // dispatch(storeAction.isPopUpHander());
  };

  const [loading, setIsLoading] = useState(false);

  const [rangevalue, setrangevalue] = useState([50, 250]);
  useEffect(() => {
    Getallinfo();
  }, [singleuser]);

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    current_address: "",
    city: "",
    state: "",
    pincode: "",
    aadhar: "",
    pan: "",
    country: "",
    current_place_of_residence: "",
    lived_at_current_residence: "",

    qualification: "",
    experience: "",
    skill: "",
    linkedin: "",
    hackerrank: "",
    github: "",
    website: "",
    languages: "",
  });
  const [statelist, setstatelist] = useState([]);
  var [certificate, setcertificate] = useState([]);
  const Getallinfo = async () => {
    if (singleuser.length !== 0) {
      setresumevideo(
        singleuser[0].video_resume !== null ? singleuser[0].video_resume : ""
      );
      setformdata({
        name: singleuser[0].first_name,
        email: singleuser[0].email,
        dob: singleuser[0].date_of_birth,
        phone: singleuser[0].phone,
        current_address:
          singleuser[0].address !== null ? singleuser[0].address.address : null,
        city:
          singleuser[0].address !== null ? singleuser[0].address.city : null,
        state:
          singleuser[0].address !== null ? singleuser[0].address.state : null,
        pincode:
          singleuser[0].address !== null ? singleuser[0].address.pincode : null,
        aadhar:
          singleuser[0].kyc_info !== null
            ? singleuser[0].kyc_info.aadhar_number
            : null,
        pan:
          singleuser[0].kyc_info !== null
            ? singleuser[0].kyc_info.pan_number
            : null,
        country:
          singleuser[0].address !== null ? singleuser[0].address.country : null,
        current_place_of_residence: singleuser[0].current_place_of_residence,
        lived_at_current_residence: singleuser[0].lived_at_current_residence,

        qualification:
          singleuser[0].preference_info !== null
            ? singleuser[0].preference_info.qualification
            : null,
        experience:
          singleuser[0].preference_info !== null
            ? singleuser[0].preference_info.year_of_experience
            : null,
        linkedin:
          singleuser[0].preference_info !== null
            ? singleuser[0].preference_info.linkedin
            : null,
        github:
          singleuser[0].preference_info !== null
            ? singleuser[0].preference_info.github
            : null,
        hackerrank:
          singleuser[0].preference_info !== null
            ? singleuser[0].preference_info.hackerrank
            : null,
        website:
          singleuser[0].preference_info !== null
            ? singleuser[0].preference_info.website
            : null,
        skill:
          singleuser[0].preference_info !== null
            ? singleuser[0].preference_info.skills.toString()
            : null,
      });
      if (singleuser[0].travel_info !== null) {
        if (singleuser[0].travel_info.travelled_to.length !== 0) {
          var newarray = [];
          for (
            var i = 0;
            i < singleuser[0].travel_info.travelled_to.length;
            i++
          ) {
            newarray.push({
              country:
                singleuser[0].travel_info.travelled_to[i].split(":")[0]
                  .length !== 0
                  ? singleuser[0].travel_info.travelled_to[i]
                      .split(":")[0]
                      .replace(/\s/g, "")
                  : "",
              year_of_travel:
                singleuser[0].travel_info.travelled_to[i].split(":")[1]
                  .length !== 0
                  ? singleuser[0].travel_info.travelled_to[i]
                      .split(":")[1]
                      .replace(/\s/g, "")
                  : "",
              duration:
                singleuser[0].travel_info.travelled_to[i].split(":")[2]
                  .length !== 0
                  ? singleuser[0].travel_info.travelled_to[i]
                      .split(":")[2]
                      .replace(/\s/g, "")
                  : "",
              purpose:
                singleuser[0].travel_info.travelled_to[i].split(":")[3]
                  .length !== 0
                  ? singleuser[0].travel_info.travelled_to[i]
                      .split(":")[3]
                      .replace(/\s/g, "")
                  : "",
              type_of_visa:
                singleuser[0].travel_info.travelled_to[i].split(":")[4]
                  .length !== 0
                  ? singleuser[0].travel_info.travelled_to[i]
                      .split(":")[4]
                      .replace(/\s/g, "")
                  : "",
              validity_of_visa:
                singleuser[0].travel_info.travelled_to[i].split(":")[5]
                  .length !== 0
                  ? singleuser[0].travel_info.travelled_to[i]
                      .split(":")[5]
                      .replace(/\s/g, "")
                  : "",
            });
          }
          settravelrow(newarray);
        }
        settravelform({
          current_place_of_residence: singleuser[0].current_place_of_residence,
          lived_at_current_residence: singleuser[0].lived_at_current_residence,
        });

        if (singleuser[0].travel_info.relocate_for_work.length !== 0) {
          var new_array = [];
          for (
            var j = 0;
            j < singleuser[0].travel_info.relocate_for_work.length;
            j++
          ) {
            new_array.push({
              are_you_willing:
                singleuser[0].travel_info.relocate_for_work[j].split(":")[0]
                  .length !== 0
                  ? singleuser[0].travel_info.relocate_for_work[j]
                      .split(":")[0]
                      .replace(/\s/g, "")
                  : "",
              preferred_countries:
                singleuser[0].travel_info.relocate_for_work[j].split(":")[1]
                  .length !== 0
                  ? singleuser[0].travel_info.relocate_for_work[j]
                      .split(":")[1]
                      .replace(/\s/g, "")
                  : "",
              how_long:
                singleuser[0].travel_info.relocate_for_work[j].split(":")[2]
                  .length !== 0
                  ? singleuser[0].travel_info.relocate_for_work[j]
                      .split(":")[2]
                      .replace(/\s/g, "")
                  : "",
            });
          }
          setrelocate(new_array);
        }
        if (singleuser[0].travel_info.travel_to_for_work.length !== 0) {
          var new_array1 = [];
          for (
            var j = 0;
            j < singleuser[0].travel_info.travel_to_for_work.length;
            j++
          ) {
            new_array1.push({
              country:
                singleuser[0].travel_info.travel_to_for_work[j].split(":")[0]
                  .length !== 0
                  ? singleuser[0].travel_info.travel_to_for_work[j].split(
                      ":"
                    )[0]
                  : "",
              only_for:
                singleuser[0].travel_info.travel_to_for_work[j].split(":")[1]
                  .length !== 0
                  ? singleuser[0].travel_info.travel_to_for_work[j].split(
                      ":"
                    )[1]
                  : "",
              duration:
                singleuser[0].travel_info.travel_to_for_work[j].split(":")[2]
                  .length !== 0
                  ? singleuser[0].travel_info.travel_to_for_work[j].split(
                      ":"
                    )[2]
                  : "",
              readlines:
                singleuser[0].travel_info.travel_to_for_work[j].split(":")[2]
                  .length !== 0
                  ? singleuser[0].travel_info.travel_to_for_work[j].split(
                      ":"
                    )[3]
                  : "",
            });
          }
          settravelwork(new_array1);
        }
      }
      if (singleuser[0].project_details_info !== null) {
        setprojectdata({
          description:
            singleuser[0].project_details_info !== null
              ? singleuser[0].project_details_info.description
              : "",
          duration_of_project:
            singleuser[0].project_details_info !== null
              ? singleuser[0].project_details_info.duration_of_project
              : "",
          project_title:
            singleuser[0].project_details_info !== null
              ? singleuser[0].project_details_info.project_title
              : "",
          reporting_to:
            singleuser[0].project_details_info !== null
              ? singleuser[0].project_details_info.reporting_to
              : "",
          role:
            singleuser[0].project_details_info !== null
              ? singleuser[0].project_details_info.role
              : "",
          skills:
            singleuser[0].project_details_info !== null
              ? singleuser[0].project_details_info.skills !== undefined
                ? singleuser[0].project_details_info.skills.toString(" , ")
                : ""
              : "",
        });
      }
      if (singleuser[0].certificate_info !== null) {
        setcertificatedata({
          course_name:
            singleuser[0].certificate_info !== null
              ? singleuser[0].certificate_info.course_name
              : "",
          date_issued:
            singleuser[0].certificate_info !== null
              ? singleuser[0].certificate_info.date_issued
              : "",
          description:
            singleuser[0].certificate_info !== null
              ? singleuser[0].certificate_info.description
              : "",
          url:
            singleuser[0].certificate_info !== null
              ? singleuser[0].certificate_info.url
              : "",

          skills:
            singleuser[0].certificate_info !== null
              ? singleuser[0].certificate_info.skills !== undefined
                ? singleuser[0].certificate_info.skills.toString(" , ")
                : ""
              : "",
        });
      }
      if (singleuser[0].education_info !== null) {
        seteducationdata({
          cgpa:
            singleuser[0].education_info !== null
              ? singleuser[0].education_info.cgpa
              : "",
          degree:
            singleuser[0].education_info !== null
              ? singleuser[0].education_info.degree
              : "",
          education_level:
            singleuser[0].education_info !== null
              ? singleuser[0].education_info.education_level
              : "",
          study_mode:
            singleuser[0].education_info !== null
              ? singleuser[0].education_info.study_mode
              : "",
          university_name:
            singleuser[0].education_info !== null
              ? singleuser[0].education_info.university_name
              : "",
          year_of_graduation:
            singleuser[0].education_info !== null
              ? singleuser[0].education_info.year_of_graduation
              : "",
        });
        if (singleuser[0].education_info !== null) {
          setcertificate(singleuser[0].education_info.upload_file);
        }
      }
      if (singleuser[0].passport_info !== null) {
        setpassportdata({
          country_of_citizenship:
            singleuser[0].passport_info !== null
              ? singleuser[0].passport_info.country_of_citizenship
              : "",
          country_of_issue:
            singleuser[0].passport_info !== null
              ? singleuser[0].passport_info.country_of_issue
              : "",
          passport_back:
            singleuser[0].passport_info !== null
              ? singleuser[0].passport_info.passport_back
              : "",
          passport_front:
            singleuser[0].passport_info !== null
              ? singleuser[0].passport_info.passport_front
              : "",
          passport_number:
            singleuser[0].passport_info !== null
              ? singleuser[0].passport_info.passport_number
              : "",
          passport_validity:
            singleuser[0].passport_info !== null
              ? singleuser[0].passport_info.passport_validity
              : "",
        });
      }
      if (singleuser[0].kyc_info !== null) {
        setkycdata({
          aadhar_back:
            singleuser[0].kyc_info !== null
              ? singleuser[0].kyc_info.aadhar_back
              : "",
          aadhar_front:
            singleuser[0].kyc_info !== null
              ? singleuser[0].kyc_info.aadhar_front
              : "",
          aadhar_number:
            singleuser[0].kyc_info !== null
              ? singleuser[0].kyc_info.aadhar_number
              : "",
          pan_front:
            singleuser[0].kyc_info !== null
              ? singleuser[0].kyc_info.pan_front
              : "",
          pan_number:
            singleuser[0].kyc_info !== null
              ? singleuser[0].kyc_info.pan_number
              : "",
        });
      }
      console.log(singleuser[0].rate_card_info, "singleuser[0].rate_card_info");
      if (singleuser[0].rate_card_info !== null) {
        setratecard({
          remote_hourly:
            singleuser[0].rate_card_info !== null
              ? singleuser[0].rate_card_info.remote_hourly
              : "",
          remote_monthly:
            singleuser[0].rate_card_info !== null
              ? singleuser[0].rate_card_info.remote_monthly
              : "",
          remote_annualy:
            singleuser[0].rate_card_info !== null
              ? singleuser[0].rate_card_info.remote_annualy
              : "",
          onsite_hourly:
            singleuser[0].rate_card_info !== null
              ? singleuser[0].rate_card_info.onsite_hourly
              : "",
          onsite_monthly:
            singleuser[0].rate_card_info !== null
              ? singleuser[0].rate_card_info.onsite_monthly
              : "",
          onsite_annualy:
            singleuser[0].rate_card_info !== null
              ? singleuser[0].rate_card_info.onsite_annualy
              : "",
        });
      }
    } else {
      setTimeout(() => {
        Getallinfo();
      }, 1000);
    }
  };
  const handlechange = async (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      setstatelist([]);
      var country = await country_and_states.country.filter((data) => {
        return data.code == value;
      });
      setformdata((values) => ({ ...values, [name]: country[0].name }));
      setstatelist(country_and_states.states[value]);
    } else {
      setformdata((values) => ({ ...values, [name]: value }));
    }
  };
  const savebasic = async () => {
    setIsLoading(true);
    var newobj = {
      first_name: formdata.name,
      email: formdata.email,
      date_of_birth: formdata.dob,
      phone: formdata.phone,
      current_place_of_residence: formdata.current_address,
      username: singleuser[0].username,
      address: {
        address: formdata.current_address,
        city: formdata.city,
        state: formdata.state,
        country: formdata.country,
        pincode: formdata.pincode,
      },
      kyc_info: {
        aadhar_number: formdata.aadhar,
        pan_number: formdata.pan,
      },
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const saveplace = async () => {
    setIsLoading(true);
    var newobj = {
      current_place_of_residence: formdata.current_place_of_residence,
      lived_at_current_residence: formdata.lived_at_current_residence,
      username: singleuser[0].username,
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const saveprimary = async () => {
    setIsLoading(true);
    var newobj = {
      username: singleuser[0].username,
      preference_info: {
        github: formdata.github,
        hackerrank: formdata.hackerrank,
        linkedin: formdata.linkedin,
        qualification: formdata.qualification,
        skills: formdata.skill.split(","),
        year_of_experience: formdata.experience,
      },
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
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
  const [relocate, setrelocate] = useState([
    {
      are_you_willing: "",
      preferred_countries: "",
      how_long: "",
    },
  ]);
  const [travelform, settravelform] = useState({
    current_place_of_residence: "",
    lived_at_current_residence: "",
  });
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

  const handlechangerelocate = (value, index, name) => {
    relocate[index][name] = value;
    setrelocate([...relocate]);
  };
  const handlechangetravel = (value, index, name) => {
    travelrow[index][name] = value;
    settravelrow([...travelrow]);
  };
  const handlechange_travel = (e) => {
    const { name, value } = e.target;
    settravelform((values) => ({ ...values, [name]: value }));
  };
  const savetravel = async () => {
    setIsLoading(true);
    const arrayOfStrings = travelrow.map(
      (obj) =>
        `${obj.country}:${obj.year_of_travel}:${obj.duration}:${obj.purpose}:${obj.type_of_visa}:${obj.validity_of_visa}`
    );
    const arrayOfStrings1 = relocate.map(
      (obj) =>
        `${obj.are_you_willing}:${obj.preferred_countries}:${obj.how_long}`
    );
    var newobj1 = {
      username: singleuser[0].username,
      travel_info: {
        travelled_to: arrayOfStrings,
        relocate_for_work: arrayOfStrings1,
        country: travelform.country.split(","),
        onlyfor: "test",
        duration: travelform.duration,
        travel_readlines: travelform.travel_readlines,
      },
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
    if (
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const savetravelled = async () => {
    setIsLoading(true);
    const arrayOfStrings2 = travelwork.map(
      (obj) => `${obj.country}:${obj.only_for}:${obj.duration}:${obj.readlines}`
    );
    var newobj1 = {
      username: singleuser[0].username,
      travel_info: {
        travel_to_for_work: arrayOfStrings2,
      },
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
    if (
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const saverelocate = async () => {
    setIsLoading(true);
    const arrayOfStrings = travelrow.map(
      (obj) =>
        `${obj.country}:${obj.year_of_travel}:${obj.duration}:${obj.purpose}:${obj.type_of_visa}:${obj.validity_of_visa}`
    );
    const arrayOfStrings1 = relocate.map(
      (obj) =>
        `${obj.are_you_willing}: ${obj.preferred_countries}: ${obj.how_long}`
    );
    var newobj1 = {
      username: singleuser[0].username,
      travel_info: {
        travelled_to: arrayOfStrings,
        relocate_for_work: arrayOfStrings1,
        country: travelform.country.split(","),
        onlyfor: "test",
        duration: travelform.duration,
        travel_readlines: travelform.travel_readlines,
      },
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
    if (
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const [projectdata, setprojectdata] = useState({
    description: "",
    duration_of_project: "",
    project_title: "",
    reporting_to: "",
    role: "",
    skills: "",
  });
  const handlechangenew = (e) => {
    const { name, value } = e.target;
    setprojectdata((values) => ({ ...values, [name]: value }));
  };

  const [travelwork, settravelwork] = useState([
    {
      country: "",
      only_for: "",
      duration: "",
      readlines: "",
    },
  ]);
  console.log(travelwork, "travelwork");
  const addcountwork = () => {
    var newobj = {
      country: "",
      only_for: "",
      duration: "",
      readlines: "",
    };
    settravelwork((prevState) => [...prevState, newobj]);
  };

  const handlechangework = (value, index, name) => {
    travelwork[index][name] = value;
    settravelwork([...travelwork]);
  };
  const saveproject = async () => {
    setIsLoading(true);
    var newobj = {
      username: singleuser[0].username,
      project_details_info: {
        description: projectdata.description,
        duration_of_project: projectdata.duration_of_project,
        project_title: projectdata.project_title,
        reporting_to: projectdata.reporting_to,
        role: projectdata.role,
        skills: projectdata.skills.split(),
      },
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const [certificatedata, setcertificatedata] = useState({
    course_name: "",
    date_issued: "",
    description: "",
    url: "",
    skills: "",
  });
  const handlechange_new = (e) => {
    const { name, value } = e.target;
    setcertificatedata((values) => ({ ...values, [name]: value }));
  };
  const savecertificate = async () => {
    setIsLoading(true);
    var newobj = {
      username: singleuser[0].username,
      certificate_info: {
        course_name: certificatedata.course_name,
        date_issued: certificatedata.date_issued,
        description: certificatedata.description,
        url: certificatedata.url,
        skills: certificatedata.skills.split(),
      },
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const [educationdata, seteducationdata] = useState({
    cgpa: "",
    degree: "",
    education_level: "",
    study_mode: "",
    university_name: "",
    year_of_graduation: "",
  });
  const handle_change = (e) => {
    const { name, value } = e.target;
    seteducationdata((values) => ({ ...values, [name]: value }));
  };
  const [formData] = useState(new FormData());
  const [fileupload, setfileupload] = useState(false);
  const handleFileInputChange = async (e) => {
    setfileupload(false);
    formData.append("image", e.target.files[0]);
    formData.append("name", `certificate${userid}`);
    const response = await axios.post(
      "https://fileserver-21t2.onrender.com/api/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setcertificate([...certificate, response.data.img_url]);
    setfileupload(true);
  };
  const saveeducation = async () => {
    setIsLoading(true);
    var newobj = {
      username: singleuser[0].username,
      education_info: {
        cgpa: educationdata.cgpa,
        degree: educationdata.degree,
        education_level: educationdata.education_level,
        study_mode: educationdata.study_mode,
        university_name: educationdata.university_name,
        year_of_graduation: educationdata.year_of_graduation,
        upload_file: certificate,
      },
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  const [passportdata, setpassportdata] = useState({
    country_of_citizenship: "",
    country_of_issue: "",
    passport_back: "",
    passport_front: "",
    passport_number: "",
    passport_validity: "",
  });
  const [kycdata, setkycdata] = useState({
    aadhar_back: "",
    aadhar_front: "",
    aadhar_number: "",
    pan_front: "",
    pan_number: "",
  });
  const handle_change_pass = (e) => {
    const { name, value } = e.target;
    setpassportdata((values) => ({ ...values, [name]: value }));
  };
  const handle_change_kyc = (e) => {
    const { name, value } = e.target;
    setkycdata((values) => ({ ...values, [name]: value }));
  };
  const savepassport = async () => {
    setIsLoading(true);
    var newobj = {
      username: singleuser[0].username,
      passport_info: {
        passport_number: passportdata.passport_no,
        passport_validity: passportdata.valid_until,
        country_of_citizenship: passportdata.country_of_citizenship,
        country_of_issue: passportdata.country_of_issue,
        passport_front: passportdata.passport_front,
        passport_back: passportdata.passport_back,
      },
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setfileuploadsuccess({
        aadhar_front: false,
        aadhar_back: false,
        pan_front: false,
        passport_front: false,
        passport_back: false,
      });
      setIsLoading(false);
    }
  };
  const fileInputRef = useRef(null);
  const [formtype, setformtype] = useState(null);
  const [fileuploadsuccess, setfileuploadsuccess] = useState({
    aadhar_front: false,
    aadhar_back: false,
    pan_front: false,
    passport_front: false,
    passport_back: false,
  });
  const handleFileSelectClick = (data) => {
    fileInputRef.current.click();
    setformtype(data);
  };
  const handleFileInput_Change = async (e) => {
    setfileuploadsuccess({
      aadhar_front: false,
      aadhar_back: false,
      pan_front: false,
      passport_front: false,
      passport_back: false,
    });
    formData.append("image", e.target.files[0]);
    formData.append("name", `${formtype}_${singleuser[0].id}`);
    const response = await axios.post(
      "https://fileserver-21t2.onrender.com/api/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setpassportdata((values) => ({
      ...values,
      [formtype]: response.data.img_url,
    }));
    setfileuploadsuccess((values) => ({
      ...values,
      [formtype]: true,
    }));
    fileInputRef.current.value = "";
  };
  const handleFileInput_Change1 = async (e) => {
    setfileuploadsuccess({
      aadhar_front: false,
      aadhar_back: false,
      pan_front: false,
      passport_front: false,
      passport_back: false,
    });
    formData.append("image", e.target.files[0]);
    formData.append("name", `${formtype}_${singleuser[0].id}`);
    const response = await axios.post(
      "https://fileserver-21t2.onrender.com/api/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setkycdata((values) => ({
      ...values,
      [formtype]: response.data.img_url,
    }));
    setfileuploadsuccess((values) => ({
      ...values,
      [formtype]: true,
    }));
    fileInputRef.current.value = "";
  };
  const savekyc = async () => {
    setIsLoading(true);
    var newobj = {
      username: singleuser[0].username,
      kyc_info: {
        aadhar_back: kycdata.aadhar_back,
        aadhar_front: kycdata.aadhar_front,
        aadhar_number: kycdata.aadhar_number,
        pan_front: kycdata.pan_front,
        pan_number: kycdata.pan_number,
      },
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setfileuploadsuccess({
        aadhar_front: false,
        aadhar_back: false,
        pan_front: false,
        passport_front: false,
        passport_back: false,
      });
      setIsLoading(false);
    }
  };
  const getalldata = async (data) => {
    const index = alluserdata.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      const updatedArray = [...alluserdata];
      updatedArray[index] = { ...updatedArray[index], ...data };
      dispatch(storeAction.alluserdataHander({ alluserdata: updatedArray }));
    }
    // var allfacility = await axios
    //   .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/getFaculties`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `JWT ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     return res.data;
    //   })
    //   .catch((err) => {
    //     return err.response;
    //   });

    // dispatch(
    //   storeAction.alluserdataHander({
    //     alluserdata: allfacility.faculties,
    //   })
    // );
  };
  const [resumevideo, setresumevideo] = useState(null);
  const [uploadstatus, setuploadstatus] = useState(false);
  const videoresume = async (e) => {
    setuploadstatus(false);
    formData.append("image", e.target.files[0]);
    formData.append("name", `resume${singleuser[0].id}`);
    const response = await axios.post(
      "https://fileserver-21t2.onrender.com/api/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setuploadstatus(true);
    setresumevideo(response.data.img_url);
  };
  const saveresume = async () => {
    setIsLoading(true);
    var newobj = {
      username: singleuser[0].username,
      video_resume: resumevideo,
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      setuploadstatus(false);
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());

      setIsLoading(false);
    }
  };
  const [ratecard, setratecard] = useState({
    remote_hourly: "",
    remote_monthly: "",
    remote_annualy: "",
    onsite_hourly: "",
    onsite_monthly: "",
    onsite_annualy: "",
  });
  const handlechange_rate = async (e) => {
    const { name, value } = e.target;
    setratecard((values) => ({ ...values, [name]: value }));
  };
  const displayHandler = async () => {
    setIsLoading(true);
    var newobj = {
      username: singleuser[0].username,
      rate_card_info: {
        remote_hourly: ratecard.remote_hourly,
        remote_monthly: ratecard.remote_monthly,
        remote_annualy: ratecard.remote_annualy,
        onsite_hourly: ratecard.onsite_hourly,
        onsite_monthly: ratecard.onsite_monthly,
        onsite_annualy: ratecard.onsite_annualy,
      },
    };
    var updatedata = await axios
      .put(
        `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}/`,
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
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      var userinfo = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${singleuser[0].id}`,
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
      setuploadstatus(false);
      dispatch(storeAction.singleuserHander({ singleuser: [] }));
      getalldata(userinfo);
      setTimeout(() => {
        dispatch(storeAction.singleuserHander({ singleuser: [userinfo] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setIsLoading(false);
    }
  };
  console.log(ratecard, "ratecard");
  return (
    <div>
      {singleuser.length !== 0 ? (
        <div className="paddingLeft100 paddingRight100 ">
          <div className="clientProfileViewHeader">
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
                    <h2>₹4500/hr</h2>
                  </div>
                </div>
              </div>
              <div className="clientProfileViewFlexRight">
                <button onClick={overLayHandler} className="editRate">
                  <img src={editOutline} alt="" />
                  Edit Rate (Pricing)
                </button>
                <button onClick={dropDownHandler} className="disableProfile">
                  <BsThreeDots />
                </button>
                {isPopUp == "approvedropdown" &&
                  (singleuser.length !== 0 ? (
                    <div className="approvalMenu">
                      {singleuser[0].apprual === false ? (
                        <h3
                          id="approveconformation"
                          onClick={editHandler1}
                          className="approvalMenuActive"
                        >
                          Approve Candidate
                        </h3>
                      ) : null}

                      <h3 className="approvalMenuDisable">Disable Profile</h3>
                    </div>
                  ) : null)}
              </div>
            </div>
            <div className="calendlyLink">
              <h4>Calendly Link (for interview)</h4>
              <input
                type="text"
                placeholder="https://calendly.com/meet/usernamelink"
              />
              <h5>Edit</h5>
            </div>
          </div>
          <div className="clientViewTab">
            <h5
              onClick={toggleHandler}
              id="personal"
              className={
                isToggle === "personal"
                  ? "clientViewTabActive"
                  : "clientViewTabInactive"
              }
            >
              Personal
            </h5>
            <h5
              onClick={toggleHandler}
              id="professional"
              className={
                isToggle === "professional"
                  ? "clientViewTabActive"
                  : "clientViewTabInactive"
              }
            >
              Professional
            </h5>
            <h5
              onClick={toggleHandler}
              id="travel"
              className={
                isToggle === "travel"
                  ? "clientViewTabActive"
                  : "clientViewTabInactive"
              }
            >
              Travel
            </h5>
            <h5
              onClick={toggleHandler}
              id="details"
              className={
                isToggle === "details"
                  ? "clientViewTabActive"
                  : "clientViewTabInactive"
              }
            >
              Other details
            </h5>
          </div>
          {isToggle === "personal" && (
            <>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>Basic details</h1>
                  <button id="adminpersonal" onClick={editHandler1}>
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                <div className="ClientProfileViewCardBody">
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>First Name & Middle</h2>
                    <h3>{singleuser[0].first_name}</h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Email ID</h2>
                    <h3>{singleuser[0].email}</h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Mobile No.</h2>
                    <h3>{singleuser[0].phone}</h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Date of birth</h2>
                    <h3>{singleuser[0].date_of_birth}</h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Address Line 1</h2>
                    <h3>
                      {singleuser[0].address !== null
                        ? singleuser[0].address.address
                        : null}
                    </h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Address Line 2</h2>
                    <h3>NA</h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>City</h2>
                    <h3>
                      {" "}
                      {singleuser[0].address !== null
                        ? singleuser[0].address.city
                        : null}
                    </h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>State</h2>
                    <h3>
                      {" "}
                      {singleuser[0].address !== null
                        ? singleuser[0].address.state
                        : null}
                    </h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Country</h2>
                    <h3>
                      {" "}
                      {singleuser[0].address !== null
                        ? singleuser[0].address.country
                        : null}
                    </h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Pincode</h2>
                    <h3>
                      {" "}
                      {singleuser[0].address !== null
                        ? singleuser[0].address.pincode
                        : null}
                    </h3>
                  </div>
                </div>
              </div>
              {/* personal Overlay */}
              {isPopUp === "adminpersonal" && (
                <>
                  <div className="adminEditOverlay">
                    <div className="adminEditOverlayHead">
                      <h1>Basic details</h1>
                    </div>
                    <div className="adminEditOverlayBody">
                      <div className="adminEditOverlayContent">
                        <h2>Name</h2>
                        <input
                          type="text"
                          name="name"
                          onChange={handlechange}
                          defaultValue={formdata.name}
                        />
                      </div>

                      <div className="adminEditOverlayContent">
                        <h2>Email ID</h2>
                        <input
                          type="text"
                          name="email"
                          onChange={handlechange}
                          defaultValue={formdata.email}
                        />
                      </div>
                      <div className="adminEditOverlayContent">
                        <h2>Mobile No.</h2>
                        <input
                          type="text"
                          maxLength={12}
                          name="phone"
                          onChange={handlechange}
                          defaultValue={formdata.phone}
                        />
                      </div>
                      <div className="adminEditOverlayContent">
                        <h2>Date of birth</h2>
                        <input
                          type="date"
                          name="dob"
                          onChange={handlechange}
                          defaultValue={formdata.dob}
                        />
                      </div>
                      <div className="adminEditOverlayContent">
                        <h2>Address</h2>
                        <input
                          type="text"
                          name="current_address"
                          onChange={handlechange}
                          defaultValue={formdata.current_address}
                        />
                      </div>

                      <div className="adminEditOverlayContent">
                        <h2>Country</h2>
                        <select
                          name="country"
                          onChange={handlechange}
                          defaultValue={formdata.country}
                        >
                          <option value="">Country</option>
                          {country_and_states.country.length !== 0
                            ? country_and_states.country.map((item, index) => (
                                <option
                                  selected={formdata.country == item.name}
                                  value={item.code}
                                  key={index}
                                >
                                  {item.name}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>

                      <div className="adminEditOverlayContent">
                        <h2>State</h2>
                        <select
                          name="state"
                          onChange={handlechange}
                          defaultValue={formdata.state}
                        >
                          <option value="">State</option>
                          {statelist.length !== 0
                            ? statelist.map((data, index) => (
                                <option value={data.name} key={index}>
                                  {data.name}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                      <div className="adminEditOverlayContent">
                        <h2>City</h2>
                        <input
                          type="text"
                          name="city"
                          onChange={handlechange}
                          defaultValue={formdata.city}
                        />
                      </div>
                      <div className="adminEditOverlayContent">
                        <h2>Pincode</h2>
                        <input
                          type="text"
                          name="pincode"
                          onChange={handlechange}
                          defaultValue={formdata.pincode}
                        />
                      </div>
                    </div>
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
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>documents</h1>
                  <button id="aadhar" onClick={editHandler1}>
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                <div className="ClientProfileViewCardBody">
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Aadhaar number / Govt. ID</h2>
                    <h3>
                      {singleuser[0].kyc_info !== null
                        ? singleuser[0].kyc_info.aadhar_number
                        : null}
                    </h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Aadhaar Card / Govt. ID Front</h2>
                    {singleuser[0].kyc_info !== null ? (
                      singleuser[0].kyc_info.aadhar_front.length !== 0 ? (
                        <h3
                          onClick={() => {
                            window.open(
                              `${
                                singleuser[0].kyc_info !== null
                                  ? singleuser[0].kyc_info.aadhar_front
                                  : null
                              }`,
                              "_blank"
                            );
                          }}
                          className="cursor-pointer"
                        >
                          Uploaded
                        </h3>
                      ) : (
                        <h3 className="cursor-pointer">-</h3>
                      )
                    ) : (
                      <h3 className="cursor-pointer">-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Aadhaar Card / Govt. ID Back</h2>
                    {singleuser[0].kyc_info !== null ? (
                      singleuser[0].kyc_info.aadhar_back.length !== 0 ? (
                        <h3
                          onClick={() => {
                            window.open(
                              `${
                                singleuser[0].kyc_info !== null
                                  ? singleuser[0].kyc_info.aadhar_back
                                  : null
                              }`,
                              "_blank"
                            );
                          }}
                          className="cursor-pointer"
                        >
                          Uploaded
                        </h3>
                      ) : (
                        <h3 className="cursor-pointer">-</h3>
                      )
                    ) : (
                      <h3 className="cursor-pointer">-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>PAN number / Tax ID</h2>
                    <h3>
                      {" "}
                      {singleuser[0].kyc_info !== null
                        ? singleuser[0].kyc_info.pan_number
                        : null}
                    </h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>PAN Card / Tax ID Front</h2>
                    {singleuser[0].kyc_info !== null ? (
                      singleuser[0].kyc_info.pan_front.length !== 0 ? (
                        <h3
                          onClick={() => {
                            window.open(
                              `${
                                singleuser[0].kyc_info !== null
                                  ? singleuser[0].kyc_info.pan_front
                                  : null
                              }`,
                              "_blank"
                            );
                          }}
                          className="cursor-pointer"
                        >
                          Uploaded
                        </h3>
                      ) : (
                        <h3 className="cursor-pointer">-</h3>
                      )
                    ) : (
                      <h3 className="cursor-pointer">-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Personality Assessment </h2>
                    <h3>Not Uploaded</h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Personality Assessment Test Link </h2>
                    <h3>https://mettl.com/test-score/yasirquazi</h3>
                  </div>
                </div>
              </div>
              {isPopUp === "aadhar" && (
                <>
                  <div className="adminEditOverlay">
                    <div className="adminEditOverlayHead">
                      <h1>Documents</h1>
                    </div>
                    <div className="adminEditOverlayBody">
                      <div className="adminEditOverlayContent">
                        <h2>Aadhaar number</h2>
                        <input
                          type="text"
                          name="aadhar_number"
                          onChange={handle_change_kyc}
                          defaultValue={kycdata.aadhar_number}
                        />
                      </div>
                      <div className="adminEditOverlayContent"></div>
                      <div className="adminEditOverlayContent">
                        <h3>Aadhaar Card Front</h3>
                        <div
                          className="adminEditOverlayUpload backGround"
                          onClick={() => {
                            handleFileSelectClick("aadhar_front");
                          }}
                        >
                          <div className="adminEditOverlayUploadHead">
                            <img src={file} alt="" />
                            <div className="adminEditOverlayUploadHeadRight">
                              <h4>Aadhaar_card_front.jpg</h4>
                              {/* <h5>1 MB</h5> */}
                            </div>
                          </div>
                          <p>Maximum size: 5MB. PDF, JPEG and PNG accepted</p>
                          <button>Upload new file</button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            name="passport_back"
                            onChange={handleFileInput_Change1}
                          />
                          {fileuploadsuccess.aadhar_front && (
                            <h6 className="text-green-500 text-xs font-semibold mt-2">
                              Aadhaar Card Front Uploaded Successfully
                            </h6>
                          )}
                        </div>
                      </div>
                      <div className="adminEditOverlayContent">
                        <h3>Aadhaar Card Back</h3>
                        <div
                          className="adminEditOverlayUpload backGround"
                          onClick={() => {
                            handleFileSelectClick("aadhar_back");
                          }}
                        >
                          <div className="adminEditOverlayUploadHead">
                            <img src={file} alt="" />
                            <div className="adminEditOverlayUploadHeadRight">
                              <h4>Aadhaar_card_back.jpg</h4>
                              {/* <h5>1 MB</h5> */}
                            </div>
                          </div>
                          <p>Maximum size: 5MB. PDF, JPEG and PNG accepted</p>
                          <button>Upload new file</button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            name="passport_back"
                            onChange={handleFileInput_Change1}
                          />
                          {fileuploadsuccess.aadhar_back && (
                            <h6 className="text-green-500 text-xs font-semibold mt-2">
                              Aadhaar Card Back Uploaded Successfully
                            </h6>
                          )}
                        </div>
                      </div>
                      <div className="adminEditOverlayContent">
                        <h2>PAN number</h2>
                        <input
                          type="text"
                          name="pan_number"
                          onChange={handle_change_kyc}
                          defaultValue={kycdata.pan_number}
                        />
                      </div>
                      <div className="adminEditOverlayContent"></div>
                      <div className="adminEditOverlayContent">
                        <h3>Pan Card Front</h3>
                        <div
                          className="adminEditOverlayUpload backGround"
                          onClick={() => {
                            handleFileSelectClick("pan_front");
                          }}
                        >
                          <div className="adminEditOverlayUploadHead">
                            <img src={file} alt="" />
                            <div className="adminEditOverlayUploadHeadRight">
                              <h4>pan_front.jpg</h4>
                              {/* <h5>1 MB</h5> */}
                            </div>
                          </div>
                          <p>Maximum size: 5MB. PDF, JPEG and PNG accepted</p>
                          <button>Upload new file</button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            name="passport_back"
                            onChange={handleFileInput_Change1}
                          />
                          {fileuploadsuccess.pan_front && (
                            <h6 className="text-green-500 text-xs font-semibold mt-2">
                              Pan Card Front Uploaded Successfully
                            </h6>
                          )}
                        </div>
                      </div>
                      {/* uploaded design */}
                      {/* <div className="adminEditOverlayContent">
                        <h3>Aadhaar Card Front</h3>
                        <div className="adminEditOverlayUpload backGround">
                          <div className="adminEditOverlayUploadHead">
                            <img src={file} alt="" />
                            <div className="adminEditOverlayUploadHeadRight">
                              <h4>Aadhaar_card_front.jpg</h4>
                              <h5>1 MB</h5>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
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
                        <button className="save" onClick={savekyc}>
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
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>Passport details (Optional)</h1>
                  <button id="passport" onClick={editHandler1}>
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                <div className="ClientProfileViewCardBody">
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Passport no.</h2>
                    {singleuser[0].passport_info !== null ? (
                      <h3>{singleuser[0].passport_info.passport_number}</h3>
                    ) : (
                      <h3 className="cursor-pointer">-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Valid until</h2>
                    {singleuser[0].passport_info !== null ? (
                      <h3>{singleuser[0].passport_info.passport_validity}</h3>
                    ) : (
                      <h3 className="cursor-pointer">-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Country of Citizenship</h2>
                    {singleuser[0].passport_info !== null ? (
                      <h3>
                        {singleuser[0].passport_info.country_of_citizenship}
                      </h3>
                    ) : (
                      <h3 className="cursor-pointer">-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Country of Issue</h2>
                    {singleuser[0].passport_info !== null ? (
                      <h3>{singleuser[0].passport_info.country_of_issue}</h3>
                    ) : (
                      <h3 className="cursor-pointer">-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Passport Front</h2>
                    {singleuser[0].passport_info !== null ? (
                      singleuser[0].passport_info.passport_front.length !==
                      0 ? (
                        <h3
                          onClick={() => {
                            window.open(
                              `${
                                singleuser[0].passport_info !== null
                                  ? singleuser[0].passport_info.passport_front
                                  : null
                              }`,
                              "_blank"
                            );
                          }}
                          className="cursor-pointer"
                        >
                          Uploaded
                        </h3>
                      ) : (
                        <h3 className="cursor-pointer">-</h3>
                      )
                    ) : (
                      <h3 className="cursor-pointer">-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Passport Back </h2>
                    {singleuser[0].passport_info !== null ? (
                      singleuser[0].passport_info.passport_back.length !== 0 ? (
                        <h3
                          onClick={() => {
                            window.open(
                              `${
                                singleuser[0].passport_info !== null
                                  ? singleuser[0].passport_info.passport_back
                                  : null
                              }`,
                              "_blank"
                            );
                          }}
                          className="cursor-pointer"
                        >
                          Uploaded
                        </h3>
                      ) : (
                        <h3 className="cursor-pointer">-</h3>
                      )
                    ) : (
                      <h3 className="cursor-pointer">-</h3>
                    )}
                  </div>
                </div>
              </div>
              {isPopUp === "passport" && (
                <>
                  <div className="adminEditOverlay">
                    <div className="adminEditOverlayHead">
                      <h1>Documents</h1>
                    </div>
                    <div className="adminEditOverlayBody">
                      <div className="adminEditOverlayContent">
                        <h2>Passport no.</h2>
                        <input
                          type="text"
                          name="passport_number"
                          onChange={handle_change_pass}
                          defaultValue={passportdata.passport_number}
                        />
                      </div>
                      <div className="adminEditOverlayContent">
                        <h2>Valid until</h2>
                        <input
                          type="date"
                          name="passport_validity"
                          onChange={handle_change_pass}
                          defaultValue={passportdata.passport_validity}
                        />
                      </div>
                      <div className="adminEditOverlayContent">
                        <h2>Country of Citizenship</h2>
                        <select
                          name="country_of_citizenship"
                          onChange={handle_change_pass}
                          defaultValue={passportdata.country_of_citizenship}
                          className="w-full"
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
                      <div className="adminEditOverlayContent">
                        <h2>Country of Issue</h2>
                        <select
                          name="country_of_issue"
                          onChange={handle_change_pass}
                          defaultValue={passportdata.country_of_issue}
                          className="w-full"
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
                      <div className="adminEditOverlayContent">
                        <h3>Passport Front</h3>
                        <div
                          className="adminEditOverlayUpload backGround"
                          onClick={() => {
                            handleFileSelectClick("passport_front");
                          }}
                        >
                          <div className="adminEditOverlayUploadHead">
                            <img src={file} alt="" />
                            <div className="adminEditOverlayUploadHeadRight">
                              <h4>Passport_front.jpg</h4>
                              <h5>1 MB</h5>
                            </div>
                          </div>
                          <p>Maximum size: 5MB. PDF, JPEG and PNG accepted</p>
                          <button>Upload new file</button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            name="passport_front"
                            onChange={handleFileInput_Change}
                          />
                          {fileuploadsuccess.passport_front && (
                            <h6 className="text-green-500 text-xs font-semibold mt-2">
                              Passport Card Front Uploaded Successfully
                            </h6>
                          )}
                        </div>
                      </div>
                      <div className="adminEditOverlayContent">
                        <h3>Passport Back</h3>
                        <div
                          className="adminEditOverlayUpload backGround"
                          onClick={() => {
                            handleFileSelectClick("passport_back");
                          }}
                        >
                          <div className="adminEditOverlayUploadHead">
                            <img src={file} alt="" />
                            <div className="adminEditOverlayUploadHeadRight">
                              <h4>passport_back.jpg</h4>
                              <h5>1 MB</h5>
                            </div>
                          </div>
                          <p>Maximum size: 5MB. PDF, JPEG and PNG accepted</p>
                          <button>Upload new file</button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            name="passport_back"
                            onChange={handleFileInput_Change}
                          />
                          {fileuploadsuccess.passport_back && (
                            <h6 className="text-green-500 text-xs font-semibold mt-2">
                              Passport Card Back Uploaded Successfully
                            </h6>
                          )}
                        </div>
                      </div>
                      {/* uploaded design */}
                      {passportdata.passport_front.length !== 0 ? (
                        <div className="adminEditOverlayContent">
                          <h3>Passport Front</h3>
                          <div
                            className="adminEditOverlayUpload backGround"
                            onClick={() => {
                              window.open(
                                `${passportdata.passport_front}`,
                                "_blank"
                              );
                            }}
                          >
                            <div className="adminEditOverlayUploadHead">
                              <img src={file} alt="" />
                              <div className="adminEditOverlayUploadHeadRight">
                                <h4>Passport_front.jpg</h4>
                                {/* <h5>1 MB</h5> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {passportdata.passport_front.length !== 0 ? (
                        <div className="adminEditOverlayContent">
                          <h3>Passport Back</h3>
                          <div
                            className="adminEditOverlayUpload backGround"
                            onClick={() => {
                              window.open(
                                `${passportdata.passport_front}`,
                                "_blank"
                              );
                            }}
                          >
                            <div className="adminEditOverlayUploadHead">
                              <img src={file} alt="" />
                              <div className="adminEditOverlayUploadHeadRight">
                                <h4>Passport_back.jpg</h4>
                                {/* <h5>1 MB</h5> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
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
                        <button className="save" onClick={savepassport}>
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
            </>
          )}
          {/* page 2 */}
          {/* card 1 */}
          {isToggle === "professional" && (
            <>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>Details</h1>
                  <button id="adminprofessionaldetails" onClick={editHandler1}>
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                <div className="ClientProfileViewCardBody">
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Primary Technical Skill</h2>
                    {singleuser[0].preference_info !== null ? (
                      singleuser[0].preference_info.qualification.length !==
                      0 ? (
                        <h3>{singleuser[0].preference_info.qualification}</h3>
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Years of Experience (all time)</h2>
                    {singleuser[0].preference_info !== null ? (
                      singleuser[0].preference_info.year_of_experience
                        .length !== 0 ? (
                        <h3>
                          {singleuser[0].preference_info.year_of_experience}
                        </h3>
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Skills</h2>
                    {singleuser[0].preference_info !== null ? (
                      singleuser[0].preference_info.skills.length !== 0 ? (
                        <h3>
                          {singleuser[0].preference_info.skills.toString()}
                        </h3>
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>LinkedIn</h2>
                    {singleuser[0].preference_info !== null ? (
                      singleuser[0].preference_info.linkedin.length !== 0 ? (
                        <h3>{singleuser[0].preference_info.linkedin}</h3>
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>HackerRank</h2>
                    {singleuser[0].preference_info !== null ? (
                      singleuser[0].preference_info.hackerrank.length !== 0 ? (
                        <h3>{singleuser[0].preference_info.hackerrank}</h3>
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>GitHub</h2>
                    {singleuser[0].preference_info !== null ? (
                      singleuser[0].preference_info.github.length !== 0 ? (
                        <h3>{singleuser[0].preference_info.github}</h3>
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Languages</h2>
                    {/* <h3>
                      English (Conversational), Hindi (Basic), Kannada
                      (Proficient)
                    </h3> */}
                    {singleuser[0].preference_info !== null ? (
                      singleuser[0].preference_info.language.length !== 0 ? (
                        <h3>
                          {singleuser[0].preference_info.language.toString()}
                        </h3>
                      ) : (
                        <h3>-</h3>
                      )
                    ) : (
                      <h3>-</h3>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {isPopUp == "adminprofessionaldetails" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>Details</h1>
                </div>
                <div className="adminEditOverlayBody">
                  <div className="adminEditOverlayContent">
                    <h2>Primary Technical Skill</h2>
                    <input
                      type="text"
                      name="qualification"
                      onChange={handlechange}
                      defaultValue={formdata.qualification}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Years of Experience (all time)</h2>
                    <input
                      type="text"
                      name="experience"
                      onChange={handlechange}
                      defaultValue={formdata.experience}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Skills</h2>
                    <input
                      type="text"
                      name="skill"
                      onChange={handlechange}
                      defaultValue={formdata.skill}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>LinkedIn</h2>
                    <input
                      type="text"
                      name="linkedin"
                      onChange={handlechange}
                      defaultValue={formdata.linkedin}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>HackerRank</h2>
                    <input
                      type="text"
                      name="hackerrank"
                      onChange={handlechange}
                      defaultValue={formdata.hackerrank}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>GitHub</h2>
                    <input
                      type="text"
                      name="github"
                      onChange={handlechange}
                      defaultValue={formdata.github}
                    />
                  </div>
                  {/* <div className="adminEditOverlayContent">
                    <h2>Languages</h2>
                    <input type="text" />
                  </div> */}
                </div>
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
                    <button className="save" onClick={saveprimary}>
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
          {isToggle === "travel" && (
            <>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>Countries travelled to</h1>
                  <button id="countriestravelledto" onClick={editHandler1}>
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                <div className="ClientProfileViewCardBody">
                  {singleuser[0].travel_info !== null
                    ? singleuser[0].travel_info.travelled_to.length !== 0
                      ? singleuser[0].travel_info.travelled_to.map(
                          (data, index) => (
                            <div key={index}>
                              <div className="ClientProfileViewCardBodyTable">
                                <h2>Country {index + 1}</h2>
                                <h3>{data.split(":")[0]}</h3>
                              </div>
                              <div className="ClientProfileViewCardBodyTable">
                                <h2>Year of travel</h2>
                                <h3>{data.split(":")[1]}</h3>
                              </div>
                              <div className="ClientProfileViewCardBodyTable">
                                <h2>Duration</h2>
                                <h3>{data.split(":")[2]}</h3>
                              </div>
                              <div className="ClientProfileViewCardBodyTable">
                                <h2>Purpose</h2>
                                <h3>{data.split(":")[3]}</h3>
                              </div>
                              <div className="ClientProfileViewCardBodyTable">
                                <h2>Type of Visa</h2>
                                <h3>{data.split(":")[4]}</h3>
                              </div>
                              <div className="ClientProfileViewCardBodyTable">
                                <h2>Validity of Visa</h2>
                                <h3>{data.split(":")[5]}</h3>
                              </div>
                            </div>
                          )
                        )
                      : null
                    : null}
                </div>
              </div>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>Residency Details</h1>
                  <button onClick={editHandler1} id="adminresidencydetails">
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                <div className="ClientProfileViewCardBody">
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Current country of residence</h2>
                    <h3>{singleuser[0].current_place_of_residence}</h3>
                  </div>
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Duration of stay in the country</h2>
                    <h3> {singleuser[0].lived_at_current_residence}</h3>
                  </div>
                </div>
              </div>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>Countries willing to travel to for work</h1>
                  <button id="willingnesstorelocate" onClick={editHandler1}>
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                {console.log(singleuser, "singleusersingleuser")}
                {singleuser[0].travel_info !== null ? (
                  <div className="ClientProfileViewCardBody">
                    {singleuser[0].travel_info !== null
                      ? singleuser[0].travel_info.travel_to_for_work.length !==
                        0
                        ? singleuser[0].travel_info.travel_to_for_work.map(
                            (data, index) => (
                              <div key={index}>
                                <div className="ClientProfileViewCardBodyTable">
                                  <h2>Country {index + 1}</h2>
                                  <h3>{data.split(":")[0]}</h3>
                                </div>
                                <div className="ClientProfileViewCardBodyTable">
                                  <h2>Only For</h2>
                                  <h3>{data.split(":")[1]}</h3>
                                </div>
                                <div className="ClientProfileViewCardBodyTable">
                                  <h2>Duration</h2>
                                  <h3>{data.split(":")[2]}</h3>
                                </div>
                                <div className="ClientProfileViewCardBodyTable">
                                  <h2>Travel Readiness</h2>
                                  <h3>{data.split(":")[3]}</h3>
                                </div>
                              </div>
                            )
                          )
                        : null
                      : null}
                  </div>
                ) : null}
              </div>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>Countries willing to RElocate for work</h1>
                  <button id="travelforwork" onClick={editHandler1}>
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                <div className="ClientProfileViewCardBody">
                  {singleuser[0].travel_info !== null
                    ? singleuser[0].travel_info.relocate_for_work.length !== 0
                      ? singleuser[0].travel_info.relocate_for_work.map(
                          (data, index) => (
                            <div key={index}>
                              <div className="ClientProfileViewCardBodyTable">
                                <h2>Willingness to relocate</h2>
                                <h3>{data.split(":")[0]}</h3>
                              </div>
                              <div className="ClientProfileViewCardBodyTable">
                                <h2>Preferred countries {index + 1}</h2>
                                <h3>{data.split(":")[1]}</h3>
                              </div>
                              <div className="ClientProfileViewCardBodyTable">
                                <h2>Preferred duration for relocation</h2>
                                <h3>{data.split(":")[2]}</h3>
                              </div>
                            </div>
                          )
                        )
                      : null
                    : null}
                </div>
              </div>
            </>
          )}
          {isPopUp == "countriestravelledto" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>Countries travelled to</h1>
                </div>

                {travelrow.length !== 0
                  ? travelrow.map((data, index) => (
                      <div
                        className="adminEditOverlayBody border-b border-gray-400 pb-5"
                        key={index}
                      >
                        <div className="adminEditOverlayContent">
                          <h2>Country</h2>
                          <select
                            name=""
                            id=""
                            defaultValue={data.country}
                            onChange={(e) => {
                              handlechangetravel(
                                e.target.value,
                                index,
                                "country"
                              );
                            }}
                            selected={data.country}
                          >
                            <option value="">Country</option>
                            <option value="United States">United States</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
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
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
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
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
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
                            <option value="Iran">
                              Iran (Islamic Republic of)
                            </option>
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
                            <option value="Moldova">
                              Moldova, Republic of
                            </option>
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
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
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
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
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
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
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
                            <option value="Western Sahara">
                              Western Sahara
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                        </div>
                        <div className="adminEditOverlayContent">
                          <h2>Year of travel</h2>
                          <input
                            type="text"
                            name=""
                            id=""
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
                        <div className="adminEditOverlayContent">
                          <h2>Duration</h2>
                          <input
                            type="text"
                            name=""
                            id=""
                            defaultValue={data.duration}
                            onChange={(e) => {
                              handlechangetravel(
                                e.target.value,
                                index,
                                "duration"
                              );
                            }}
                          />
                        </div>
                        <div className="adminEditOverlayContent">
                          <h2>Purpose</h2>
                          <input
                            type="text"
                            name=""
                            id=""
                            defaultValue={data.purpose}
                            onChange={(e) => {
                              handlechangetravel(
                                e.target.value,
                                index,
                                "purpose"
                              );
                            }}
                          />
                        </div>
                        <div className="adminEditOverlayContent">
                          <h2>Type of Visa</h2>
                          <input
                            type="text"
                            name=""
                            id=""
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
                        <div className="adminEditOverlayContent">
                          <h2>Validity of Visa</h2>
                          <input
                            type="date"
                            name=""
                            id=""
                            defaultValue={data.validity_of_visa}
                            onChange={(e) => {
                              handlechangetravel(
                                e.target.value,
                                index,
                                "validity_of_visa"
                              );
                            }}
                          />
                        </div>
                      </div>
                    ))
                  : null}

                <button className="adminEditAddMore" onClick={addcounttravel}>
                  Add More
                </button>
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
                    <button className="save" onClick={savetravel}>
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
          {isPopUp == "adminresidencydetails" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>Countries travelled to</h1>
                </div>
                <div className="adminEditOverlayBody">
                  <div className="adminEditOverlayContent">
                    <h2>Current country of residence</h2>

                    <select
                      name="current_place_of_residence"
                      onChange={handlechange}
                      defaultValue={formdata.current_place_of_residence}
                    >
                      <option value="">Country</option>
                      {country_and_states.country.length !== 0
                        ? country_and_states.country.map((item, index) => (
                            <option
                              selected={
                                formdata.current_place_of_residence == item.name
                              }
                              value={item.name}
                              key={index}
                            >
                              {item.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Duration of stay in the country</h2>
                    <input
                      type="text"
                      name="lived_at_current_residence"
                      onChange={handlechange}
                      defaultValue={formdata.lived_at_current_residence}
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
                    <button className="save" onClick={saveplace}>
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
          {isPopUp == "willingnesstorelocate" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>Countries travelled to</h1>
                </div>
                {travelwork.length !== 0
                  ? travelwork.map((data, index) => (
                      <div className="adminEditOverlayBody" key={index}>
                        <div className="adminEditOverlayContent">
                          <h2>Countries</h2>
                          <select
                            id=""
                            name="country"
                            onChange={(e) => {
                              handlechangework(
                                e.target.value,
                                index,
                                "country"
                              );
                            }}
                            defaultValue={data.country}
                            selected={data.country}
                          >
                            <option value="">Select Country</option>
                            <option value="Japan">Japan</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Saudi Arabia"> Saudi Arabia</option>
                            <option value="Singapore"> Singapore</option>
                            <option value="Malaysia"> Malaysia</option>
                          </select>
                        </div>
                        <div className="adminEditOverlayContent">
                          <h2>Only for </h2>
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
                            selected={data.only_for}
                            className="w-full"
                          >
                            <option value="">Only for</option>
                            <option value="Work Onsite">Work Onsite</option>
                            <option value="Short-term business visit">
                              Short-term business visit
                            </option>
                          </select>
                        </div>
                        <div className="adminEditOverlayContent">
                          <h2>Duration</h2>
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
                            selected={data.duration}
                          >
                            <option value="">Select duration</option>
                            <option value="3-6 months">3-6 months</option>
                            <option value="6-12 months">6-12 months</option>
                            <option value=">12 months">{">"}12 months</option>
                          </select>
                        </div>
                        <div className="adminEditOverlayContent">
                          <h2>Readiness to Travel</h2>
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
                            selected={data.readlines}
                            defaultValue={data.readlines}
                          >
                            <option value="">Select Travel Readlines</option>
                            <option value="Immediate">Immediate</option>
                            <option value="In the next 6 months">
                              In the next 6 months
                            </option>
                            <option value="6 months">6 months</option>
                          </select>
                        </div>
                      </div>
                    ))
                  : null}
                <button className="adminEditAddMore" onClick={addcountwork}>
                  Add More
                </button>
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
                    <button className="save" onClick={savetravelled}>
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
          {isPopUp == "travelforwork" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>Countries travelled to</h1>
                </div>
                {relocate.length !== 0
                  ? relocate.map((data, index) => (
                      <div className="adminEditOverlayBody border-b">
                        <div className="adminEditOverlayContent">
                          <h2>Willingness to relocate</h2>
                          <select
                            onChange={(e) => {
                              handlechangerelocate(
                                e.target.value,
                                index,
                                "are_you_willing"
                              );
                            }}
                            defaultValue={data.are_you_willing}
                          >
                            <option value="No">No</option>
                            <option value="Yes">yes</option>
                          </select>
                        </div>
                        <div className="adminEditOverlayContent">
                          <h2>Preferred countries</h2>
                          <input
                            onChange={(e) => {
                              handlechangerelocate(
                                e.target.value,
                                index,
                                "preferred_countries"
                              );
                            }}
                            defaultValue={data.preferred_countries}
                          />
                        </div>
                        <div className="adminEditOverlayContent">
                          <h2>Preferred duration for relocation</h2>
                          <input
                            onChange={(e) => {
                              handlechangerelocate(
                                e.target.value,
                                index,
                                "how_long"
                              );
                            }}
                            defaultValue={data.how_long}
                          />
                        </div>
                      </div>
                    ))
                  : null}

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
                    <button className="save" onClick={saverelocate}>
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
          {isToggle === "details" && (
            <>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>Project details</h1>
                  <button onClick={editHandler1} id="adminprojectdetails">
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                {singleuser[0].project_details_info !== null ? (
                  <div>
                    <h6>project 1</h6>
                    <div className="CandidateProfileViewCardBody">
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Project Title</h2>
                        <h3>
                          {singleuser[0].project_details_info.project_title}
                        </h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Role</h2>
                        <h3> {singleuser[0].project_details_info.role}</h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Reporting to</h2>
                        <h3>
                          {" "}
                          {singleuser[0].project_details_info.reporting_to}
                        </h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Duration of project</h2>
                        <h3>
                          {" "}
                          {
                            singleuser[0].project_details_info
                              .duration_of_project
                          }
                        </h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Key skills</h2>
                        <h3>
                          {" "}
                          {singleuser[0].project_details_info.skills.toString()}
                        </h3>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>Certifications and courses</h1>
                  <button onClick={editHandler1} id="admincertification">
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                {singleuser[0].certificate_info !== null ? (
                  <div>
                    <h6>Certificate 1</h6>
                    <div className="CandidateProfileViewCardBody">
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Course name</h2>
                        <h3>{singleuser[0].certificate_info.course_name}</h3>
                      </div>
                      {/* <div className="CandidateProfileViewCardBodyTable">
                        <h2>Issuing body</h2>
                        <h3>{singleuser[0].certificate_info.course_name}</h3>
                      </div> */}
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Date Issued</h2>
                        <h3>{singleuser[0].certificate_info.date_issued}</h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Skills</h2>
                        <h3>
                          {singleuser[0].certificate_info.skills.toString()}
                        </h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>URL</h2>
                        <h3>{singleuser[0].certificate_info.url}</h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Certificate File</h2>
                        {singleuser[0].certificate_info.certificate_file
                          .length !== 0 ? (
                          <h3>Uploaded</h3>
                        ) : (
                          <h3>Not Uploaded</h3>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>EDUCATION</h1>
                  <button onClick={editHandler1} id="admineducation">
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                {singleuser[0].education_info !== null ? (
                  <div>
                    <h6>{singleuser[0].education_info.education_level}</h6>
                    <div className="CandidateProfileViewCardBody">
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Degree</h2>
                        <h3>{singleuser[0].education_info.degree}</h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Year of Graduation</h2>
                        <h3>
                          {singleuser[0].education_info.year_of_graduation}
                        </h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Name of University / School</h2>
                        <h3>{singleuser[0].education_info.university_name}</h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Education Level</h2>
                        <h3>{singleuser[0].education_info.education_level}</h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>CGPA</h2>
                        <h3>{singleuser[0].education_info.cgpa}</h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Study Mode</h2>
                        <h3>{singleuser[0].education_info.study_mode}</h3>
                      </div>
                      <div className="CandidateProfileViewCardBodyTable">
                        <h2>Relevant document</h2>
                        {singleuser[0].education_info.upload_file.length !==
                        0 ? (
                          <h3
                            onClick={() => {
                              window.open(
                                `${singleuser[0].education_info.upload_file[0]}`,
                                "_blank"
                              );
                            }}
                          >
                            Uploaded
                          </h3>
                        ) : (
                          <h3>Not Uploaded</h3>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="ClientProfileViewCard">
                <div className="ClientProfileViewCardEdit">
                  <h1>video resume</h1>
                  <button onClick={editHandler1} id="adminvedioresume">
                    <img src={editOutline} alt="" />
                    Edit
                  </button>
                </div>
                <div className="ClientProfileViewCardBody">
                  <div className="ClientProfileViewCardBodyTable">
                    <h2>Video file</h2>
                    {singleuser[0].video_resume !== null ? (
                      singleuser[0].video_resume.length !== 0 ? (
                        <h3
                          onClick={() => {
                            window.open(
                              `${singleuser[0].video_resume}`,
                              "_blank"
                            );
                          }}
                        >
                          Uploaded
                        </h3>
                      ) : (
                        <h3>Not Uploaded</h3>
                      )
                    ) : (
                      <h3>Not Uploaded</h3>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {isPopUp == "adminprojectdetails" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>Project details</h1>
                </div>
                <div className="adminEditOverlayBody">
                  <div className="adminEditOverlayContent">
                    <h2>Project Title</h2>
                    <input
                      type="text"
                      name="project_title"
                      onChange={handlechangenew}
                      defaultValue={projectdata.project_title}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Role</h2>
                    <input
                      type="text"
                      name="role"
                      onChange={handlechangenew}
                      defaultValue={projectdata.role}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Reporting to</h2>
                    <input
                      type="text"
                      name="reporting_to"
                      onChange={handlechangenew}
                      defaultValue={projectdata.reporting_to}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Duration of project</h2>
                    <input
                      type="text"
                      name="duration_of_project"
                      onChange={handlechangenew}
                      defaultValue={projectdata.duration_of_project}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Key skills</h2>
                    <input
                      type="text"
                      name="skills"
                      onChange={handlechangenew}
                      defaultValue={projectdata.skills}
                    />
                  </div>
                </div>
                <button className="adminEditAddMore">Add More</button>
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
                    <button className="save" onClick={saveproject}>
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
          {isPopUp == "admincertification" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>Certifications and courses</h1>
                </div>
                <div className="adminEditOverlayBody">
                  <div className="adminEditOverlayContent">
                    <h2>Course name</h2>
                    <input
                      type="text"
                      name="course_name"
                      onChange={handlechange_new}
                      defaultValue={certificatedata.course_name}
                    />
                  </div>

                  <div className="adminEditOverlayContent">
                    <h2>Date Issued</h2>
                    <input
                      type="text"
                      name="date_issued"
                      onChange={handlechange_new}
                      defaultValue={certificatedata.date_issued}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Skills</h2>
                    <input
                      type="text"
                      name="skills"
                      onChange={handlechange_new}
                      defaultValue={certificatedata.skills}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>URL</h2>
                    <input
                      type="text"
                      name="url"
                      onChange={handlechange_new}
                      defaultValue={certificatedata.url}
                    />
                  </div>
                  {/* <div className="adminEditOverlayContent">
                    <h2>Certificate File</h2>
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
                    <button className="save" onClick={savecertificate}>
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
          {isPopUp == "admineducation" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>EDUCATION</h1>
                </div>
                <div className="adminEditOverlayBody">
                  <div className="adminEditOverlayContent">
                    <h2>Degree</h2>
                    <input
                      type="text"
                      name="degree"
                      onChange={handle_change}
                      defaultValue={educationdata.degree}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Year of Graduation</h2>
                    <input
                      type="number"
                      name="year_of_graduation"
                      onChange={handle_change}
                      defaultValue={educationdata.year_of_graduation}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Name of University / School</h2>
                    <input
                      type="text"
                      name="university_name"
                      onChange={handle_change}
                      defaultValue={educationdata.university_name}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Education Level</h2>
                    <input
                      type="text"
                      name="education_level"
                      onChange={handle_change}
                      defaultValue={educationdata.education_level}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>CGPA</h2>
                    <input
                      type="text"
                      name="cgpa"
                      onChange={handle_change}
                      defaultValue={educationdata.cgpa}
                    />
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Study Mode</h2>
                    <select
                      name="study_mode"
                      onChange={handle_change}
                      defaultValue={educationdata.study_mode}
                      selected={educationdata.study_mode}
                    >
                      <option value="">Select Study Mode</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Tim">Part-Time</option>
                    </select>
                  </div>
                  <div className="adminEditOverlayContent">
                    <h2>Relevant document</h2>
                    <input type="file" onChange={handleFileInputChange} />
                    {fileupload && (
                      <p className="text-sm text-green-500 py-2">
                        File Uploaded Successfully...
                      </p>
                    )}
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
                    <button className="save" onClick={saveeducation}>
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
          {isPopUp == "adminvedioresume" && (
            <>
              <div className="adminEditOverlay">
                <div className="adminEditOverlayHead">
                  <h1>Video Resume</h1>
                </div>
                <div className="adminEditOverlayBody">
                  <div className="adminEditOverlayContent">
                    <h2>Upload Video Resume</h2>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={videoresume}
                    />
                    {uploadstatus && (
                      <h6 className="text-green-500 text-sm font-semibold my-2">
                        Video Resume Uploaded Successfully
                      </h6>
                    )}
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
                    <button className="save" onClick={saveresume}>
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
          {isPopUp === "candidateRate" && (
            <div className="candidateRateCardOverlay">
              <div className="candidateRateCardOverlayHead">
                <h1>Candidate’s Rate (Pricing)</h1>
              </div>
              <div className="candidateRateCardOverlayTab">
                <h5
                  onClick={toggleHandler1}
                  id="remote"
                  className={
                    isToggle1 === "remote"
                      ? "clientViewTabActive"
                      : "clientViewTabInactive"
                  }
                >
                  Remote
                </h5>
                <h5
                  onClick={toggleHandler1}
                  id="onsite"
                  className={
                    isToggle1 === "onsite"
                      ? "clientViewTabActive"
                      : "clientViewTabInactive"
                  }
                >
                  On-Site
                </h5>
              </div>
              {isToggle1 == "remote" && (
                <div className="candidateRateCardOverlayBody">
                  <div className="candidateRateSlider">
                    <div className="candidateRateSliderHead">
                      <h2>Hourly Rate</h2>
                    </div>
                    <div className="candidateRateSliderBody">
                      <input
                        type="number"
                        onChange={handlechange_rate}
                        name="remote_hourly"
                        defaultValue={ratecard.remote_hourly}
                      />
                    </div>
                  </div>
                  <div className="candidateRateSlider">
                    <div className="candidateRateSliderHead">
                      <h2>Monthly Rate</h2>
                    </div>
                    <div className="candidateRateSliderBody">
                      <input
                        type="number"
                        onChange={handlechange_rate}
                        name="remote_monthly"
                        defaultValue={ratecard.remote_monthly}
                      />
                    </div>
                  </div>
                  <div className="candidateRateSlider">
                    <div className="candidateRateSliderHead">
                      <h2>Annualy Rate</h2>
                    </div>
                    <div className="candidateRateSliderBody">
                      <input
                        type="number"
                        onChange={handlechange_rate}
                        name="remote_annualy"
                        defaultValue={ratecard.remote_annualy}
                      />
                    </div>
                  </div>
                </div>
              )}
              {isToggle1 == "onsite" && (
                <div className="candidateRateCardOverlayBody">
                  <div className="candidateRateSlider">
                    <div className="candidateRateSliderHead">
                      <h2>Hourly Rate</h2>
                    </div>
                    <div className="candidateRateSliderBody">
                      <input
                        type="number"
                        onChange={handlechange_rate}
                        name="onsite_hourly"
                        defaultValue={ratecard.onsite_hourly}
                      />
                    </div>
                  </div>
                  <div className="candidateRateSlider">
                    <div className="candidateRateSliderHead">
                      <h2>Monthly Rate</h2>
                    </div>
                    <div className="candidateRateSliderBody">
                      <input
                        type="number"
                        onChange={handlechange_rate}
                        name="onsite_monthly"
                        defaultValue={ratecard.onsite_monthly}
                      />
                    </div>
                  </div>
                  <div className="candidateRateSlider">
                    <div className="candidateRateSliderHead">
                      <h2>Annualy Rate</h2>
                    </div>
                    <div className="candidateRateSliderBody">
                      <input
                        type="number"
                        onChange={handlechange_rate}
                        name="onsite_annualy"
                        defaultValue={ratecard.onsite_annualy}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="vedioResumeButtons">
                <button
                  className="discard"
                  onClick={() => {
                    dispatch(storeAction.isPopUpHander());
                  }}
                >
                  Discard Changes
                </button>

                {loading === false ? (
                  <button className="save" onClick={displayHandler}>
                    Save & Close
                  </button>
                ) : (
                  <button className="save w-[10rem] flex justify-center items-center">
                    <FiLoader className="loadingIcon" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : null}
      {/* approve Conformation */}
      {isPopUp == "approveconformation" && (
        <>
          <div className="approveCandidateOverlay">
            <div className="candidateRateCardOverlayHead">
              <h1>Approve Candidate</h1>
              <span onClick={CloseOverlay}>
                <RxCross2 />
              </span>
            </div>
            <div className="approveCandidateOverlayBody">
              <p>
                You’ve checked all the details and have confirmed that this
                candidate has completed their profile.
              </p>

              <div className="approveCandidateOverlayButton">
                <button className="discard">Cancel</button>
                {loading === false ? (
                  <button onClick={approvrbtn} className="save">
                    Yes, Approve
                  </button>
                ) : (
                  <button className="save w-[10rem] flex justify-center items-center">
                    <FiLoader className="loadingIcon" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default ACandidateProfileView;
