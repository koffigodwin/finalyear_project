import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {HomeLayout,Register,Login,Error,Upcoming, PhotoApproval, Photopage,
          PrevioucEvent, Home, Profile, CreatEvent, ManageEventReg, EventRegister} from '../src/Pages/index'
import "react-toastify/dist/ReactToastify.css";
import {useGlobalContent} from './Content'

const App = () => {
 
  const { event_id, eventregister } = useGlobalContent()
    
  const route = createBrowserRouter([
    {
      patch:'/',
      element: <Home/>, 
      errorElement: <Error/>,
      children : [
        {
          index : true,
          element: <HomeLayout/>, 
          errorElement: <Error/>
        },
        {
          path: '/previous',
          element: <PrevioucEvent/>, 
          errorElement: <Error/>
        },
        {
          path:"/upcoming",
          element: <Upcoming/>, 
          errorElement: <Error/>
        },
        {
          path:"/register",
          element: <Register/>, 
          errorElement: <Error/>
        },
        {
          path: '/login',
          element: <Login/>, 
          errorElement: <Error/>
        } ,
        {
          path: '/profile',
          element: <Profile/>, 
          errorElement: <Error/>
        },
        {
          path: '/event-creation',
          element: <CreatEvent/>, 
          errorElement: <Error/>
        },
        {
          path: '/eventsevet/:id',
          element: <ManageEventReg id={event_id}/>, 
          errorElement: <Error/>
        },
        {
          path: '/registerevent/:id',
          element: <EventRegister/>, 
          errorElement: <Error/>
        } ,
        {
          path: '/photoapproval',
          element: <PhotoApproval/>, 
          errorElement: <Error/>
        } ,
        {
          path: '/photopage',
          element: <Photopage/>, 
          errorElement: <Error/>
        }
      ]
    },
       
  ])
  return (
    
      <div className='app-container'>
         <RouterProvider router={route}></RouterProvider>
    </div>
  )
}

export default App