import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
// import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import Recipes from "../recipes.json"
import { favContext } from '../components/Context';

export default function Cuisine({toggle}) {

  const [cuisine,setCuisine] = useState([])
  let params = useParams()
  const {favs,setFavs} = useContext(favContext)
  const getCuisine = async (name) => {
    // const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
    // const recipes = await data.json()
    // setCuisine(recipes.results)
    let data = Recipes.filter((item) => item.cuisines.includes(name) )
    console.log(data)
    setCuisine(data)
  }

  useEffect(() => {
    getCuisine(params.type)
  },[params.type])

  return (
    <Grid>
      {
        cuisine.map((item) => {
          return (<Card key={item.id}>
            <div className="icone" onClick={() => toggle(item.id)}>{!favs.includes(item.id) ? <BsSuitHeart/> : <BsSuitHeartFill/>}</div>
            <img src={item.image} alt="" />
            <Link to={"/recipe/"+item.id}>
              <h4>{item.title}</h4>
            </Link>
          </Card>)
        })
      }
    </Grid>
  )
}

const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(3, minmax(5rem, 18rem));
  grid-grap: 3rem;
`
const Card = styled.div`
  
  margin:2px;
  width: 98%;
  position: relative;
  overflow: hidden;
  gap: 3px;
  .icone {
    position: absolute;
    margin: 10px;
    cursor: pointer;
    width: fit;
  }
  img {
    // border-radius: 2rem;
    // position: absolute;
    // left: 0;
    width: 100%;
    margin-left: -20px
    height: 100%;
    object-fit: cover;
  }
  .icone {
    position: absolute;
    z-index: 10;
    font-size: 40px;
    top: 0;
    right: 0%;
    bottom: 0%;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`