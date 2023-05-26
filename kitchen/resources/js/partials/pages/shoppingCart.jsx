import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from "react-redux"
import { initCart, modifyCart, deleteFromCart } from '../actions';
import axios from 'axios';
import {HiTrash} from "react-icons/hi"

export default function ShoppingCart() {
  const dispatch = useDispatch()
  const [total,setTotal] = useState(0)
  const [model,setmodel] = useState(false)
  const [place,setPlace] = useState(false)
  let items = useSelector(state => state.cartReducer)
  console.log(items);
  const postDemand = async (e) => {
    e.preventDefault()
    var arr = []
    arr = items.map(item => item.id)
    let array = items.map(item => item.quantity)

    let demands = {
      place:place,
      date: '2023-05-05',
      total: total,
      meals: arr,
      quantity: array,
    }
    console.log(demands);
      await axios.post(`/api/setDeliveries`,demands,{
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
          }
        }).then(res => console.log(res))
    
    dispatch(initCart())
    setmodel(false)
    setPlace("")
  }
  const calculateTotal = () => {
    items.length > 0 && setTotal(items.reduce((sum, item) => ((item.quantity*item.price) + sum),0))
    }
    const addQuantity = (book) => {
    dispatch(modifyCart({id:book.id, quantity: 1 }))
  }
  const reduceQuantity = (book) => {
    book.quantity > 0 && dispatch(modifyCart({id:book.id, quantity: -1 }))
  }
  const deleteItem = (id) => {
    dispatch(deleteFromCart(id))
  }

  useEffect(() => {
    calculateTotal()
  },[items])
  const toggleValidate = async () => {
    setmodel(!model)
  }

  return (
    <Wrapper>
      <div className={model ? "shopping-cart darken" : "shopping-cart"}>
        <div className="title">
          Order Online
        </div>
      {
        items.length > 0  ? <>{items.map((item, index) => (
        <div className="item">
      
          <div className="image">
            <img src={'/storage/meals/'+item.path} alt="" />
          </div>
      
          <div className="description">
            <span>{item.name}</span>
          </div>
      
          <div className="quantity">
            <button className="plus-btn btn-action" onClick={() => reduceQuantity(item)} type="button" name="button">
            {/* <AiOutlineMinusCircle className='txt' onClick={() => reduceQuantity()} /> */}-
            </button>
            <input type="text" name="name" value={item.quantity}/>
            <button className="minus-btn btn-action" type="button" onClick={() => addQuantity(item)} name="button">
            {/* <AiOutlinePlusCircle className='txt' onClick={() => addQuantity()}/> */}+
            </button>
          </div>
      
          <div className="total-price">{item.price}</div>
          <div className="buttons ">
            <span onClick={() => deleteItem(item.id)}><HiTrash className='delete-btn'/></span>
          </div>
        </div>
      ))}</>
          : <div className='empty'>your cart is empty</div>
      }
        {items.length > 0 && 
        <><div className='total'>
          <div className='total-title'>total: </div>
          <div className='total-price prix'> {total} DH</div>
        </div>
        <div className='total'>
          <button onClick={toggleValidate} className='checkout-btn' type='button'>Make an Order</button>
        </div>
        </>}
      </div>
      {  model &&
        <div className='form-model'>
          <form onSubmit={postDemand}> 
            <div>
              <input className='order-input' type="text" name="place" id="" onChange={(e) => setPlace(e.target.value)} placeholder='enter your address'/>
            </div>
            {/* <div>
              <input className='order-input' type="date" name="" id="" placeholder='enter the date'/>
            </div> */}
            <h6 onClick={toggleValidate}>Return To Cart</h6>
            <button className='model-btn'>Order Now</button>
          </form>
        </div>}
    </Wrapper>
  )
}

const Wrapper = styled.section`
position: relative;
.form-model {
  position: absolute;
  left: 0;
  right: 0;
  top: 25%;
  bottom: 23%;
  margin: auto;
  width: 440px;
  height: fit-content;
  border: 1px solid white;
  border-radius: 10px;
  background-color: white;
  padding: 30px;
  filter: brightness(100%);
  
  box-shadow: 0 0 0 9999px #000000b0;
}
.order-input {
  margin-block: 10px;
  padding: 15px;
  width: 100%;
  border-radius: 10px;
  background-color: #A7BAF54A;
  border-color: transparent;
  color: black;
}
.form-model h6 {
  text-decoration: underline;
  font-family: Urbanist;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  text-align: left;
  cursor: pointer;
}
.model-btn {
  color: #fff;
  font-size: 16px;
  padding: 12px 35px;
  border-radius: 50px;
  display: inline-block;
  border: 0;
  cursor: pointer;
  outline: 0;
  box-shadow: 0px 4px 20px 0px #101110a6;
  background-image: linear-gradient(135deg,#afb1af 10%,#060805 100%);
  margin-block: 20px;
  width: 100%;
}
.shopping-cart {
  width: 750px;
  // height: 423px;
  margin: 80px auto;
  background: #FFFFFF;
  box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.10);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}
.title {
  height: 60px;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px 30px;
  color: #5E6977;
  font-size: 18px;
  font-weight: 400;
}
 
.item ,.total{
  padding: 20px 30px;
  // height: 120px;
  display: flex;
  justify-content: space-around;
}
 
.item:nth-child(3) {
  border-top:  1px solid #E1E8EE;
  border-bottom:  1px solid #E1E8EE;
}
.buttons {
  position: relative;
  padding-top: 35px;
  margin-right: 60px;
}
.delete-btn,
.like-btn {
  display: inline-block;
  Cursor: pointer;
}
.delete-btn {
  width: 24px;
  height: 20px;
}
 
.like-btn {
  position: absolute;
  top: 9px;
  left: 15px;
  background: url('twitter-heart.png');
  width: 60px;
  height: 60px;
  background-size: 2900%;
  background-repeat: no-repeat;
}
.is-active {
  animation-name: animate;
  animation-duration: .8s;
  animation-iteration-count: 1;
  animation-timing-function: steps(28);
  animation-fill-mode: forwards;
}
.empty {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}
 
@keyframes animate {
  0%   { background-position: left;  }
  50%  { background-position: right; }
  100% { background-position: right; }
}
.description {
  padding-top: 30px;
  margin-right: 60px;
  width: 115px;
}
 
.description span {
  display: block;
  font-size: 14px;
  color: #43484D;
  font-weight: 400;
}
 
.description span:first-child {
  margin-bottom: 5px;
}
.description span:last-child {
  font-weight: 300;
  margin-top: 8px;
  color: #86939E;
}
.quantity {
  padding-top: 30px;
  margin-right: 60px;
}
.quantity input {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 32px;
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
}
 
.btn-action {
  width: 30px;
  height: 30px;
  background-color: #E1E8EE;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.minus-btn img {
  margin-bottom: 3px;
}
.plus-btn img {
  margin-top: 2px;
}
 
button:focus,
input:focus {
  outline:0;
}
.total-price {
  width: 83px;
  padding-top: 35px;
  text-align: center;
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
}
.image {
  margin-right: 10px;
  margin-left: 20px;
}
.image img {
  width: 7rem;
  height: 7rem;
}
.total {
  border-top: 1px solid #E1E8EE;
  justify-content: end;
}
.total-title {
  height: 40px;
  padding: 11px 30px;
  color: #5E6977;
  font-size: 20px;
  font-weight: 400;
}
.prix {
  padding-top: 16px;
}
.checkout-btn {
  background-color: #6B92A4;
  color: rgba(256,256,256,0.7);
  border:0;
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  padding: 15px 45px;
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  height: 150%;
  visibility: visible;
  -webkit-transition: all .3s ease;
  
  &:hover {
    transition: all .3s ease;
    opacity: .9;
  }
}
@media (max-width: 800px) {
  .shopping-cart {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .item {
    height: auto;
    flex-wrap: wrap;
    justify-content: center;
  }
  .image img {
    // width: 50%;
  }
  .image,
  .quantity,
  .description {
    width: 100%;
    text-align: center;
    margin: 6px 0;
  }
  .buttons {
    margin-right: 0px;
  }
  .total-price {
    width: 100%;
  }
}
`