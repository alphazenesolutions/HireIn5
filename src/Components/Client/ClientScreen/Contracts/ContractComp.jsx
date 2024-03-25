/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "./ContractComp.css";
import documentX from "../../../../assests/documentX.png";
import DashHead from "../../../Reusable/DashBoardReusable/DashHead/DashHead";
import DashBody from "../../../Reusable/DashBoardReusable/DashBody/DashBody";
import tabImg from "../../../../assests/table.png";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import contractCard from "../../../../assests/contractCard.png";
import { storeAction } from "../../../../Store/Store";
import Avatar from "react-avatar";

const ContractComp = () => {
  const dispatch = useDispatch();
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);

  const contactdata = useSelector((store) => store.contractdata);
  const [isPage, setIsPage] = useState("page2");
  const PageHandler = (event) => {
    setIsPage(event.target.id);
  };
  const [contractsdata, setContractsdata] = useState([]);
  useEffect(() => {
    getContactdata();
  }, [contactdata]);
  const getContactdata = async () => {
    if (contactdata.length !== 0) {
      setContractsdata(contactdata);
      var contact_data = await axios
        .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/getContracts/${userid}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
      if (contact_data.length !== 0) {
        dispatch(
          storeAction.contractdataHander({ contractdata: contact_data })
        );
        setContractsdata(contact_data);
      }
    } else {
      var contact_data1 = await axios
        .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/getContracts/${userid}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
      if (contact_data1.length !== 0) {
        dispatch(
          storeAction.contractdataHander({ contractdata: contact_data1 })
        );
        setContractsdata(contact_data1);
      }
    }
  };
  return (
    <div>
      <div className="dashBoardMain paddingLeft100 paddingRight100">
        <DashHead
          head="Contracts with Hirein5"
          desc="All contracts in one place for ease of reference"
          highLight=""
          descClass="dashBoardMainHeadDescBetween"
        />
        <div className="tableButton marginBottom20">
          <button
            id="page2"
            onClick={PageHandler}
            className={
              isPage === "page2" ? "shortListedActive" : "shortListedInActive"
            }
          >
            Hiring related
          </button>
          <button
            id="page3"
            onClick={PageHandler}
            className={isPage === "page3" ? "hiredActive" : "hired"}
          >
            Standard
          </button>
        </div>
        {isPage === "page1" && (
          <DashBody
            Img={documentX}
            head="No interviews have been setup"
            desc="Find the right candidates, shortlist and schedule an interview with them. Start by doing your first search!"
            button="Search for candidates"
            fun={PageHandler}
            Id="page2"
            buttonClass="dashBoardMainBodyInnerButton"
          />
        )}
        {isPage === "page2" && (
          <div className="contractInnerTable">
            <table className="table">
              <tr className="contractTableHead">
                {/* <th className="tableFirst"></th> */}
                <th className="contractTableHead">Candidate Name</th>
                <th className="contractTableHead">HIred On</th>
                <th className="contractTableHead">
                  CONTRACT <br></br>DURATION
                </th>
                <th className="contractTableHead">
                  {" "}
                  Billing <br></br>CYCLE
                </th>
                <th className="contractTableHead">Key Skills</th>
                <th></th>
                {/* <th></th> */}
              </tr>
              {contractsdata.length !== 0
                ? contractsdata.map((data, index) => {
                    return data.candidate !== null ? (
                      <tr className="contractTableRow" key={index}>
                        <td>
                          <div className="profileData ">
                            {data.Candidate[0].profile_picture.length !== 0 ? (
                              <img src={tabImg} alt="" />
                            ) : (
                              <Avatar
                                name={
                                  data.Candidate[0].first_name.length !== 0
                                    ? data.Candidate[0].first_name
                                    : data.Candidate[0].username
                                }
                                size={30}
                                round="50px"
                                className="mr-2"
                              />
                            )}

                            <h2>
                              {data.Candidate[0].first_name.length !== 0
                                ? data.Candidate[0].first_name
                                : data.Candidate[0].username}
                            </h2>
                          </div>
                        </td>

                        <td>
                          <h2>
                            {moment(data.uplaod_date).format("DD-MM-YYYY")}
                          </h2>
                        </td>
                        <td>
                          <h2>{data.duration}</h2>
                        </td>
                        <td>
                          <h2>{data.billing_cycle}</h2>
                        </td>
                        {data.Candidate[0].preference_info !== null ? (
                          <td className="skillData">
                            {data.Candidate[0].preference_info.skills.map(
                              (datanew, index) => (
                                <p key={index}>{datanew}</p>
                              )
                            )}
                          </td>
                        ) : null}
                        <td>
                          <div>
                            <button
                              onClick={() => {
                                window.open(`${data.file}`, "_blank");
                              }}
                              className="tdBtn"
                            >
                              View Contract
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : null;
                  })
                : null}
            </table>
          </div>
        )}
        {isPage === "page3" && (
          <div className="Contract">
            {contractsdata.length !== 0 ? (
              contractsdata.map((data, index) =>
                data.candidate == null ? (
                  <div className="contractCard" key={index}>
                    <div className="contractInner">
                      <div className="contractInnerImg">
                        <img src={contractCard} alt="" />
                      </div>
                      <div className="contractInnerDesc">
                        <h2>{data.name}</h2>
                        <h6>
                          Updated on{" "}
                          {moment(data.uplaod_date).format("DD/MM/YYYY")}
                        </h6>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        window.open(`${data.file}`, "_blank");
                      }}
                    >
                      Download
                    </button>
                  </div>
                ) : null
              )
            ) : (
              <div>
                <h6 className="text-center py-24">No Data found...</h6>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractComp;
