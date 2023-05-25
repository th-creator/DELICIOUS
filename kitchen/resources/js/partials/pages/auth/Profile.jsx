import React from 'react'
import styled from 'styled-components'

export default function Profile() {
  return (
    <Container>
      <form className="wrapper">
        <div className="center">
          <div className='inp-wrapper'>
            <img src="/images/cookies.webp" alt="" className='img' />
          </div>  
        </div>
        
        <div className='inp-wrapper'>
          <input className='inp' placeholder='Name' type="text" name="" id="" />
        </div>
        <div className='inp-wrapper'>
          <input className='inp' placeholder='Email' type="email" name="" id="" />
        </div>
        <div className='inp-wrapper'>
          <input className='inp' type="password" placeholder='Password' name="" id="" />
        </div>
        <div className='inp-wrapper'>
          <button className='btn'>Submit</button>
        </div>
      </form>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  .wrapper {
    width: 100%;
    height: auto;
    border: 1px solid #E8F0FF;
    padding: 30px;
    border-radius: 30px;
    background: #E8F0FF;
  }
  .inp-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .inp {
    margin: 5px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: white;
    height: 40px;
    padding-left: 12px;
  }
  .btn {
    margin: 5px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #313131;
    color: white;
    height: 40px;
    cursor: pointer;
  }
  .img {
    border-radius: 50%;
    width: 130px;
    height: 130px;
    cursor:pointer;
  }
  .img::hover::after {
    content: "hhey";
  }
  
  .center {
    display: grid;
    place-items: center;
  }
`