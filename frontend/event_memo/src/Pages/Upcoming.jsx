import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Events from '../Components/Events'
import './CSS/Upcoming.css'


const Upcoming = () => {

  const [dataset, setDataset] = useState([])
  
  const handleDataset = async () => {
  
  
    try {
      const response = await axios.get("http://localhost:8000/app/events/", {
        headers: {
          Authorization: `Token ${"221014a8c7bcc674cb4b9f214a9738d4affb8690"}`
        }
      })
      setDataset(response.data)

    } catch (error) {
      console.log("fetching the data failed", error.message);
    }
  }
   useEffect(() => {
     handleDataset();
   }, [dataset])

  if (dataset.length < 1) {
    return(
      <div className='event-container'>
        <h2>There is no events planned for a moments</h2>
      </div>
    )
  }
 
  return (
    <div className='event-container'>
      <h1>Place you can see all the available events</h1>
      <div className="upcoming-event">
       {dataset.map((item) =>{
        const {id,event_date, description, event_image, event_price, 
          location, organized_by, title} = item
         return (
          <div key={id}>
             <Events id={id} organizer={organized_by} date={event_date} description={description}
                title={title} image={event_image} location={location} price={event_price}
              />
          </div>
         )
       })
       }
      </div>
    </div>
  )
}

export default Upcoming