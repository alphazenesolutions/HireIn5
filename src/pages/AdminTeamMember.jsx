import React, { useState } from 'react'
import DashHead from '../Components/Reusable/DashBoardReusable/DashHead/DashHead'
import "../Components/AdminScreen/AdminTeamMember/AdminTeamMember.css"
import { MdKeyboardArrowDown } from "react-icons/md";
import Billingtick from"../assests/Vector1.png"
const AdminTeamMember = () => {
    const [show, setshow] = useState(false)
    function showdata(params) {
        setshow(!show)
    }
    
  return (
    <>
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
               <input type="text" placeholder='Admin' />
               <MdKeyboardArrowDown className='checkicon'  onClick={showdata}/>

               </div>
               {show &&   <div className='editDropDown'>
                    <h3>Admin <img src={Billingtick} alt="" /></h3>
                    <h3>Sales <img src={Billingtick} alt="" /></h3>
                    <h3>HR <img src={Billingtick} alt="" /></h3>
                </div>}
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
               <input type="text" placeholder='Edit access' />
               <MdKeyboardArrowDown  onClick={showdata}/>

               </div>
              {show &&   <div className='editDropDown'>
                    <h3>Admin <img src={Billingtick} alt="" /></h3>
                    <h3>Sales <img src={Billingtick} alt="" /></h3>
                    <h3>HR <img src={Billingtick} alt="" /></h3>
                    
                    <h3 title=''>Remove user</h3>
                </div>}
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
               <input type="text" placeholder='Edit access' />
               <MdKeyboardArrowDown className='checkicon'  onClick={showdata}/>

               </div>
               {show &&   <div className='editDropDown'>
                    <h3>Admin <img src={Billingtick} alt="" /></h3>
                    <h3>Sales <img src={Billingtick} alt="" /></h3>
                    <h3>HR <img src={Billingtick} alt="" /></h3>
                    
                    <h3 title=''>Remove user</h3>
                </div>}
            </div>
        </div>
       
      </div>
     </div>
    </div>
    </>
  )
}

export default AdminTeamMember