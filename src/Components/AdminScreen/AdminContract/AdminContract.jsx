import React from "react";
import "./AdminContract.css";
import DashHead from "../../Reusable/DashBoardReusable/DashHead/DashHead";
import ContractCard from "../../Reusable/ContractCard/ContractCard";

const AdminContract = () => {
  return (
    <>
      <div className="paddingLeft100 paddingRight100 ">
        <DashHead
          head="Contracts"
          desc="Upload contracts for clients"
          descClass="dashBoardMainHeadDescBetween"
        />
        <div className="adminContractCard">
          <ContractCard />
          <ContractCard />
          <ContractCard />
          <div className="addContractCard">
            <p>+ Add contract</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminContract;
