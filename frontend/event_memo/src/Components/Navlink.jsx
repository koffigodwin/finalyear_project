import React from 'react'
import {NavLink} from 'react-router-dom'
import "./Navbar.css"

const Datanavbar = [
    {
        id: 1,
        linkname: '/previous',
        Name: 'Create event'
    },
    {
        id: 2,
        linkname: '/upcoming',
        Name: 'All Events'
    },
]

const Navlink = () => {
  return (
    <div className='navlinks'>
        {
            Datanavbar.map((item) =>{
                const {id, linkname, Name} = item
                return(
                    <NavLink key={id} to={linkname} className='each-link'>{Name}</NavLink>
                )
            })
        }
    </div>
  )
}

export default Navlink