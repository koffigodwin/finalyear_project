import React from 'react'
import './Caroules.css'

const ExampleCarouselImage = ({ imagepath }) => {
    return (
      <div>
        <img
          className="image-class"
          src={imagepath}
          alt='bro'
        />
      </div>
    );
  };

export default ExampleCarouselImage