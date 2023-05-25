import React from 'react'
import styled from 'styled-components'
import FrontMenu from '../components/FrontMenu'
import { Link } from 'react-router-dom'

export default function Restaurant() {

  return (
    <>
      <Wrapper>
        <div className='left'>
          {/* <img width={"100%"} src="images/gfgm1.png" alt="good food good mode"/> */}
          <p className='quote'>GOOD FOOD </p>
          <p className='quote'>GOOD MODE</p>
          <Para>Laughter is brightest in the place where <span>Food is Good</span></Para>
          <Center>
            <Button to={"/ReservationForm"}>Book a Table</Button>
          </Center>
          
        </div>
        <SecImg>
          {/* <img className='img' src="images/dish.jpeg" alt="" /> */}
        </SecImg>

      </Wrapper>
      <FrontMenu/>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 30px;
  height: 100%
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: cover;
  background-image: url('/images/restaurant.webp');
  flex-direction: row;
  margin-bottom: 15px;
  flex-wrap: wrap;
  justify-content: space-around;
  .left {
    width: 22rem;
  }
  .quote {
    font-size: 3.4rem;
    font-weight: 600;
    line-height: 30px;
    text-align: center;
    color: white;
    font-family: emoji;
  }
`
const SecImg = styled.div`
  // margin-left: 80px;
  img {
    width: 22rem;
  }
`
const Para = styled.p`
  text-decoration: none;
  font-size: 1.5rem;
  color: white;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
  padding-left: 20px;
  margin-top:0;
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
const Center = styled.div`
  display: flex;
  justify-content: space-around;
`