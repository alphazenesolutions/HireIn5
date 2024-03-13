/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./PersonalDetails.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import country_and_states from "../../../../assests/country-states";
import { FiUser } from "react-icons/fi";

const PersonalDetails = () => {
  const userdata = useSelector((store) => store.userdata);
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);

  const dispatch = useDispatch();
  const [isArrow, setIsArrow] = useState(false);
  const [loading, setloading] = useState(false);

  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("personal"));
  };
  useEffect(() => {
    getUserinfo();
  }, [userdata.length !== 0]);

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
  });
  const [statelist, setstatelist] = useState([]);

  const getUserinfo = async () => {
    if (userdata.length !== 0) {
      setformdata({
        name: userdata[0].first_name,
        email: userdata[0].email,
        dob: userdata[0].date_of_birth,
        phone: userdata[0].phone,
        current_address:
          userdata[0].address !== null ? userdata[0].address.address : null,
        city: userdata[0].address !== null ? userdata[0].address.city : null,
        state: userdata[0].address !== null ? userdata[0].address.state : null,
        pincode:
          userdata[0].address !== null ? userdata[0].address.pincode : null,
        aadhar:
          userdata[0].kyc_info !== null
            ? userdata[0].kyc_info.aadhar_number
            : null,
        pan:
          userdata[0].kyc_info !== null
            ? userdata[0].kyc_info.pan_number
            : null,
        country:
          userdata[0].address !== null ? userdata[0].address.country : null,
      });
    } else {
      setTimeout(() => {
        getUserinfo();
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
  const savebtn = async () => {
    setloading(true);
    var newobj = {
      first_name: formdata.name,
      email: formdata.email,
      date_of_birth: formdata.dob,
      phone: formdata.phone,
      current_place_of_residence: formdata.current_address,
      username: userdata[0].username,
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
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      dispatch(storeAction.userdataHander({ userdata: [] }));
      setTimeout(() => {
        dispatch(storeAction.userdataHander({ userdata: [updatedata.user] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setloading(false);
    }
    getUserinfo();
  };
  const cancelbtn = () => {
    dispatch(storeAction.isPopUpHander());
  };
  return (
    <div>
      <div className="personalDetails">
        <div className="innerPersonalDetails">
          <div
            className={
              isArrow === true ? "personalDetailsHead" : "bottomBorder"
            }
          >
            <div className="personalDetailsHeadLeft">
              <span>
                <FiUser />
              </span>
              <h1>Personal Details</h1>
            </div>
            <div className="personalDetailsLeftIcon">
              <img
                className="personalDetailsLeftIconSvg"
                onClick={overLayHandler}
                src={edit}
                alt=""
              />
              {isArrow === true ? (
                <img onClick={dropDownhandler} src={dropUp} alt="" />
              ) : (
                <img onClick={dropDownhandler} src={dropDown} alt="" />
              )}
            </div>
          </div>
          {isArrow === true && (
            <div className="personalDetailsDesc">
              <h1>Tell us about yourself</h1>
              {userdata.length !== 0 ? (
                <div className="personalInfo">
                  <div className="personalDetailsDescLeft">
                    <h2>Name</h2>
                    <h3>{userdata[0].first_name}</h3>
                    <h2>Date of Birth</h2>
                    <h3>{userdata[0].date_of_birth}</h3>
                    <h2>Phone Number</h2>
                    <h3>{userdata[0].phone}</h3>
                    {userdata[0].kyc_info !== null ? (
                      <>
                        <h2>AADHAAR / Govt. Issued ID</h2>
                        <h3 className="personalDetailsDescLeftOpacity">
                          {userdata[0].kyc_info.aadhar_number}
                        </h3>
                        <h2>PAN Card / Govt. Issued TAX ID</h2>
                        <h3 className="personalDetailsDescLeftOpacity">
                          {userdata[0].kyc_info.pan_number}
                        </h3>
                      </>
                    ) : null}
                  </div>
                  <div className="personalDetailsDescRight">
                    <h2>Email ID</h2>
                    <h3>{userdata[0].email}</h3>
                    {userdata[0].address !== null ? (
                      <>
                        <h2>Current Residential Address</h2>
                        <h3>{userdata[0].address.address}</h3>
                        <h2>City</h2>
                        <h3>{userdata[0].address.city}</h3>
                        <h2>PINCODE</h2>
                        <h3>{userdata[0].address.pincode}</h3>
                        <h2>Country</h2>
                        <h3>{userdata[0].address.country}</h3>
                      </>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          )}
          {isPopUp === "personal" && (
            <div className="personalOverlay">
              <div className="innerPersonalDetails">
                <div
                  className={
                    isArrow === true ? "personalDetailsHead" : "bottomBorder"
                  }
                >
                  <div className="personalDetailsHeadLeft">
                    <img src={user} alt="" />
                    <h1>Personal Details</h1>
                  </div>
                  <div className="personalDetailsLeftIcon">
                    <img
                      className="personalDetailsLeftIconSvg"
                      onClick={overLayHandler}
                      src={edit}
                      alt=""
                    />
                    {isArrow === true ? (
                      <img onClick={dropDownhandler} src={dropUp} alt="" />
                    ) : (
                      <img onClick={dropDownhandler} src={dropDown} alt="" />
                    )}
                  </div>
                </div>
              </div>
              <div className="updatePersonalDetails">
                <h1>Tell us about yourself</h1>
                <div className="updatePersonalDetailsFlex">
                  <div className="updatePersonalDetailsLeft">
                    <h2>Name</h2>
                    <input
                      placeholder="Yasir Quazi"
                      type="text"
                      name="name"
                      onChange={handlechange}
                      defaultValue={formdata.name}
                    />
                    <h2>Date of Birth</h2>
                    <input
                      className="31 / 05 / 1991"
                      type="date"
                      name="dob"
                      onChange={handlechange}
                      defaultValue={formdata.dob}
                    />
                    <h2>Phone Number</h2>
                    <input
                      placeholder="9876543210"
                      type="text"
                      maxLength={12}
                      name="phone"
                      onChange={handlechange}
                      defaultValue={formdata.phone}
                    />
                    <h2>AADHAAR / Govt. Issued ID</h2>
                    <input
                      className="inputColor"
                      placeholder="48XX XXXX XX21"
                      type="text"
                      name="aadhar"
                      onChange={handlechange}
                      defaultValue={formdata.aadhar}
                    />
                    <h2>PAN Card / Govt. Issued TAX ID</h2>
                    <input
                      className="inputColor"
                      placeholder="48XX XXXX XX21"
                      type="text"
                      name="pan"
                      onChange={handlechange}
                      defaultValue={formdata.pan}
                    />
                  </div>
                  <div className="updatePersonalDetailsRight">
                    <h2>Email ID</h2>
                    <input
                      placeholder="yasirquazi2000@gmail.com"
                      type="text"
                      name="email"
                      onChange={handlechange}
                      defaultValue={formdata.email}
                    />
                    <h2>Current Residential Address</h2>
                    <input
                      placeholder="Lorem ipsum dolor sit amet, Richmond Road"
                      type="text"
                      name="current_address"
                      onChange={handlechange}
                      defaultValue={formdata.current_address}
                    />

                    <h2>Country</h2>
                    <select
                      name="country"
                      onChange={handlechange}
                      defaultValue={formdata.country}
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
                    <div className="flex gap-4">
                      <div className="w-full">
                        <h2>State</h2>
                        <select
                          id=""
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
                      <div className="w-full">
                        <h2>City</h2>
                        <input
                          placeholder="Bengaluru"
                          type="text"
                          name="city"
                          onChange={handlechange}
                          defaultValue={formdata.city}
                        />
                      </div>
                    </div>
                    <h2>PINCODE</h2>
                    <input
                      placeholder="560005"
                      type="number"
                      name="pincode"
                      onChange={handlechange}
                      defaultValue={formdata.pincode}
                    />
                    {/* <input placeholder="India" type="text" /> */}
                  </div>
                </div>
              </div>
              <div className="vedioResumeButtons">
                <button className="discard" onClick={cancelbtn}>
                  Discard Changes
                </button>
                {loading === false ? (
                  <button className="save" onClick={savebtn}>
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
      </div>
    </div>
  );
};

export default PersonalDetails;
