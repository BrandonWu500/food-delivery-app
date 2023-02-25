import Head from 'next/head';

type MetaProps = {
  [key: string]: string;
};

const Meta = ({
  title = 'Food Delivery App',
  keywords = 'food delivery, food ordering, takeout',
  description = 'Best food delivery in town',
}: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};
export default Meta;
