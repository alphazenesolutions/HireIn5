/* eslint-disable eqeqeq */
import React from "react";
import "./ProfileCard.css";
import candidateimges from "../../../assests/table.png";
import briefcase from "../../../assests/briefCase.png";
import graduation_cap from "../../../assests/graduationCap.png";
import user_check from "../../../assests/userCheck.png";
import location from "../../../assests/mapPin.png";
import courseIcons from "../../../assests/userCard.png";

const ProfileCard = ({ filterdata, fun }) => {
  return (
    <div>
      <div className="clientDiscoverOuter paddingRight100">
        <div className="clientDiscoverInner">
          <div className="clientDiscoverTop">
            <h1>{filterdata.length} Results</h1>
            <h1 title="">Sort by</h1>
          </div>
          <div className="clientDiscover">
            {filterdata.length !== 0
              ? filterdata.map((data, index) => (
                  <div
                    id="page2"
                    onClick={() => fun("page2", data.id)}
                    className="clientDiscover1"
                    key={index}
                  >
                    <div className="candidateDiscoverProfile">
                      <div className="candidateDiscoverProfile1">
                        <div className="candidateDiscoverImage">
                          <img src={candidateimges} alt="" />
                        </div>
                        <div className="candidateDiscoverName">
                          <h3>{data.first_name}</h3>
                          <h5>{data.title}</h5>
                        </div>
                      </div>
                      <div className="candidateDiscoverHours">
                        <h2>&#8377; {data.hourly_rate}/hr</h2>
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
                      <div className="candidateDiscoverExp">
                        <p>
                          <img src={briefcase} alt="" /> 2 years of experience
                        </p>
                      </div>
                      <div className="candidateDiscoverExp">
                        <p>
                          <img src={graduation_cap} alt="" /> Bachelors in
                          Computer Science
                        </p>
                      </div>
                      <div className="candidateDiscoverExp">
                        <p>
                          <img src={user_check} alt="" /> Part-time availability
                        </p>
                      </div>

                      <div className="candidateDiscoverExp">
                        <p>
                          <img src={location} alt="" /> Japan, Australia, Kuwait
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
