import React, { useState } from 'react'
import './Events.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { RequestTojoinApi } from '../Constants/api'
import { useGlobalContent } from '../Content'
import { toast } from 'react-toastify'
import MangeEventReg from '../Pages/MangeEventReg'
import {useNavigate} from 'react-router-dom'


const Events = ({ id, title, location, description, organizer, date, price, image }) => {

  const { passwords, email, username, setEvent_id, islogin } = useGlobalContent()
  const [usertoken, Setusertoken] = useState(null)
  const API_BASE_URL = "http://localhost:8000/app"; 
  const navigate = useNavigate()
  const handleJoinRequest = async () => {
   
    try {

      if (!email) {
        toast.warning("Please Login first", {
          position: "top-center"
        })
        return;
      }
      let token = usertoken
      if(!token){
        try {
          const response = await axios.post("http://localhost:8000/app/usertoken/",{
            username: email,
            password: passwords,
          } )
          token = response.data.token
          console.log("Token received:",token);
          
          Setusertoken(token);
        } catch (error) {
          console.log("something went wrong", error.message);
          toast.error("Invalid credentials, please try again.",{
            position: "top-center"
          });
        }
      }
      const api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
      })

      const response = await api.post(`/events/${id}/join/`)
      console.log("request to join the event was successful", response.data);
      toast.success("Request to join the event was successful", {
        position: "top-center"
        })
        return navigate('/profile');
    } catch (error) {
      console.log(error.response?.data?.message || "Error submitting request.");
      toast.warning(error.response?.data?.message || "You have already requested to join this event.",{
        position: "top-center"
      });
      return navigate('/profile');
    }
  }
  const ManageRegisters = () =>{
    navigate(`/eventsevet/${id}`)
    return setEvent_id(id)
  }
  return (

    <div className="cards" >
      <img className="card-img-top" src={image} alt="Card image cap" />
      <div className="card-bodys">
        <h1 className='event-title'>{title}</h1>

        <div className="details">
          <p>Date: {date}</p>
          {price == 0 ? "free participation" : <p>price: {price}rps</p>}
        </div>
        <div className="details2">
          <h5 className=""> Organized by: {organizer}</h5>
          <h5>Location: {location}</h5>
        </div>
        {
          username === organizer && islogin === true ? <button 
          onClick={ManageRegisters} className='manage-btn'>Manage Organized Event</button>
           : <button onClick={handleJoinRequest} className="btn-event">Request to join</button>
        }
         
      </div>
    </div>

  )
}

export default Events
//<NavLink to={`/eventsevet/${id}`} className="manage-btn">Manage Request</NavLink>