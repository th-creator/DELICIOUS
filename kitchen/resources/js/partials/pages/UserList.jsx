import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Paginater from '../components/Paginater'
import {AiOutlineClose} from "react-icons/ai"
import Pagination from '../components/Pagination'

export default function UserList() {
  const [users, setUsers] = useState(0)
  const [visibles, setVisibles] = useState(0)
  const [search, setSearch] = useState(0)
  // const [currentPage, setCurrentPage] = useState(0)
  // const [pageSize, setPageSize] = useState(5)
  // const [visibleUsers, setVisibleUsers] = useState([])
  // const [usersShowen, setUsersShowen] = useState([])
  const [roles, setRoles] = useState([])
  const [chosenRoles, setChosenRoles] = useState([])
  const [editModel, setEditModel] = useState(false)
  const [addModel, setAddModel] = useState(false)
  const [editUser, setEditUser] = useState({})
  const [addUser, setAddUser] = useState({})
  const [checkedUsers, setCheckedUsers] = useState(false)
  const [editPass, setEditPass] = useState(false)
  const [editErrors, setEditErrors] = useState({})
  const [addErrors, setAddErrors] = useState({})
  const auth = useSelector(state => state.userReducer)
  var data = []
  const getUsers = () => {
    axios.get(`/api/users`,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(res => {
      console.log(res.data.Users);
      setUsers(res.data.Users)
      data = res.data.Users 
      // updateVisibleUsers()
      // setVisibleUsers(res.data.Users.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize))
      // setUsersShowen(res.data.Users.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize))
    }).catch(err => console.log(err))
    
  }

  // const updatePage = (pageNumber) => {
  //   setCurrentPage(pageNumber)
  //   updateVisibleUsers();
  // }
  // const updateVisibleUsers = () => {
  //   setVisibleUsers(users.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize)) ;
  //   setUsersShowen(users.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize))
  //   // if we have 0 visible todos, go back a page
  //   if (visibleUsers.length == 0 && currentPage > 0) {
  //     updatePage(currentPage -1);
  //   }
  // }
  // const pageSizeHandler = (size) => {
  //   setPageSize(size)
  //   updateVisibleUsers()
  // }

  const [currentPage,setCurrentPage] = useState(1)
  const [postsPerPage,setPostsPerPage] = useState(5)

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  if (users.length > 0) {
    var currentPosts = users.slice(firstPostIndex,lastPostIndex)
  }

  const toggleActive = async (active, user) => {
    const token = localStorage.getItem("access_token");
    user.active = true
    active == true ? user.active = false : user.active = true

    await axios.put(`/api/users/active/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => console.log(res)).catch(err => console.log(err))
      setUsers(users.map(utilisateur => (utilisateur.id === user.id ? ({...utilisateur ,active: user.active}) : ({...utilisateur}))))
  }

  const deleteUser = async (id) => {
    const token = localStorage.getItem("access_token");
    await axios.delete(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setUsersShowen(users.filter(utilisateur => (utilisateur.id ==! id)))
  }

  const searchUsers = (e) => {
    setSearch(users.filter(user => {
      if (user.firstName.toLowerCase().match(e.target.value) || user.lastName.toLowerCase().match(e.target.value) || user.email.toLowerCase().match(e.target.value) ) {
        return user;
      }
    }))
    if (e.target.value  == "") {
      // setUsersShowen(visibleUsers)
      // currentPosts = users.slice(firstPostIndex,lastPostIndex)
      setSearch(false)
    } 
    console.log(currentPosts);
  }

  const handleChange = (e) => {
    setEditUser(prev => ({...prev,[e.target.name]:e.target.value}))
  }
  const change = (e) => {
    setAddUser(prev => ({...prev,[e.target.name]:e.target.value}))
  }

  const toggleEdit= (user) => {
    user.roles.length > 0 && setChosenRoles(user.roles.map(per => per.id))
    setEditUser(user)
    setEditModel(!editModel)
    console.log(user);
  }

  const out = () => {
    setEditModel(false)
    setAddModel(false)
    setAddUser({firstName:'',lastName:'',email:'',password:'',password_confirmation:'',roles:[]})
    setAddErrors({})
    setEditErrors({})
    setEditPass(false)
    setChosenRoles([])
  }
  const getRoles = async () => {
    const token = localStorage.getItem("access_token");
    await axios.get(`/api/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => (setRoles(res.data.roles)))
  }
  
  const toggleRole = (id) => { 
    var flag = false
    console.log("roles ",chosenRoles,"id ",id,"status",chosenRoles.filter(role => role == id));
    chosenRoles.map(role => (role == id && (flag = true)))
    //  ?  : 
    if (flag) {
      setChosenRoles(chosenRoles.filter(role => (role =! id)))
    } else {setChosenRoles(prev => ([...prev,id]))}
    flag = false
  }
  const Edit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("access_token");
    editUser['roles'] = chosenRoles
    console.log(editUser);
    await axios.put(`/api/users/${editUser.id}`,editUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
              out()
            })
            .catch(err => setEditErrors(err.response.data.errors))
    getUsers()
  }
  const add = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("access_token");
    addUser['roles'] = chosenRoles
    console.log(addUser);
    await axios.post(`/api/users`,addUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
              out()
            })
            .catch(err => console.log(err.response.data.errors))
    getUsers()
  }

  useEffect(() => {
    auth && getUsers()
    getRoles()
  },[auth])
  // useEffect(() => {
  //   setVisibles(currentPosts)
  // },[currentPosts])

  return (
    <List>
      <div className={editModel ? "list-cont darken" : "list-cont"} >
        {/* {!showPopup && <h1>Users</h1>} */}
        <div className='btn-add-wrapper'>
          <Button type='button' onClick={() => setAddModel(true)}>Add User</Button>
        </div>
        {/* <CreateUser cancelShow={cancelShow} showPopup={showPopup}></CreateUser> */}
        <br/><div>
        {/* {!showPopup && */}
        <> 
          <div className="search-cont">
            <i className="fa fa-search"></i>
            <input type="text" onKeyUp={searchUsers} className="search" name="" id="" placeholder="Search for user,email address... "/><br/>
          </div>
        </>
        {/* } */}
        <div className="container">
          <div className="table">
            <div className="table-content">	{
              search ? search.map(user => (
                <div key={user.id} className="table-row">
                    <div className="table-data"><img className="img" src={'/storage/profile/'+user.path} alt=""/></div>
                    <div className="table-data">{ user.firstName + ' ' }{user.lastName && user.lastName} </div>
                    <div className="table-data">{ user.email }</div>
                    {user.roles.length > 0 ? <div className="table-data" >{ user.roles[0].name }</div>
                    :
                    <div className="table-data" >user</div>}
                    <div className="table-data">
                      <input type="checkbox" onChange={() => toggleActive(user.active,user)} name="" value={user.active} id={user.id} className="active-input"/>
                      { user.active == true ? <label  htmlFor={user.id} className="active-label">  
                        <i className="fa fa-circle" id="green"></i> Active
                      </label>
                      :
                      <label htmlFor={user.id} className="off-label">
                        <i className="fa fa-circle" id="red"></i> Inactive
                      </label>}
  
                    </div>
                    <div className="table-data" id="icons">
                      <button onClick={() => deleteUser(user.id)} >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_12_59)">
                            <path d="M5.50627 1.25L3.24377 3.51875M9.49377 1.25L11.7563 3.51875" stroke="#1E1E1E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1.25 4.90625C1.25 3.75 1.86875 3.65625 2.6375 3.65625H12.3625C13.1313 3.65625 13.75 3.75 13.75 4.90625C13.75 6.25 13.1313 6.15625 12.3625 6.15625H2.6375C1.86875 6.15625 1.25 6.25 1.25 4.90625Z" stroke="#1E1E1E" strokeWidth="1.5"/>
                            <path d="M6.1 8.75V10.9687M8.975 8.75V10.9687M2.1875 6.25L3.06875 11.65C3.26875 12.8625 3.75 13.75 5.5375 13.75H9.30625C11.25 13.75 11.5375 12.9 11.7625 11.725L12.8125 6.25" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_12_59">
                            <rect width="15" height="15" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                      </button>
                      <button type='button' className='btn' onClick={() => toggleEdit(user)}> 
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_12_55)">
                          <path d="M6.875 1.25H5.625C2.5 1.25 1.25 2.5 1.25 5.625V9.375C1.25 12.5 2.5 13.75 5.625 13.75H9.375C12.5 13.75 13.75 12.5 13.75 9.375V8.125" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10.025 1.88754L5.09999 6.81254C4.91249 7.00004 4.72499 7.36879 4.68749 7.63754L4.41874 9.51879C4.31874 10.2 4.79999 10.675 5.48124 10.5813L7.36249 10.3125C7.62499 10.275 7.99374 10.0875 8.18749 9.90004L13.1125 4.97504C13.9625 4.12504 14.3625 3.13754 13.1125 1.88754C11.8625 0.637536 10.875 1.03754 10.025 1.88754Z" stroke="#1E1E1E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9.31873 2.59375C9.52597 3.32967 9.91871 4.00004 10.4593 4.54065C10.9999 5.08127 11.6703 5.47401 12.4062 5.68125" stroke="#1E1E1E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_12_55">
                          <rect width="15" height="15" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg>
                      </button>
                    </div>
                  </div>))
                  :
              <>{currentPosts && currentPosts.map(user => (
              <div key={user.id} className="table-row">		
                  <div className="table-data"><img className="img" src={'/storage/profile/'+user.path} alt=""/></div>
                  <div className="table-data">{ user.firstName + ' ' }{user.lastName && user.lastName} </div>
                  <div className="table-data">{ user.email }</div>
                  {user.roles.length > 0 ? <div className="table-data" >{ user.roles[0].name }</div>
                  :
                  <div className="table-data" >user</div>}
                  <div className="table-data">
                    <input type="checkbox" onChange={() => toggleActive(user.active,user)} name="" value={user.active} id={user.id} className="active-input"/>
                    { user.active == true ? <label  htmlFor={user.id} className="active-label">  
                      <i className="fa fa-circle" id="green"></i> Active
                    </label>
                    :
                    <label htmlFor={user.id} className="off-label">
                      <i className="fa fa-circle" id="red"></i> Inactive
                    </label>}

                  </div>
                  <div className="table-data" id="icons">
                    <button onClick={() => deleteUser(user.id)} >
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_12_59)">
                          <path d="M5.50627 1.25L3.24377 3.51875M9.49377 1.25L11.7563 3.51875" stroke="#1E1E1E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M1.25 4.90625C1.25 3.75 1.86875 3.65625 2.6375 3.65625H12.3625C13.1313 3.65625 13.75 3.75 13.75 4.90625C13.75 6.25 13.1313 6.15625 12.3625 6.15625H2.6375C1.86875 6.15625 1.25 6.25 1.25 4.90625Z" stroke="#1E1E1E" strokeWidth="1.5"/>
                          <path d="M6.1 8.75V10.9687M8.975 8.75V10.9687M2.1875 6.25L3.06875 11.65C3.26875 12.8625 3.75 13.75 5.5375 13.75H9.30625C11.25 13.75 11.5375 12.9 11.7625 11.725L12.8125 6.25" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_12_59">
                          <rect width="15" height="15" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg>
                    </button>
                    <button type='button' className='btn' onClick={() => toggleEdit(user)}> 
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_12_55)">
                        <path d="M6.875 1.25H5.625C2.5 1.25 1.25 2.5 1.25 5.625V9.375C1.25 12.5 2.5 13.75 5.625 13.75H9.375C12.5 13.75 13.75 12.5 13.75 9.375V8.125" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.025 1.88754L5.09999 6.81254C4.91249 7.00004 4.72499 7.36879 4.68749 7.63754L4.41874 9.51879C4.31874 10.2 4.79999 10.675 5.48124 10.5813L7.36249 10.3125C7.62499 10.275 7.99374 10.0875 8.18749 9.90004L13.1125 4.97504C13.9625 4.12504 14.3625 3.13754 13.1125 1.88754C11.8625 0.637536 10.875 1.03754 10.025 1.88754Z" stroke="#1E1E1E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.31873 2.59375C9.52597 3.32967 9.91871 4.00004 10.4593 4.54065C10.9999 5.08127 11.6703 5.47401 12.4062 5.68125" stroke="#1E1E1E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_12_55">
                        <rect width="15" height="15" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </button>
                  </div>
                </div>))}</>}
              
            </div>	
          </div>
        </div>
        {/* <Paginater
            datas={users}
            update={updatePage}
            currentPage={currentPage}
            pageSize={pageSize}
            pageSizeHandler={pageSizeHandler}
            >
        </Paginater>  */}
        <Pagination totalPosts={users.length} 
      setCurrentPage={setCurrentPage} currentPage={currentPage} postsPerPage={postsPerPage} />
      </div>
      </div>
      {editModel && <Container className="editModel">
        <form onSubmit={Edit} className="wrapper">
          <span className='out' onClick={out}><AiOutlineClose/></span>
          <h4 className='title'>Edit User</h4>
          <div className='inp-wrapper-name'>
            <div className='column'>
              <label className='label' htmlFor="">First Name</label>
              <input className='inp-name' value={editUser.firstName} onChange={handleChange} type="text" name="firstName" id="" />
              {editErrors.firstName && <span className='err'>{editErrors.firstName}</span>}
            </div>
            <div className='column'>
              <label className='label' htmlFor="">Last Name</label>
              <input className='inp-name' value={editUser.lastName && editUser.lastName} onChange={handleChange} type="text" name="lastName" id="" />
              {editErrors.lastName && <span className='err'>{editErrors.lastName}</span>}
            </div>
          </div>
          <div className='inp-wrapper'>
            <label className='label' htmlFor="">Email</label>
            <input className='inp' value={editUser.email} type="email" onChange={handleChange}  name="email" id="" />
            {editErrors.email && <span className='err'>{editErrors.email}</span>}
            </div>
          <div className='inp-wrapper'>
            <label className='label' htmlFor="">Roles</label>
            <div className="Roles">
              {roles.map(p => (<div key={p.id} className="Role">
                  <input type="checkbox" name="beer" id={"role"+p.id} value={p.id} onClick={() => toggleRole(p.id)} className="check" hidden/>
                  {chosenRoles.filter(role => role == p.id) == false ? 
                    <label htmlFor={"role"+p.id}>{p.name}</label>
                    :
                    <label className="mystyle" htmlFor={"role"+p.id}>{p.name}</label>}
              </div>)) }   
            </div>
            
          </div>
          {editPass ? <div className='inp-wrapper-name'>
            <div className='column'>
              <label className='label' htmlFor="">Password</label>
              <input className='inp-name' value={editUser.password} onChange={handleChange} type="password" name="password" id="" />
              {editErrors.password && <span className='err'>{editErrors.password}</span>}
            </div>
            <div className='column'>
              <label className='label' htmlFor="">Confirm Password</label>
              <input className='inp-name' value={editUser.password_confirmation} onChange={handleChange} type="password" name="password_confirmation" id="" />
              {editErrors.password_confirmation && <span className='err'>{editErrors.password_confirmation}</span>}
            </div>
          </div>
          : 
          <div className='inp-wrapper'>
            <button type='button' onClick={() => setEditPass(true)} className='btn'>Change Password</button>
          </div>}
          <div className='inp-wrapper'>
            <button className='btn'>Edit</button>
          </div>
        </form>
      </Container>}
      {addModel && <Container className="editModel">
        <form onSubmit={add} className="wrapper">
          <span className='out' onClick={out}><AiOutlineClose/></span>
          <h4 className='title'>Add User</h4>
          <div className='inp-wrapper-name'>
            <div className='column'>
              <label className='label' htmlFor="">First Name</label>
              <input className='inp-name' value={addUser.firstName} onChange={change} type="text" name="firstName" id="" />
              {addErrors.firstName && <span className='err'>{addErrors.firstName}</span>}
            </div>
            <div className='column'>
              <label className='label' htmlFor="">Last Name</label>
              <input className='inp-name' value={addUser.lastName && addUser.lastName} onChange={change} type="text" name="lastName" id="" />
              {addErrors.lastName && <span className='err'>{addErrors.lastName}</span>}
            </div>
          </div>
          <div className='inp-wrapper'>
            <label className='label' htmlFor="">Email</label>
            <input className='inp' value={addUser.email} type="email" onChange={change}  name="email" id="" />
            {addErrors.email && <span className='err'>{addErrors.email}</span>}
          </div>
          <div className='inp-wrapper-name'>
            <div className='column'>
              <label className='label' htmlFor="">Password</label>
              <input className='inp-name' value={addUser.password} onChange={change} type="password" name="password" id="" />
              {addErrors.password && <span className='err'>{addErrors.password}</span>}
            </div>
            <div className='column'>
              <label className='label' htmlFor="">Confirm Password</label>
              <input className='inp-name' value={addUser.password_confirmation} onChange={change} type="password" name="password_confirmation" id="" />
              {addErrors.password_confirmation && <span className='err'>{addErrors.password_confirmation}</span>}
            </div>
          </div>
          <div className='inp-wrapper'>
            <label className='label' htmlFor="">Roles</label>
            <div className="Roles">
              {roles.map(p => (<div key={p.id} className="Role">
                  <input type="checkbox" name="beer" id={"role"+p.id} value={p.id} onClick={() => toggleRole(p.id)} className="check" hidden/>
                  {chosenRoles.filter(role => role == p.id) == false ? 
                    <label htmlFor={"role"+p.id}>{p.name}</label>
                    :
                    <label className="mystyle" htmlFor={"role"+p.id}>{p.name}</label>}
              </div>)) }   
            </div>
          </div>
          <div className='inp-wrapper'>
            <button className='btn'>Add</button>
          </div>
        </form>
      </Container>}
    </List>
  )
}

const List = styled.div`
position: relative;
margin: 50px 30px;
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700");
.active-input{
  display: none;
}
.btn-add-wrapper {
  display: flex;
  justify-content: end;
}
.active-label{
  border: 2px black solid;
  padding: 5px;
  border-radius: 15px;
  cursor: pointer;
}
.off-label{
  cursor: pointer;
}
#red{
  color: red;
}
#green{
  color: green;
}
.list-cont{
  display: flex;
  flex-direction: column;
  width: 90%;
  height: auto;
  margin-inline: 5%
}
.users-selected{
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0px 20px;
}
.users-selected button{
  position: relative;
  right: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

.img {
  width: 40px;
  height: 40px;
  border-radius: 25px;
}
.search-cont{
  background: rgba(217, 217, 217, 0.5);
  border-radius: 19px;
  color: rgba(217, 217, 217, 0.5);
  padding: 7px 10px;
  margin-block: 10px;
}
.search-cont i{
  font-size: 22px;
  margin: 5px 0px 0px 5px;
  color: gray;
}
.search{
  width: 80%;
  padding: 6px;
  border: none;
  /* margin-top: 8px;
  margin-right: 16px; */
  margin: 10px 0px 10px 5px;
  font-size: 17px;
  background: none;
  /* border-radius: 19px; */
  /* height: 70px; */
  /* color: rgba(217, 217, 217, 0.5); */
}
.search:focus{
  border: none;
  outline: none;
}

.delete{
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

.container {
  max-width: 100%;
  /* max-width: 1000px; */
  /* margin-right: auto;
  margin-left: auto; */
  /* display: flex; */
  justify-content: center;
  align-items: center;
  height: auto;
  /* min-height: 100vh; */
}

.wrapper {
  display: flex;
  flex-direction: column;
}

.table {
  width: 100%;
  border: 1px solid #eeeeee;
}

.table-header {
  display: flex;
  width: 100%;
  background: #000;
  padding: 18px 0;
}

.table-row {
  display: flex;
  width: 100%;
  // height: 30px;
  padding: 18px 0;
}
.table-row:nth-of-type(odd) {
  background: white;
}

#icons{
  background-color: #e3e1e0;
  border-radius: 9px;
  display: flex;
  justify-content: space-around;
  height: 40px;
}
#icons a{
  color: #000;
  padding-top: 10px;
  cursor: pointer;
  text-decoration: none;
  font-family: ui-sans-serif;
}
#icons button{
  background: none;
  border: none;
  cursor: pointer;
  font-family: ui-sans-serif;
}
.chk:checked {
  background: #DD682C;
  color: white;
}

.chk {
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  background: lightgray;
  height: 16px;
  width: 16px;
  border: 1px solid white;
  color: white;
  margin-top: 8px;
}

.chk:after {
  content: ' ';
  position: relative;
  left: 40%;
  top: 20%;
  width: 15%;
  height: 40%;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(50deg);
  display: none;
}

.chk:checked:after {
  display: block;
}
.table-data,
.header__item {
  flex: 1 1 20%;
  text-align: center;
  padding-top: 10px;
}
.table-data:last-child {
  flex: 1 1 20%;
  text-align: center;
  padding-top: 0;
}
`
const Container = styled.section`
  display: flex;
  justify-content: center;
  box-shadow: 0 0 0 9999px #000000b0;
  position: absolute;
  width: 70%;
  height: auto;
  left: 0;
  right: 0;
  margin: auto;
  top: 150px;
  .title {
    text-align: center;
    font-size: 2rem;
    font-family: monospace;
    margin-block: 10px 45px;
  }
  .wrapper {
    width: 100%;
    height: auto;
    border: 1px solid #E8F0FF;
    padding: 30px;
    border-radius: 30px;
    // background: #E8F0FF;
    background: white;
    postion: relative;
  }
  .out {
    position: absolute;
    right: 42px;
    font-size: x-large;
    cursor: pointer;
  }
  .inp-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .inp-wrapper-name {
    display: flex;
    flex-direction: row;
  }
  .column {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .inp , .inp-name{
    border: 1px solid #979797;
    border-radius: 10px;
    background-color: white;
    height: 46px;
    padding-left: 12px;
    margin: 20px 5px 5px;
  }
  .label {
    font-size: 20px;
    padding-left: 7px;
    font-family: Inter;
    font-weight: 600;
    margin-top: 15px;
  }
  .btn {
    margin: 15px 5px 5px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #313131;
    color: white;
    height: 50px;
    font-size: 21px;
    cursor: pointer;
  }
  .btn:hover {
    opacity: .9;
  }
  .img {
    border-radius: 50%;
    width: 130px;
    height: 130px;
    cursor:pointer;
  }
  .img::hover::after {
    content: "hhey";
  }
  
  .center {
    display: grid;
    place-items: center;
  }
  .Roles{
    display: flex;
    margin: 30px 0px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
.Role label{
  opacity: 1;
  border: 2px solid #313131;
  border-radius: 26px;
  text-align: center;
  width: 100px;
  padding: 10px 20px;
  margin: 20px 10px; 
  cursor: pointer;
}
.mystyle {
  background-color: #313131;
  color: whitesmoke;
}
.err {
  color: red;
  padding-left: 10px;
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