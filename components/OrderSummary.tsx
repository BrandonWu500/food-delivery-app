import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import orderSummaryStyles from '@/styles/OrderSummary.module.scss';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ButtonWrapper from '@/lib/ButtonWrapper';
import axios from 'axios';
import { server } from '@/config';
import { useRouter } from 'next/router';
import { reset } from '@/redux/cart/cartSlice';
import OrderModal from './OrderModal';
import { OrderType } from '@/models/Order';
import { OrderStatusType } from '@/types/orderTypes';

type OrderSummaryProps = {
  cart?: boolean;
  paid?: boolean;
  orderStatus?: OrderStatusType;
};

const OrderSummary = ({
  cart = true,
  paid = false,
  orderStatus,
}: OrderSummaryProps) => {
  const { cartTotal, cartQuantity } = useAppSelector((state) => state.cart);
  const [discount, setDiscount] = useState(0);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openCashModal, setOpenCashModal] = useState(false);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const paypalRef = useRef<HTMLDivElement>(null);

  console.log(orderStatus);

  useEffect(() => {
    if (!paypalRef.current) return;

    if (openCheckout) {
      paypalRef.current.style.display = 'block';
    } else {
      paypalRef.current.style.display = 'none';
    }
  }, [openCheckout]);

  const makeOrder = async (data: OrderType) => {
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
      {cart && (
        <>
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
          {cart && cartQuantity > 0 && (
            <button
              onClick={() => setOpenCheckout(!openCheckout)}
              className={orderSummaryStyles.checkout}
            >
              {openCheckout ? 'CANCEL' : 'CHECKOUT NOW'}
            </button>
          )}
          {paid && <div className={orderSummaryStyles.paid}>PAID</div>}
          <div className={orderSummaryStyles.payMethods} ref={paypalRef}>
            <button
              className={orderSummaryStyles.cashOnDelivery}
              onClick={() => setOpenCashModal(true)}
            >
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
          <OrderModal
            amount={cartTotal}
            makeOrder={makeOrder}
            openCashModal={openCashModal}
            setOpenCashModal={setOpenCashModal}
          />
        </>
      )}
      {paid && (
        <div className={orderSummaryStyles.thank}>
          <h2>Thank you for ordering with Food Delivery!</h2>
          {orderStatus !== undefined && (
            <p>
              {orderStatus < OrderStatusType.DELIVERED
                ? 'Your order is in progress.'
                : 'Your order has been delivered.'}
            </p>
          )}
        </div>
      )}
    </section>
  );
};
export default OrderSummary;
