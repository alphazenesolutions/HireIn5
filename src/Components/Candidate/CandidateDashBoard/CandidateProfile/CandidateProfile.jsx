import React, { useState } from "react";
import "./CandidateProfile.css";
import Education from "../Education/Education";
import Certificate from "../Certifications/Certificate";
import PersonalDetails from "../PersonalDetails/PersonalDetails";
import ProfessionalDetails from "../ProfessionalDetails/ProfessionalDetails";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import VideoResume from "../VideoResume/VideoResume";
import WorkExperience from "../WorkExperience/WorkExperience";
import DashHead from "../../../Reusable/DashBoardReusable/DashHead/DashHead";
import recEye from "../../../../assests/RecEye.svg";
import CandidateProfileCard from "../../../Reusable/CandidateProfileCard/CandidateProfileCard";

const CandidateProfile = () => {
  const [isPage, setIsPage] = useState(false);
  const pageHandler = (event) => {
    setIsPage(!isPage);
    console.log(isPage);
  };
  return (
    <div>
      <div className="paddingLeft100 paddingRight100">
        <DashHead
          left=""
          center=""
          right=""
          head="Profile"
          billingId="billing"
          upgradeId="upgrade"
          desc="Some caption which sets more context for this page"
          highLight=""
          button="View as Recruiter"
          btnImg={recEye}
          descClass="dashBoardMainHeadDesc"
          btnClass="dashBoardMainHeadDescButton"
          fun={pageHandler}
        />
        {isPage === false && (
          <div className="">
            <PersonalDetails />
            <WorkExperience />
            <ProfessionalDetails />
            <ProjectDetails />
            <Certificate />
            <Education />
            <VideoResume />
          </div>
        )}
        {isPage === true && (
          <CandidateProfileCard back="disNone" main="candidateProfile1" />
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;
