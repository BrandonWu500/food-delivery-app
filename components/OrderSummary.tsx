import orderSummaryStyles from '@/styles/OrderSummary.module.scss';
import Link from 'next/link';

type OrderSummaryProps = {
  subtotal: number;
  cart?: boolean;
  paid?: boolean;
};

const OrderSummary = ({
  subtotal,
  cart = true,
  paid = false,
}: OrderSummaryProps) => {
  return (
    <section className={orderSummaryStyles.summary}>
      <h1>CART TOTAL</h1>
      <div className={orderSummaryStyles.wrapper}>
        <div className={orderSummaryStyles.group}>
          <h3>Subtotal: </h3>
          <p>{'$' + subtotal}</p>
        </div>
        <div className={orderSummaryStyles.group}>
          <h3>Discount: </h3>
          <p>$0.00</p>
        </div>
        <div className={orderSummaryStyles.group}>
          <h3>Total: </h3>
          <p>{'$' + subtotal}</p>
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
