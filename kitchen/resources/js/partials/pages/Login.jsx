import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import {useDispatch} from "react-redux"
import { login } from '../actions'
import axios from 'axios'
import { FaSortAmountUpAlt } from 'react-icons/fa'

export default function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [auth, setAuth] = useState({
		email:"",
		password:""
	})
	const [loginError, setLoginError] = useState([])
  const [errorsReset, setErrorsReset] = useState({emailReset: "", passwordReset: "",token: ""})
  const [showForgot, setShowForgot] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotPassword, setForgotPassword] = useState("")
  const [forgotPasswordConfirm, setForgotPasswordConfirm] = useState("")
  const [emailError, setEmailError] = useState("")
  const [error, setError] = useState("")
  const [token, setToken] = useState("")
  
	
	const loginHandler = async () => {
		axios.post(`http://127.0.0.1:8000/api/authenticate`, auth)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log(res.data.user);
        setLoginError([])
        localStorage.setItem("access_token",res.data.token)
        localStorage.setItem("role",res.data.user.roles[0].name)
				dispatch(login({name:res.data.user.name,email:res.data.user.email,role:res.data.user.role,id:res.data.user.id}))
        navigate(`/Home`);
      }
    }).catch(function (error) {
      console.log(error);
      if (error.response.status === 422) {
				setError(error.response.data.message)
        setLoginError(error.response.data.errors)
      }
    });
	}

	const formin = e => {
		e.preventDefault()
		loginHandler()
	}

	const handleChange = (e) => {
		setAuth(prev => ({...prev,[e.target.name]: e.target.value}))
	}
  const forgot = async (e) => {
    setEmailError("")
    e.preventDefault();
    await axios.post("/api/forgot", { email: forgotEmail})
      .then(res => {
        if (res.status == 200) {
          setShowReset(true)
        }
      })
      .catch(err => {
          console.log(err);
          setEmailError("email address is incorrect" )
      })
  }
  const reset = async (e) => {
    e.preventDefault();
    setErrorsReset({email: "", password: "",token: ""})
    axios.post("/api/reset", { password: forgotPassword,password_confirmation: forgotPasswordConfirm,token: token,email: forgotEmail})
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          setShowReset(false)
        toggleForgotModel()
        }
      })
      .catch(err => {
          console.log(err);
          if (err.response.status === 422) {
            setErrorsReset(err.response.data.errors);
        }
      })
  }
  const toggleForgotModel = () => {
    setShowForgot(!showForgot)
  }

  return (
    <Form>
      <div className='darken'>
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
    
    
      <form onSubmit={formin} className="right">
        <h5>Login</h5>
        <p>Don't have an account? <Link to="/Register">Creat Your Account</Link> it takes less than a minute</p>
        <div className="inputs">
          <input onChange={handleChange} type="text" placeholder="email" name='email'/>
          <span className="err">
            {loginError.email &&<>{ loginError.email }</>}
          </span>
          <br/>
          <input onChange={handleChange} type="password" placeholder="password" name='password'/>
          <span className="err">
            {loginError.password &&<>{ loginError.password }</>}
          </span>
        </div>
          
          <br/><br/>
          
        <div className="remember-me--forget-password">
          <label htmlFor='item'>
            <input id='item' type="checkbox" name="item" checked/>
            <span className="text-checkbox">Remember me</span>
          </label>
          <p  onClick={toggleForgotModel}>forget password?</p>
        </div>
          
        <br/>
        <button type='submit'>Login</button>
      </form>
    </div>
    {showForgot && <div className="forgot-model" >
      {!showReset ? <form onSubmit={forgot} className="forgot-wrapper">
        <div>
          <img className="bankLogo" src="/images/cookies-logo.jpg"/>
        </div>
        <h3>Reset your password</h3>
        <p className="forgot-txt">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
        <input className="forgot-input" placeholder="Email" type="email" onChange={(e) => setForgotEmail(e.target.value)} name="" id=""/>
        <span className="err">
          {emailError && <p >{ emailError }</p>}
        </span>
        <h6 onClick={toggleForgotModel}>Return to login</h6>
        <button type='submit' className="btn forgot-btn">Continue</button>
      </form>
      :
      <form onSubmit={reset} className="forgot-wrapper">
        <div>
          <img className="bankLogo" src="/images/cookies-logo.jpg"/>
        </div>
        <h3>Create new password</h3>
        <p className="forgot-txt">Please enter the token you recieved in your email and a new password.</p>
        <input className="forgot-input" placeholder="enter you token" onChange={(e) => setToken(e.target.value)} type="text"  name="" id=""/>
        <span className="err">
          {errorsReset.token && <p >{ errorsReset.token[0] }</p>}
        </span>
        <input className="forgot-input" placeholder="new password" type="password" onChange={(e) => setForgotPassword(e.target.value)} name="" id=""/>
        <span className="err">
          {errorsReset.password &&<p >{ errorsReset.password[0] }</p>}
        </span>
        <input className="forgot-input" placeholder="repeat password" type="password" onChange={(e) => setForgotPasswordConfirm(e.target.value)} name="" id=""/>
        <button type='submit' className="btn forgot-btn">Continue</button>
      </form>}
    </div>}
    </div>
  </Form>
  
  )
}
const Form = styled.div`
position: relative;
padding: 30px;
.darken {
  background-color: rgba(0,0,0,0.5);
}
.forgot-model {
  position: absolute;
  left: 0;
  right: 0;
  top: 25%;
  bottom: 23%;
  margin: auto;
  width: 440px;
  height: fit-content;
  border: 1px solid white;
  border-radius: 10px;
  background-color: white;
  padding: 30px;
} 
.forgot-wrapper div {
  display: flex;
  justify-content: space-around;
}
.forgot-wrapper img {
  width: 130px;
}
.forgot-wrapper h3 {
  font-family: Urbanist;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;
  margin-bottom: 20px;
}
.forgot-txt {
  font-family: Urbanist;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.20000000298023224px;
  text-align: left;
  margin-bottom: 20px;
}
.forgot-input {
  margin-block: 10px;
  padding: 15px;
  width: 100%;
  border-radius: 10px;
  background-color: #A7BAF54A;
  border-color: transparent;
  color: black;
}
.forgot-wrapper h6 {
  text-decoration: underline;
  font-family: Urbanist;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  text-align: left;
  cursor: pointer;
}
.forgot-btn {
  margin-block: 20px;
  width: 100%;
}
.err {
  color:red;
  font-size: 14px;
}
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
Onmedia (max-width: 980px) {
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
Onmedia (max-width: 980px) {
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
  cursor: pointer;
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
  margin-bottom: 5px;
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
}
.box-form .right button, .btn  {
  
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
  border: 3px solid #000;
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
  background: #000;
}

label:hover::before .text-checkbox {
  background: #000;
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