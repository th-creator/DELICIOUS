import Pages from './pages/Pages';
import {BrowserRouter} from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GiKnifeFork, GiShop } from 'react-icons/gi';
import { BiFoodMenu } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { favContext } from './components/Context';
import Category from './components/Category';
import Search from './components/search';
import './index.css';
import axios from 'axios';

function App() {
  const [favs, setFavs] = useState([])
  const providerValue = useMemo(() => ({favs, setFavs}),[favs,setFavs])
  
  useEffect(()=> {
    setFavs([])
    axios.get('/api/recipes')
        .then(res => {
          var datas = []
          let info = res.data
          info.forEach(e => {
            datas.push(e.recipe_id)
          });

          console.log(datas)
          setFavs(datas)
        })
        .catch(err => console.log(err))
  },[])
  const onToggle = (id) => {
    var newId = id
    if(favs.length != 0) {
      for(let i=0; i<favs.length; i++) {
        if (favs[i] == id) {
          let data = favs.filter((item) => (item !== id))
          setFavs(data)
          axios.delete(`/api/recipes/${id}`,
           {recipe_id: newId}
           )
          return
        }
      }  
    }
    setFavs([...favs,newId])
    axios.post('/api/recipes/create',{
      meal_id: id
    }).then(res => {
      console.log(res)  
    }).catch(err => console.log(err))
 }
  console.log(favs)
  
  const [switcher, setSwitcher] = useState(true) ;

  return (
    <div className="App">
      <BrowserRouter>
        {/* <NavLog>
        <ul className="layout_nav">
                <li className="">
                    <a href="/" className="items"
                        ><i className="fa-solid fa-gear"></i> Manage account</a>
                </li>
                <li>
                    <form className="inline">
                        <button className="logout" type="submit">
                            <i className="fa-solid fa-door-closed"></i>Logout
                        </button>
                    </form>    
                </li>
                <li>
                    <a href="/register" className="items"
                        ><i className="fa-solid fa-user-plus"></i> Register</a>
                </li>
                <li>
                    <a href="/login" className="items"
                        ><i className="fa-solid fa-arrow-right-to-bracket"></i>
                        Login</a>
                </li>
            </ul>
        </NavLog> */}
          <Nav>
            <div>
              <GiKnifeFork />
              <Logo className='headerH' to={"/"}>Delicious</Logo>
            </div>
            <Main onClick={() => setSwitcher(!switcher)}>
              {switcher ? <BiFoodMenu /> : <GiShop />} 
            </Main>
            <div style={{width:"205px"}}>
              <FaHeart />
              {switcher ? <Logo className='headerH' to={"/Favorite"}> Reservation</Logo> : 
              <Logo className='headerH' to={"/Favorite"}> Favourites</Logo>}
            </div>
          </Nav>
          {!switcher && <>
            <Search />
            <Category />
          </>}
          <favContext.Provider value={providerValue}>
            <Pages switcher={switcher} toggle={onToggle}/>
          </favContext.Provider>
        
      </BrowserRouter>
      
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
  margin-inline: 2px;
`
const Nav = styled.div`
  padding: 2rem 4rem 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  justify-content: space-between;
  svg {
    font-size: 2rem;
  }
  .inline{
    display: inline;
  }
`
const Main = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 7rem;
  height: 7rem;
  transform: scale(0.8);
  // h4 {
  //   color: white;
  //   font-size: 1rem;
  // }
  svg {
    color: white;
    font-size: 3.7rem;
  }
  cursor: pointer;
  }
`
const NavLog = styled.nav`
  
.layout_nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-right: 6%; */
  list-style: none;
  }
.items {
  color: black;
  text-decoration: none;
  font-size: 1.2rem;
  cursor: pointer;
}
.welcome {
  font-size: 1.5rem;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.logout {
  border: none;
  background: none;
  color: black;
  font-size: 1.2rem;
  cursor: pointer;
}
`

export default App;
