import React, { useState } from 'react'
import axios from 'axios'
import { useGlobalContent } from '../Content'
import './CSS/CreatEvent.css'
import './CSS/Eventform.css'
import {useNavigate} from 'react-router-dom'

const CreatEvent = () => {

    const { username, generaltoken } = useGlobalContent()
    
    const navigate = useNavigate()

    const [formaData, setFormaData] = useState({
        title: "",
        organized_by: username,
        event_date: "",
        description: "",
        event_image: "",
        location: "",
        event_type: "",
        price:"",
        start_time: "",
        end_time: "",
    })

    const handleChange = (e) => {
        setFormaData({
            ...formaData,
            [e.target.name]: e.target.value
        })
    }
    const handleFileChange = (e) =>{
        setFormaData({
            ...formaData, event_image: e.target.files[0]
        })
    }

    const HandleSubmit = async(e) =>{
        e.preventDefault();
        

        const token =  generaltoken
        console.log(token);
        
        if (!token) {
            console.log("token is not available", ); 
             
            return; 
        }

        // const data = new FormData()
        // Object.entries(formaData).forEach(([keys, value]) =>{
        //     data.append(keys, value);
        // });
        // console.log(data);
        

        const data = new FormData();
        Object.entries(formaData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                // Ensure proper data types
                if (key === "price" || key === "start_time" || key === "end_time") {
                    data.append(key, value.toString().trim()); // Convert to string
                } else {
                    data.append(key, value);
                }
            }
        });

        try {
            const response = await axios.post("http://localhost:8000/app/events/", data, {
                headers: {
                    Authorization: `Token ${token}`, // Pass the authentication token
                },
            })
            
            
            setFormaData({
                title: "",
                organized_by: username,
                event_date: "",
                description: "",
                event_image: "",
                location: "",
                event_type: "",
                price:"",
                start_time: "",
                end_time: "",
              });
              navigate("/upcoming")
              
              
            console.log("creation successful", response.data);
            
        } catch (error) {
            console.error("Error response:", error.response);
            console.log(error.response?.data?.detail || "Something went wrong");
            
        }
    console.log(formaData);
    
    }

    return (
        <div className='event-creation-container'>
            <h1> Create a new Event</h1>
            <form action=""  className='form-section'>
                <div className="form-group">
                    <label htmlFor="title">Event title</label>
                    <input
                        type="text"
                        name="title"
                        value={formaData.title}
                        onChange={handleChange}
                        placeholder="Event Title"
                        className="user-input"
                        required />
                </div>   
                <div className="form-group">
                    <label htmlFor="event_date">Event Date</label>
                    <input
                        type="date"
                        name="event_date"
                        value={formaData.event_date}
                        onChange={handleChange}
                        placeholder="Event Title"
                        className="user-input"
                        required />
                </div>              
                <div className="form-group">
                <label htmlFor="description">Event Description</label><br />
                    <textarea
                        name="description"
                        value={formaData.description}
                        onChange={handleChange}
                        placeholder="Event Description"
                        className="user-input"
                        required
                    /></div>
                <div className="form-group">
                <label htmlFor="title">Upload event poster</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="user-input"
                        required
                    /></div>
                <div className="form-group">
                <label htmlFor="location">Event Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formaData.location}
                        onChange={handleChange}
                        placeholder="Event Location"
                        className="user-input"
                        required
                    /></div>
                <div className="form-group">
                <label htmlFor="event_type">Event Type (e.g., Conference, Party)</label>
                    <input
                        type="text"
                        name="event_type"
                        value={formaData.event_type}
                        onChange={handleChange}
                        placeholder="Event Type (e.g., Conference, Party)"
                        className="user-input"
                        required
                    /></div>
                    <div className="form-group">
                <label htmlFor="price">Event Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formaData.price}
                        onChange={handleChange}
                        placeholder="Event Price"
                        className="user-input"
                    /></div>
                    <div className='displaydatetime'>
                    <div className="form-time">
                <label htmlFor="start_time">Starting Time</label><br />                   
                    <input
                        type="time"
                        name="start_time"
                        value={formaData.start_time}
                        onChange={handleChange}
                        placeholder="Event Price"
                        className="user-input"
                    />
                    </div>
                <div className="form-time">
                <label htmlFor="end_time">End Time</label><br />
                    <input
                        type="time"
                        name="end_time"
                        value={formaData.end_time}
                        onChange={handleChange}
                        placeholder="Event Price"
                        className="user-input"
                    />
                    </div></div>   
              <button onClick={HandleSubmit}
          type="submit"
          className="btn-submit"
        
        >Create Event</button>
            </form>
        </div>
    )
}

export default CreatEvent