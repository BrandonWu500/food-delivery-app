import AddModal from '@/components/AddModal';
import Featured from '@/components/Featured';
import ProductList from '@/components/ProductList';
import { server } from '@/config';
import { ProductType } from '@/models/Product';
import homeStyles from '@/styles/Home.module.scss';
import axios from 'axios';
import { useState } from 'react';

type HomeProps = {
  items: ProductType[];
  isAdmin: boolean;
};

export default function Home({ items, isAdmin }: HomeProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={homeStyles.container}>
      <Featured />
      <article className={homeStyles.article}>
        <h2>THE BEST FOOD IN TOWN</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          corrupti modi magni animi nulla ducimus neque incidunt. Animi
          exercitationem vero voluptatem ipsam reprehenderit, sed adipisci
          obcaecati maiores itaque temporibus maxime.
        </p>
      </article>
      {isAdmin && (
        <button
          className={homeStyles.addProduct}
          onClick={() => setShowModal(true)}
        >
          Add Product
        </button>
      )}
      {showModal && <AddModal setShowModal={setShowModal} />}
      <ProductList products={items} />
    </div>
  );
}

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
