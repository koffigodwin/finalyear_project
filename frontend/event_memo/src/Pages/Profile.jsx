import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useGlobalContent } from '../Content'
import './CSS/Profile.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const [joinrequest, setjoinrequest] = useState([])
  const [token, setToken] = useState(null)
  const API_BASE_URL = "http://localhost:8000/app";
  const { passwords, email, setEventRegister, eventregister} = useGlobalContent();
  const navigate = useNavigate();

  let usetoken = token 

  useEffect(() =>{
    const JoinRequestHandle = async() => {
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
          } catch (error) {
            console.log("something went wrong", error.message);
          }
        }
        const api = axios.create({
          baseURL: API_BASE_URL,
          headers: {
            "Content-Type": "application/json",
            Authorization : `Token ${usetoken}`
          },
        });
        const response = await api.get(`/user/request/`)
        setjoinrequest(response.data)
      } catch (error) {
        console.log(error.response?.data?.message || "Something went wrong");  
      }
    }
    JoinRequestHandle();
  }, [])
   
  function ApprovedRegistration(eventid){
    localStorage.setItem('event_id', eventid);
    localStorage.setItem('usetoken', usetoken)
    navigate(`/registerevent/${eventid}`)
    
  }
  return (  
    <div className='user-profile'>
        <h2>Your Join Requests</h2>
      {joinrequest.length > 0 ? (
        <ul className='join-request'>
          {joinrequest.map((request) => (
            <li key={request.id}>
              <strong>Event:</strong> {request.event_name} - <strong>Status:</strong> {request.status}
              {request.status === "approved" ? <button onClick={() => ApprovedRegistration(request.event)}>Participate</button> : null}
              {request.status === "declined" ? <h3>Sorry! Request disapproved</h3>: null}
              {request.status === "pending" ? <h3>Wait for the approval</h3> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p>No join requests found.</p>
      )}
    </div>
  )
}

export default Profile