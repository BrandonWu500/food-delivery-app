import { featuredItems } from '@/data';
import featuredStyles from '@/styles/Featured.module.scss';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import FeaturedItem from './FeaturedItem';

const Featured = () => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [clicked, setClicked] = useState(false);

  const handleClick = (direction: string) => {
    setClicked(true);
    changeSlide(direction);
  };

  const changeSlide = (direction: string) => {
    if (direction === 'left') {
      if (slideIdx === 0) {
        setSlideIdx(featuredItems.length - 1);
      } else {
        setSlideIdx(slideIdx - 1);
      }
    } else {
      if (slideIdx === featuredItems.length - 1) {
        setSlideIdx(0);
      } else {
        setSlideIdx(slideIdx + 1);
      }
    }
  };

  const autoPlayRef = useRef(() => {});

  useEffect(() => {
    autoPlayRef.current = () => changeSlide('right');
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    let interval: any = null;

    if (!clicked) {
      interval = setInterval(play, 4000);
      return () => clearInterval(interval);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }
  }, [clicked]);

  return (
    <div className={featuredStyles.container}>
      <button
        className={featuredStyles.arrowContainer}
        onClick={() => handleClick('left')}
      >
        <Image src="/images/arrowl.png" alt="left arrow" fill priority />
      </button>
      <button
        className={featuredStyles.arrowContainer}
        onClick={() => handleClick('right')}
      >
        <Image src="/images/arrowr.png" alt="right arrow" fill priority />
      </button>
      <div className={featuredStyles.content}>
        {featuredItems.map((item, idx) => (
          <FeaturedItem {...item} key={idx} slideActive={slideIdx === idx} />
        ))}
      </div>
    </div>
  );
};
export default Featured;
