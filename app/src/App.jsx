import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";

export const Base_Url="http://localhost:9000";
function App()
{
  const [data,setdata]=useState(null);
  const [err,seterr]=useState(null);
  const [loading,setload]=useState(false);
  const [filterdata,setfilterdata]=useState(null);
  const [button,setbutton]=useState(null);
  
  useEffect(()=>{
    async function fetchfooddata(){
      setload(true)
      try {
        const val=await fetch(Base_Url);
        const json=await val.json();
        setdata(json);
        setfilterdata(json);
        setload(false);
        
      } catch (error) {
        seterr("Unable to fetch Data");
      }
    }
    fetchfooddata();
  },[]);
 
  if(err) return <div>{err}</div>;
  if(loading) return <div>Loading....</div>;

  function buttonfn(type)
  {
    if(type==="all"){
      setfilterdata(data);
      setbutton("all");
      return;
    }
    
    const a=data?.filter((food)=>food.type.toLowerCase().includes(type.toLowerCase()));
    setfilterdata(a);
    setbutton(type);
  }

  function filterfn(e)
  {
    const val=e.target.value;
    if(val==="") setfilterdata(null);
    const a=data?.filter((food)=>(
      food.name.toLowerCase().includes(val.toLowerCase())
    )
    );
    setfilterdata(a);
  }
  const btns=[
    {
      Name:"All",
      type:"all"
    },
    {
      Name:"Breakfast",
      type:"breakfast"
    },
    {
      Name:"Lunch",
      type:"lunch"
    },
    {
      Name:"Dinner",
      type:"dinner"
    },
  ]

  return(
    <MainContainer>
    <Topcontainer>
    <div className="logo">
        <img src="/public/logo.svg" alt="logo image" />
      </div>
      <div className="search">
        <input onChange={filterfn} type="text" placeholder="Search Food...." />
      </div>
    </Topcontainer>
    <Filter>
    {
      btns.map((val)=>(
        <Button isselected={button===val.type} key={val.Name} onClick={()=>buttonfn(val.type)}>{val.Name}</Button>
      ))
    }
    </Filter>
    <SearchResult data={filterdata}/>
    </MainContainer>
  )
}

const MainContainer=styled.div`
  margin: 0 auto;
`
const Topcontainer=styled.div`
display: flex;
justify-content: space-between;
padding: 16px 80px;
min-height: 140px;
align-items: center;

.logo{
  img{
    min-height: 45px;
  }
}
.search{
  input{
    background: transparent;
  border: 1px solid red;
  padding: 0 10;
  color: white;
  border-radius: 5px;
  height: 40px;
  font-size: 16px;
  &::placeholder{
  color: white;
}
  }
}
@media (0<width<700px) {
  flex-direction: column;
}
`
const Filter=styled.div`
display: flex;
  justify-content: center;
  gap: 20px;
  padding-bottom: 40px;
`
export const Button=styled.button`
background-color: ${({isselected})=>(isselected ? "#f22f2f":"#ff4343")};
outline: 1px solid ${({isselected})=>(isselected ? "white":"none")};
border-radius: 5px;
border:none;
padding: 6px 12px;
color: white;
cursor: pointer;
&:hover{
  background-color: white;
  color: black;
}
`
export default App;