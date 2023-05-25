import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {BsFillTrashFill} from "react-icons/bs"

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const auth = useSelector(state => state.userReducer)

  const getOrders = () => {
    axios.get(`/api/getOrders`,{
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

  useEffect(() => {
    auth && getOrders()
    
  },[auth])
  return (
    <Wrapper >
      <div className="container">
        <h2>Your Orders</h2>
        <ul className="responsive-table">
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
          <>{orders.map(delivery => (<div>{delivery.meals.map( order => 
            (<li key={order.id} className="table-row">
              <div className="col col-1" data-label="Number">{delivery.id}</div>
              <div className="col col-2" data-label="Name">{order.name}</div>
              <div className="col col-3" data-label="Quatity">{order.pivot.quantity}</div>
              <div className="col col-4" data-label="Price">{order.price}</div>
              <div className="col col-5" data-label="State">{order == 0 ? "pending" : order == 1  ? "yes" : "no"}</div>
              <div className="col col-6" data-label="Action" ><BsFillTrashFill className='btn' onClick={() => deleteOrder(order.id,delivery.id)}/></div>
            </li>)
          )}</div>)) }
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