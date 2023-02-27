import { productItems } from '@/data';
import productListStyles from '@/styles/ProductList.module.scss';
import ProductItem from './ProductItem';

const ProductList = () => {
  return (
    <div className={productListStyles.container}>
      {productItems.map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ProductList;
