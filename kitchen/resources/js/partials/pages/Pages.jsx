import React from 'react'
import Home from './home'
import Cuisine from './cuisine'
import Searched from './Searched'
import Recipe from './recipe'
import Page404 from './Page404'
import {Route, Routes, useLocation} from 'react-router-dom'
// import { AnimatePresence } from 'framer-motion'
import Favorite from '../components/Favorite'
import Restaurant from './restaurant'
import Login from './Login'
import Register from './register'
import ReservationForm from '../components/ReservationForm'
import Reservation from './Reservation'
import HandleReservation from '../components/HandleReservations'
import AddMeal from '../components/AddMeal'
import Menu from './Menu'
import ShoppingCart from './shoppingCart'
import MyOrders from './MyOrders'
import Meals from './Meals'
import UserList from './UserList'
import Profile from './auth/Profile'
import Orders from '../components/HandleOrders'
import { useSelector } from 'react-redux'
import OrderDetail from './admin/OrderDetail'

function Pages({toggle, switcher}) {
  const home = switcher ?  <Restaurant /> : <Home toggle={toggle} />
  const auth = useSelector(state => state.userReducer)
  const location = useLocation()
  return (
    // <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={home} />
        <Route path='/home' element={home} />
        {!auth && <>
          <Route path='/Login' element={<Login/>} />
          <Route path='/Register' element={<Register/>} />
          </>}
        {!switcher ?
          <>
            <Route path='/Favorite' element={<Favorite toggle={toggle} />} />
            <Route path='/cuisine/:type' element={<Cuisine toggle={toggle} />} />
            <Route path='/searched/:search' element={<Searched toggle={toggle} />} />
            <Route path="/recipe/:name" element={<Recipe/>} />  
          </>
          :
          switcher ?
          <>
            <Route path="/Profile" element={<Profile/>} />  
            <Route path="/ReservationForm" element={<ReservationForm/>} />  
            <Route path="/Reservation" element={<Reservation/>} />  
            {auth && <>{(auth.roles.find(role => (role.name == "admin" || role.name ==  "manager")) ) 
            && <Route path="/HandleReservation" element={<HandleReservation/>} />}  </>}
            <Route path="/AddMeal" element={<AddMeal/>} />  
            <Route path="/Menu" element={<Menu/>} />  
            <Route path='/Cart' element={<ShoppingCart/>} />
            <Route path='/MyOrders' element={<MyOrders/>} />
            <Route path='/Orders' element={<Orders/>} />
            <Route path='/Meals' element={<Meals/>} />
            <Route path='/UserList' element={<UserList/>} />
            <Route path='/Orders/:id' element={<OrderDetail />} />
          </>
          : <></>
        }   
        <Route path='*' element={<Page404/>}  />
      </Routes>  
    // </AnimatePresence>
    
  )
}

export default Pages