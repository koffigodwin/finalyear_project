import React from 'react'
import Carouseles from '../Components/Carousel'
import Hero from '../Components/Hero'
import './CSS/Home.css'

const HomeLayout = () => {
  return (
      <div className='home-container'>
        <h1> Here you can plan all your activities</h1>
        <form action="" className='search-form'>
          <input type="text" placeholder='search event'/>
          <button>Search</button>
        </form>
      <div className="home-sub">
      <Hero className='hero'/>
      <Carouseles className='carou'/> 
      </div>
      </div>
  )
}

export default HomeLayout