import React from 'react'
import styled from 'styled-components'
import FrontMenu from '../components/FrontMenu'

export default function Restaurant() {

  return (
    <>
      <Wrapper>
        <div className='left'>
          <img width={"100%"} src="images/gfgm1.png" alt="good food good mode"/>
          <Para>Laughter is brightest in the place where <span>Food is Good</span></Para>
          <Center>
            <Button>Book a Table</Button>
          </Center>
          
        </div>
        <SecImg>
          <img className='img' src="images/dish.jpeg" alt="" />
        </SecImg>

      </Wrapper>
      <FrontMenu/>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  flex-wrap: wrap;
  justify-content: space-around;
  .left {
    width: 22rem;
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
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
  padding-left: 20px;
  margin-top:0;
`
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`
const Center = styled.div`
  display: flex;
  justify-content: space-around;
`