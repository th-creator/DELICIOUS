import React,{ useContext, useState } from 'react'
import { favContext } from './Context'
import Recipees from "../recipes.json"
import styled from 'styled-components'
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function Favorite({toggle}) {
    const {favs,setFavs} = useContext(favContext)
    // const {recipes, setRecipes} = useState([])
    if (favs.length != 0) {
        var data = Recipees.filter((item) => (favs.includes(item.id)))
    console.log(data)
        // setRecipes(data)
    }
  return (
    <Grid>
        { !data ? <h2>you have no favourites</h2> :
            data.map((recipe) => {
                return (
                    <Card key={recipe.id}>
                    <div className="icone" onClick={() => toggle(recipe.id)}>
                      {!favs.includes(recipe.id) ? <BsSuitHeart/> : <BsSuitHeartFill/>}
                    </div> 
                        <img   src={recipe.image} alt="" />
                    <Link to={"/recipe/"+recipe.id}>
                        <h4>{recipe.title}</h4>
                    </Link>
                    </Card>
                )
            })
        }
    </Grid>
  )
}

const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(3, minmax(5rem, 18rem));
  grid-grap: 3rem;
    h2 {
        align-items: center;
        grid-column-start: 2;
        grid-column-end: 3;
        
    }
`
const Card = styled.div`
  
  margin:2px 2px 2px 0px;
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