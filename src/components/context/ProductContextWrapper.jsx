import axios from '../Axios/Axios'
import React, { createContext, useEffect, useState } from 'react'
export const ProductContext=createContext()
const ProductContextWrapper = (props) => {
  const [products,setproducts]=useState([])
  const [datafetch, setdatafetch] = useState(true)
  const getproducts=async()=>{
    try{
      const {data}= await axios("/products")
      setproducts(data)

    }
    catch(err){
      console.log(err)
      setdatafetch((prev)=>!prev)
    }
  }
  useEffect(()=>{
    getproducts()
    
  },[])
  return (
    <ProductContext.Provider value={{products,datafetch}}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductContextWrapper