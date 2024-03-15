/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import "./ContractCard.css";
import contractCard from "../../../assests/contractCard.png";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { FiLoader } from "react-icons/fi";

const ContractCard = ({ name }) => {
  const singleuser = useSelector((store) => store.singleuser);
  const token = useSelector((store) => store.token);
  const [loading, setloading] = useState(false);
  const [formdata, setformdata] = useState([]);

  const fileInputRef = useRef(null);
  const [formData] = useState(new FormData());

  const handleFileInputChange = async (e) => {
    setloading(true);
    formData.append("image", e.target.files[0]);
    formData.append("name", `contract_${singleuser[0].id}`);
    const response = await axios.post(
      "https://fileserver-21t2.onrender.com/api/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.img_url.length !== 0) {
      var obj = {
        file: response.data.img_url,
        user: singleuser[0].id,
        name: name,
      };
      var createdata = await axios
        .post(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/getContracts/${singleuser[0].id}/`,
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
      if (createdata !== null) {
        fileInputRef.current.value = "";
        getAlldata();
      }
    }
    setloading(false);
  };
  const showhandler = (data) => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    getAlldata();
  }, [singleuser]);
  const getAlldata = async () => {
    if (singleuser.length !== 0) {
      var contactdata = await axios
        .get(
          `${process.env.REACT_APP_LOCAL_HOST_URL}/getContracts/${singleuser[0].id}`,
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
      setformdata(contactdata);
    }
  };
  const matchingObject = formdata.find((item) => item.name === name);
  return (
    <div>
      <div className="contractCard">
        <div
          className="contractInner"
          onClick={() => {
            matchingObject && matchingObject.name === name
              ? window.open(`${matchingObject.file}`, "_blank")
              : alert("Please Upload the Contract file!");
          }}
        >
          <div className="contractInnerImg">
            <img src={contractCard} alt="" />
          </div>
          <div className="contractInnerDesc">
            <h2>{name}</h2>
            {matchingObject && matchingObject.name === name ? (
              <h6>
                Updated on{" "}
                {moment(matchingObject.uplaod_date).format("DD/MM/YYYY")}
              </h6>
            ) : (
              <h6>Document not uploaded</h6>
            )}
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          name="aadhaarfront"
          onChange={handleFileInputChange}
        />
        {matchingObject && matchingObject.name === name ? (
          loading === false ? (
            <button title="" onClick={showhandler} disabled>
              Upload again
            </button>
          ) : (
            <button className="flex justify-center items-center">
              <FiLoader className="loadingIcon" />
            </button>
          )
        ) : loading === false ? (
          <button onClick={showhandler}>Upload</button>
        ) : (
          <button className="flex justify-center items-center">
            <FiLoader className="loadingIcon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContractCard;
