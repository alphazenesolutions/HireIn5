/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import briefcase from "../../../assests/briefCase.png";
import graduation_cap from "../../../assests/graduationCap.png";
import user_check from "../../../assests/userCheck.png";
import location from "../../../assests/mapPin.png";
import courseIcons from "../../../assests/userCard.png";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../Store/Store";
import { MdSort } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { FiLoader } from "react-icons/fi";

const ProfileCard = ({ filterdata, fun }) => {

  const dispatch = useDispatch();
  const [finaldata, setfinaldata] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [raterange, setraterange] = useState(null);
  const [experiencerange, setexperiencerange] = useState(null);
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });

  const sortHandler = (e) => {
    dispatch(storeAction.isPopUpHander(e.target.id));
  };
  const sortbtn = async () => {
    let filteredData = filterdata.filter(
      (item) => item.rate_card_info !== null
    );
    let sortedData = [...filteredData];
    if (raterange === "Low to High") {
      sortedData.sort(
        (a, b) =>
          a.rate_card_info.remote_hourly - b.rate_card_info.remote_hourly
      );
    } else {
      sortedData.sort(
        (a, b) =>
          b.rate_card_info.remote_hourly - a.rate_card_info.remote_hourly
      );
    }
    if (experiencerange !== null) {
      let filtered_Data = sortedData.filter(
        (item) => item.preference_info !== null
      );
      let sorted_Data = [...filtered_Data];
      if (experiencerange === "Low to High") {
        sorted_Data.sort(
          (a, b) =>
            a.preference_info.year_of_experience -
            b.preference_info.year_of_experience
        );
      } else {
        sorted_Data.sort(
          (a, b) =>
            b.preference_info.year_of_experience -
            a.preference_info.year_of_experience
        );
      }
      setfinaldata(sorted_Data);
    } else {
      setfinaldata(sortedData);
    }
    dispatch(storeAction.isPopUpHander());
  };
  useEffect(() => {
    setfinaldata(filterdata);
  }, [filterdata]);
  return (
    <div>
      <div className="clientDiscoverOuter paddingRight100">
        <div className="clientDiscoverInner">
          <div className="clientDiscoverTop">
            <h1>{filterdata.length} Results</h1>
            <h1 id="sort" onClick={sortHandler} title="" className="pointer">
              Sort by
            </h1>
          </div>
          <div className="clientDiscover">
            {finaldata.length !== 0 ? (
              finaldata.map((data, index) => (
                <div
                  id="page2"
                  onClick={() => fun("page2", data.id)}
                  className="clientDiscover1"
                  key={index}
                >
                  <div className="candidateDiscoverProfile">
                    <div className="candidateDiscoverProfile1">
                      <div className="candidateDiscoverImage">
                        {/* <img src={candidateimges} alt="" /> */}

                        {data.profile_picture.length == 0 ? (
                          <Avatar
                            name={data.first_name}
                            size={50}
                            round="50px"
                          />
                        ) : (
                          <img src={data.profile_picture} alt="" />
                        )}
                      </div>
                      <div className="candidateDiscoverName">
                        <h3>{data.first_name}</h3>
                        <h5>{data.role == 3 ? "Candidate" : "Client"}</h5>
                      </div>
                    </div>
                    <div className="candidateDiscoverHours">
                      {data.rate_card_info !== null ? (
                        <h2> {data.rate_card_info.remote_hourly}/hr</h2>
                      ) : (
                        <h5 className="rateHour">Not provided yet</h5>
                      )}
                    </div>
                  </div>
                  <div className="candidateDiscoverSkills">
                    {data.preference_info !== null
                      ? data.preference_info.skills.length !== 0
                        ? data.preference_info.skills.map((datanew, index) =>
                            index == 0 || index == 1 || index == 2 ? (
                              <h4>
                                <img src={courseIcons} alt="" />
                                {datanew}
                              </h4>
                            ) : (
                              <h4 key={index}>{datanew}</h4>
                            )
                          )
                        : null
                      : null}
                  </div>
                  <div className="candidateDiscoverExperience">
                    {data.preference_info !== null ? (
                      <div className="candidateDiscoverExp">
                        <p>
                          <img src={briefcase} alt="" />
                          {data.preference_info.year_of_experience} years of
                          experience
                        </p>
                      </div>
                    ) : null}
                    {data.preference_info !== null ? (
                      <div className="candidateDiscoverExp">
                        <p>
                          <img src={graduation_cap} alt="" />{" "}
                          {data.preference_info.qualification}
                        </p>
                      </div>
                    ) : null}

                    <div className="candidateDiscoverExp">
                      <p>
                        <img src={user_check} alt="" />
                        {data.work_preference_info !== null ? (
                          <h5>
                            {
                              data.work_preference_info
                                .preferred_mode_of_engagement
                            }{" "}
                            availability
                          </h5>
                        ) : null}
                      </p>
                    </div>
                    {data.address !== null ? (
                      <div className="candidateDiscoverExp">
                        <p>
                          <img src={location} alt="" /> {data.address.city},{" "}
                          {data.address.state}, {data.address.country}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-full my-24 ml-72 font-semibold text-2xl">
                No candidated found on your selected preferences
              </div>
            )}
          </div>
        </div>
      </div>
      {isPopUp == "sort" && (
        <>
          <div className="adminEditOverlay">
            <div className="adminEditOverlayHead">
              <h1>Sort By</h1>
              <RxCross1 onClick={sortHandler} className="pointer" />
            </div>
            <div className="adminEditOverlayBody">
              <div className="adminEditOverlayContent">
                <h2>Hourly Rate</h2>
                <select
                  onChange={(e) => {
                    setraterange(e.target.value);
                    setexperiencerange(null);
                  }}
                  selected={raterange}
                >
                  <option value="">Select</option>
                  <option value="Low to High">Low to High</option>
                  <option value="High to Low">High to Low</option>
                </select>
              </div>
              <div className="adminEditOverlayContent">
                <h2>Years of Experience</h2>
                <select
                  onChange={(e) => {
                    setexperiencerange(e.target.value);
                  }}
                  selected={experiencerange}
                >
                  <option value="">Select</option>
                  <option value="Low to High">Low to High </option>
                  <option value="High to Low">High to Low</option>
                </select>
              </div>
            </div>
            <div className="editOverlayButton">
              <button
                className="discard"
                onClick={() => {
                  dispatch(storeAction.isPopUpHander());
                }}
              >
                Discard
              </button>

              {loading === false ? (
                <button className="save" onClick={sortbtn}>
                  Sort
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
  );
};

export default ProfileCard;
