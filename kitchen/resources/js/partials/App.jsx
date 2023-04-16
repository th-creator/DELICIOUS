import Pages from './pages/Pages';
import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { GiKnifeFork, GiShop } from 'react-icons/gi';
import { BiFoodMenu } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { favContext } from './components/Context';
import Category from './components/Category';
import Search from './components/search';
import './index.css';
import axios from 'axios';
import {useSelector, useDispatch} from "react-redux"
import { logout, isAuth, login } from './actions'
import AdminLayout from './components/AdminLayout';

function App() {
  const [favs, setFavs] = useState([])
  const providerValue = useMemo(() => ({favs, setFavs}),[favs,setFavs])
	const navigate = useNavigate()
  const auth = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  
  useEffect(()=> {
    getPage()
    dispatch(isAuth())
    if(localStorage.getItem('access_token')) {
      axios.get("http://127.0.0.1:8000/api/user",{
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
          }
      })
        .then((res) => {
          console.log(res);
          dispatch(login({name:res.data[0].name,email:res.data[0].email,role:res.data[0].roles,id:res.data[0].id}))
        })
        .catch((err) => {
          console.log(err)
        })  
    }
    // auth = useSelector(state => state.userReducer)
    setFavs([])
    axios.get('/api/recipes',{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    })
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
          axios.delete(`/api/recipes/${id}`,{
            headers: {
              Authorization : `Bearer ${localStorage.getItem("access_token")}`
              }
          }).then(res => console.log(res)).catch(err => console.log(err))
          return
        }
      }  
    }
    setFavs([...favs,newId])
    axios.post('/api/recipes/create',{
      meal_id: id
    },{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(res => {
      console.log(res)  
    }).catch(err => console.log(err))
 }
 const signout = () => {
  axios.post("http://127.0.0.1:8000/api/logout",{},{
    headers: {
      Authorization : `Bearer ${localStorage.getItem("access_token")}`
      }
  })
    .then((res) => {
      console.log("here we go again");
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    })
    localStorage.removeItem("access_token")
    localStorage.removeItem("role")
  dispatch(logout()) 
  navigate('/')
}

  const getPage = () => {
    if (localStorage.getItem("switcher")) {
      let val = localStorage.getItem("switcher") == 1 ? true : false
      setSwitcher(val) 
    } else return setSwitcher(true)
  }

  const [switcher, setSwitcher] = useState(true) ;
  const switchPage = () => {
    if (localStorage.getItem("switcher")) {
      let val = localStorage.getItem("switcher") == 0 ? 1 :  0
      localStorage.setItem("switcher",val)
    }else  {localStorage.setItem("switcher",1)} 
    setSwitcher(!switcher)
    navigate(`/Home`); 
  } 

  return (
    <div className="App">
        <NavLog>
        <ul className="layout_nav">
                {auth ? <>
                  <li className="">
                    <Link to="/" className="items"
                        ><i className="fa-solid fa-gear"></i> Manage account</Link>
                </li>
                <li>
                  <button onClick={signout} className='logout'><i className="fa-solid fa-door-closed"></i>Logout</button>
                    {/* <form className="inline">
                        <button className="logout" type="submit">
                            <i className="fa-solid fa-door-closed"></i>Logout
                            </button>
                          </form>     */}
                </li></>
                : <>
                <li>
                    <Link to="/register" className="items"
                        ><i className="fa-solid fa-user-plus"></i> Register</Link>
                </li>
                <li>
                    <Link to="/login" className="items"
                        ><i className="fa-solid fa-arrow-right-to-bracket"></i>
                        Login</Link>
                </li>
                </>}
            </ul>
        </NavLog>
          <Nav>
            <div className='logo-container'>
              <GiKnifeFork />
              <Logo className='headerH' to={"/"}>Delicious</Logo>
            </div>
            <Main onClick={switchPage}>
              {switcher ? <BiFoodMenu /> : <GiShop />} 
            </Main>
            <div className='logo-container'>
              <FaHeart />
              {switcher ? <Logo className='headerH' to={"/Reservation"}> Reservation</Logo> : 
              <Logo className='headerH' to={"/Favorite"}> Favourites</Logo>}
            </div>
          </Nav>
          {!switcher ? <>
            <Search />
            <Category />
          </>
          : 
          <SecNav >
            <ul>
              <li><Link to='/Menu'>Menu</Link></li>  
              <li><Link to="/">Order Online</Link></li>
              <li><Link to="/Cart">Cart</Link></li>  
            </ul>
          </SecNav>}
          {localStorage.getItem("role") && <>{localStorage.getItem("role") == "admin" && <AdminLayout/>}</>}
          <favContext.Provider value={providerValue}>
            <Pages switcher={switcher} toggle={onToggle}/>
          </favContext.Provider>
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
  padding: 2rem 4rem 0;
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
  .logo-container {
    width: 205px ;
  }
`
const SecNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  ul {
    display: flex;
    list-style: none;
  }
  li {
    margin-inline: 10px;
    color: black;
    text-decoration: none;
    font-size: 1.2rem;
    cursor: pointer;
    // border-bottom: 1px solid black;
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
