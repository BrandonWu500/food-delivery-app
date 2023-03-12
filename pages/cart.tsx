import OrderSummary from '@/components/OrderSummary';
import { server } from '@/config';
import { reset } from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import cartStyles from '@/styles/Cart.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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

const HEADERS = ['product', 'name', 'extras', 'price', 'quantity', 'total'];

const cart = (/* { cart }: CartProps */) => {
  const [subtotal, setSubtotal] = useState(0);
  const { products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const sum = products.reduce((acc, cur) => {
      return acc + cur.itemPrice;
    }, 0);
    setSubtotal(sum);
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    if (!modalRef.current) return;
    modalRef.current.style.display = 'flex';
  };
  const closeModal = () => {
    if (!modalRef.current) return;
    modalRef.current.style.display = 'none';
  };
  return (
    <div className={cartStyles.container}>
      <div className={cartStyles.modal} ref={modalRef}>
        <div className={cartStyles.modalContent}>
          <h1>Are you sure you want to clear your cart?</h1>
          <div className={cartStyles.modalBtns}>
            <button
              onClick={() => {
                dispatch(reset());
                closeModal();
              }}
              className={cartStyles.yes}
            >
              Yes
            </button>
            <button onClick={closeModal} className={cartStyles.no}>
              No
            </button>
          </div>
        </div>
      </div>
      <section className={cartStyles.tableSection}>
        <button className={cartStyles.clear} onClick={openModal}>
          Clear Cart
        </button>
        <table>
          <thead>
            <tr>
              {HEADERS.map((header) => (
                <th key={header}>
                  <div>{header}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <div className={cartStyles.wrapper}>
                    <Link href={`/product/${item._id}`}>
                      {item.img && (
                        <Image src={item.img} alt="" width={64} height={64} />
                      )}
                    </Link>
                  </div>
                </td>
                <td className={cartStyles.title}>
                  <div className={cartStyles.wrapper}>{item.title}</div>
                </td>
                <td className={cartStyles.extras}>
                  <div className={cartStyles.wrapper}>
                    {item.extras.join(', ')}
                  </div>
                </td>
                <td>
                  <div className={cartStyles.wrapper}>
                    {'$' + item.itemPrice.toFixed(2)}
                  </div>
                </td>
                <td>
                  <div className={cartStyles.wrapper}>{item.itemQuantity}</div>
                </td>
                <td>
                  <div className={cartStyles.wrapper}>
                    {'$' + (item.itemPrice * item.itemQuantity).toFixed(2)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <OrderSummary />
    </div>
  );
};

/* export const getServerSideProps = async () => {
  const res = await fetch(`${server}/api/cart`);
  const cart = await res.json();

  return {
    props: {
      cart,
    },
  };
}; */

export default cart;
