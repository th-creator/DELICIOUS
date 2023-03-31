import axios from 'axios'
import React, { useEffect } from 'react'
// import axios from 'axios'
// import { toastContainer, Toast } from 'react-toastify'
// import 'react-toastify/dist/reactToastify.css'
// toast is a flashmessage review it

export default function Table() {
  // get all recipes
  useEffect(()=> {
    axios.get('/get/employee/list').then((res) => {
      console.log(res.data)
      })
      // storeRecipe = (id) => {
        axios.post('/store/recipe/data',
        {
          id: '2',
          recepe_id: '4'
        }
        ).then((res) => {
          console.log(res.data)
          // we use this to set the new data
          // setTimeout(() => {
          //   location.reload()
          // },25000)
        } )
      // }
    
  },[])
  
  // getting a spicific one 
  // recipeDetails = (id) => {
  //   axios.post(`/api/recipes/${id}/edit`)
  // .then((res) => {
  //     console.log(res.data)
  //   } ).catch(err => console.log(err))
  // }
  // let mealid = 4
  // // updating a spicific recipe data
  // updateRecipe = (id) => {
  //   axios.put(`/api/recipes/${id}/update`,
  //   {
  //     mealId: mealid
  //   }
  //   ).then((res) => {
  //     console.log(res.data)
  //     // we use this to set the new data
  //     setTimeout(() => {
  //       location.reload()
  //     },2500)
  //     // 
  //   } )
  // }

  

  // deleteRecipe = (id) => {
    // axios.delete(`/api/recipes/${id}/delete`).then(
    //   () => {
    //     setTimeout(() => {
    //       location.reload()
    //     },2500)
    // } )
  // }
  return (
    <div>
      
    </div>
  )
}
