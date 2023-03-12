import { server } from '@/config';
import { ProductType } from '@/models/Product';
import axios from 'axios';
import productsPageStyles from '@/styles/ProductsPage.module.scss';
import ProductList from '@/components/ProductList';

type ProductsProps = {
  items: ProductType[];
};

const products = ({ items }: ProductsProps) => {
  return (
    <div className={productsPageStyles.container}>
      <h1>Full Menu</h1>
      <ProductList products={items} />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get(`${server}/api/products`);
  return {
    props: { items: res.data },
  };
};

export default products;
