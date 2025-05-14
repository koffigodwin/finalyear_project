import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Sidbar from '../Components/Sidbar'
import { useGlobalContent } from '../Content'
import './CSS/Home.css'

const Home = () => {

  const { visible } = useGlobalContent();

  return (
    <div className='home-containers'>
        <Navbar/>
        {visible && <Sidbar/>}
        <Outlet/>
    </div>
  )
}

export default Home