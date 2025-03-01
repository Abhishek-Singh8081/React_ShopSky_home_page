import axios from './Axios/Axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Details() {
  
    const navigate=useNavigate()
    const handleGoback=()=>{
        navigate(-1)
    }
    const {id}=useParams()
 
    
    const [single,setsingle]=useState({})
    const getsingleproduct=async()=>{
      let {data}= await axios(`/products/${id}`)
      setsingle({...data})
   
    }
  
    useEffect(()=>{
      getsingleproduct()
      },[])
     
  
  return (
    <>
    <div id='detailbox' className='w-[85%] h-full p-[6%] flex gap-6 overflow-x-hidden'>
        <img src={`${single.image}`} id='detailimg' className='w-[60%] h-full  bg-cover  bg-center ' />
        <div id='detailcont' className="content w-[40%] h-full bg-zinc-200 p-7 flex flex-col gap-2 ">
            <h1 className='text-4xl'>{single.title}</h1>
            <h3 className='text-red-600'>${single.price}</h3>
            <p className='text-[13px]'>{single.description}</p>
            <div>
            <button onClick={()=>{handleGoback()}} className='mr-4 cursor-pointer py-2 my-2 px-6 bg-blue-600 text-white rounded'>GO Back</button>
            <Link to={`/details/${id}/order`} className=' cursor-pointer py-2 my-2 px-6 border-2 border-blue-600  text-blue-600 rounded'>Buy</Link>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Details