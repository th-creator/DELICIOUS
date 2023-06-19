import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {BsFillTrashFill} from "react-icons/bs"
import axios from 'axios'
import { AiOutlineClose } from "react-icons/ai"

export default function OrderDetail() {
  const [order, setOrder] = useState({})
  const [meals, setMeals] = useState([])
  const [stateModel, setStateModel] = useState(false)
  const [state, setState] = useState("")
  let params = useParams()

  const getOrder = () => {
    axios.get(`/api/Deliveries/${params.id}`,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(res => {
      setOrder(res.data.deliveries[0])
      console.log(res.data.deliveries);
      setMeals(res.data.deliveries[0].meals);
      setState(res.data.deliveries[0].state);
    })
  }
  const storeState = (e) => {
    e.preventDefault()
    axios.put(`/api/setStateDelivery/${params.id}`,{state: state},{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(res => setStateModel(false))
    .catch(err => console.log(err))
    getOrder()
  } 
  useEffect(() => {
    getOrder()
  },[])
  meals && console.log("meal",meals);
  return (
    <Container>
      <div className="wrapper">
        {order && <h1 className='title'>Order Number : {order.id}</h1>}
        
        <div className="table">
          {order === false ? <>nothing to show</> : <ul className="responsive-table">
            {/* <li className="table-header">
              <div className="col col-2">Name</div>
              <div className="col col-3">quantity</div>
              <div className="col col-4">Price</div>
              <div className="col col-6">Action</div>
            </li> */}
            {
            !meals ?
            <li className="table-row">
              <div className="center"><p className='center'>there are no orders</p></div>
            </li>
            :
            <>
            {meals.map( delivery => 
               (<li key={delivery.id} className="table-row">
               <div className="col col-2" data-label="Name">{delivery.name}</div>
               <div className="col col-3" data-label="Quatity">{delivery.pivot.quantity}</div>
               <div className="col col-4" data-label="Price">{delivery.price}</div>
               <div className="col col-6" data-label="Action" ><BsFillTrashFill className='btn' onClick={() => deleteOrder(delivery.id,order.id)}/></div>
             </li>)
            )}
            </>
          }
          </ul>}
        </div>
        <div className='items-holder'>
          <ul className='list'>
            <li className='item'><span>Number Of Meals : </span>{order.meals && <strong>{order.meals.length}</strong>}</li>
            <li className='item'><span>Location : </span><strong>{order.place}</strong></li>
            <li className='item'><span>Order State : </span><strong>{order.state}</strong></li>
            <li className='item'><span>Total : </span><strong>{order.total}</strong></li>
          </ul>
          <label htmlFor="" className='item'></label>
          <Button className='btn' onClick={() => setStateModel(!stateModel)}>Validate</Button>
        </div>
        {stateModel && <div className='state-modal'>
          <form >
            <span className='out' onClick={() => setStateModel(false)}><AiOutlineClose/></span>
            <h1> The State Of The Order</h1>
            <select name="state" id="" onChange={(e) => setState(e.target.value)} value={state}>
              <option value="Hanging">Hanging</option>
              <option value="Being Prepared">Being Prepared</option>
              <option value="On The Way">On The Way</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
            <Button onClick={storeState}>Validate</Button>  
          </form>
        </div>}
      </div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
.wrapper {
  width: 100%;
  height: auto;
  border: 1px solid #E8F0FF;
  padding: 30px 30px 0;
  border-radius: 30px;
  background: white;
box-shadow: 15px 15px 30px #bebebe,
           -15px -15px 30px #ffffff;
  position: relative;
}
.title {
  text-align: center;
}
.list {
  
}
.item {
  list-style: none;
  font-size: 20px;
  padding-block: 5px;
}
.item span {
  color: #4d4949;
}
.items-holder {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin: 30px 45px;
}
.state-modal {
  position: absolute;
  top: 0; 
  bottom: 0;
  right: 0;
  left: 0; 
  margin: auto;
  padding: 30px;
  border-radius: 30px;
  background: white;
  width: 10rem;
  width: 30rem;
  height: fit-content;
  box-shadow: 0 0 0 9999px #000000b0;
}
.state-modal  form {
  pôsition: relative;
  display: flex;
  flex-direction: column;
}
.state-modal h1 {
  text-align: center;
}
.state-modal select {
  margin-block: 15px;
  padding: 18px;
  border-radius: 20px;
  font-size: 18px;
}
.out {
  position: absolute;
  right: 42px;
  font-size: x-large;
  cursor: pointer;
}
`
const Button = styled.button`
padding: 1rem 2rem;
color: white;
border: 2px solid white;
font-weight: 600;
cursor: pointer;
border-radius: 20px;
background: linear-gradient(35deg, #494949, #313131);
&:hover {
  border-color: black;
}
`