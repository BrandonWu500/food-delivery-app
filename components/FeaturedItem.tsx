import featuredStyles from '@/styles/Featured.module.scss';
import Image from 'next/image';

type FeaturedItemProps = {
  id: number;
  title: string;
  img: string;
  slideActive: boolean;
};

const FeaturedItem = ({ title, img, slideActive }: FeaturedItemProps) => {
  return (
    <div
      className={
        slideActive
          ? `${featuredStyles.slide} ${featuredStyles.active}`
          : featuredStyles.slide
      }
    >
      <div className={featuredStyles.text}>
        <div className={featuredStyles.wrapper}>
          <h2>HOT & SPICY</h2>
          <h1>{title}</h1>
        </div>
        <div className={featuredStyles.wrapper}>
          <p>50% OFF</p>
          <p>ORDER NOW</p>
        </div>
      </div>
      <div className={featuredStyles.imgContainer}>
        <Image
          src={img}
          alt=""
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
};
export default FeaturedItem;
