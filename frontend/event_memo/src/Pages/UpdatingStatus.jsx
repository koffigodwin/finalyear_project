import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContent } from '../Content'


const UpdatingStatus = ({ event_id,id, user_email, status, user_id }) => {

    const [token, setToken] = useState(null)
    const API_BASE_URL = "http://localhost:8000/app"; 
    const { passwords, email,} = useGlobalContent();
    
    let usetoken = token 
    useEffect(() => {
       const UpadatingStatus = async() =>{
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
                    console.log(error.response?.data?.message || "Something went wrong");    
                }  
            }

            const api = axios.create({
                baseURL: API_BASE_URL,
                headers: {
                  "Content-Type": "application/json",
                  Authorization : `Token ${usetoken}`
                },
              });
              const response  = await api.patch(`/events/${event_id}/registrations/${id}/`, {status})
              SetRegistration((prev) =>
                prev.map((reg) =>
                  reg.id === id ? { ...reg, status } : reg
                )
              );
              
        } catch (error) {
            console.log(error.response?.data?.message || "Something went wrong")
            
        }
        
       }
        UpadatingStatus();
    }, [id, status])
  return (
    <div>
        <h1>Hello world</h1>
    </div>
  )
}

export default UpdatingStatus


// import { useState, useEffect } from "react";
// import axios from "axios";

// const UploadPhoto = ({ eventId }) => {
//   const [event, setEvent] = useState(null);
//   const [isAllowed, setIsAllowed] = useState(false);
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     axios.get(`/api/events/${eventId}/`)
//       .then(response => {
//         setEvent(response.data);
//         checkTimeRestriction(response.data);
//       })
//       .catch(error => console.error(error));
//   }, [eventId]);

//   const checkTimeRestriction = (eventData) => {
//     const now = new Date();
//     const startTime = new Date(eventData.start_time);
//     const endTime = new Date(eventData.end_time);
//     setIsAllowed(now >= startTime && now <= endTime);
//   };

//   const handleUpload = async () => {
//     if (!image) return alert("Please select an image.");
//     if (!isAllowed) return alert("Photo upload is only allowed during the event time.");

//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("event", eventId);

//     try {
//       await axios.post("/api/upload-photo/", formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       alert("Photo uploaded successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Upload failed!");
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Event Photo</h2>
//       {event && <p>Event: {event.name} (Time: {event.start_time} - {event.end_time})</p>}
//       <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
//       <button onClick={handleUpload} disabled={!isAllowed}>Upload Photo</button>
//       {!isAllowed && <p style={{ color: "red" }}>Photo upload is only available during the event time.</p>}
//     </div>
//   );
// };

// export default UploadPhoto;
