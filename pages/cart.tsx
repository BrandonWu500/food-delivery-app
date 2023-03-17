import ConfirmModal from '@/components/ConfirmModal';
import OrderModal from '@/components/OrderModal';
import OrderSummary from '@/components/OrderSummary';
import { server } from '@/config';
import { deleteProduct, reset } from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import cartStyles from '@/styles/Cart.module.scss';
import axios from 'axios';
import { Types } from 'mongoose';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

const HEADERS = ['item', 'name', 'extras', 'price', 'quantity', 'total'];

const Cart = (/* { cart }: CartProps */) => {
  const { products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    if (!modalRef.current) return;
    modalRef.current.style.display = 'flex';
  };

  const handleDelete = (cartIdx: number) => {
    dispatch(deleteProduct(cartIdx));
  };

  return (
    <div className={cartStyles.container}>
      <ConfirmModal modalRef={modalRef} />
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
            {products.map((item, cartIdx) => (
              <tr key={cartIdx}>
                <td>
                  <div className={cartStyles.wrapper}>
                    <Link href={`/product/${item._id}`}>
                      {item.img && (
                        <Image
                          src={item.img}
                          alt=""
                          width={64}
                          height={64}
                          style={{ objectFit: 'contain' }}
                        />
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
                {item._id && (
                  <td>
                    <div className={cartStyles.wrapper}>
                      <button
                        className={cartStyles.delBtn}
                        onClick={() => handleDelete(cartIdx)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
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

export default Cart;
