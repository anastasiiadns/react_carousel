import React, { useState } from 'react';
import './Carousel.scss';
import { State } from '../App';

export const Carousel: React.FC<State> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // де зараз знаходиться карусель
  const maxIndex = images.length - frameSize; // докуди максимум можна дійти

  const nextButton = () => {
    if (infinite) {
      setCurrentIndex(prev => (prev + step) % images.length);
    } else {
      setCurrentIndex(prev => Math.min(prev + step, maxIndex));
    }
  };

  const prevButton = () => {
    if (infinite) {
      setCurrentIndex(prev => (prev - step + images.length) % images.length);
    } else {
      setCurrentIndex(prev => Math.max(prev - step, 0));
    }
  };

  return (
    <>
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((src, image) => (
            <li key={image} className="Carousel__item">
              <img
                src={src}
                alt={`${image + 1}`}
                className="Carousel__images"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <button type="button" onClick={prevButton}>
          Prev
        </button>
        <button type="button" onClick={nextButton} data-cy="next">
          Next
        </button>
      </div>
    </>
  );
};

export default Carousel;
