import Meta from '@/components/Meta';
import { server } from '@/config';
import productPageStyles from '@/styles/ProductPage.module.scss';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { ProductType } from '@/models/Product';
import { capitalize } from '@/util/capitalize';
import { ProductOptionType } from '@/types/productTypes';
import { useAppDispatch } from '@/redux/hooks';
import { addProduct } from '@/redux/cart/cartSlice';

const enum SizeType {
  SMALL,
  MEDIUM,
  LARGE,
}

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  const [selectedSize, setSelectedSize] = useState(SizeType.SMALL);
  const [price, setPrice] = useState(product.prices[0]);
  const [extras, setExtras] = useState<ProductOptionType[]>([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const changePrice = (num: number) => {
    setPrice(price + num);
  };

  const handleSizeClick = (size: SizeType) => {
    const priceDiff = product.prices[size] - product.prices[selectedSize];
    setSelectedSize(size);
    changePrice(priceDiff);
  };

  const handleExtraOptionsChange = (
    e: ChangeEvent<HTMLInputElement>,
    option: ProductOptionType
  ) => {
    if (e.target.checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const addToCart = () => {
    dispatch(
      addProduct({
        ...product,
        extras: extras.map((extra) => extra.name),
        itemPrice: price,
        itemQuantity: quantity,
      })
    );
  };

  const sizeClass = (size: SizeType) => {
    if (selectedSize === size) {
      return `${productPageStyles.imgContainer} ${productPageStyles.selectedSize}`;
    }
    return `${productPageStyles.imgContainer}`;
  };
  return (
    <>
      <Meta title={capitalize(product.title)} description={product.desc} />
      <div className={productPageStyles.container}>
        <div className={productPageStyles.imgContainer}>
          <Image src={product.img} alt="" width={500} height={500} priority />
        </div>
        <div className={productPageStyles.textContainer}>
          <h1>{product.title.toUpperCase()}</h1>
          <p className={productPageStyles.price}>{'$' + price.toFixed(2)}</p>
          <p>{product.desc}</p>

          <div className={productPageStyles.wrapper}>
            <h2>Choose the size</h2>
            <div className={productPageStyles.group}>
              <button
                className={sizeClass(SizeType.SMALL)}
                onClick={() => handleSizeClick(SizeType.SMALL)}
              >
                <Image
                  src={product.img}
                  alt=""
                  width={48}
                  height={48}
                  className={productPageStyles.smSize}
                />
                <span className={productPageStyles.badge}>Small</span>
              </button>
              <button
                className={sizeClass(SizeType.MEDIUM)}
                onClick={() => handleSizeClick(SizeType.MEDIUM)}
              >
                <Image
                  src={product.img}
                  alt=""
                  width={64}
                  height={64}
                  className={productPageStyles.mdSize}
                />
                <span className={productPageStyles.badge}>Medium</span>
              </button>
              <button
                className={sizeClass(SizeType.LARGE)}
                onClick={() => handleSizeClick(SizeType.LARGE)}
              >
                <Image
                  src={product.img}
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
              {product.extraOptions.map((option, idx) => (
                <div className={productPageStyles.inputGroup} key={idx}>
                  <input
                    type="checkbox"
                    name={option.name}
                    id={option.name}
                    onChange={(e) => handleExtraOptionsChange(e, option)}
                  />
                  <label htmlFor={option.name}>
                    {option.name}: {'$' + option.price.toFixed(2)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={productPageStyles.submitGroup}>
            <input
              type="number"
              name=""
              id=""
              defaultValue={1}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button type="submit" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const res = await axios.get(`${server}/api/products/${context.params.id}`);
  const product = res.data;
  return {
    props: { product: product },
  };
};

export default Product;
