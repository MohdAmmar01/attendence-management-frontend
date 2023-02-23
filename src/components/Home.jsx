import React, { useState } from 'react'
import Navbar from './Navbar';
import { useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch ,AiOutlineArrowRight} from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { ToastContainer,toast } from 'react-toastify';
import loader from "../images/loader.gif"
import { useSelector } from 'react-redux';

function Home() {
  const [data,setdata]=useState(null);
  const[loading,setloading]=useState(true)
  const [refresh,setrefresh]=useState(0);
  const [searched,setsearched]=useState(null)
  const auth=useSelector((state) => state)
  
  const getdata=async()=>{
    setloading(true)
    const res=await axios.get("https://attendence-management-mern-backend.onrender.com/api/user/activestudents");
    if(res.data.success===true){
      setloading(false)
      setdata(res.data.message);
    }else{
      toast.error(res.data.message, {
        'position': 'bottom-right',
        'theme': 'colored'
    })
    }

  }
  useEffect(()=>{
    getdata();
  },[refresh])


  return (
    <div className='home'>
     <Navbar />
     <div className='container'>
      <div className='part_1'>
      {
        loading?<img src={loader} alt="loader" className="loader" />:
        <div className='students'> 
          <div className='search'>
             <div>
              <AiOutlineSearch  className='logo_search'/>
              <input type="text" placeholder='search here for students' onChange={(e)=>{setsearched(e.target.value)}} />
             </div>
             <button className='refresh' onClick={()=>{setrefresh((prevState => {return prevState+1;}))}}>REFRESH</button>
          </div>
          <div className='total_present'>
        <div className='pres'>TOTAL STUDENTS : <p className='pres_no'> 100</p></div>
        <div className='pres'> STUDENTS PRESENT TODAY :<p className='pres_no'>  {data?.length}</p></div>
        </div>
        <h3 className='list_hed'>LIST OF STUDENTS PRESENT TODAY :</h3>
          <div className='list'>
            
          {
                data.length===0? 
                <div className='list_items'><AiOutlineArrowRight className='logo_user'/> NO STUDENT IS PRESENT TODAY  .</div>              
                :             searched!==null ? data.filter((elem) => { return elem.student.includes(searched?.toLowerCase()) }).map((elem,i)=>{
                return (
                  <div key={i} className='list_items'><AiOutlineArrowRight className='logo_user'/> ROLL NUMBER  {elem.roll}  ( {elem.student.toUpperCase()} ) IS PRESENT TODAY  .</div>
                )
      }):data.map((elem,i)=>{return(
        <div key={i} className='list_items'><AiOutlineArrowRight className='logo_user'/> ROLL NUMBER  {elem.roll}  ( {elem.student.toUpperCase()} ) IS PRESENT TODAY  .</div>

      )})
      }
          </div>
        </div>
      }
      </div>
    
     </div>
    </div>
  )
}

export default Home
