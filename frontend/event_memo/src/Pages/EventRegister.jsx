import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import './CSS/Photoupload.css'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EventRegister = () => {

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null)
  const eventId = localStorage.getItem('event_id')
  const usetoken = localStorage.getItem('usetoken')
  console.log(eventId, usetoken);

  const navigate = useNavigate()


  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/app/events/${eventId}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${"221014a8c7bcc674cb4b9f214a9738d4affb8690"}`
          },
        })
        setEvent(response.data);
        //checkTimeRestriction(response.data)
      } catch (error) {
        console.log(error.response?.data?.message || "Something went wrong");
      }
    }
    getDetails();
  

  }, [eventId]);
  console.log(event);
  

  
  const handleFileChange = (e) => {
    console.log("Selected file:", e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const HandleUpload = async() =>{

    if (file === null) {
      return toast.warning("please select the image");
    }
    
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("event", eventId);
    [...formData.entries()]

    setLoading(true);
    const eventid = localStorage.getItem('event_id')
    const token = localStorage.getItem('accessToken') 
    console.log(token);
      try {
      
      const response = await axios.post(`http://localhost:8000/app/events/${eventid}/uploadphoto/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Upload successful!");
      toast.success("Upload successful!", {
        position: "top-center",
      });
      console.log(response.data);
      setFile(null); // Clear the file input after successful upload
    }
    catch (error) {
      setMessage("Upload failed. Try again.");
      console.error("Upload failed:", error.response?.data);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className='event-upload'>
       <h1>Upload Event Picture</h1>
       <p>you can now upload all the best pic you have taken on the <strong>
        {event?.title}</strong> event</p>
      <form method='post'>
         <input type="file" accept='image/*' onChange={handleFileChange}  className='fileuplode'/>
         <button className='upload' onClick={HandleUpload} disabled={loading}>
         {loading ? "Uploading..." : "Upload"}
         </button>
      </form>
      <NavLink  to="/photopage" className="navlink">See all the Event pictures</NavLink>
    </div>
  )
}

export default EventRegister