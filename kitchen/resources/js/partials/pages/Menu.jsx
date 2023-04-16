import React, { useEffect, useState } from 'react'
import {Splide, SplideSlide} from '@splidejs/react-splide';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Menu() {
  const [meals , setMeals] = useState([])
  useEffect(() => {
    axios.get("/api/Meals",{
    headers: {
      Authorization : `Bearer ${localStorage.getItem("access_token")}`
      }
    }).then(res => setMeals(res.data.Meals))
    .catch(err => console.log(err)) 
  },[])
 
  
  return (
    <div className="swiper featured-slider">
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
          {meals.length > 0 &&  meals.map(meal => {
            return (
              <SplideSlide key={meal.id}>
                <Card >
                  <Link to={'/Meal/'+meal.id}>
                    <p>{meal.name}</p>
                    <img src={'/storage/meals/'+meal.path} alt={meal.name} />
                    <Gradient />
                  </Link>
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
    bottom: 0%;
    transform: translate(-50%,0%);
    color: white;
    width: 100%; 
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    }
` 
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`