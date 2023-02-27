import productItemStyles from '@/styles/ProductItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export type ProductItemType = {
  id: number | string;
  title: string;
  img: string;
  desc: string;
  price: number;
};

const ProductItem = ({ id, title, img, desc, price }: ProductItemType) => {
  return (
    <Link href="/product/[id]" as={`/product/${id}`}>
      <div className={productItemStyles.container}>
        <div className={productItemStyles.imgContainer}>
          <Image src={img} alt="" fill className={productItemStyles.img} />
        </div>
        <h2>{title}</h2>
        <p className={productItemStyles.price}>{'$' + price}</p>
        <p className={productItemStyles.desc}>{desc}</p>
      </div>
    </Link>
  );
};
export default ProductItem;
