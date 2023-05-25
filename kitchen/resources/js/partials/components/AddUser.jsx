import React from 'react'
import styled from 'styled-components'

export default function AddUser() {
  return (
    <Container className="editModel">
        <form onSubmit={Edit} className="wrapper">
          <span className='out' onClick={out}><AiOutlineClose/></span>
          {/* <div className="center">
            <div className='inp-wrapper'>
              <img src="/images/cookies.webp" alt="" className='img' />
            </div>  
          </div>
           */}
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
              <input className='inp-name' value={editUser.passsword} onChange={handleChange} type="password" name="password" id="" />
              {editErrors.passsword && <span className='err'>{editErrors.passsword}</span>}
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
      </Container>
  )
}
const Container = styled.section`
  display: flex;
  justify-content: center;
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
    margin: 5px;
    border: 1px solid #979797;
    border-radius: 10px;
    background-color: white;
    height: 46px;
    padding-left: 12px;
    margin: 20px 5px;
  }
  .label {
    font-size: 20px;
    padding-left: 7px;
    font-family: Inter;
    font-weight: 600;
  }
  .btn {
    margin: 5px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #313131;
    color: white;
    height: 50px;
    font-size: 21px;
    cursor: pointer;
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