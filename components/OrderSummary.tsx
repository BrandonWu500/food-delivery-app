import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import orderSummaryStyles from '@/styles/OrderSummary.module.scss';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ButtonWrapper from '@/lib/ButtonWrapper';
import axios from 'axios';
import { server } from '@/config';
import { useRouter } from 'next/router';
import { reset } from '@/redux/cart/cartSlice';

type OrderSummaryProps = {
  cart?: boolean;
  paid?: boolean;
};

const OrderSummary = ({ cart = true, paid = false }: OrderSummaryProps) => {
  const { cartTotal } = useAppSelector((state) => state.cart);
  const [discount, setDiscount] = useState(0);
  const [openCheckout, setOpenCheckout] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paypalRef.current) return;

    if (openCheckout) {
      paypalRef.current.style.display = 'block';
    } else {
      paypalRef.current.style.display = 'none';
    }
  }, [openCheckout]);

  const makeOrder = async (data: any) => {
    try {
      const res = await axios.post(`${server}/api/orders`, data);
      res.status === 201 && router.push(`/order/${res.data._id}`);
      dispatch(reset());
    } catch (error) {
      console.log(error);
    }
  };

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
        <button
          onClick={() => setOpenCheckout(!openCheckout)}
          className={orderSummaryStyles.checkout}
        >
          {openCheckout ? 'CANCEL' : 'CHECKOUT NOW'}
        </button>
      )}
      {paid && <div className={orderSummaryStyles.paid}>PAID</div>}
      <div className={orderSummaryStyles.payMethods} ref={paypalRef}>
        <button className={orderSummaryStyles.cashOnDelivery}>
          CASH ON DELIVERY
        </button>
        <PayPalScriptProvider
          options={{
            'client-id':
              'AT9gkKkn2KIGrL4HrOh3CAWhkSRnnmjoDhAjOiu3c40XresJAf1bAtZrTYf4ePQmknqgjSpakmD-ya9u',
            components: 'buttons',
            currency: 'USD',
            'disable-funding': 'card',
          }}
        >
          <ButtonWrapper
            currency="USD"
            showSpinner={true}
            makeOrder={makeOrder}
            amount={cartTotal}
          />
        </PayPalScriptProvider>
      </div>
    </section>
  );
};
export default OrderSummary;
