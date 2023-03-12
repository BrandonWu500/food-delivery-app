import { ProductType } from '@/models/Product';
import productItemStyles from '@/styles/ProductItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const ProductItem = ({ _id: id, title, img, desc, prices }: ProductType) => {
  return (
    <Link href="/product/[id]" as={`/product/${id}`}>
      <div className={productItemStyles.container}>
        <div className={productItemStyles.imgContainer}>
          <Image src={img} alt="" fill className={productItemStyles.img} />
        </div>
        <h2 className={productItemStyles.title}>{title}</h2>
        <p className={productItemStyles.price}>{'$' + prices[0]}</p>
        <p className={productItemStyles.desc}>{desc}</p>
      </div>
    </Link>
  );
};
export default ProductItem;
