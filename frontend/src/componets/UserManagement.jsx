import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../api'


export default function UserManagement() {
  const [data,setData]=useState([])

const fetch=async()=>{
  try{
    const res=await api.get("/users/all")
    setData(res.data);  
    localStorage.setItem("token", response.data.token);

  }
  catch(error){
    console.error("Error fetching data:", error);
 
  }

}

useEffect(() => {
  fetch()
}, [])




  return (
    <div>
      {console.log({data})}
      
    </div>
  )
}
