import React from "react";
import { useState } from 'react'
import DashHead from '../../Reusable/DashBoardReusable/DashHead/DashHead'
import "../../AdminScreen/AdminTeamMember/AdminTeamMember.css"
import { MdKeyboardArrowDown } from "react-icons/md";
import Billingtick from"../../../assests/Vector1.png"
const AdminTeamMember = () => {

  const [show, setshow] = useState(false)
  const [setvalue, setvalue1] = useState("Admin")
  const [setvalue2, setvalue22] = useState("Edit access")
  const [setvalue3, setvalue33] = useState("Edit access")
function toggleDropdown(event) {
  setshow(event.target.id)
}
  
function getvalue(e) {
  let getdata= e.target.textContent
  console.log(getdata);
  setvalue1(getdata)
  setvalue22(getdata)
  setshow(false)
}
function getuservalue(e) {
  let getdata= e.target.textContent
  console.log(getdata);
  setvalue22(getdata)
  setshow(false)
}
function getpendingvalue(e) {
  let getdata= e.target.textContent
  console.log(getdata);
  setvalue33(getdata)
  setshow(false)
}
  return <div>

<div className='paddingLeft100 paddingRight100 '>
    <DashHead
        head="Team members"
        desc="Share access with your staff and team members by inviting them to this platform. "
        descClass="dashBoardMainHeadDescBetween"
      />
     <div className='adminTeamMember'>
        <h3>Add members</h3>
        <div className='teamMemberInputs'>
            <h4>Name</h4>
            <input type="text" placeholder='E.g. Jhon Doe' />
        </div>
        <div className='teamMember'>
        <div className='teamMemberInputs'>
            <h4>Email ID</h4>
            <input type="text" placeholder="E.g. johndoe@gmail.com" />
        </div>
        <div className='teamMemberLevel'>
            <h4>Level of Access</h4>
            <div className='editAccess'>
               <div className='editAccess1'>
                <button 
                onClick={toggleDropdown} 
                placeholder="Admin" id="access1">{setvalue}
               <MdKeyboardArrowDown className='checkicon'  />

                </button>
                {show==="access1" && <div className="dropHandler" >
                  <h3 onClick={getvalue}>Admin <img src={Billingtick} alt="" /></h3>
                  <h3 onClick={getvalue}>Sales <img src={Billingtick} alt="" /></h3>
                  <h3 onClick={getvalue}>HR <img src={Billingtick} alt="" /></h3>
                </div>}

               </div>
               
            </div>
        </div>
        </div>
        <div className='TeamSend'>
            <button>Send invite</button>
        </div>
       
     </div>
     <div className='adminTeamMember'>
        <h3>Manage members</h3>
      <div className='manageMember'>
        <h2>Pending invites</h2>
       
        <div className='manageMemberEdit'>
            <h4>Yasir Quazi</h4>
            <p>Sales</p>
            <div className='editAccess'>
               <div className='editAccess1'>
               <button onClick={toggleDropdown} id="access2">
                {setvalue2}
               <MdKeyboardArrowDown className='checkicon'  />

                </button>
{show==="access2" && <div className="dropHandler">
<h3 onClick={getuservalue}>Admin <img src={Billingtick} alt="" /></h3>
                  <h3 onClick={getuservalue}>Sales <img src={Billingtick} alt="" /></h3>
                  <h3 onClick={getuservalue}>HR <img src={Billingtick} alt="" /></h3>
                  <h3 title="" onClick={getuservalue}>Remove user </h3>
             </div>}
               </div>
             
            </div>
        </div>
      
      
      </div>
      <div className='manageMember'>
        <h2>users</h2>
       
        <div className='manageMemberEdit'>
            <h4>Yasir Quazi</h4>
            <p>Sales</p>
            <div className='editAccess'>
               <div className='editAccess1'>
               <button onClick={ toggleDropdown} id="access3">
               {setvalue3}
               <MdKeyboardArrowDown className='checkicon'  />

                </button>
                {show==="access3" && <div className="dropHandler">
                <h3 onClick={getpendingvalue}>Admin <img src={Billingtick} alt="" /></h3>
                  <h3 onClick={getpendingvalue}>Sales <img src={Billingtick} alt="" /></h3>
                  <h3 onClick={getpendingvalue}>HR <img src={Billingtick} alt="" /></h3>
                  <h3 title="" onClick={getpendingvalue}>Remove user </h3>
             </div>}
               </div>
             
            </div>
        </div>
       
      </div>
     </div>
    </div>
  </div>;
};

export default AdminTeamMember;
