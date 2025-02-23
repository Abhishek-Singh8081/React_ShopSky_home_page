import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from './context/ProductContextWrapper'

function Navbar() {
  const {search,pathname}=useLocation()
  const searched=decodeURIComponent(search.split("=")[1])
  const {products}=useContext(ProductContext)
  let distinct=products && products.reduce((accu,cv)=>[...accu,cv.category],[])
  distinct=[...new Set(distinct)]
  const colour=()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()})`
  }
  return (
    
    <nav className='w-[15%] h-full text-zinc-700 bg-zinc-200 flex flex-col items-center pt-5'>
        <div id='shopsky' className='py-3 text-2xl px-7 border rounded border-blue-600'>ShopSky</div>
        <hr className='w-[80%] my-2' />
        <h1 className='w-[80%] text-2xl mb-2'>Category Filter</h1>
        <div id='ax-box' className='w-[80%]  mb-2 cursor-pointer'>
          {distinct.map((item,i)=>(<Link key={i} id='ax'  to={`/?category=${item}`} className='  flex items-center w-full' ><span id='bullets'  style={{backgroundColor:colour()}} className='w-[15px] m-2 inline-block rounded-full h-[15px]'></span>{item}</Link>

          ))
            
          }
          {pathname!="/" || searched!="undefined" ? <Link to="/" className='cursor-pointer py-2 my-2  bg-red-800 active:bg-red-600 text-white rounded flex items-center justify-center'>Home</Link> : "" }        
        </div>
    </nav>
  )
}

export default Navbar