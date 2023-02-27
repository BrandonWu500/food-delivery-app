import Featured from '@/components/Featured';
import ProductList from '@/components/ProductList';
import homeStyles from '@/styles/Home.module.scss';

export default function Home() {
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
      <ProductList />
    </div>
  );
}
