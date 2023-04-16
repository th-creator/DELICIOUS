import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function FrontMenu() {
  return (
    <Wrapper>
      {/* <p className='centerText'>menu</p> */}
      <h1 className='centerText'>OUR DELICIOUS MENU</h1>
      <div className="center">
        <Button to={"/Menu"}>VIEW OUR MENU</Button>
      </div>
      
    </Wrapper>
  )
}

const Wrapper = styled.div`
width: 100%;
height: 100%
background-repeat: no-repeat;
background-position: left bottom;
background-size: cover;
background-image: url('/images/meal.webp');
height: 100%;
padding: 7rem 10rem;
color: white;
margin-block: 3rem;
h1 {
  color: white;
  font-size: 3.7rem;
}
.centerText {
  text-align: center;
}
.center {
  display: flex;
  justify-content: space-around;
}
`
const Button = styled(Link)`
  padding: 1rem 2rem;
  // color: #313131;
  color: white;
  background: transparent;
  border: 2px solid white;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    // background: linear-gradient(35deg, #494949, #313131);
    color: white;
    border-color: black;
  }
`