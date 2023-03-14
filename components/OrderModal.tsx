import { OrderType } from '@/models/Order';
import orderModalStyles from '@/styles/OrderModal.module.scss';
import { OrderStatusType, PaymentMethodType } from '@/types/orderTypes';
import { FormEvent, useEffect, useRef, useState } from 'react';

type OrderModalProps = {
  amount: number;
  makeOrder: (data: OrderType) => Promise<void>;
  openCashModal: boolean;
  setOpenCashModal: any;
};

const OrderModal = ({
  amount,
  makeOrder,
  openCashModal,
  setOpenCashModal,
}: OrderModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const { name, phone, address } = formData;

  const cashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cashRef.current) return;
    if (openCashModal) {
      cashRef.current.style.display = 'flex';
    } else {
      cashRef.current.style.display = 'none';
    }
  }, [openCashModal]);

  const closeCashModal = () => {
    setOpenCashModal(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    makeOrder({
      customer: name,
      phone,
      address,
      total: amount,
      status: OrderStatusType.PAID,
      method: PaymentMethodType.CASH,
    });
  };

  return (
    <div className={orderModalStyles.container}>
      <div className={orderModalStyles.overlay} ref={cashRef}>
        <form className={orderModalStyles.modal} onSubmit={handleSubmit}>
          <h1>{`You will pay $${amount} upon delivery.`}</h1>
          <div className={orderModalStyles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className={orderModalStyles.formGroup}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              required
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className={orderModalStyles.formGroup}>
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              id="address"
              required
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            ></textarea>
          </div>
          <div className={orderModalStyles.btns}>
            <button type="submit" className={orderModalStyles.submit}>
              Order
            </button>
            <button
              type="button"
              className={orderModalStyles.cancel}
              onClick={closeCashModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default OrderModal;
