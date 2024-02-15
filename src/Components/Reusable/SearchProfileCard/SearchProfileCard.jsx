import React, { useState } from "react";
import "./SearchProfileCard.css";
import candidateimges from "../../../assests/table.png";
import courseIcons from "../../../assests/userCard.png";
import briefcase from "../../../assests/briefCase.png";
import graduation_cap from "../../../assests/graduationCap.png";
import user_check from "../../../assests/userCheck.png";
import location from "../../../assests/mapPin.png";
import BookMarkSimple from "../../../assests/colar.png";
import Bookmarkwhite from "../../../assests/BookmarkSimplewhite.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storeAction } from "../../../Store/Store";
import axios from "axios";

const SearchProfileCard = ({ datanew, addbookmark }) => {
  const dispatch = useDispatch();
  const bookmarkdata = useSelector((store) => store.bookmarkdata);
  const token = useSelector((store) => store.token);

  const removebookmark = async (id) => {
    var newarray = (await bookmarkdata.includes(id))
      ? bookmarkdata.filter((item) => item !== id)
      : [...bookmarkdata, id];
    dispatch(storeAction.bookmarkdataHander({ bookmarkdata: newarray }));
    var config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://hirein5-server.onrender.com/bookmark/${id}`,
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="clientInterview">
        <div className="clientInterviewInner">
          <div className="clientCarts">
            <div className="clientCarts1">
              <div className="candidateCartProfile">
                <div className="candidateCartProfile1">
                  <div className="candidateImage">
                    <img src={candidateimges} alt="" />
                  </div>
                  <div className="candidateCartName">
                    <h3>{datanew.first_name}</h3>
                    <h5>{datanew.title}</h5>
                  </div>
                </div>
                <div className="candidateHours">
                  <h2>&#8377; 4500/hr</h2>
                </div>
              </div>
              <div className="candidateCartSkills">
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
              <div className="candidateCartExperience">
                <div className="candidateCartExp">
                  <p>
                    <img src={briefcase} alt="" /> 2 years of experience
                  </p>
                </div>
                <div className="candidateCartExp">
                  <p>
                    <img src={graduation_cap} alt="" /> Bachelors in Computer
                    Science
                  </p>
                </div>
                <div className="candidateCartExp">
                  <p>
                    <img src={user_check} alt="" /> Part-time availability
                  </p>
                </div>

                <div className="candidateCartExp">
                  <p>
                    <img src={location} alt="" /> Japan, Australia, Kuwait
                  </p>
                </div>
              </div>
              <div className="candidateCartButton">
                <div className="cartbtnimg">
                  {bookmarkdata.includes(datanew.id) ? (
                    <img
                      src={BookMarkSimple}
                      alt=""
                      onClick={() => {
                        removebookmark(datanew.id);
                      }}
                    />
                  ) : (
                    <img
                      src={Bookmarkwhite}
                      alt=""
                      onClick={() => {
                        addbookmark(datanew.id);
                      }}
                    />
                  )}

                  <button className="cartbtnimgbutton1">
                    Reserve candidate
                  </button>
                  <button className="cartbtnimgbutton2">view</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProfileCard;
