import React from "react";
import "./ContractCard.css";
import contractCard from "../../../assests/contractCard.png";
import { useState } from "react";
const ContractCard = () => {
  const [showbtn, setshowbtn] = useState(false)
  function showhandler(params) {
    setshowbtn(!showbtn)
  }
  return (
    <div>
      <div className="contractCard">
        <div className="contractInner">
          <div className="contractInnerImg">
            <img src={contractCard} alt="" />
          </div>
          <div className="contractInnerDesc">
            <h2>Non Disclosure Agreement (NDA)</h2>
{showbtn && <h6>Updated on 10/12/23</h6>}          
{!showbtn &&   <h6>Document not uploaded</h6>}
          </div>
        </div>
        {/* <button>Download</button> */}
{!showbtn && 
        <button onClick={showhandler}>Upload</button>
      }        {showbtn && <button title="" onClick={showhandler}>Upload again</button>}
      </div>
    </div>
  );
};

export default ContractCard;
