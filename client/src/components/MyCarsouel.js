import React from 'react';
import { Carousel } from 'react-bootstrap'; // Import Carousel from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const MyCarousel = () => {
  return (
    <div className="container mt-5">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/Carsouel1.jpg"
            alt="First slide"
          />
          <Carousel.Caption className="custom-caption">
            <h1>"Pamper Your Pet's Paws, Anytime, Anywhere!"</h1>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/Carsouel2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption className="custom-caption">
            <h1>"Pamper Your Pet's Style, Anytime, Anywhere!"</h1>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/Carsouel3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption className="custom-caption">
            <h1>"Pamper Your Pet's Cleanliness, Anytime, Anywhere!"</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MyCarousel;
