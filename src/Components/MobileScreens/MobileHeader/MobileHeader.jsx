/* eslint-disable eqeqeq */
import React from "react";
import "./MobileHeader.css";
import { CiSearch } from "react-icons/ci";
import { BsJustifyLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../../Store/Store";

const MobileHeader = () => {
  const dispatch = useDispatch();
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });
  const overLayHandler = (e) => {
    dispatch(storeAction.isPopUpHander(e.target.id));
  };
  return (
    <div>
      <div className="mobileHeader">
        <div className="mobileHeaderFlex">
          <div className="mobileHeaderLeft">
            <input
              type="text"
              placeholder="Search candidates by role or skills"
            />
            <div className="mobSearchIcon">
              <CiSearch />
            </div>
            <div id="filter" onClick={overLayHandler} className="mobOptionIcon">
              <BsJustifyLeft onClick={overLayHandler} id="filter" />
            </div>
            {isPopUp == "mobfilter" && (
              <div className="mobFilters">
                <h5 onClick={overLayHandler} id="hourly">
                  Hourly Rate
                </h5>
                <h5 onClick={overLayHandler} id="location">
                  Location
                </h5>
                <h5 onClick={overLayHandler} id="filter">
                  All Filters
                </h5>
              </div>
            )}
          </div>
          <div className="mobileHeaderRight"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
