import React from "react";
import "./VideoResume.css";
import user from "../../../../assests/User.svg";
import dropDown from "../../../../assests/arrowDown.svg";

const VideoResume = () => {
  return (
    <div>
      <div className="videoResume">
        <div className="innerVideoResume">
          <div className="videoResumeHead">
            <div className="videoResumeHeadLeft">
              <img src={user} alt="" />
              <h1>Video Resume</h1>
            </div>
            <img src={dropDown} alt="" />
          </div>
          <div className="videoResumeDesc"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoResume;
