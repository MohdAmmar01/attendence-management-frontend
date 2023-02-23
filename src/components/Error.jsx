import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
function Error() {
  const navigate=useNavigate()
  return (
    <>
    <Navbar />
    <div className='error'>
     <h2>OOPS , PAGE NOT FOUND !</h2>
     <button className='btn' onClick={()=>{navigate('/')}} >Back To Home</button>
    </div>
    </>
  )
}

export default Error
