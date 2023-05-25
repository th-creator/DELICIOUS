import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {BsFillTrashFill} from "react-icons/bs"
import {AiFillCheckCircle, AiFillClockCircle, AiFillCloseCircle} from "react-icons/ai"

export default function HandleReservation() {
  const [reservations, setReservations] = useState([])

  const auth = useSelector(state => state.userReducer)

  const getReservations = () => {
    axios.get(`/api/Reservation`,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(res => setReservations(res.data.reservations))
  }
  const deleteReservation = (id) => {
    axios.delete(`/api/Reservation/${id}`,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }) .then(res => console.log(res))
    getReservations()
  }

  const setActive = (id,state) => {
    var value = state == -1 ? 1 : state == 1 ? -1 : 1
    console.log(value);
    axios.put(`/api/setStateReservation/${id}`,{state: value},{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(res => console.log(res))
    getReservations()
  }

  useEffect(() => {
    auth && getReservations()
    
  },[reservations,auth])
  return (
    <Wrapper >
      <div className="container">
        <h2>Weekly Reservations</h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Name</div>
            <div className="col col-2">People</div>
            <div className="col col-3">Day</div>
            <div className="col col-4">Hour</div>
            <div className="col col-5">state</div>
            <div className="col col-6">Action</div>
          </li>
          {reservations.length == 0 ?
          <li className="table-row">
            <div><p className='center'>there are no reservations</p></div>
            
          </li>
          :
          <>{reservations.map(reservation => (
            <li key={reservation.id} className="table-row">
              <div className="col col-1" data-label="name">{reservation.name}</div>
              <div className="col col-2" data-label="people">{reservation.num_person}</div>
              <div className="col col-3" data-label="day">{reservation.day}</div>
              <div className="col col-4" data-label="hour">{reservation.hour}</div>
              <div className="col col-5" data-label="state" onClick={() =>setActive(reservation.id,reservation.state)}>{reservation.state == 0 ? <span className='clicked'><AiFillClockCircle className='btn'/> pending</span> 
              : reservation.state == 1  ? <span className='clicked'><AiFillCheckCircle className='btn'/> yes</span> 
              : <span className='clicked'><AiFillCloseCircle className='btn'/> no</span>}</div>
              <div className="col col-6" data-label="action" ><BsFillTrashFill className='btn' onClick={() => deleteReservation(reservation.id)}/></div>
            </li>
          )) }
          </>}
        </ul>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
body {
  font-family: 'lato', sans-serif;
}
.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
  small {
    font-size: 0.5em;
  }
}

.responsive-table {
  li {
    border-radius: 3px;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }
  .table-header {
    background-color: #95A5A6;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
  }
  .col-1 {
    flex-basis: 20%;
  }
  .col-2 {
    flex-basis: 18%;
  }
  .col-3 {
    flex-basis: 18%;
  }
  .col-4 {
    flex-basis: 18%;
  }
  .col-5 {
    flex-basis: 18%;
  }
  .col-6 {
    flex-basis: 8%;
  }
  
  .btn {
    cursor: pointer;
    margin-bottom: -3.5px;
    font-size: 17px;
  }

  .center {
    text-align: center;
  }
  .clicked {
    cursor: pointer;
  }
  @media all and (max-width: 767px) {
    .table-header {
      display: none;
    }
    .table-row{
      
    }
    li {
      display: block;
    }
    .col {
      
      flex-basis: 100%;
      
    }
    .col {
      display: flex;
      padding: 10px 0;
      &:before {
        color: #6C7A89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
  }
}
`