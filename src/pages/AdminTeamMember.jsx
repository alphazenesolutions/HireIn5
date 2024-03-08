import React, { useState } from 'react'
import DashHead from '../Components/Reusable/DashBoardReusable/DashHead/DashHead'
import "../Components/AdminScreen/AdminTeamMember/AdminTeamMember.css"
import { MdKeyboardArrowDown } from "react-icons/md";
import Billingtick from"../assests/Vector1.png"
const AdminTeamMember = () => {
    const [userDropDownValue, setUserDropDownValue] = useState([
        ["Admin","HR","Sales"],
        ["Admin","HR","Sales","Remove User"],
        ["Admin","HR","Sales","Remove User"]
    ]);
    const [getvalue, setgetvalue] = useState("Admin")
    const [getUserValue, setGetUserValue] = useState("Edit access")
    const [getPendingValue, setGetPendingValue] = useState("Edit access")
    const [dropdownsVisibility, setDropdownsVisibility] = useState({
        dropdown1: false,
        dropdown2: false,
        dropdown3:false
    });
    const toggleDropdown = (dropdownName) => {
        setDropdownsVisibility(prevState => ({
            ...prevState,
            [dropdownName]: !prevState[dropdownName]
        }));
    }
    function selectdata(e) {
        let value = e.target.textContent.toLowerCase()
        setgetvalue(value)
        setDropdownsVisibility(prevState => ({...prevState, dropdown1: false}))
    }
    function selectPendingData(e) {
        let value = e.target.textContent.toLowerCase()
        setGetUserValue(value)
        setDropdownsVisibility(prevState => ({...prevState, dropdown2: false}))
    }
    function selectUserData(e) { 
        let value = e.target.textContent.toLowerCase()
        setGetPendingValue(value)
        setDropdownsVisibility(prevState => ({...prevState, dropdown3: false}))
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
                <button 
                onClick={() => toggleDropdown('dropdown1')} 
                placeholder="Admin">{getvalue}
               <MdKeyboardArrowDown className='checkicon'  />

                </button>

               </div>
               {dropdownsVisibility.dropdown1  &&   <div className='editDropDown'>
                {userDropDownValue[0].map(function (getvalue) {
                    return(
                    <h3 onClick={selectdata}>{getvalue}<img src={Billingtick} alt="" /></h3>

                    )
                })}
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
               <button onClick={() => toggleDropdown('dropdown2')}>{getUserValue}
               <MdKeyboardArrowDown className='checkicon'  />

                </button>

               </div>
              {dropdownsVisibility.dropdown2 &&   <div className='editDropDown'>
              {userDropDownValue[1].map(function (getvalue) {
                    return(
                    <h3 onClick={selectPendingData}>{getvalue}<img src={Billingtick} alt="" /></h3>

                    )
                })}
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
               <button onClick={() => toggleDropdown('dropdown3')}>{getPendingValue}
               <MdKeyboardArrowDown className='checkicon'  />

                </button>
               </div>
               {dropdownsVisibility.dropdown3 &&   <div className='editDropDown'>
               {userDropDownValue[2].map(function (getvalue) {
                    return(
                    <h3 onClick={selectUserData}>{getvalue}<img src={Billingtick} alt="" /></h3>

                    )
                })}
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