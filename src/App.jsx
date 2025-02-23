import React from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Home from './components/Home'
import Details from "./components/Details"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className='h-screen w-screen flex' >
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/details/:id' element={<Details/>}/>
      </Routes>
    </div>
      
    </BrowserRouter>
  )
}

export default App