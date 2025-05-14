import axios from "axios";


const API_BASE_URL = "http://localhost:8000/app"; 


// const token = localStorage.getItem('accessToken')
//     if (!token) {
//       console.log("the token is unavalaible");  
//     }
//     else{
//       console.log(token);
//     }

const api  = axios.create({
    baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization : `Token ${localStorage.getItem('accessToken')}` 
  },
})

export const RequestTojoinApi = async (event_id) =>{
    return api.post(`/events/${event_id}/join/`)
}