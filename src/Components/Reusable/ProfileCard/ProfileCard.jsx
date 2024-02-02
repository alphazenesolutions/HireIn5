import React from "react";
import "./ProfileCard.css";
import candidateimges from "../../../assests/table.png";
import courseIcons from "../../../assests/userCard.png";
import briefcase from "../../../assests/briefCase.png";
import graduation_cap from "../../../assests/graduationCap.png";
import user_check from "../../../assests/userCheck.png";
import location from "../../../assests/mapPin.png";
// import BookMarkSimple from "../../../assests/colar.png";

const ProfileCard = (props) => {
  return (
    <div>
      <div className={props.class}>
        <div className="clientDiscoverInner">
          <div className="clientDiscoverTop">
            <h1>834 Results</h1>
            <h1 title="">Sort by</h1>
          </div>
          <div className="clientDiscover">
            <div className="clientDiscover1">
              <div className="candidateDiscoverProfile">
                <div className="candidateDiscoverProfile1">
                  <div className="candidateDiscoverImage">
                    <img src={candidateimges} alt="" />
                  </div>
                  <div className="candidateDiscoverName">
                    <h3>Surya Narreddi</h3>
                    <h5>Java Developer</h5>
                  </div>
                </div>
                <div className="candidateDiscoverHours">
                  <h2>&#8377; 4500/hr</h2>
                </div>
              </div>
              <div className="candidateDiscoverSkills">
                <h4>
                  <img src={courseIcons} alt="" />
                  Java EEE
                </h4>
                <h4>
                  <img src={courseIcons} alt="" />
                  JavaScript
                </h4>
                <h4>
                  <img src={courseIcons} alt="" />
                  Java
                </h4>
                <h4>jQuery</h4>
                <h4>Android</h4>
                <h4>Kotlin</h4>
                <h4>REST</h4>
                <h4>Spring Framework</h4>
                <h4>Firebase Cloud Firestore</h4>
              </div>
              <div className="candidateDiscoverExperience">
                <div className="candidateDiscoverExp">
                  <p>
                    <img src={briefcase} alt="" /> 2 years of experience
                  </p>
                </div>
                <div className="candidateDiscoverExp">
                  <p>
                    <img src={graduation_cap} alt="" /> Bachelors in Computer
                    Science
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
            <div className="clientDiscover1">
              <div className="candidateDiscoverProfile">
                <div className="candidateDiscoverProfile1">
                  <div className="candidateDiscoverImage">
                    <img src={candidateimges} alt="" />
                  </div>
                  <div className="candidateDiscoverName">
                    <h3>Surya Narreddi</h3>
                    <h5>Java Developer</h5>
                  </div>
                </div>
                <div className="candidateDiscoverHours">
                  <h2>&#8377; 4500/hr</h2>
                </div>
              </div>
              <div className="candidateDiscoverSkills">
                <h4>
                  <img src={courseIcons} alt="" />
                  Java EEE
                </h4>
                <h4>
                  <img src={courseIcons} alt="" />
                  JavaScript
                </h4>
                <h4>
                  <img src={courseIcons} alt="" />
                  Java
                </h4>
                <h4>jQuery</h4>
                <h4>Android</h4>
                <h4>Kotlin</h4>
                <h4>REST</h4>
                <h4>Spring Framework</h4>
                <h4>Firebase Cloud Firestore</h4>
              </div>
              <div className="candidateDiscoverExperience">
                <div className="candidateDiscoverExp">
                  <p>
                    <img src={briefcase} alt="" /> 2 years of experience
                  </p>
                </div>
                <div className="candidateDiscoverExp">
                  <p>
                    <img src={graduation_cap} alt="" /> Bachelors in Computer
                    Science
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
            <div className="clientDiscover1">
              <div className="candidateDiscoverProfile">
                <div className="candidateDiscoverProfile1">
                  <div className="candidateDiscoverImage">
                    <img src={candidateimges} alt="" />
                  </div>
                  <div className="candidateDiscoverName">
                    <h3>Surya Narreddi</h3>
                    <h5>Java Developer</h5>
                  </div>
                </div>
                <div className="candidateDiscoverHours">
                  <h2>&#8377; 4500/hr</h2>
                </div>
              </div>
              <div className="candidateDiscoverSkills">
                <h4>
                  <img src={courseIcons} alt="" />
                  Java EEE
                </h4>
                <h4>
                  <img src={courseIcons} alt="" />
                  JavaScript
                </h4>
                <h4>
                  <img src={courseIcons} alt="" />
                  Java
                </h4>
                <h4>jQuery</h4>
                <h4>Android</h4>
                <h4>Kotlin</h4>
                <h4>REST</h4>
                <h4>Spring Framework</h4>
                <h4>Firebase Cloud Firestore</h4>
              </div>
              <div className="candidateDiscoverExperience">
                <div className="candidateDiscoverExp">
                  <p>
                    <img src={briefcase} alt="" /> 2 years of experience
                  </p>
                </div>
                <div className="candidateDiscoverExp">
                  <p>
                    <img src={graduation_cap} alt="" /> Bachelors in Computer
                    Science
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
