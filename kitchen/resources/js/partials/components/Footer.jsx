import React from 'react'
import styled from 'styled-components'
import {IoIosCall} from "react-icons/io" 
import {MdEmail} from "react-icons/md"
import {FaFacebookF} from "react-icons/fa"
import {BsPinterest} from "react-icons/bs"
import {AiOutlineTwitter,AiOutlineInstagram,AiFillLinkedin} from "react-icons/ai"

export default function Footer() {
  return (
    <Foot id='about'>
      <div className="footer">
        <Diviser/>
        <div className="box-container">
          <div className="boxing change">
            <img src="../images/my_pic1.jpg" alt=""/>
            <h3>Oussama Itou</h3>
            <p>WEB FULL-STACK DEVELOPER</p>
          </div>
          <div className="box change">
            <h3>Cantact Me</h3>
            <a target={"_blank"} href="https://api.whatsapp.com/send?phone=212629011540">
               <span><IoIosCall/></span> 212-629-011-540 </a>
            <a href="mailto: ouss.itou1@gmail.com"> <span><MdEmail/></span> ouss.itou1@gmail.com </a>
          </div>
            
        </div>

        {/* <div className="share">
          <a href="#" className="share-icon"><FaFacebookF/></a>
          <a href="#" className="share-icon"><AiOutlineTwitter/></a>
          <a href="#" className="share-icon"><AiOutlineInstagram/></a>
          <a href="#" className="share-icon"><AiFillLinkedin/></a>
          <a href="#" className="share-icon"><BsPinterest/></a>
        </div> */}

        <div className="credit"> created by <span>Th-Creator</span> | all rights reserved! </div>
      </div>
</Foot>
  )
}

const Foot = styled.section`
.footer {
  /* border-top: var(--border); */
  padding-inline: 2rem ;
  // background-color: #fff;
}

.footer .box-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap:1.5rem;
  justify-content: space-around;
}

.footer .box-container .box h3{
  /* font-size: 2.2rem; */
  color:var(--black);
  padding:1rem 0;
}

.footer .box-container .box a{
  text-decoration: none;
  display: block;
  color:var(--light-color);
  padding:1rem 0;
  font-size: 1.35rem;
}

.footer .box-container .box a i{
  color:var(--black);
  padding-right: .5rem;
}

.footer .box-container .box h3{
  color:var(--black);
  font-size: 2.8rem;
}

.footer .box-container .box a:hover i{
  padding-right: 2rem;
}

.footer .box-container .box .map{
  width:100%;
}

.footer .share{
  padding:1rem 0;
  text-align: center;
}

.footer .share a{
  text-decoration: none;
  height: 3rem;
  width: 3rem;
  padding: 1rem 1rem 0.5rem;
  font-size: 2rem;
  color:#fff;
  background:var(--light-color);
  margin:0 .3rem;
  border-radius: 50%; 
}

.footer .share a:hover{
  background:var(--black);
}

.footer .credit{
  border-top: var(--border);
  /* margin-top: 2rem; */
  padding:0 1rem;
  padding-top: 2.5rem;
  font-size: 1.5rem;
  color:var(--light-color);
  text-align: center;
}

.footer .credit span{
  color:var(--black);
}

.boxing , 
.box{
  border:var(--border);
  padding:2rem;
  text-align: center;
  margin:2rem 0;
}

.boxing:hover,
.box:hover {
  border:var(--border-hover);
}

.boxing img{
  height:7rem;
  width:7rem;
  border-radius: 50%;
  object-fit: cover;
}

.boxing h3{
  color:var(--black);
  font-size: large;
  // padding:.5rem 0;
}

.boxing p{
  color:var(--light-color);
  font-size: 1.4rem;
  // padding:1rem 0;
  // line-height: 2;
}
` 
const Diviser = styled.div`
  border-top: var(--border);
  margin-top: 2rem;
  padding:0 1rem;
  padding-top: 2.5rem;
`