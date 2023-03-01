import Meta from '@/components/Meta';
import { ProductItemType } from '@/components/ProductItem';
import { server } from '@/config';
import productPageStyles from '@/styles/ProductPage.module.scss';
import Image from 'next/image';
import sizeImg from '@/public/images/size.png';
import { useState } from 'react';

const enum SizeType {
  SMALL,
  MEDIUM,
  LARGE,
}

type ProductProps = {
  product: ProductItemType;
};

const product = ({ product }: ProductProps) => {
  const [selectedSize, setSelectedSize] = useState(SizeType.SMALL);
  const sizeClass = (size: SizeType) => {
    if (selectedSize === size) {
      return `${productPageStyles.imgContainer} ${productPageStyles.selectedSize}`;
    }
    return `${productPageStyles.imgContainer}`;
  };
  return (
    <>
      <Meta title={product.title} description={product.desc} />
      <div className={productPageStyles.container}>
        <div className={productPageStyles.imgContainer}>
          <Image src={product.img} alt="" width={500} height={500} />
        </div>
        <div className={productPageStyles.textContainer}>
          <h1>{product.title}</h1>
          <p className={productPageStyles.price}>{'$' + product.price}</p>
          <p>{product.desc}</p>

          <div className={productPageStyles.wrapper}>
            <h2>Choose the size</h2>
            <div className={productPageStyles.group}>
              <button
                className={sizeClass(SizeType.SMALL)}
                onClick={() => setSelectedSize(SizeType.SMALL)}
              >
                <Image
                  src={sizeImg}
                  alt=""
                  width={48}
                  height={48}
                  className={productPageStyles.smSize}
                />
                <span className={productPageStyles.badge}>Small</span>
              </button>
              <button
                className={sizeClass(SizeType.MEDIUM)}
                onClick={() => setSelectedSize(SizeType.MEDIUM)}
              >
                <Image
                  src={sizeImg}
                  alt=""
                  width={64}
                  height={64}
                  className={productPageStyles.mdSize}
                />
                <span className={productPageStyles.badge}>Medium</span>
              </button>
              <button
                className={sizeClass(SizeType.LARGE)}
                onClick={() => setSelectedSize(SizeType.LARGE)}
              >
                <Image
                  src={sizeImg}
                  alt=""
                  width={96}
                  height={96}
                  className={productPageStyles.lgSize}
                />
                <span className={productPageStyles.badge}>Large</span>
              </button>
            </div>
          </div>

          <div className={productPageStyles.wrapper}>
            <h2>Choose additional ingredients</h2>
            <div className={productPageStyles.ingredients}>
              <div className={productPageStyles.inputGroup}>
                <input
                  type="checkbox"
                  name="double-ingredients"
                  id="double-ingredients"
                />
                <label htmlFor="double-ingredients">Double Ingredients</label>
              </div>
              <div className={productPageStyles.inputGroup}>
                <input type="checkbox" name="extra-cheese" id="extra-cheese" />
                <label htmlFor="extra-cheese">Extra Cheese</label>
              </div>
              <div className={productPageStyles.inputGroup}>
                <input type="checkbox" name="spicy-sauce" id="spicy-sauce" />
                <label htmlFor="spicy-sauce">Spicy Sauce</label>
              </div>
              <div className={productPageStyles.inputGroup}>
                <input type="checkbox" name="garlic-sauce" id="garlic-sauce" />
                <label htmlFor="garlic-sauce">Garlic Sauce</label>
              </div>
            </div>
          </div>

          <div className={productPageStyles.submitGroup}>
            <input type="number" name="" id="" defaultValue={1} min={1} />
            <button type="submit">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const res = await fetch(`${server}/api/products/${context.params.id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/products`);
  const products = await res.json();

  const ids: Array<number | string> = products.map(
    (product: ProductItemType) => product.id
  );

  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default product;
