import React, { useState } from "react";
import "./TravelHistory.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";
import edit from "../../../../assests/edit.svg";
import dropUp from "../../../../assests/arrowUp.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";

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
                                  <select name="" id="">
                                    <option value="">USA</option>
                                    <option value="">INDIA</option>
                                  </select>
                                  <h2>Purpose</h2>
                                  <select name="" id="">
                                    <option value="">Work </option>
                                    <option value="">Travel</option>
                                  </select>
                                </div>
                                <div className="travelUpdateFlexCenter">
                                  <h2>Year of travel</h2>
                                  <input type="text" name="" id="" />
                                  <h2>Type of Visa</h2>
                                  <input type="text" name="" id="" />
                                </div>
                                <div className="travelUpdateFlexRight">
                                  <h2>Duration</h2>
                                  <select name="" id="">
                                    <option value="">1 month</option>
                                    <option value="">2 month</option>
                                    <option value="">3 month</option>
                                    <option value="">4 month</option>
                                    <option value="">5 month</option>
                                  </select>
                                  <h2>Validity of Visa</h2>
                                  <input type="date" name="" id="" />
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
                          <select name="" id="">
                            <option value="">USA</option>
                            <option value="">INDIA</option>
                          </select>
                          <h2>Duration</h2>
                          <select name="" id="">
                            <option value="">Short Term </option>
                            <option value="">Long Term</option>
                          </select>
                        </div>
                        <div className="willingFlexRight">
                          <h2>Duration</h2>
                          <select name="" id="">
                            <option value="">work </option>
                            <option value="">Travel</option>
                          </select>
                          <h2>Duration</h2>
                          <select name="" id="">
                            <option value="">Immediate</option>
                            <option value="">Notice period</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="vedioResumeButtons">
                    <button className="discard">Discard Changes</button>
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
                      <input type="text" name="" id="" />
                      <h2>
                        How long have you lived at your current residence?
                      </h2>
                      <input type="text" name="" id="" />
                    </div>
                  </div>
                  <div className="residency">
                    <div className="residencyInner">
                      <h6>Countries you’re willing to Relocate for work</h6>
                      <h2>Are you willing to relocate?</h2>
                      <select name="" id="">
                        <option value="">No</option>
                        <option value="">yes</option>
                      </select>
                      <div className="upto">
                        <h2>
                          What are your preferred countries to relocate to?
                        </h2>
                        <h3>Select up to 3 countries</h3>
                      </div>
                      <select name="" id="">
                        <option value="">No</option>
                        <option value="">yes</option>
                      </select>
                      <h2>How long are you willing to relocate for?</h2>
                      <select name="" id="">
                        <option value="">upto 6 months</option>
                        <option value="">upto 3 months</option>
                      </select>
                    </div>
                  </div>
                  <div className="vedioResumeButtons">
                    <button className="discard">Discard Changes</button>
                    <button id="page3" onClick={pagehandler} className="save">
                      Save & Close
                    </button>
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
