import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useGlobalContent } from '../Content';
import './CSS/CreatEvent.css'
import { useNavigate } from 'react-router-dom';

const MangeEventReg = ({ id }) => {

const navigate = useNavigate();

const [registration, SetRegistration] = useState([])
const [token, setToken] = useState(null)
const API_BASE_URL = "http://localhost:8000/app"; 
const { passwords, email,} = useGlobalContent();

let usetoken = token 
useEffect(() => {


  const HandleRegisgration = async() => {

    try {

      if (!usetoken) {
        try {
          const response = await axios.post("http://localhost:8000/app/usertoken/",{
            username: email,
            password: passwords,
          } )
          usetoken = response.data.token
          console.log("Token received:",usetoken);
          
          setToken(usetoken);
          localStorage.setItem("organizer_token", usetoken);
        } catch (error) {
          console.log("something went wrong", error.message);
        }
      }

      const api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          Authorization : `Token ${usetoken}`,
        },
      });
      const response = await api.get(`/events/${id}/registrations/`)
      SetRegistration(response.data)
     
      
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");  
    }
  }
  HandleRegisgration();
}, [id])


console.log(registration);

const handleUpdatingStatus = async (event_id, id, status) => {
  try {
    if (!usetoken) {
      console.error("Token is missing, please login again.");
      return;
    }
    const response = await axios.patch(`${API_BASE_URL}/events/${event_id}/registrations/${id}/`, {status}, {
      headers : {
        "Content-Type": "application/json",
        Authorization: `Token ${usetoken}`,
      }
    })
    
    SetRegistration((prev) =>
      prev.map((reg) =>
        reg.id === id ? { ...reg, status } : reg
      )
    );
  
    
  } catch (error) {
    console.log(error.response?.data?.message || "Something went wrong")
    
  }
}


return (
    <div>
    <h2 className="page-title">Manage Registrations</h2>

    <div className="manage-div">

      {registration.map((reg) => (
        <div key={reg.id} className="manage-sub-div">
          <p className='details-update'><strong>{reg.user_email}</strong> - {reg.status}</p>

          {reg.status === "pending" && (  
            <div>
              <button onClick={() => handleUpdatingStatus(reg.event, reg.id, "approved")
              } className="approve-btn">
                Approve
              </button>
              <button onClick={() => handleUpdatingStatus(reg.event, reg.id, "declined")
              } className="decline-btn">
                Decline
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
    <div className="manage-btn-div">
      <button onClick={() => navigate("/photoapproval")} className="btn btn-primary photoapproval">Photo Approval Page</button>
    </div>
  </div>
);
}

export default MangeEventReg
