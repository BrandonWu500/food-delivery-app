import { PaymentMethodType } from '@/types/orderTypes';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect } from 'react';

// This values are the props in the UI
const style = { layout: 'vertical' };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner, makeOrder, amount }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (details) {
            // Your code here after capture the order
            const shipping = details.purchase_units[0].shipping;
            const { address_line_1, admin_area_2, admin_area_1, postal_code } =
              shipping.address;
            const fullAddress = `${address_line_1}, ${admin_area_2}, ${admin_area_1} ${postal_code}`;
            makeOrder({
              customer: shipping.name.full_name,
              address: fullAddress,
              total: amount,
              method: PaymentMethodType.PAYPAL,
            });
          });
        }}
      />
    </>
  );
};

export default ButtonWrapper;
