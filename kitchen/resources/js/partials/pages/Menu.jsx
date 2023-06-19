import React, { useEffect, useState } from 'react'
import {Splide, SplideSlide} from '@splidejs/react-splide';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import { addToCart, modifyCart } from '../actions';

export default function Menu() {
  const [meals , setMeals] = useState([])
  const [juices, setJuices] = useState([])
  const [food, setFood] = useState([])
  const items = useSelector(state => state.cartReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/Meals",{
    headers: {
      Authorization : `Bearer ${localStorage.getItem("access_token")}`
      }
    }).then(res => {
      setFood(res.data.Meals.filter(juice => juice.type === "food"))
      setJuices(res.data.Meals.filter(juice => juice.type === "juice"))
    })
    .catch(err => console.log(err)) 
    
  },[])
  
  const addCart = (meal) => {
    const data = {...meal, quantity: 1}
    console.log(data);
    let flag = true
    items.forEach(item => {
      if(item.id === meal.id ) {
        dispatch(modifyCart({id:meal.id, quantity: 1 })) 
        return flag = false
      }
    });
    flag && dispatch(addToCart(data))
  }
  
  return (
    <div>
      <Header >
        <h1 className="header-1">Juice Menu</h1>
      </Header>
      <div className="swiper-wrapper">
        <Splide options={{
          type: 'loop',
          arrows: true,
          pagination: false,
          drag: "free",
          perMove: 1,
          autoplay: true,
          interval: 3000,
          gap: "1.4rem",
          autoWidth: true,
          breakpoints: {
            768: {
              gap: "1rem",
            }
          }
        }}>
          {juices.length > 0 &&  juices.map(meal => {
            return (
              <SplideSlide key={meal.id}>
                <Card >
                  <div>
                    <p>{meal.name}</p>
                    <p className='price'>{meal.price} DH</p>
                    <button type='button' className='add' onClick={() => addCart(meal)}>add</button>
                    <img src={'/storage/meals/'+meal.path} alt={meal.name} />
                    <Gradient />
                  </div>
                </Card>
              </SplideSlide>)
          })} 
        </Splide>
      </div>
      <Header >
        <h1 className="header-1">Meal Menu</h1>
      </Header>
      <div style={{marginBottom: '60px'}} className="swiper-wrapper">
        <Splide options={{
          type: 'loop',
          arrows: true,
          pagination: false,
          drag: "free",
          perMove: 1,
          autoplay: true,
          interval: 3000,
          gap: "1.4rem",
          autoWidth: true,
          breakpoints: {
            768: {
              gap: "1rem",
            }
          }
        }}>
          {food.length > 0 &&  food.map(meal => {
            return (
              <SplideSlide key={meal.id}>
                <Card >
                  <div >
                    <p>{meal.name}</p>
                    <p className='price'>{meal.price} DH</p>
                    <button type='button' className='add' onClick={() => addCart(meal)}>add</button>
                    <img src={'/storage/meals/'+meal.path} alt={meal.name} />
                    <Gradient />
                  </div>
                </Card>
              </SplideSlide>)
          })} 
        </Splide>
      </div>
    </div>
  )
}

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  width: 14.2rem;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 3%;
    transform: translate(-50%,0%);
    color: white;
    width: 100%; 
    text-align: center;
    font-weight: 600;
    font-size: 1.1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    font-size: 20px;
    }
  .price {
    bottom: -3%;
  }
  .add {
    font-size: 1rem;
    z-index: 10;
    margin-inline: 45px;
    margin-bottom: 5px;
    left: 0;
    right: 0;
    position: absolute;
    padding: 20px;
    border-radius: 10px;
    color: black;
    bottom: 0;
    padding: 1rem 2rem;
    color: white;
    background: transparent;
    border: 2px solid white;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      color: white;
      border-color: black;
    }
  }
  
` 
const Header = styled.header`
  width: 100%;
  display: inline-block;
  flex-direction: column;
  align-items: center;
h1 {
  position: relative;
  font-size: 60px;
  font-weight: 600;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;   
}
.header-1{
  text-align: center;
  background-image: repeating-radial-gradient(closest-side at 20px 20px,#49484b,#848180,#040404);
}
`
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`
