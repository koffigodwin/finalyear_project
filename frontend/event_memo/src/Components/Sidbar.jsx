import React from 'react'
import './Sidbar.css'
import { DataLink } from '../assets/file_images'
import { NavLink } from 'react-router-dom'
import { ImCross } from "react-icons/im";
import { useGlobalContent } from '../Content'

const Sidbar = () => {

    const { HandleSidbar } = useGlobalContent();

  return (
    <div className='sid-container'>
        
        <div className='sid-links'>
            {
            DataLink.map((item) => {
                const { id, linkname, Name } = item
                return  <NavLink key={id} to={linkname} className='link-side' onClick={() =>HandleSidbar()}>{Name}</NavLink>   
            })
            }
        </div>
        
    </div>
  )
}

export default Sidbar