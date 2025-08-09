import React from 'react';
import './Card.css';

const images = [
  { fileName: 'brush.jpg', content: '"Tangle-free, healthy, shiny coat."' },
  { fileName: 'haircut.jpg', content: '"Neat, healthy, stylish trim."' },
  { fileName: 'bath.jpg', content: '"Fresh, clean, and odor-free."' },
  { fileName: 'comb.jpg', content: '"Smooth, tangle-free coat."' },
  { fileName: 'earclean.jpg', content: '"Clean, fresh, and healthy ears."' },
  { fileName: 'tick.jpg', content: '"Tick-free, comfortable, and healthy skin."' },
  { fileName: 'nail.jpg', content: '"Neat, trimmed, and healthy nails."' },
  { fileName: 'massage.jpg', content: '"Relaxed, pampered, and revitalized body."' },
  { fileName: 'eyeclean.webp', content: '"Bright, clear, and healthy eyes."' },
  // Add more images as needed
];

const Card = () => {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <div key={index} className="gallery-card">
          <div
            className="card-background"
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${image.fileName})` }}
          ></div>
          <div className="card-content">
            {image.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
