import { server } from '@/config';
import { ProductType } from '@/models/Product';
import axios from 'axios';
import productsPageStyles from '@/styles/ProductsPage.module.scss';
import ProductList from '@/components/ProductList';
import AddModal from '@/components/AddModal';
import { useState } from 'react';

type ProductsProps = {
  items: ProductType[];
  isAdmin: boolean;
};

const products = ({ items, isAdmin }: ProductsProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={productsPageStyles.container}>
      <h1>Full Menu</h1>
      {isAdmin && (
        <button
          className={productsPageStyles.addProduct}
          onClick={() => setShowModal(true)}
        >
          Add Product
        </button>
      )}
      {showModal && <AddModal setShowModal={setShowModal} />}
      <ProductList products={items} />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const myCookie = context.req?.cookies ?? '';
  let isAdmin = false;
  if (myCookie.token === process.env.TOKEN) {
    isAdmin = true;
  }
  const res = await axios.get(`${server}/api/products`);
  return {
    props: { items: res.data, isAdmin },
  };
};

export default products;
