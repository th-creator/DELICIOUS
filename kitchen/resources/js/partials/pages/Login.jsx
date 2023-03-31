import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import {useDispatch} from "react-redux"
import { login } from '../actions'
import axios from 'axios'
import "../form.css"

export default function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [auth, setAuth] = useState({
		email:"",
		password:""
	})
	const [loginError, setLoginError] = useState([])
	const [error, setError] = useState('')
	
	const loginHandler = async () => {
		axios.post(`http://127.0.0.1:8000/api/authenticate`, auth)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data.user);
        setLoginError([])
        localStorage.setItem("access_token",res.data.token)
        localStorage.setItem("role",res.data.user.role)
				dispatch(login({name:res.data.user.name,email:res.data.user.email,role:res.data.user.role,id:res.data.user.id}))
        navigate(`/Home`);
      }
    }).catch(function (error) {
      console.log(error);
    });
	}

	const formin = e => {
		e.preventDefault()
		loginHandler()
	}

	const handleChange = (e) => {
		setAuth(prev => ({...prev,[e.target.name]: e.target.value}))
	}

  return (
    <div className='form-wrapper' >
      <div className="container">
        <div className='main login'>
            <header className="text-center">
                <h2 className="sign" align="center">
                    Login
                </h2>
                <p className="sign" align="center" >Log into your account</p>
            </header>

            <form className="form1" onSubmit={formin}>
                <div className="mb-2 mt">
                    <input
                        onClick={handleChange}
                        type="email" align="center"
                        className="un " placeholder="Email"
                        name="email"  
                    />
                </div>
                {loginError.email &&
                  <p>{loginError.email}</p>
                }
                <div className="mb-6">
                    <input
                        onClick={handleChange}
                        placeholder="Password"
                        type="password" className="pass" align="center"
                        name="password" 
                    />
                </div>
                {loginError.password &&
                  <p>{loginError.password}</p>
                }
                <div className="mb-2 centring">
                    <button
                        type="submit"
                        className="submit" align="center"
                    >Sign in</button>
                </div>

                <div className="mt-2" align="center">
                    <p className="forgot">
                        Don't have an account? 
                        <Link to="/register" className="text-laravel a"> Register</Link>
                    </p>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}