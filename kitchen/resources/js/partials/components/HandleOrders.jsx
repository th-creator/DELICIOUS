import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {BsFillTrashFill} from "react-icons/bs"
import {AiFillCheckCircle, AiFillClockCircle, AiFillCloseCircle} from "react-icons/ai"
import { Link } from 'react-router-dom'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const auth = useSelector(state => state.userReducer)

  const getOrders = () => {
    axios.get(`/api/Orders`,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(res => {
      console.log(res.data.deliveries);
      // console.log(res.data.deliveries[7].meals[0].pivot.quantity);
      setOrders(res.data.deliveries)
    })
  }
  const deleteOrder = (id,idDelivery) => {
    axios.post(`/api/DetachOrder/${id}`,{delivery_id: idDelivery},{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }) .then(res => console.log(res)).catch(err => console.log(err))
    getOrders()
  }
  const setActive = (id,state) => {
    var value = state == -1 ? 1 : state == 1 ? -1 : 1
    console.log(value);
    axios.put(`/api/setStateOrder/${id}`,{state: value},{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(res => console.log(res))
    getOrders()
  }

  useEffect(() => {
    auth && getOrders()
    
  },[auth])
  return (
    <Wrapper >
      <div className="container">
        <h2>All Orders</h2>
        {/* <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Order Number</div>
            <div className="col col-2">Name</div>
            <div className="col col-3">quantity</div>
            <div className="col col-4">Price</div>
            <div className="col col-5">state</div>
            <div className="col col-6">Action</div>
          </li>
          {
          orders.length == 0 ?
          <li className="table-row">
            <div className="center"><p className='center'>there are no orders</p></div>
          </li>
          :
          <>{orders.map(delivery => (<div key={delivery.id}>{delivery.meals.map( order => 
            (<li key={order.id} className="table-row">
              <div className="col col-1" data-label="Number">{delivery.id}</div>
              <div className="col col-2" data-label="Name">{order.name}</div>
              <div className="col col-3" data-label="Quatity">{order.pivot.quantity}</div>
              <div className="col col-4" data-label="Price">{order.price}</div>
              <div className="col col-5" data-label="state" onClick={() =>setActive(order.id,order.state)}>{order.state == 0 ? <span className='clicked'><AiFillClockCircle className='btn'/> pending</span> 
              : order.state == 1  ? <span className='clicked'><AiFillCheckCircle className='btn'/> yes</span> 
              : <span className='clicked'><AiFillCloseCircle className='btn'/> no</span>}</div>
              <div className="col col-6" data-label="Action" ><BsFillTrashFill className='btn' onClick={() => deleteOrder(order.id,delivery.id)}/></div>
            </li>)
          )}</div>)) }
          </>}
        </ul> */}
        <Grid className="delivery.id">
          <>{orders.map(delivery => (
          <div className='grid-item' key={delivery.id}>
            <h1>{delivery.users.firstName + " "}{delivery.users.lastName && delivery.users.lastName}</h1>
            <ul className='li-items'>
              <li className='li-items'><span>Order Number : </span>{delivery.id} </li>
              <li className='li-items'><span>Number Of Meals : </span>{delivery.meals.length}</li>
              <li className='li-items'><span>Location : </span>{delivery.place}</li>
              <li className='li-items'><span>Total : </span>{delivery.total}</li>
            </ul>
            <Link to={`/Orders/${delivery.id}`}>More Details</Link>
          </div>))
          }</>
        </Grid>
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
  }

  .center {
    text-align: center;
    display: flex;
    justify-content: center;
    // margin-left: 30%;
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
const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(3, minmax(5rem, 26rem));
  grid-gap: 2rem;
  justify-content: center;
  .grid-item {
    border: var(--border);
    box-shadow: var(--box-shadow);
    padding: 1rem 2rem;
  }
  .grid-item:hover {
    border: var(--border-hover);
  }
  .li-items li {
    list-style: none;
  }
  .li-items li span {
    font-size: 17px;
    font-weight: 900;
  }
`