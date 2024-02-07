/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./DashHead.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storeAction } from "../../../../Store/Store";

const DashHead = (props) => {
  const dispatch = useDispatch();
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  useEffect(() => {
    setTimeout(() => {
      getalldata();
    }, 2000);
  }, []);
  const getalldata = () => {
    if (token == null && userid == null) {
      dispatch(storeAction.isloginHandler({ islogin: false }));
      dispatch(storeAction.tokenHandler({ token: null }));
      dispatch(storeAction.useridHandler({ userid: 5 }));
      window.location.replace("/login");
    }
  };
  return (
    <div>
      <div className="dashBoardMainHead">
        <div className="upgradeTop">
          <h3 id={props.billingId} onClick={props.fun}>
            {props.left}
          </h3>{" "}
          <h5>{props.center}</h5>
          <h4 id={props.upgradeId} onClick={props.fun}>
            {props.right}
          </h4>
        </div>
        <h1>{props.head}</h1>
        <div className="dashBoardMainHeadDesc">
          <p>{props.desc}</p>
          <a href="">{props.highLight}</a>
        </div>
      </div>
    </div>
  );
};

export default DashHead;
