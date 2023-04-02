import React from 'react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

function Search() {
  const [input, setInsput] = useState("")
  const navigate = useNavigate()  
  const submitHandler = (e) => {
    e.preventDefault()
    navigate("/searched/"+input)
  }

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch></FaSearch>
        <input type="text" onChange={(e) => setInsput(e.target.value)} value={input} />
      </div>
    </FormStyle>
  )
}
const FormStyle = styled.form`
  margin: 10px 20% 0;
  width: 60%;
  div {
    width: 100%;
    position: relative;
  }
  input {
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`
export default Search