import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import {useDispatch} from "react-redux"
import { login } from '../actions'
import axios from 'axios'

export default function Register() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [logup,setLogup] = useState({
		name:"",
		email:"",
		password:"",
		password_confirmation:""
	})

	const [signupError, setSignupError] = useState([])
	const [error, setError] = useState('')

	const formup = async (e) => {
		e.preventDefault()
		axios.post("/api/register", logup).then((res) => {
        console.log("you're in ")
        console.log(res);
      if (res.status === 200) {
				console.log(res);
				setSignupError([])
        localStorage.setItem("access_token",res.data.token)
        // localStorage.setItem("role",res.data.user)
				dispatch(login({name:res.data.user.name,email:res.data.user.email,role:res.data.user.role,id:res.data.user.id}))
        navigate(`/Home`);
      }
    }).catch((err) => {
			console.log(err);
      if (err.response.status === 422) {
				setError(err.response.data.message)
        setSignupError(err.response.data.errors)
      }
    })
	}
	const handleChange = (e) => {
		setLogup(prev => ({...prev,[e.target.name]: e.target.value}))
	}

  return (
    <Form>
      <div className="box-form">
    <div className="left">
      <div className="overlay">
      <h1>Hello World.</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Curabitur et est sed felis aliquet sollicitudin</p>
      <span>
        <p>login with social media</p>
        <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
        <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i> Login with Twitter</a>
      </span>
      </div>
    </div>
    
    
      <form onSubmit={formup} className="right">
      <h5>Signup</h5>
      <p>already have an account? <Link to="/Login">log into Your Account</Link></p>
      <div className="inputs">
        <input onChange={handleChange} type="text" placeholder="name" name='name'/>
        {signupError.name && <p>{signupError.name}</p>}
        <input onChange={handleChange} type="email" placeholder="email" name='email'/>
        {signupError.email && <p>{signupError.email}</p>}
        <br/>
        <input onChange={handleChange} type="password" placeholder="password" name='password'/>
        {signupError.password && <p>{signupError.password}</p>}
        <input onChange={handleChange} type="password" placeholder="repeat password" name='password_confirmation'/>
        {signupError.password_confirmation && <p>{signupError.password_confirmation}</p>}
      </div>
        
        <br/><br/>
        
        <br/>
        <button type='submit'>Login</button>
    </form>
    </div>
  </Form>
  )
}

const Form = styled.div`
padding: 30px;
body {
  background-image: linear-gradient(135deg, #FAB2FF 10%, #1904E5 100%);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-family: "Open Sans", sans-serif;
  color: #333333;
}

.box-form {
  margin: 0 auto;
  // width: 80%;
  background: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex: 1 1 100%;
  align-items: stretch;
  justify-content: space-between;
  box-shadow: 0 0 20px 6px #090b6f85;
}
@media (max-width: 980px) {
  .box-form {
    flex-flow: wrap;
    text-align: center;
    align-content: center;
    align-items: center;
  }
}
.box-form div {
  height: auto;
}
.box-form .left {
  color: #FFFFFF;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/images/cookies.webp");
  overflow: hidden;
}
.box-form .left .overlay {
  padding: 30px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.box-form .left .overlay h1 {
  font-size: 6vmax;
  line-height: 1.4;
  font-weight: 900;
  margin-top: 40px;
  margin-bottom: 20px;
}
.box-form .left .overlay span p {
  margin-top: 30px;
  font-weight: 900;
}
.box-form .left .overlay span a {
  background: #3b5998;
  color: #FFFFFF;
  margin-top: 10px;
  padding: 14px 50px;
  border-radius: 100px;
  display: inline-block;
  box-shadow: 0 3px 6px 1px #042d4657;
}
.box-form .left .overlay span a:last-child {
  background: #1dcaff;
  margin-left: 30px;
}
.box-form .right {
  padding: 40px;
  overflow: hidden;
}
@media (max-width: 980px) {
  .box-form .right {
    width: 100%;
  }
}
.box-form .right h5 {
  font-size: 6vmax;
  line-height: 0;
}
.box-form .right p {
  font-size: 14px;
  color: #B0B3B9;
}
.box-form .right .inputs {
  overflow: hidden;
}
.box-form .right input {
  width: 100%;
  padding: 10px;
  margin-top: 25px;
  font-size: 16px;
  border: none;
  outline: none;
  border-bottom: 2px solid #B0B3B9;
}
.box-form .right .remember-me--forget-password {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-form .right .remember-me--forget-password input {
  margin: 0;
  margin-right: 7px;
  width: auto;
}
.box-form .right button {
  float: right;
  color: #fff;
  font-size: 16px;
  padding: 12px 35px;
  border-radius: 50px;
  display: inline-block;
  border: 0;
  cursor: pointer;
  outline: 0;
  box-shadow: 0px 4px 20px 0px #101110a6;
  background-image: linear-gradient(135deg,#afb1af 10%,#060805 100%);
}

label {
  display: block;
  position: relative;
  margin-left: 30px;
}

label::before {
  content: ' \f00c';
  position: absolute;
  font-family: FontAwesome;
  background: transparent;
  border: 3px solid #70F570;
  border-radius: 4px;
  color: transparent;
  left: -30px;
  transition: all 0.2s linear;
}

label:hover::before {
  font-family: FontAwesome;
  content: ' \f00c';
  color: #fff;
  cursor: pointer;
  background: #70F570;
}

label:hover::before .text-checkbox {
  background: #70F570;
}

label span.text-checkbox {
  display: inline-block;
  height: auto;
  position: relative;
  cursor: pointer;
  transition: all 0.2s linear;
}

label input[type="checkbox"] {
  display: none;
}
`