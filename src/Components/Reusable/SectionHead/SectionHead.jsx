import React from "react";
import "./SectionHead.css";
import { Link } from "react-router-dom";

const SectionHead = (props) => {
  return (
    <>
      <div className="sectioHead marginBottom20">
        <h3>{props.head}</h3>
        <p>
          {props.desc}
          <Link to={props.route}>
            <span className="log">{props.highLight}</span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default SectionHead;
