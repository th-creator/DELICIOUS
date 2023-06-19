import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { login } from '../../actions'

export default function Profile() {
  const [info,setInfo] = useState({})
  const [image, setimage] = useState({})
  const [pwd,setPwd] = useState({password:"",password_confirmation:""})
  const [showInfo,setShowInfo] = useState(false)
  const auth = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const getUser = async () => {
    if(localStorage.getItem('access_token')) {
      axios.get("http://127.0.0.1:8000/api/user",{
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
          }
      })
        .then((res) => {
          console.log(res);
          dispatch(login({firstName:res.data[0].firstName,lastName:res.data[0].lastName,email:res.data[0].email,path:res.data[0].path,roles:res.data[0].roles,id:res.data[0].id}))
        })
        .catch((err) => {
          console.log(err)
        })  
    }
  }
  const handleImage = (file) =>
  {
    console.log(file) 
    setimage({ 
      imagedata: file[0]
    })
    EditImage(file[0])
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setInfo({...info,[name]:value})
  }
  const EditInfo = (e) => {
    e.preventDefault()
    
    axios.post("/api/user/infoHandler",info,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      }).then(res => {console.log(res)
        setShowInfo(false)})
      .catch(err => {if(err.response.data) setAddErrors(err.response.data.errors)})
      setimage({})
      getUser()
  }
  const EditImage = (file) => {
    // e.preventDefault()
    const fd = new FormData();
    fd.append('img', file);
    
    axios.post("/api/user/imageHandler",fd,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      }).then(res => console.log(res))
      .catch(err => console.log(err))
      setimage({})
      getUser()
  }
  const Editpwd = (e) => {
    e.preventDefault()
    
    axios.post("/api/user/passwordHandler",pwd,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      }).then(res => console.log(res))
      .catch(err => {if(err.response.data) setAddErrors(err.response.data.errors)})
      setPwd({password:"",password_confirmation:""})
      getUser()
  }

  useEffect(() => {
    auth && setInfo({email: auth.email, firstName: auth.firstName, lastName: auth.lastName})
  }, [auth])
  return (
    <Container>
      {auth && <div className="wrapper">
        <div className="holder-wrapper">
          <form onSubmit={(e) => EditImage()} className='inp-wrapper'>
            <div className="inp-form">
              <div className='flex'>
                <img src={`/storage/profile/${auth.path}`} alt="" className='img' />
                <p className='roles'>
                  <strong>{ auth.firstName + ' ' }{auth.lastName && auth.lastName}</strong><br />
                  {auth.roles.map(role => (<span>{role.name}</span>))}
                </p>
              </div>
              <div className='btn-wrapper'>
                <input id='image' onChange={ (e) => handleImage(e.target.files) } type="file" hidden/>
                <label for="image" className='btn' onChange={ (e) => handleImage(e.target.files) } type="file">Edit</label>
              </div>
            </div>
          </form>  
        </div>
        <div className="holder-wrapper">
          <h1>Personnal Information</h1> 
          <div className='btn-holder'>
            {!showInfo ?
              <button onClick={() => setShowInfo(true)} className='btn'>Edit</button>
              :
              <button className='btn' type='submit' onClick={(e) => EditInfo(e)}>Save</button>
            }
          </div>  
          <form onSubmit={(e) => EditInfo(e)} className="info flex">
            <div className="flex wrap">
              <div className='inp-wrapper'>
                <h2>First Name</h2>
                {!showInfo ?
                  <strong>{ auth.firstName }</strong>
                  :
                  <input value={info.firstName} onChange={onChange} className='inp-info' placeholder='First Name' type="text" name="firstName" id="" />
                }
              </div>
              <div className='inp-wrapper wrap'>
                <h2>Last Name</h2>
                {!showInfo ? 
                  <strong>{auth.lastName}</strong>
                  :
                  <input value={info.lastName} onChange={onChange} className='inp-info' placeholder='Last Name' type="text" name="lastName" id="" />
                }
              </div>
              <div className='inp-wrapper wrap'>
                <h2>Email Adress</h2>
                {!showInfo ?
                  <strong>{auth.email}</strong>
                  :
                  <input value={info.email} onChange={onChange} className='inp-info' placeholder='Email' type="email" name="email" id="" />
                }
              </div>  
            </div>          
          </form>
        </div>
        <div className='holder-wrapper flex'>
          <form onSubmit={e => Editpwd(e)} className="pwd">
            <h1>Change Password</h1>
            <div className='flex'>
              <div className='inp-wrapper'>
                <h2>New Password</h2>
                <input className='inp' type="password" onChange={e => setPwd({...pwd,password: e.target.value})} value={pwd.password} name="password" id="" />
              </div>
              <div className='inp-wrapper'>
                <h2>Confirm Password</h2>
                <input className='inp' type="password" onChange={e => setPwd({...pwd,password_confirmation: e.target.value})} value={pwd.password_confirmation} name="password_confirmation" id="" />
              </div>
            </div>
            
          </form>
              <div className='btn-wrapper'>
                  <button className='btn' type='submit' onClick={(e) => Editpwd(e)}>Save</button>
              </div>
        </div>
      </div>}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  .wrapper {
    width: 100%;
    height: auto;
    border: 1px solid #E8F0FF;
    padding: 30px 30px 0;
    border-radius: 30px;
    background: whitesmoke;
    background: white;
  box-shadow: 15px 15px 30px #bebebe,
             -15px -15px 30px #ffffff;
  }
  .holder-wrapper {
    border: 1px solid #c9c6c6;
    border-radius: 20px;
    padding: 20px 30px;
    margin-bottom: 30px;
    position: relative;
    background: white;
    justify-content: space-between;
  }
  .holder-wrapper:hover {
    border: var(--border-hover);
  }
  .holder-wrapper h1 {
    font-size: 1.7em;
    margin: 0;
  }
  .btn {
    color: #666666;
    background: transparent;
    padding: 7px 25px;
    border: 2px solid #c9c6c6;
    border-radius: 20px;
    cursor: pointer;
    font-size: 15px;
  }
  .btn:hover {
    opacity: .7;
  }
  .btn-wrapper {
    display: flex;
    align-items: center;
  }
  .btn-holder {
    position: absolute;
    right: 30px;
    top: 50px;
  }
  .roles {
    display: block;
    font-size: 20px;
    padding: 5px 25px;
  }
  .roles strong {
    font-size: 22px;
    line-height: 40px;
  }
  .roles span{
    display: block;
    color: #666666;
}

  }
  .flex {
    display: flex;
  }
  .inp-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .inp-wrapper  h2{
    font-size: 18px;
    color: #6a6767;
    font-weight: 500;
  }
  .inp-wrapper  h2{
    font-weight: 900;
    font-size: 17px;
  }
  .inp-info {
    padding-block: 20px;
    padding-left: 10px;
    border: none;
    border-bottom: 1px solid black;
    width: 70%;
    font-size: 16px;
  }
  .inp-info:focus {
    border: none;
    border-bottom: 1px solid black;
  }
  .wrap {    
    flex-wrap: wrap;
  }
  .wrap div {
    width: 28rem;  
  }
  .inp {
    margin: 5px;
    border: 1px solid #c9c6c6;
    border-radius: 10px;
    background-color: white;
    height: 45px;
    width: 20rem;
    padding-left: 16px;
  }
  .inp-form{
    display: flex;
    justify-content: space-between;
  }
  .img {
    border-radius: 50%;
    width: 130px;
    height: 130px;
    cursor:pointer;
    display: inline;
  }
  
  .center {
    display: grid;
    place-items: center;
  }
`