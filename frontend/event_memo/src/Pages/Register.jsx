import React, { useState } from 'react'
import './CSS/Register.css'
import axios from 'axios'
import { useGlobalContent } from '../Content'
import {img4} from '../assets/file_images'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const Register = () => {

  const { isloading, setIsloading, setUsername, setGeneraltoken} = useGlobalContent()
  
  const navigate = useNavigate();  

  const [formatData, SetformatData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  })

  const HandleChange = (e) => {
    SetformatData({
      ...formatData,
      [e.target.name]: e.target.value
    })
  }
  const HandleRegistration = async (e) => {
    e.preventDefault()
    if (isloading) {
      return
    }
    setIsloading(true)
    try {
      const response = await axios.post("http://localhost:8000/app/register/", formatData)
      SetformatData({
        username: "",
        email: "",
        password1: "",
        password2: "",
        
      })
      setUsername(response.data.username)
      toast.success("Registration successfull! Now you can login",{
              position: "top-center"
            })
       navigate("/login")

    } catch (error) {
      console.log("something is wrong", error.message?.data);
      if(error.response && error.response.data){
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
    finally{
      setIsloading(false)
    }

  }

  return (
    <main>
      <div className='register-container'>
      <form className='register-form'>
        <h2>Create an account</h2>
            <div className='form-group'>
              <label htmlFor='username'>Username:</label>
              <input type='text' id='username' name='username' value={formatData.username} onChange={HandleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input type='email' id='email' name='email' value={formatData.email} onChange={HandleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor='password1'>Password:</label>
              <input type='password' id='password1' name='password1' value={formatData.password1} onChange={HandleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor='password2'>Confirm Password:</label>
              <input type='password' id='password2' name='password2' value={formatData.password2} onChange={HandleChange} />
            </div>
            <button type='submit' className='btn-submite' onClick={HandleRegistration}>Register</button>
            <div className="details-register">
              <p>Do already have an account <a href="/login">Login</a></p>
            </div>
      </form>
      
    </div>
    <div className='image-plan' >
        <img src={img4} alt="register image" className='register-image'/>
    </div>
    </main>
  )
}

export default Register