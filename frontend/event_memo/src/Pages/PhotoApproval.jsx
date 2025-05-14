import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import './CSS/Photopage.css'


const PhotoApproval = () => {
    const API_BASE_URL = "http://localhost:8000";
    const token = localStorage.getItem('organizer_token');
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(false);

    console.log(token);

    useEffect(() =>{
       const Fetchdetails = async() =>{
        setLoading(true)
        try {
            
            const response = await axios.get('http://localhost:8000/app/organizerapproval/', {
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
    }, [token])
    console.log(details);

    const HandlePhotoAproval = async (id, action) =>{
        try {
          await axios.patch(`http://localhost:8000/app/photo/${id}/validation/`,{action},{
            headers : {
                "Authorization" : `Token ${token}`,
                'Content-Type':  'application/json',
            }
          }) 
          if (action === "approve"){
            toast.success("Photo Approved",{
                position: "top-center",
            })
        } 
        else if (action === "decline"){
            toast.error("Photo Rejected",{
                position: "top-center",}) 
            
          }
          else{
            toast.warning("Something went wrong", {
                position: "top-center",
            })
          }
        }
        catch (error) {
            console.log(error.response?.data?.message || "Something went wrong");
            
        }
    }
    if (details.length === 0) {
        return (
          <div className='organizerApproval'>
            <h1>No Photos to Approve</h1>
          </div>
        ) ;
      
    }
  return (
    <div className='organizerApproval'>{
     loading ?  (<p>Loading..</p>) : (<div>
            <h1>Photo Approval</h1>
            <div className='photoApproval'>
                {details.map((item) => (
                    <div className='photoApprovalCard' key={item.id}>
                        <img src={`${API_BASE_URL}${item.photo}`} alt="image" className='beforeapproval' />
                        <button onClick={() => HandlePhotoAproval(item.id, "approve")} className='approve'>Approve</button>
                        <button onClick={() => HandlePhotoAproval(item.id, "decline")}  className='decline'>Reject</button>
                    </div>
                ))}
            </div>
     </div>)
        }</div>
  )
}

export default PhotoApproval