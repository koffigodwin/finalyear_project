import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './CSS/Photopage.css'

const Photopage = () => {
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('organizer_token')
    useEffect(()=>{
        const Fetchdetails = async() =>{
            setLoading(true)
            try {
                const response = await axios.get(`http://localhost:8000/app/approved/True/`, {
                    headers : {
                      Authorization : `Token ${token}`,
                      'Content-Type':  'application/json',
                    }
                 })
                 setDetails(response.data)
            } catch (error) {
                console.log(error.response?.data?.message || "Something went wrong");
                
            }
            finally{
                setLoading(false)
            }
            
        }
          Fetchdetails();
    },[token])

    if (details.length === 0) {
        return (
          <div className='organizerApproval'>
            <h1>No Photos to Approve</h1>
          </div>
        ) ;
      
    }
  return (
    <div className='organizerApproval'>
        <h1>Event Photos</h1>
        <div className='photoApproval'>
        {
            details.map((item) =>{
                const {id, event, photo} = item
                return(
                    <div key={id} className='photoApprovalCard'>
                        <img src={`http://localhost:8000${photo}`} alt="event" className='photos' />
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default Photopage