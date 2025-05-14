import React from 'react'
import { Carousel } from 'react-bootstrap'
import ExampleCarouselImage from './ExampleCarouselImage';
import {img1, img2, img3, img4} from '../assets/file_images'
import './Caroules.css'

const Carouseles = () => {
  return (
    <Carousel slide={false} className='carousel-container'>
      <Carousel.Item>
        <ExampleCarouselImage imagepath= {img1} />
        {/* <Carousel.Caption className='caption-carousel'>
          <h3>Slide for Event Memory</h3>
          <p >Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Veniam corporis dolorum sunt perferendis? Dolorum, temporibus 
            ut eligendi aliquam excepturi voluptate ipsa veniam? 
            Ab praesentium error quibusdam, animi possimus provident natus.</p> 
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage imagepath= {img2} />
        {/* <Carousel.Caption className='caption-carousel'>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage imagepath= {img3} />
        {/* <Carousel.Caption className='caption-carousel'>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
    
  )
}

export default Carouseles