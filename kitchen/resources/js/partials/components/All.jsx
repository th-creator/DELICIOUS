import React, { useState, useContext } from 'react'
import Recipes from "../recipes.json"
import styled from 'styled-components'
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { favContext } from './Context';
import Pagination from './Pagination'
import "../index.css"

export default function All({toggle}) {
  const [recipees, setRecipe] = useState(Recipes)
  const {favs,setFavs} = useContext(favContext)
  const [currentPage,setCurrentPage] = useState(1)
  const [postsPerPage,setPostsPerPage] = useState(12)

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = recipees.slice(firstPostIndex,lastPostIndex)
  return (
    <>
      <h3 align='center'>the most excuisite meals</h3>
      <Grid>
          {currentPosts.map((item) => {
            return (
              <Card key={item.id}>
              <div className="icone" onClick={() => toggle(item.id)}>{!favs.includes(item.id) ? <BsSuitHeart/> : <BsSuitHeartFill/>}</div>
                <img src={item.image} alt="" />
              <Link to={"/recipe/"+item.id}>
                <h4>{item.title}</h4>
              </Link>
            </Card>
            )
          })} 
      </Grid>
      <Pagination totalPosts={recipees.length} 
      setCurrentPage={setCurrentPage} currentPage={currentPage} postsPerPage={postsPerPage} />
    </>
    
  )
}

const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(3, minmax(5rem, 18rem));
  grid-grap: 3rem;
  justify-content: center;
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