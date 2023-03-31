import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Recipees from "../recipes.json";

import React from 'react'

export default function Recipe() {
    let params = useParams()
    const [details,setDetails] = useState({})
    const [activeTab, setActiveTab] = useState("instructions")

    const fetchDetails = async () => {
        // const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        // const detailData = await data.json()
        // console.log(detailData)
        // setDetails(detailData)
        // var data = Recipees.filter(item => (item.id.toString() == params.name))
        for(let i=0; i<Recipees.length; i++) {
            if(Recipees[i].id == params.name) {
                var data = Recipees[i];
                break
            }
        }
        setDetails(data)
        console.log(details)
    }
    useEffect(() => {
        fetchDetails()
    },[params.name])
    
  return (
    <DetailWrapper>
        <div className="left">
            <h2>{details.title}</h2>
            <img width={"300px"} src={details.image} alt="" />
        </div>    
        <Info>
            <Button className={activeTab === 'instructions' ? "active" : ""} onClick={() => setActiveTab("instructions")}>Instructions</Button>
            <Button className={activeTab === 'ingradients' ? "active" : ""} onClick={() => setActiveTab("ingradients")}>Ingradients</Button>
            {activeTab === 'instructions' ? 
            <div>
                <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
            </div> :
            <ul>
                {details.extendedIngredients.map((ingredient) => {return <li key={ingredient.id}>{ingredient.original}</li>})}
            </ul>
        } 
        </Info>
    </DetailWrapper>
  )
}
const DetailWrapper = styled.div`
    margin-top:7rem;
    margin-bottom: 5rem;
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .left {
        width: 17rem;
        margin-bottom: 2rem;
    }
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2 {
        margin-bottom: 2rem;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: 2rem;
    }
`
const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    cursor: pointer;
`
const Info = styled.div`
    margin-left: 6rem;
    min-width: 30rem;
    max-width: 30rem;
`