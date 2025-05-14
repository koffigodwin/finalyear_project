import React from 'react'
import '../Pages/CSS/Home.css'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero-container'>
        

        <p>we are all a passengers in this world that why we live 
            our moment unforgottable and enjoy each an every occasion.     
            This page main goal is to keep your happy moment eternel with your lovely people. <br/>
            We live in the world where we usually forget about the good things that happens to us and 
            keep in the mind negative ones . this platform will help you to get your memory back to the positivity  
        </p> 

        <NavLink to={"/upcoming"} className="hero-btn">Available Events</NavLink>
    </div>
  )
}

export default Hero