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
  }, [userdata.length !== 0]);

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
        return err.response;
      });
    if (
      updatedata.message === "User and Associated Info updated successfully"
    ) {
      let updatedObject = {
        ...userdata[0],
        travel_info: updatedata.user.travel_info,
      };
      dispatch(storeAction.userdataHander({ userdata: [] }));
      setTimeout(() => {
        dispatch(storeAction.userdataHander({ userdata: [updatedObject] }));
      }, 10);
      dispatch(storeAction.isPopUpHander());
      setloading(false);
    } else {
      setloading(false);
    }
    Getalldata();
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
                                    <option value="">Country</option>
                                    <option value="United States">
                                      United States
                                    </option>
                                    <option value="Afghanistan">
                                      Afghanistan
                                    </option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="American Samoa">
                                      American Samoa
                                    </option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antartica">
                                      Antarctica
                                    </option>
                                    <option value="Antigua and Barbuda">
                                      Antigua and Barbuda
                                    </option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">
                                      Azerbaijan
                                    </option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">
                                      Bangladesh
                                    </option>
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
                                    <option value="Bouvet Island">
                                      Bouvet Island
                                    </option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="British Indian Ocean Territory">
                                      British Indian Ocean Territory
                                    </option>
                                    <option value="Brunei Darussalam">
                                      Brunei Darussalam
                                    </option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">
                                      Burkina Faso
                                    </option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Cape Verde">
                                      Cape Verde
                                    </option>
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
                                    <option value="Cook Islands">
                                      Cook Islands
                                    </option>
                                    <option value="Costa Rica">
                                      Costa Rica
                                    </option>
                                    <option value="Cota D'Ivoire">
                                      Cote d'Ivoire
                                    </option>
                                    <option value="Croatia">
                                      Croatia (Hrvatska)
                                    </option>
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
                                    <option value="East Timor">
                                      East Timor
                                    </option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">
                                      El Salvador
                                    </option>
                                    <option value="Equatorial Guinea">
                                      Equatorial Guinea
                                    </option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Falkland Islands">
                                      Falkland Islands (Malvinas)
                                    </option>
                                    <option value="Faroe Islands">
                                      Faroe Islands
                                    </option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="France Metropolitan">
                                      France, Metropolitan
                                    </option>
                                    <option value="French Guiana">
                                      French Guiana
                                    </option>
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
                                    <option value="Guadeloupe">
                                      Guadeloupe
                                    </option>
                                    <option value="Guam">Guam</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea-Bissau">
                                      Guinea-Bissau
                                    </option>
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
                                    <option value="Kazakhstan">
                                      Kazakhstan
                                    </option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Democratic People's Republic of Korea">
                                      Korea, Democratic People's Republic of
                                    </option>
                                    <option value="Korea">
                                      Korea, Republic of
                                    </option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">
                                      Kyrgyzstan
                                    </option>
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
                                    <option value="Liechtenstein">
                                      Liechtenstein
                                    </option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">
                                      Luxembourg
                                    </option>
                                    <option value="Macau">Macau</option>
                                    <option value="Macedonia">
                                      Macedonia, The Former Yugoslav Republic of
                                    </option>
                                    <option value="Madagascar">
                                      Madagascar
                                    </option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">
                                      Marshall Islands
                                    </option>
                                    <option value="Martinique">
                                      Martinique
                                    </option>
                                    <option value="Mauritania">
                                      Mauritania
                                    </option>
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
                                    <option value="Montserrat">
                                      Montserrat
                                    </option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">
                                      Mozambique
                                    </option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">
                                      Netherlands
                                    </option>
                                    <option value="Netherlands Antilles">
                                      Netherlands Antilles
                                    </option>
                                    <option value="New Caledonia">
                                      New Caledonia
                                    </option>
                                    <option value="New Zealand">
                                      New Zealand
                                    </option>
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
                                    <option value="Philippines">
                                      Philippines
                                    </option>
                                    <option value="Pitcairn">Pitcairn</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Puerto Rico">
                                      Puerto Rico
                                    </option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russia">
                                      Russian Federation
                                    </option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Saint Kitts and Nevis">
                                      Saint Kitts and Nevis
                                    </option>
                                    <option value="Saint Lucia">
                                      Saint LUCIA
                                    </option>
                                    <option value="Saint Vincent">
                                      Saint Vincent and the Grenadines
                                    </option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">
                                      San Marino
                                    </option>
                                    <option value="Sao Tome and Principe">
                                      Sao Tome and Principe
                                    </option>
                                    <option value="Saudi Arabia">
                                      Saudi Arabia
                                    </option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Seychelles">
                                      Seychelles
                                    </option>
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
                                    <option value="South Africa">
                                      South Africa
                                    </option>
                                    <option value="South Georgia">
                                      South Georgia and the South Sandwich
                                      Islands
                                    </option>
                                    <option value="Span">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="St. Helena">
                                      St. Helena
                                    </option>
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
                                    <option value="Switzerland">
                                      Switzerland
                                    </option>
                                    <option value="Syria">
                                      Syrian Arab Republic
                                    </option>
                                    <option value="Taiwan">
                                      Taiwan, Province of China
                                    </option>
                                    <option value="Tajikistan">
                                      Tajikistan
                                    </option>
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
                                    <option value="Turkmenistan">
                                      Turkmenistan
                                    </option>
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
                                    <option value="Uzbekistan">
                                      Uzbekistan
                                    </option>
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
                        type="number"
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
