import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function AdminLayout() {
  return (
    <div>
      <SecNav >
        <ul>
          <li><Link to='/HandleReservation'>Handle Reservation</Link></li>  
          <li><Link to="/AddMeal">Add Meal</Link></li>
          <li><Link to="/">users</Link></li>  
        </ul>
      </SecNav>
    </div>
  )
}

const SecNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  ul {
    display: flex;
    list-style: none;
  }
  li {
    margin-inline: 10px;
    color: black;
    text-decoration: none;
    font-size: 1.2rem;
    cursor: pointer;
    // border-bottom: 1px solid black;
  }
`