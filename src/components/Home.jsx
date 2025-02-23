import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from './context/ProductContextWrapper'
import axios from './Axios/Axios'
import Loader from './Loader'


function Home() {
  const { products, datafetch } = useContext(ProductContext)
  const [filterproducts, setfilterproducts] = useState(products)
  const [loading,setloading]=useState(false)
  const { search } = useLocation()
  const realcategory = decodeURIComponent(search.split("=")[1])

  const getproductcategory = async () => {
    try {
      setloading(true)
      const { data } = await axios(`/products/category/${realcategory}`)
      setloading(false)
      setfilterproducts(data)
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (realcategory == "undefined") setfilterproducts(products)

    if (realcategory != "undefined") getproductcategory()

  }, [realcategory, products])


  return (
    <div id='home' className='h-[100vh] w-[85%]  overflow-x-hidden relative'>
     {loading && <Loader/>} 
      <div className='w-full p-6 gap-6 flex flex-wrap justify-center '>
        {datafetch ? (filterproducts.length > 0 ? filterproducts.map((item) => (
          <div id='card-body' key={item.id} className='w-[20%] bg-zinc-300 h-[45vh]  cursor-pointer  p-4 rounded-2xl '>
            <Link to={`/details/${item.id}`} className='w-full h-full  rounded '>
              <img src={`${item.image}`} className={`w-full h-[65%]   bg-cover bg-center`} />
              <p className=' text-[15px] mt-2 w-full h-[20%]'>{item.title.split(" ").slice(0, 7).join(" ") + " ..."}</p>
            </Link>
          </div>
        )) : "Loading...") : "Please check your internet connection..."}


      </div>
    </div>
  )
}

export default Home
