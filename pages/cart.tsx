import OrderSummary from '@/components/OrderSummary';
import { server } from '@/config';
import cartStyles from '@/styles/Cart.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export type CartItemType = {
  id: number | string;
  img: string;
  name: string;
  extras: string[];
  price: number;
  quantity: number;
  total: number;
};

type CartProps = {
  cart: CartItemType[];
};

const cart = ({ cart }: CartProps) => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    const obj = { ...cart[0] };
    const { id, img, ...rest } = obj;
    const newHeaders = Object.keys({ product: img, ...rest });
    setHeaders(newHeaders);
  }, []);
  useEffect(() => {
    const sum = cart.reduce((acc, cur) => {
      return acc + cur.total;
    }, 0);
    setSubtotal(sum);
  }, []);
  return (
    <div className={cartStyles.container}>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>
                <div>{header}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              {Object.entries(item)
                .slice(1)
                .map(([key, val], idx) => (
                  <td key={idx}>
                    <div className={cartStyles.wrapper}>
                      {key === 'img' && (
                        <Image
                          src={val.toString()}
                          alt=""
                          width={64}
                          height={64}
                        />
                      )}
                      {key === 'extras' && Array.isArray(val) && val.join(', ')}
                      {key !== 'img' && key !== 'extras' && val}
                    </div>
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
      <OrderSummary subtotal={subtotal} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(`${server}/api/cart`);
  const cart = await res.json();

  return {
    props: {
      cart,
    },
  };
};

export default cart;
