/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./SearchProfileCard.css";
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
import Avatar from "react-avatar";

const SearchProfileCard = ({ datanew, addbookmark, reserve, setIsPage }) => {
  const dispatch = useDispatch();
  const bookmarkdata = useSelector((store) => store.bookmarkdata);
  const alluserdata = useSelector((store) => store.alluserdata);
  const token = useSelector((store) => store.token);
  const userid = useSelector((store) => store.userid);
  const [tabledata, settabledata] = useState([]);

  const removebookmark = async (id) => {
    var checkdata = await tabledata.filter((data) => {
      return data.bookmarked_user == id;
    });
    if (checkdata.length !== 0) {
      var config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://hirein5-server.onrender.com/bookmark/${checkdata[0].id}`,
        headers: {
          Authorization: `JWT ${token}`,
        },
      };
      await axios(config)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });
      GetTabledata();
    }
  };
  useEffect(() => {
    GetTabledata();
  }, []);
  const GetTabledata = async () => {
    var config1 = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://hirein5-server.onrender.com/bookmark/users/${userid}`,
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    var table_data = await axios(config1)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    if (table_data.length !== 0) {
      const bookmarkedUserArray = table_data.map(
        (item) => item.bookmarked_user
      );
      dispatch(
        storeAction.bookmarkdataHander({ bookmarkdata: bookmarkedUserArray })
      );
    } else {
      dispatch(storeAction.bookmarkdataHander({ bookmarkdata: [] }));
    }
    settabledata(table_data);
  };
  const viewbtn = async (data) => {
    var checkdata = await alluserdata.filter((item) => {
      return item.id == data;
    });
    setIsPage("page2");
    dispatch(storeAction.singleuserHander({ singleuser: checkdata }));
  };
  return (
    <div>
      {datanew !== undefined ? (
        <div className="clientInterview">
          <div className="clientInterviewInner">
            <div className="clientCarts">
              <div className="clientCarts1">
                <div className="candidateCartProfile">
                  <div className="candidateCartProfile1">
                    <div className="candidateImage">
                      {/* <img src={candidateimges} alt="" /> */}
                      {datanew.profile_picture.length == 0 ? (
                        <Avatar
                          name={datanew.first_name}
                          size={50}
                          round="50px"
                        />
                      ) : (
                        <img src={datanew.profile_picture} alt="" />
                      )}
                    </div>
                    <div className="candidateCartName">
                      <h3>{datanew.first_name}</h3>
                      <h5>Candidate</h5>
                    </div>
                  </div>
                  <div className="candidateHours">
                    {datanew.rate_card_info !== null ? (
                      <h2> {datanew.rate_card_info.remote_hourly}/hr</h2>
                    ) : (
                      <h2 className="rateHour">Not provided yet</h2>
                    )}
                  </div>
                </div>
                <div className="candidateCartSkills">
                  {datanew.preference_info.skills.length !== 0
                    ? datanew.preference_info.skills.map((item, index) =>
                        index == 0 || index == 1 || index == 2 ? (
                          <h4>
                            <img src={courseIcons} alt="" />
                            {item}
                          </h4>
                        ) : (
                          <h4 key={index}>{item}</h4>
                        )
                      )
                    : null}
                </div>
                <div className="candidateCartExperience">
                  {datanew.preference_info !== null ? (
                    <>
                      <div className="candidateCartExp">
                        <p>
                          <img src={briefcase} alt="" />{" "}
                          {datanew.preference_info.year_of_experience} years of
                          experience
                        </p>
                      </div>
                      <div className="candidateCartExp">
                        <p>
                          <img src={graduation_cap} alt="" />{" "}
                          {datanew.preference_info.qualification}
                        </p>
                      </div>
                    </>
                  ) : null}

                  <div className="candidateCartExp">
                    {datanew.work_preference_info !== null ? (
                      <p>
                        <img src={user_check} alt="" />
                        {
                          datanew.work_preference_info
                            .preferred_mode_of_engagement
                        }{" "}
                        availability
                      </p>
                    ) : null}
                  </div>
                  {datanew.address !== null ? (
                    <div className="candidateCartExp">
                      <p>
                        <img src={location} alt="" /> {datanew.address.city},{" "}
                        {datanew.address.state}, {datanew.address.country}
                      </p>
                    </div>
                  ) : null}
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

                    <button
                      onClick={() => reserve("reserve", datanew)}
                      className="cartbtnimgbutton1"
                    >
                      Reserve candidate
                    </button>
                    <button
                      className="cartbtnimgbutton2"
                      onClick={() => viewbtn(datanew.id)}
                    >
                      view
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchProfileCard;
