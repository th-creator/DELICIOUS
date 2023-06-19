import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {AiOutlineClose} from "react-icons/ai"
import {BsTrash} from "react-icons/bs"
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
  const out = async (id) => {
    axios.delete(`/api/Deliveries/${id}`,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }) .then(res => {
      console.log(res)
      getOrders()
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    auth && getOrders()
    
  },[auth])
  return (
    <Wrapper >
      <div className="container">
        <h2 >All Orders</h2>
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
            <span className='out' onClick={() => out(delivery.id)}><BsTrash /></span>
            <div className='center'>
              <img className="grid-item-img" src={`/storage/profile/${delivery.users.path}`} alt="" />
            </div>                        
            <div className="title">
              <h1>{delivery.users.firstName + " "}{delivery.users.lastName && delivery.users.lastName}</h1>
            </div>
            <div className="body">
              <ul className='li-items'>
                <li className='li-items'><span>Order Number : </span>{delivery.id} </li>
                <li className='li-items'><span>Number Of Meals : </span>{delivery.meals.length}</li>
                <li className='li-items'><span>Location : </span>{delivery.place}</li>
                <li className='li-items'><span>Total : </span>{delivery.total}</li>
              </ul>
              <div className="center">
                <Link className='btn' to={`/Orders/${delivery.id}`}>More Details</Link>  
              </div>
            </div>
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
  font-size: 2.5rem;
  margin: 20px 0;
  text-align: center;
  small {
    font-size: 0.5em;
  }
}
    
`
const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(3, minmax(5rem, 26rem));
  grid-gap: 6rem 4rem;
  justify-content: center;
  margin-top: 4rem;
  .grid-item {
    // border: var(--border);
    // box-shadow: var(--box-shadow);
    // padding-block: 1rem;
    border-radius: 30px;
  background: whitesmoke;
  // background: #e0e0e0;
  box-shadow: 15px 15px 30px #bebebe,
             -15px -15px 30px #ffffff;
    &:hover {
      transform: translateY(-10px);
      transition: all .5s ease-in-out;
    }
    position: relative;
  }
  .out {
    position: absolute;
    right: 23px;
    font-size: x-large;
    cursor: pointer;
    top: 20px;
  }
  .grid-item-img {
    --size: 100px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    transform: translateY(-50%);
    background: #42caff;
    background: linear-gradient(to bottom, #42caff 0%, #e81aff 100%);
    position: relative;
    transition: all .3s ease-in-out;
    margin-bottom: -50px;
   }
   
   .grid-item-img::before {
    content: "";
    border-radius: inherit;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    height: 90%;
    transform: translate(-50%, -50%);
    border: 1rem solid #e8e8e8;
   }
   
   /*Text*/
   .text-title {
    text-transform: uppercase;
    font-size: 0.75em;
    color: #42caff;
    letter-spacing: 0.05rem;
   }
   
   .text-body {
    font-size: .8em;
    text-align: center;
    color: #6f6d78;
    font-weight: 400;
    font-style: italic;
   }
   
   /*Hover*/
   .grid-item:hover .grid-item-img {
    --size: 110px;
    width: var(--size);
    height: var(--size);
   }
  .title {
    border-bottom: var(--border);
  }
  .title h1 {
    text-align: center;
  }
  .body {
    padding-inline: 2rem;
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
  .center {
    display: flex; 
    justify-content: center;
  }
  .btn  {
    font-size: 1rem;
    margin-bottom: 5px;
    padding: 20px;
    border-radius: 10px;
    color: black;
    text-decoration: none;
    padding: 1rem 2rem;
    background: transparent;
    border: 2px solid black;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      color: black;
      opacity: .5;
    }
  }
  
`