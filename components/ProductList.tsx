import { productItems } from '@/data';
import { ProductType } from '@/models/Product';
import productListStyles from '@/styles/ProductList.module.scss';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: ProductType[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className={productListStyles.container}>
      {products.length > 0 &&
        products.map((item, idx) => <ProductItem key={idx} {...item} />)}
    </div>
  );
};

export default ProductList;
