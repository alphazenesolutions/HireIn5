/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
import TravelHistory from "../../../Candidate/CandidateDashBoard/TravelHistory/TravelHistory";
import CandidateProfileCard from "../../../Reusable/CandidateProfileCard/CandidateProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../../Store/Store";
import Achievement from "../Achievement/Achievement";

const CandidateProfile = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((store) => store.userdata);
  const [isPage, setIsPage] = useState(false);
  const [percentage, setpercentage] = useState(0);
  const pageHandler = (event) => {
    setIsPage(!isPage);
    dispatch(storeAction.singleuserHander({ singleuser: userdata }));
  };
  useEffect(() => {
    GetPercentage();
  }, [userdata]);
  const GetPercentage = async () => {
    if (userdata.length !== 0) {
      var count = 0;
      if (userdata[0].address !== null) {
        count += 1;
      }
      if (userdata[0].work_preference_info !== null) {
        count += 1;
      }
      if (userdata[0].professional_details_info !== null) {
        count += 1;
      }
      if (userdata[0].project_details_info !== null) {
        count += 1;
      }
      if (userdata[0].certificate_info !== null) {
        count += 1;
      }
      if (userdata[0].travel_info !== null) {
        count += 1;
      }
      if (userdata[0].education_info !== null) {
        count += 1;
      }
      if (userdata[0].video_resume !== null) {
        if (userdata[0].video_resume.length !== 0) {
          count += 1;
        }
      }
      let percent = Math.round((count / 8) * 100);
      setpercentage(percent);
    }
  };
  return (
    <div>
      <div className="profilePage paddingLeft100 paddingRight100">
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
        <div className="candidateProgress">
          <div className="candidateProgressHead">
            {isPage === false ? (
              <h1>Profile is completed</h1>
            ) : (
              <h1>You are now ready to get Hired-in-5!</h1>
            )}

            <h2>{percentage}%</h2>
          </div>
          {/* <div className="candidateProgressBar">
            <div className={`candidateProgressBarBackgound w-[${percentage}%]`}></div>
          </div> */}
          <div className="progress-container">
            {isPage === false ? (
              <progress
                id="file"
                value={percentage}
                max="100"
                class="progress_bar1 bg-primaryColor"
              >
                {percentage}%
              </progress>
            ) : (
              <progress
                id="file"
                value={percentage}
                max="100"
                class="progress_bar bg-primaryColor"
              >
                {percentage}%
              </progress>
            )}
          </div>
        </div>
        {isPage === false && (
          <div className="">
            <PersonalDetails />
            <WorkExperience />
            <Achievement />
            <ProfessionalDetails />
            <ProjectDetails />
            <Certificate />
            <TravelHistory />
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
