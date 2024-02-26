/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./TravelHistory.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import axios from "axios";
import { FiLoader } from "react-icons/fi";

const TravelHistory = () => {
  const userdata = useSelector((store) => store.userdata);
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);

  const dispatch = useDispatch();
  const [isArrow, setIsArrow] = useState(false);
  const [status, setstatus] = useState(false);
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
    travel_readlines: "",
    duration: "",
    country: "",
    onlyfor: "",
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

  const dropDownhandler = () => {
    setIsArrow(!isArrow);
  };

  const [isPage, setIsPage] = useState("page1");
  const pagehandler = (e) => {
    setIsPage(e.target.id);
  };

  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const overLayHandler = () => {
    dispatch(storeAction.isPopUpHander("travel"));
  };

  const handlechangetravel = (value, index, name) => {
    travelrow[index][name] = value;
    settravelrow([...travelrow]);
  };
  const handlechange_travel = (e) => {
    const { name, value } = e.target;
    settravelform((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    Getalldata();
  }, [userdata]);
  const Getalldata = async () => {
    if (userdata.length !== 0) {
      if (userdata[0].travel_info !== null) {
        if (userdata[0].travel_info.travelled_to.length !== 0) {
          var newarray = [];
          for (
            var i = 0;
            i < userdata[0].travel_info.travelled_to.length;
            i++
          ) {
            newarray.push({
              country:
                userdata[0].travel_info.travelled_to[i].split(":")[0].length !==
                0
                  ? userdata[0].travel_info.travelled_to[i]
                      .split(":")[0]
                      .replace(/\s/g, "")
                  : "",
              year_of_travel:
                userdata[0].travel_info.travelled_to[i].split(":")[1].length !==
                0
                  ? userdata[0].travel_info.travelled_to[i]
                      .split(":")[1]
                      .replace(/\s/g, "")
                  : "",
              duration:
                userdata[0].travel_info.travelled_to[i].split(":")[2].length !==
                0
                  ? userdata[0].travel_info.travelled_to[i]
                      .split(":")[2]
                      .replace(/\s/g, "")
                  : "",
              purpose:
                userdata[0].travel_info.travelled_to[i].split(":")[3].length !==
                0
                  ? userdata[0].travel_info.travelled_to[i]
                      .split(":")[3]
                      .replace(/\s/g, "")
                  : "",
              type_of_visa:
                userdata[0].travel_info.travelled_to[i].split(":")[4].length !==
                0
                  ? userdata[0].travel_info.travelled_to[i]
                      .split(":")[4]
                      .replace(/\s/g, "")
                  : "",
              validity_of_visa:
                userdata[0].travel_info.travelled_to[i].split(":")[5].length !==
                0
                  ? userdata[0].travel_info.travelled_to[i]
                      .split(":")[5]
                      .replace(/\s/g, "")
                  : "",
            });
          }
          settravelrow(newarray);
        }
        settravelform({
          current_place_of_residence: userdata[0].current_place_of_residence,
          lived_at_current_residence: userdata[0].lived_at_current_residence,
          travel_readlines: userdata[0].travel_info.travel_readlines,
          duration: userdata[0].travel_info.duration,
          country: userdata[0].travel_info.country.toString(),
          onlyfor: userdata[0].travel_info.onlyfor,
        });

        if (userdata[0].travel_info.relocate_for_work.length !== 0) {
          var new_array = [];
          for (
            var j = 0;
            j < userdata[0].travel_info.relocate_for_work.length;
            j++
          ) {
            new_array.push({
              are_you_willing:
                userdata[0].travel_info.relocate_for_work[j].split(":")[0]
                  .length !== 0
                  ? userdata[0].travel_info.relocate_for_work[j]
                      .split(":")[0]
                      .replace(/\s/g, "")
                  : "",
              preferred_countries:
                userdata[0].travel_info.relocate_for_work[j].split(":")[1]
                  .length !== 0
                  ? userdata[0].travel_info.relocate_for_work[j]
                      .split(":")[1]
                      .replace(/\s/g, "")
                  : "",
              how_long:
                userdata[0].travel_info.relocate_for_work[j].split(":")[2]
                  .length !== 0
                  ? userdata[0].travel_info.relocate_for_work[j]
                      .split(":")[2]
                      .replace(/\s/g, "")
                  : "",
            });
          }
          setrelocate(new_array);
        }
      }
    }
  };
  const [relocate, setrelocate] = useState([
    {
      are_you_willing: "",
      preferred_countries: "",
      how_long: "",
    },
  ]);
  const [loading, setloading] = useState(false);
  const addcountrelocate = () => {
    var newobj = {
      are_you_willing: "",
      preferred_countries: "",
      how_long: "",
    };
    setrelocate((prevState) => [...prevState, newobj]);
  };

  const handlechangerelocate = (value, index, name) => {
    relocate[index][name] = value;
    setrelocate([...relocate]);
  };
  const submitbtn = async () => {
    setloading(true);
    const arrayOfStrings = travelrow.map(
      (obj) =>
        `${obj.country}: ${obj.year_of_travel}: ${obj.duration}: ${obj.purpose}: ${obj.type_of_visa}: ${obj.validity_of_visa}`
    );
    const arrayOfStrings1 = relocate.map(
      (obj) =>
        `${obj.are_you_willing}: ${obj.preferred_countries}: ${obj.how_long}`
    );
    var newobj1 = {
      username: userdata[0].username,
      travel_info: {
        travelled_to: arrayOfStrings,
        relocate_for_work: arrayOfStrings1,
        country: travelform.country.split(","),
        onlyfor: "test",
        duration: travelform.duration,
        travel_readlines: travelform.travel_readlines,
      },
      current_place_of_residence: travelform.current_place_of_residence,
      lived_at_current_residence: travelform.lived_at_current_residence,
    };
    var updatedata = await axios
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
        return err.response.data;
      });
    if (
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      let updatedObject = {
        ...userdata[0],
        travel_info: updatedata.user.travel_info,
      };
      dispatch(storeAction.userdataHander({ userdata: [updatedObject] }));
      dispatch(storeAction.isPopUpHander());
      setloading(false);
    } else {
      setloading(false);
    }
  };
  return (
    <div>
      <div className="travelHistory">
        <div className="innerTravelHistory">
          <div
            className={isArrow === true ? "travelHistoryHead" : "bottomBorder"}
          >
            <div className="travelHistoryHeadLeft">
              <img src={user} alt="" />
              <h1>Travel History</h1>
            </div>
            <div className="travelHistoryLeftIcon">
              <img
                className="travelHistoryLeftIconSvg"
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
            <div className="travelHistoryDesc">
              <h1>
                Add your travel history here to stand out from other candidates
              </h1>
              {userdata.length !== 0 ? (
                <div className="travelGrid">
                  {userdata[0].travel_info !== null
                    ? userdata[0].travel_info.travelled_to.length !== 0
                      ? userdata[0].travel_info.travelled_to.map(
                          (data, index) => (
                            <div className="travelGridOne" key={index}>
                              <h1>Countries you’ve travelled to</h1>
                              <h2>{data.split(":")[0]}</h2>
                              <h3>
                                Year of Travel : <p>{data.split(":")[1]}</p>
                              </h3>
                              <h3 className="marginBottom20">
                                Duration : <p>{data.split(":")[2]}</p>
                              </h3>
                              <h3>
                                Purpose : <p>{data.split(":")[3]}</p>
                              </h3>
                              <h3>
                                Type of Visa : <p>{data.split(":")[4]}</p>
                              </h3>
                              <h3>
                                Validity of Visa : <p>{data.split(":")[5]}</p>
                              </h3>
                            </div>
                          )
                        )
                      : null
                    : null}

                  {userdata[0].travel_info !== null ? (
                    <div className="travelGridOne">
                      <h1>Countries you’re willing to travel to for work</h1>

                      {userdata[0].travel_info.country.length !== 0
                        ? userdata[0].travel_info.country.map((item, index) => (
                            <h2 key={index}>{item}</h2>
                          ))
                        : null}

                      <h3 className="marginTop20">
                        Only For : <p>{userdata[0].travel_info.onlyfor}</p>
                      </h3>
                      <h3>
                        Duration : <p>{userdata[0].travel_info.duration}</p>
                      </h3>
                      <h3>
                        Travel Readiness :
                        <p>{userdata[0].travel_info.travel_readlines}</p>
                      </h3>
                    </div>
                  ) : null}

                  {/* <div className="travelGridOne">
                    <h1>Residency details</h1>
                    <h3 className="marginTop20">
                      Current Place of Residence:
                      <p>Pending</p>
                    </h3>
                    <h3 className="marginTop20">
                      Duration:
                      <p>Pending</p>
                    </h3>
                  </div>
                  <div className="travelGridOne">
                    <h1>Countries you’re willing to travel to for work</h1>
                    <h2>Country 1</h2>
                    <h2>Country 2</h2>
                    <h2>Country 3</h2>
                    <h3 className="marginTop20">
                      Preferred Duration:
                      <p>Pending</p>
                    </h3>
                  </div> */}
                </div>
              ) : null}
            </div>
          )}
          {isPopUp === "travel" && (
            <div className="travelHistoryDescOverlay">
              <div className="innerTravelHistory">
                <div className="travelHistoryHead">
                  <div className="travelHistoryHeadLeft">
                    <img src={user} alt="" />
                    <h1>Travel History</h1>
                  </div>
                  <div className="travelHistoryLeftIcon"></div>
                </div>
              </div>
              {isPage === "page1" && (
                <div className="travelRadio">
                  <h1>
                    Have you ever travelled out of your home country for work or
                    otherwise?
                  </h1>
                  <div className="travelRadioOne">
                    <input
                      type="radio"
                      onChange={() => {
                        setstatus(true);
                      }}
                      checked={status === true}
                    />
                    <div
                      className="travelRadioOneDesc"
                      onClick={() => {
                        setstatus(true);
                      }}
                    >
                      <h3>Yes</h3>
                      <p>
                        Add your travel history here to stand out from other
                        candidates
                      </p>
                    </div>
                  </div>
                  <div className="travelRadioOne">
                    <input
                      type="radio"
                      onChange={() => {
                        setstatus(false);
                      }}
                      checked={status === false}
                    />
                    <div
                      className="travelRadioOneDesc"
                      onClick={() => {
                        setstatus(false);
                      }}
                    >
                      <h3>No</h3>
                      <p>
                        Travel History section will be left blank on your
                        profile
                      </p>
                    </div>
                  </div>
                  <div className="vedioResumeButtons">
                    <button
                      className="discard"
                      onClick={() => {
                        dispatch(storeAction.isPopUpHander());
                      }}
                    >
                      Close
                    </button>
                    <button id="page2" onClick={pagehandler} className="save">
                      Proceed
                    </button>
                  </div>
                </div>
              )}
              {isPage === "page2" && (
                <div className="">
                  <h6 className="travelHistoryDescOverlayh6">
                    Add your travel history here to stand out from other
                    candidates
                  </h6>
                  <div className="travelHistoryDescOverlayInner">
                    <div className="travelUpdate">
                      <h6>Countries you’ve travelled to</h6>
                      {travelrow.length !== 0
                        ? travelrow.map((data, index) => (
                            <div key={index}>
                              <div className="travelUpdateFlex">
                                <div className="travelUpdateFlexLeft">
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
                                  >
                                    <option value="USA">USA</option>
                                    <option value="India">INDIA</option>
                                  </select>
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

                                <div className="travelUpdateFlexCenter">
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
                                <div className="travelUpdateFlexRight">
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
                              <hr className="border border-gray-400 my-5" />
                            </div>
                          ))
                        : null}
                      <button onClick={addcounttravel}>+ Add more</button>
                    </div>
                  </div>
                  <div className="willingTravel">
                    <div className="willingTravelInner">
                      <h6>Countries you’re willing to travel to for work</h6>
                      <div className="willingFlex">
                        <div className="willingFlexLeft">
                          <div className="upto">
                            <h2>Country</h2>
                            <h3>Select upto 3 countries</h3>
                          </div>
                          <input
                            type="text"
                            name="country"
                            defaultValue={travelform.country}
                            onChange={handlechange_travel}
                          />
                          <h2>Duration</h2>
                          <input
                            type="text"
                            name="duration"
                            defaultValue={travelform.duration}
                            onChange={handlechange_travel}
                          />
                        </div>
                        <div className="willingFlexRight">
                          <h2>Only For</h2>
                          <input
                            type="text"
                            name="onlyfor"
                            defaultValue={travelform.onlyfor}
                            onChange={handlechange_travel}
                          />
                          <h2>Travel Readlines</h2>
                          <input
                            type="text"
                            name="travel_readlines"
                            defaultValue={travelform.travel_readlines}
                            onChange={handlechange_travel}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="vedioResumeButtons">
                    <button
                      className="discard"
                      onClick={() => {
                        dispatch(storeAction.isPopUpHander());
                      }}
                    >
                      Discard Changes
                    </button>
                    <button id="page3" onClick={pagehandler} className="save">
                      Save & Close
                    </button>
                  </div>
                </div>
              )}
              {isPage === "page3" && (
                <div className="HistoryOfTravel">
                  <h1 className="HistoryOfTravelH1">
                    Add your travel history here to stand out from other
                    candidates
                  </h1>
                  <div className="residency">
                    <div className="residencyInner">
                      <h6>Residency Details</h6>
                      <h2>Current place of residence</h2>
                      <input
                        type="text"
                        id=""
                        name="current_place_of_residence"
                        defaultValue={travelform.current_place_of_residence}
                        onChange={handlechange_travel}
                      />
                      <h2>
                        How long have you lived at your current residence?
                      </h2>
                      <input
                        type="text"
                        id=""
                        name="lived_at_current_residence"
                        defaultValue={travelform.lived_at_current_residence}
                        onChange={handlechange_travel}
                      />
                    </div>
                  </div>
                  <div className="residency">
                    {relocate.length !== 0
                      ? relocate.map((data, index) => (
                          <div className="residencyInner" key={index}>
                            <h6>
                              Countries you’re willing to Relocate for work
                            </h6>
                            <h2>Are you willing to relocate?</h2>
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
                            <div className="upto">
                              <h2>
                                What are your preferred countries to relocate
                                to?
                              </h2>
                              <h3>Select up to 3 countries</h3>
                            </div>
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
                            <h2>How long are you willing to relocate for?</h2>
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
                        ))
                      : null}

                    <button onClick={addcountrelocate}>+ Add more</button>
                  </div>
                  <div className="vedioResumeButtons">
                    <button
                      className="discard"
                      onClick={() => {
                        setIsPage("page2");
                      }}
                    >
                      Discard Changes
                    </button>
                    {loading === false ? (
                      <button className="save" onClick={submitbtn}>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelHistory;
