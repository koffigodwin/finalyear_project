import React from 'react'
import './CSS/CreatEvent.css'
import axios from 'axios'
import { useGlobalContent } from '../Content'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const PreviousEvent = () => {

  const {email,passwords, setGeneraltoken, islogin } = useGlobalContent()
  const navigate = useNavigate()
 
  console.log(passwords);
  

  const Get_token = async() =>{
    if(!islogin){
      toast.error("Please login first",{
        position: "top-center"
      })
      return;
    }
    if (passwords == null) {
      toast.error("Please login first",{
        position: "top-center"
      })
      return ;
    }else{
      navigate('/event-creation')
    }
            try {
              const response = await axios.post("http://localhost:8000/app/usertoken/",{
                username: email,
                password: passwords,
              } )
              console.log(response.data.token);
              
              setGeneraltoken(response.data.token);
            } catch (error) {
              console.log("something went wrong", error.message);
              
            }
          }
          

  return (
    <div className='create-event'>
      <h1>Where Event Organizers Grow</h1>
      <p>Create your own Event and share a great moment with people around</p>
      <div className="button-place">
      <button onClick={Get_token} className='creation-btn'>Get started for free</button>
      </div>
    </div>
  )
}

export default PreviousEvent