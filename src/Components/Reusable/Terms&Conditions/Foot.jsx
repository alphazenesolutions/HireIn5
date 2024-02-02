import React from "react";
import "./Foot.css";

const Foot = () => {
  return (
    <div>
      <div className="foot">
        <h4>By creating an account, you accept to our</h4>
        <div className="footDesc">
          <a href=".">Terms & Conditions</a>
          <p>and</p>
          <a href=".">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Foot;
