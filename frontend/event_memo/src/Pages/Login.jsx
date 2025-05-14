import React, { useState } from 'react'
import './CSS/Login.css'
import axios from 'axios'
import { useGlobalContent } from '../Content'
import { img8 } from '../assets/file_images'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'


const Login = () => {

  const { isloading, setIsloading, setUsername, SetIsLogin, setPasswords, setEmail} = useGlobalContent()
   
  const navigate = useNavigate() ; 

  const [formatData, SetformatData] = useState({
    email: "",
    password: "",
  })

  const HandleChange = (e) => {
    SetformatData({
      ...formatData,
      [e.target.name]: e.target.value
    })
  }

  const HandleLogin = async (e) => {
    e.preventDefault()
    if (isloading) {
      return
    }
    setIsloading(true)

    try {
      const response = await axios.post("http://localhost:8000/app/login/", formatData)
      
      localStorage.setItem("accessToken", response.data.tokens.access)
      localStorage.setItem("refreshToken", response.data.tokens.refresh)
      

      SetformatData({
        email: "",
        password: "",
      })
      SetIsLogin(true)
      setUsername(response.data.username)
      setPasswords(formatData.password)
      setEmail(formatData.email)
      
      toast.success("Login successfull",{
        position: "top-center"
      });
      navigate("/");
      

    } catch (error) {
      console.log("Something went wrong", error.message?.data);
      
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach(field => {
          const errormessages = error.response.data[field];
          if (errormessages && errormessages.length > 0) {
            toast.error(errormessages[0],{
              position: "top-center"
            })
          }
        })
      }
    }
    finally {
      setIsloading(false)
    }

  }

  return (
    <main>
      <div className='image-plan'>
        <img src={img8} alt="register image" className='register-image'/>
      </div>
      <div className='login-container'>
        <form className='login-form' >
          <h2>Log In</h2>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label><br />
            <input type='email' id='email' name='email' value={formatData.email} onChange={HandleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label><br />
            <input type='password' id='password' name='password' value={formatData.password} onChange={HandleChange} />
          </div>
          <button type='submit' className='btn-submit' onClick={HandleLogin}>Login</button>
        </form>
        <div className="details-login">
          <p>Don't have an account? <a href='/register'>Register</a></p>
          <p>Forgot your password? <a href='/reset'>Reset </a></p>
        </div>

      </div>
    </main>
  )
}

export default Login