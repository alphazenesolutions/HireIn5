import React from "react";
import "./ContractCard.css";
import contractCard from "../../../assests/contractCard.png";

const ContractCard = () => {
  return (
    <div>
      <div className="contractCard">
        <div className="contractInner">
          <div className="contractInnerImg">
            <img src={contractCard} alt="" />
          </div>
          <div className="contractInnerDesc">
            <h2>Non Disclosure Agreement (NDA)</h2>
            <h6>Updated on 10/12/23</h6>
          </div>
        </div>
        <button>Download</button>
      </div>
    </div>
  );
};

export default ContractCard;
