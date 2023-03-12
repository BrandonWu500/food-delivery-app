import { useAppSelector } from '@/redux/hooks';
import orderSummaryStyles from '@/styles/OrderSummary.module.scss';
import Link from 'next/link';
import { useState } from 'react';

type OrderSummaryProps = {
  cart?: boolean;
  paid?: boolean;
};

const OrderSummary = ({ cart = true, paid = false }: OrderSummaryProps) => {
  const { cartTotal } = useAppSelector((state) => state.cart);
  const [discount, setDiscount] = useState(0);
  return (
    <section className={orderSummaryStyles.summary}>
      <h1>CART TOTAL</h1>
      <div className={orderSummaryStyles.wrapper}>
        <div className={orderSummaryStyles.group}>
          <h3>Subtotal: </h3>
          <p>{'$' + cartTotal.toFixed(2)}</p>
        </div>
        <div className={orderSummaryStyles.group}>
          <h3>Discount: </h3>
          <p>{'$' + discount.toFixed(2)}</p>
        </div>
        <div className={orderSummaryStyles.group}>
          <h3>Total: </h3>
          <p>{'$' + cartTotal.toFixed(2)}</p>
        </div>
      </div>
      {cart && (
        <Link href="/order/1">
          <button>CHECKOUT NOW</button>
        </Link>
      )}
      {paid && <div className={orderSummaryStyles.paid}>PAID</div>}
    </section>
  );
};
export default OrderSummary;
