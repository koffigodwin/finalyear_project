import React from 'react'
import './Navbar.css'
import Navlink from './Navlink'
import { logo, user } from '../assets/file_images'
import { NavLink } from 'react-router-dom'
import { IoMdMenu } from "react-icons/io";
import Sidbar from './Sidbar'
import { useGlobalContent } from '../Content'
import { IoSearch } from "react-icons/io5";
import { FaSearchLocation } from "react-icons/fa";
import { LiaGripLinesVerticalSolid } from "react-icons/lia";
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'


const Navbar = () => {

  const navigate = useNavigate()

  const { HandleSidbar, islogin, username, SetIsLogin } = useGlobalContent();

  const HandleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");

      await axios.post(
        "http://localhost:8000/app/logout/",
        { refresh: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      SetIsLogin(false)
      toast.warning("User Logout",{
              position: "top-center"
      })
      navigate("/")
    }

    catch (error) {
      console.log("something went wrong", error.response ? error.response.data : error.message);
      toast.error(error.response ? error.response.data : error.message,{
        position: "top-center"
      })
    }
  }

  return (

    <div className='container-nav'>
      <div className="left-nav">
        <NavLink to={"/"} className='title'>MEMORA</NavLink>

        <div className='search-place'>
          <form className="event-search">
            <button><IoSearch /></button>
            <input type="text" placeholder='Search' />
          </form>
          <span> <LiaGripLinesVerticalSolid /> </span>
          <form className='location-search'>
            <input type="text" placeholder='Location' />
            <button><FaSearchLocation /></button>
          </form>
        </div>
      </div>

      <div className="middle-nav">
        <Navlink />
      </div>

      <div className="rigth-nav">
        {islogin ?
          <> <NavLink to={'/profile'} className='signin'>{username}</NavLink>
            <button onClick={HandleLogout} className='logout-btn'>Logout</button>
          </>
          : <> <NavLink to={'/login'} className='signin'>Log In</NavLink>
            <NavLink to={'/register'} className='signin'>Sign Up</NavLink>
          </>
        }
      </div>
      <div className="menuicons">
        <IoMdMenu className='menu-icon' onClick={() => HandleSidbar()} />
      </div>
    </div>

  )
}

export default Navbar

//<img src={user} alt="user login" className='user-login'/>