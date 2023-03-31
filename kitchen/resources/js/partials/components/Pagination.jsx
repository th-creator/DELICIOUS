import React from 'react'
import styled from 'styled-components'

export default function Pagination({totalPosts, postsPerPage, setCurrentPage, currentPage}) {
  let pages = []
  for(let i = 1; i<=Math.ceil(totalPosts/postsPerPage); i++) {
    pages.push(i)
  }

  return (
    <Paginater>
      {
        pages.map((page,index) => (<button className={page== currentPage ? 'active' : ''} key={index} onClick={() => setCurrentPage(page)}>{page}</button>))
      }
    </Paginater>
  )
}

const Paginater = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-block: 1rem;
  button {
    width: 40px;
    height: 40px;
    font-family: inherit;
    font-weight: 600;
    font-size: 16px;
    margin: 0 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
    color: black;
    border-color: #eee;
  }

  button.active {
    font-weight: 900;
    border-color: #101010;
    background: #101010;
    color: white;
  }
`