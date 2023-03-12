import Featured from '@/components/Featured';
import ProductList from '@/components/ProductList';
import { server } from '@/config';
import { ProductType } from '@/models/Product';
import homeStyles from '@/styles/Home.module.scss';
import axios from 'axios';

type HomeProps = {
  items: ProductType[];
};

export default function Home({ items }: HomeProps) {
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
      <ProductList products={items} />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get(`${server}/api/products`);
  return {
    props: { items: res.data },
  };
};
