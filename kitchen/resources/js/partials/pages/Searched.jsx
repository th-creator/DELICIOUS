import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import recipees from '../recipes.json'
import { favContext } from '../components/Context';

export default function Searched({toggle}) {
  const [searchedRecipes, setSearchedRecipes] = useState([])
  let params = useParams()
  const {favs,setFavs} = useContext(favContext)
  const getSearched = async (name) => {
    // const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`)
    // const recipes = await data.json()
    // setSearchedRecipes(recipes.results)

    const data = recipees.filter((item) => item.title.toUpperCase().includes(name.toUpperCase()))
    console.log(data)
    setSearchedRecipes(data)
    }
    useEffect(() => {
      getSearched(params.search)
    },[params.search])

  return (
    <Grid>
      {searchedRecipes.map((item) => {
        return (
          <Card key={item.id}>
            <div className="icone" onClick={() => toggle(item.id)}>{!favs.includes(item.id) ? <BsSuitHeart/> : <BsSuitHeartFill/>}</div>
            <img width={"30rem"} src={item.image} alt="" />
            <Link to={"/recipe/"+item.id}>
              <h4>{item.title}</h4>
            </Link>
          </Card>
        )
      })}
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