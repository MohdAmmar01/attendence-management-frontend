import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {actions} from "../store/store.js"
import { ToastContainer,toast } from 'react-toastify';


export default function Navbar() {
  const auth = useSelector((state) => state);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const logouthandler=async()=>{
    const res=await axios.post("https://attendence-management-mern-backend.onrender.com/api/user/logout");
    if(res.data.success===true){
      dispatch(actions.logout());

      navigate('/login')
    }
  }
  const checkinhandler=async()=>{
    const res= await axios.post("https://attendence-management-mern-backend.onrender.com/api/user/newattendence");
if(res.data.success===false){
    toast.error(res.data.message, {
      'position': 'bottom-right',
      'theme': 'colored'
})}else{
  toast.success("attendence marked successfully", {
    'position': 'bottom-right',
    'theme': 'colored'
})
}
  }
  const checkouthandler=async()=>{
    const res= await axios.delete("https://attendence-management-mern-backend.onrender.com/api/user/deleteattendence");
    if(res.data.success===true){
      toast.success("attendence unmarked successfully", {
        'position': 'bottom-right',
        'theme': 'colored'
  })}else{
    toast.error("you have not marked your attendence", {
      'position': 'bottom-right',
      'theme': 'colored'
})
  }
  }
  return (
    <>
    <div className='navbar'>
    <div className='hed1' onClick={()=>{navigate('/')}}>STUDENT ATTENDENCE </div>
    {
auth.isloggedin===true  ?
<div className='hed2'>

  <li ><button className="nb checkin" onClick={checkinhandler} >CHECK IN</button></li>
  <li ><button  className='nb checkout' onClick={checkouthandler} >CHECK OUT</button></li>  
  <li ><button className="nb"  onClick={logouthandler} >LOGOUT</button></li>
</div>

:
<div className='hed2'>

<li ><button className='nb' onClick={()=>{navigate("/login")}}>LOGIN</button></li>
</div>
}

  </div>
<ToastContainer />
</>
  )
}
