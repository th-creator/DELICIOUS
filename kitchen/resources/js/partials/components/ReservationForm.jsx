import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export default function ReservationForm() {
  const  [reserve, setReserve] = useState({})
  const navigate = useNavigate()
  const handleChange = (e) => {
    setReserve(prev => ({...prev,[e.target.name]: e.target.value}))
  } 
  const storeReservation = (e) => {
    e.preventDefault()
    console.log(reserve);
    axios.post("/api/Reservation",reserve) .then(res => {
      navigate(`/Home`);
    }).catch(err => console.log(err))
  }
  return (
    <Wrapper>
      <div class = "card-container">
                <div class = "card-img">
                </div>

                <div class = "card-content">
                    <h3>Reservation</h3>
                    <form onSubmit={storeReservation}>
                        <div class = "form-row">
                            <select onChange={handleChange} name = "day">
                                <option value = "-1">Select Day</option>
                                <option value = "sunday">Sunday</option>
                                <option value = "monday">Monday</option>
                                <option value = "tuesday">Tuesday</option>
                                <option value = "wednesday">Wednesday</option>
                                <option value = "thursday">Thursday</option>
                                <option value = "friday">Friday</option>
                                <option value = "saturday">Saturday</option>
                            </select>

                            <select onChange={handleChange} name = "hour">
                                <option value = "-1">Select Hour</option>
                                <option value = "10: 00">10: 00</option>
                                <option value = "12: 00">12: 00</option>
                                <option value = "14: 00">14: 00</option>
                                <option value = "16: 00">16: 00</option>
                                <option value = "18: 00">18: 00</option>
                                <option value = "20: 00">20: 00</option>
                                <option value = "22: 00">22: 00</option>
                            </select>
                        </div>

                        <div class = "form-row">
                            <input name='name' onChange={handleChange} type = "text" placeholder="Full Name"/>
                            <input name='phone' onChange={handleChange} type = "text" placeholder="Phone Number"/>
                        </div>

                        <div class = "form-row">
                            <input name='num_person' onChange={handleChange} type = "number" placeholder="How Many Persons?" min = "1"/>
                            <input type = "submit" value = "BOOK TABLE"/>
                        </div>
                    </form>
                </div>
            </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
// .banner{
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("images/banner-img.jpg") center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding-bottom: 20px;
// }
.card-container{
  display: grid;
  grid-template-columns: 420px 420px;
}
.card-img{
  background: url("images/card-img.jpg") center/cover no-repeat;
}
.banner h2{
  padding-bottom: 40px;
  margin-bottom: 20px;
}
.card-content{
  background: #fff;
  height: 330px;
}
.card-content h3{
  text-align: center;
  color: #000;
  padding: 25px 0 10px 0;
  font-size: 26px;
  font-weight: 500;
}
.form-row{
  display: flex;
  width: 90%;
  margin: 0 auto;
}
form select, form input{
  display: block;
  width: 100%;
  margin: 15px 12px;
  padding: 5px;
  font-size: 15px;
  font-family: 'Poppins', sans-serif;
  outline: none;
  border: none;
  border-bottom: 1px solid #eee;
  font-weight: 300;
}
form input[type = text], form input[type = number], form input::placeholder, select{
  color: #9a9a9a;
}
form input[type = submit]{
  color: #fff;
  background: #f2745f;
  padding: 12px 0;
  border-radius: 4px;
  cursor: pointer;
}
form input[type = submit]:hover{
  opacity: 0.9;
}
@media(max-width: 992px){
  .card-container{
      grid-template-columns: 100%;
      width: 100vw;
  }
  .card-img{
      height: 330px;
  }
}
`