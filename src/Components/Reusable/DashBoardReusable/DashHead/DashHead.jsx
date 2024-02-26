/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./DashHead.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storeAction } from "../../../../Store/Store";

const DashHead = (props, fun) => {
  const dispatch = useDispatch();
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  useEffect(() => {
    setTimeout(() => {
      getalldata();
    }, 1000);
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
          <h3 id={props.billingId} onClick={props.fun2}>
            {props.left}
          </h3>{" "}
          <h5>{props.center}</h5>
          <h4 id={props.upgradeId} onClick={props.fun3}>
            {props.right}
          </h4>
        </div>
        <h1>{props.head}</h1>
        <div className={props.descClass}>
          <p>{props.desc}</p>
          <a href="">{props.highLight}</a>
          <button onClick={props.fun} className={props.btnClass}>
            <img src={props.btnImg} alt="" />
            {props.button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashHead;
