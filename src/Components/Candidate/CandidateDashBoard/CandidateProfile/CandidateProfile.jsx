/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
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
import axios from "axios";
import HTMLReactParser from "html-react-parser";

const CandidateProfile = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((store) => store.userdata);
  const token = useSelector((store) => store.token);
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
      if (percent == 100) {
        if (userdata[0].nottify == "False") {
          var obj = {
            username: userdata[0].username,
            nottify: "True",
          };
          var newobj = {
            message: `<p><b>${userdata[0].first_name}</b> has completed their profile to a 100%</p>`,
            status: "false",
            on_type: "Candidate Profile Completion",
          };
          var updatedata = await axios
            .put(
              `${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${userdata[0].id}/`,
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
          await axios
            .post(
              `${process.env.REACT_APP_LOCAL_HOST_URL}/notification/${userdata[0].id}/`,
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
            updatedata.message ===
            "User and Associated Info updated successfully"
          ) {
            let updatedObject = {
              ...userdata[0],
              nottify: updatedata.user.nottify,
            };
            dispatch(storeAction.userdataHander({ userdata: [] }));
            setTimeout(() => {
              dispatch(
                storeAction.userdataHander({
                  userdata: [updatedObject],
                })
              );
            }, 10);
          }
        }
      }
      setpercentage(percent);
    }
  };
  console.log(userdata, "kkk");
  return (
    <div>
      {/* <p>{HTMLReactParser("<p><b>John Jack</b> has completed their profile to a 100%</p>")}</p> */}
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
            {/* <Achievement /> */}
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
