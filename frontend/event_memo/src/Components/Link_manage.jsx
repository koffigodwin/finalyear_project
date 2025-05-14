import React from 'react'
import {NavLink} from 'react-router-dom'

const DataLink = [
    {
        id: 1,
        linkname: '/',
        Name: 'Home'
    },
    {
        id: 2,
        linkname: '/events',
        Name: 'Events'
    },
    {
        id: 3,
        linkname: '/previous',
        Name: 'Previous Events'
    },
    {
        id: 4,
        linkname: '/upcoming',
        Name: 'Upcoming Event'
    },
    {
        id: 5,
        linkname: '/login',
        Name: 'Login'
    },
    
]

const Link_manage = () => {
  return (
    <div className='link-manager'>
      {
            DataLink.map((item) =>{
                const {id, linkname, Name} = item
                return(
                    <NavLink index={id} to={linkname} className='each-link'>{Name}</NavLink>
                )
            })
        }
    </div>
  )
}

export default Link_manage
