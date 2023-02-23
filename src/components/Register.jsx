import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import loader from '../images/load.gif'
import Navbar from './Navbar'
import { useDispatch } from 'react-redux'
import { actions } from '../store/store'

const Register = () => {
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [roll, setroll] = useState('')
  const [loading, setloading] = useState(false)
  const dispatch=useDispatch()
  
  const navigate = useNavigate()


  const err = (msg) => {

    toast.error(msg, {
      'position': 'bottom-right',
      'theme': 'colored'
    })
  }


  const handlevalidate = () => {
    if (!username || !email || !password ||  !roll) {
      err('provide all details')
      return false;
    }

    if (password.length < 8) {
      err('password must be greater than 8 characters')
      return false;
    }
    if (roll >100) {
      err('roll number cannot  be greater than 100')
      return false;
    }
    
    return true
  }

  const submithandler = async (e) => {
    e.preventDefault();

    const val = handlevalidate();
    if (val) {
      setloading(true)

      const out = {
        username,
        email,
        password,
        roll

      }
      const res = await axios.post('https://attendence-management-mern-backend.onrender.com/api/user/register', out)
      if (res.data.success) {
        setloading(false)
        dispatch(actions.login(res.data.user));
        navigate('/')
      }
      else {
        err(res.data.message)
        setloading(false)
      }
    }

  }
  return (

    <>
      <Navbar />
      <div className='reg'>
      <div className="register">
        <form className="reg-form">
          <label htmlFor="myname" className="label-input-reg">Name</label>
          <input id='myname' className='login-input' autoComplete='off' value={username} onChange={(e) => { setusername(e.target.value) }} type='text' placeholder="john doe" />
          <label htmlFor="myemail" className="label-input-reg">Email</label>
          <input id='myemail' className='login-input' autoComplete='off' value={email} onChange={(e) => { setemail(e.target.value) }} type='text' placeholder="johndoe@example.com" />
          <label htmlFor="mypassword" className="label-input-reg">Password</label>
          <input id='mypassword' className='reg-input' autoComplete='off' value={password} onChange={(e) => { setpassword(e.target.value) }} type='password' placeholder="Top secret" />
          <label htmlFor="myyt" className="label-input-reg">Roll Number</label>
          <input id='myyt' className='reg-input' autoComplete='off' value={roll} onChange={(e) => { setroll(e.target.value) }} type='number' placeholder="enter your roll number here" />
          {loading ? <div className='reg-input-sub' ><img className='l-i' src={loader} alt='loader' /></div> : <input className='reg-input-sub' value='Submit' onClick={submithandler} type='submit' />}
          <h4 style={{ 'color': 'black', 'fontFamily': 'cursive', 'textAlign': 'center' }} className='r-h'> Already have an account ?<Link to='/login' style={{ 'color': 'black', 'textDecoration': 'none','fontSize':'18px' }}> Login</Link ></h4>
        </form>
      </div>
      </div>
      <ToastContainer />
    </>
  )
}
export default Register;