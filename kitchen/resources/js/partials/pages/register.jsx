import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
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
		axios.post(`http://127.0.0.1:8000/api/users`, logup).then((res) => {
        console.log("you're in ")
        console.log(res);
      if (res.status === 200) {
				console.log(res);
				setSignupError([])
        localStorage.setItem("access_token",res.data.token)
        localStorage.setItem("role",res.data.user.role)
				dispatch(login({name:res.data.user.name,email:res.data.user.email,role:res.data.user.role,id:res.data.user.id}))
        navigate(`/Home`);
      }
    }).catch((res) => {
      if (res.response.status === 422) {
				setError(res.response.data.message)
        setSignupError(res.response.data.errors)
      }
    })
	}
	const handleChange = (e) => {
		setLogup(prev => ({...prev,[e.target.name]: e.target.value}))
	}

  return (
    <>
    
    </>
  )
}