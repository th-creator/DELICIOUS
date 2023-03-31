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

function Pages({toggle, switcher}) {
  const home = switcher ?  <Restaurant /> : <Home toggle={toggle} />
  
  const location = useLocation()
  return (
    // <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={home} />
        <Route path='/home' element={home} />
        {!switcher &&
          <>
            <Route path='/Favorite' element={<Favorite toggle={toggle} />} />
            <Route path='/cuisine/:type' element={<Cuisine toggle={toggle} />} />
            <Route path='/searched/:search' element={<Searched toggle={toggle} />} />
            <Route path="/recipe/:name" element={<Recipe/>} />  
          </>
        }   
        <Route path='*' element={<Page404/>}  />
      </Routes>  
    // </AnimatePresence>
    
  )
}

export default Pages