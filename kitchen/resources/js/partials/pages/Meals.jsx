import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {BsFillTrashFill} from "react-icons/bs"
import {AiFillEdit} from "react-icons/ai"
import { Link } from 'react-router-dom'
import Paginater from '../components/Paginater'
import AddMeal from '../components/AddMeal'
import EditMeal from '../components/EditMeal'

export default function Meals() {
  const [meals, setMeals] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [visibleMeals, setVisibleMeals] = useState([])
  const [mealsShowen, setMealsShowen] = useState([])
  const [addModel, setAddModel] = useState(false)
  const [editMeal, setEditMeal] = useState({})
  const [editModel, setEditModel] = useState(false)
  const auth = useSelector(state => state.userReducer)
  var data = []
  const getMeals = () => {
    axios.get(`/api/Meals`,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(res => {
      console.log(res.data.Meals);
      setMeals(res.data.Meals)
      data = res.data.Meals
      // setVisibleMeals(data.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize))
      // setMealsShowen(res.data.Meals)
      updateVisibleMeals(data)
      // setVisibleMeals(res.data.Meals.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize))
    }).catch(err => console.log(err))
    
  }
  const deleteOrder = (id) => {
    axios.delete(`/api/Meals/${id}`,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }) .then(res => console.log(res)).catch(err => console.log(err))
    getMeals()
  }

  const updatePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    updateVisibleMeals(meals);
  }
  const updateVisibleMeals = (food) => {
  //   const lastPostIndex = (currentPage+1) * pageSize
  // const firstPostIndex = lastPostIndex - pageSize
  // const currentPosts = recipees.slice(firstPostIndex,lastPostIndex)
    
    console.log("current page",currentPage);
    console.log("size page",pageSize);
    let val = food.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize)
    // let val = food.slice(firstPostIndex,lastPostIndex)
    // setVisibleMeals(val) ;
    setVisibleMeals(val) ;
    setMealsShowen(visibleMeals)
    console.log(val);
    // if we have 0 visible todos, go back a page
    if (val.length == 0 && currentPage > 0) {
      updatePage(currentPage -1);
    }
    // setCurrentPage(currentPage+1)
  }
  const pageSizeHandler = (size) => {
    setPageSize(size)
    updateVisibleMeals(meals)
  }

  const Editer = (meal) => {
    setEditMeal(meal)
    setEditModel(true)
  }

  useEffect(() => {
    auth && getMeals()
    meals.length > 0 && updateVisibleMeals(meals)
  },[auth])
  // useEffect(() => {
    
    
  // },[meals])
  return (
    <Wrapper >
      <div className="container">
        <h2>The Meals</h2>
        <div className='btn-add-wrapper'>
          <Button type='button' onClick={() => setAddModel(true)}>Add Meal</Button>
        </div>

        
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Picture</div>
            <div className="col col-2">Name</div>
            <div className="col col-3">type</div>
            <div className="col col-4">Price</div>
            <div className="col col-5">state</div>
            <div className="col col-6">Action</div>
          </li>
          {
          meals.length == 0 ?
          <li className="table-row">
            <div className="center"><p className='center'>there are no meals</p></div>
          </li>
          :
          <>{visibleMeals.map(meal => (<li key={meal.id} className="table-row">
              <div className="col col-1" data-label="picture"><img src={"/storage/meals/"+meal.path} alt="" className='pic' /></div>
              <div className="col col-2" data-label="name">{meal.name}</div>
              <div className="col col-3" data-label="type">{meal.type}</div>
              <div className="col col-4" data-label="price">{meal.price}</div>
              <div className="col col-5" data-label="state">available</div>
              <div className="col col-6" data-label="action" ><BsFillTrashFill className='btn' onClick={() => deleteOrder(meal.id)}/>
              <AiFillEdit  className='btn' onClick={() => Editer(meal)}/></div>
            </li>)) }
          </>}
        </ul>
        <Paginater
            datas={meals}
            update={updatePage}
            currentPage={currentPage}
            pageSize={pageSize}
            pageSizeHandler={pageSizeHandler}
            >
      </Paginater> 
      </div>
      {addModel && <AddMeal setAddModel={setAddModel} getMeals={getMeals} />}
      {editModel && <EditMeal setEditModel={setEditModel} edit={editMeal} getMeals={getMeals} />}
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
.btn-add-wrapper {
  display: flex;
  justify-content: end;
}
.btn-add {
  width: 135px;
  font-size: 20px;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 10px;
  padding: 16px 24px;
}
h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
  small {
    font-size: 0.5em;
  }
}
.pic {
  width: 40px;
}
.responsive-table {
  li {
    border-radius: 3px;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }
  .table-header {
    background-color: #95A5A6;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
  }
  .col-1 {
    flex-basis: 20%;
  }
  .col-2 {
    flex-basis: 18%;
  }
  .col-3 {
    flex-basis: 18%;
  }
  .col-4 {
    flex-basis: 18%;
  }
  .col-5 {
    flex-basis: 18%;
  }
  .col-6 {
    flex-basis: 8%;
  }
  
  .btn {
    cursor: pointer;
    margin-inline: 6px;
  }

  .center {
    text-align: center;
    display: flex;
    justify-content: center;
    // margin-left: 30%;
  }

  @media all and (max-width: 767px) {
    .table-header {
      display: none;
    }
    .table-row{
      
    }
    li {
      display: block;
    }
    .col {
      
      flex-basis: 100%;
      
    }
    .col {
      display: flex;
      padding: 10px 0;
      &:before {
        color: #6C7A89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
  }
}
`
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`