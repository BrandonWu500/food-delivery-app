import OrderSummary from '@/components/OrderSummary';
import { server } from '@/config';
import { OrderType } from '@/models/Order';
import orderStyles from '@/styles/Order.module.scss';
import { OrderStatusType } from '@/types/orderTypes';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export type OrderItemType = {
  id: number | string;
  customer: string;
  address: string;
  total: number;
  status: string;
};

const fetcher = async (url: any) => {
  if (url.includes('undefined')) return;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const Order = () => {
  const router = useRouter();
  const queryId = router.query.id;
  const { data: orderData, error } = useSWR(
    `${server}/api/orders/${queryId}`,
    fetcher,
    {
      refreshInterval: 3000,
    }
  );
  const [info, setInfo] = useState<OrderType | any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  /* status will be represented by number/enum, subtract it from the index 
  of each step, 
  if it is below a certain threshold then that means it will be done,
  if it is at threshold, then that means currently on that step,
  if it is above threshold, then that means step has not been completed yet */

  const statusClass = (idx: number) => {
    if (idx - orderData.status < 1)
      return `${orderStyles.complete} ${orderStyles.group}`;
    if (idx - orderData.status === 1)
      return `${orderStyles.progress} ${orderStyles.group}`;
    if (idx - orderData.status > 1)
      return `${orderStyles.incomplete} ${orderStyles.group}`;
  };

  useEffect(() => {
    if (!queryId) return;
    const fetcher = async () => {
      try {
        const res = await fetch(`${server}/api/orders/${queryId}`);
        const data = await res.json();
        const { status, ...rest } = data;
        /* if (status === 'PAID') setOrderStatus(OrderStatusType.PAID);
        if (status === 'PREPARING') setOrderStatus(OrderStatusType.PREPARING);
        if (status === 'ON THE WAY') setOrderStatus(OrderStatusType.ON_THE_WAY);
        if (status === 'DELIVERED') setOrderStatus(OrderStatusType.DELIVERED); */

        setInfo(rest);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetcher();
  }, [queryId]);

  if (isLoading)
    return (
      <div className={orderStyles.container}>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className={orderStyles.container}>
      <section className={orderStyles.item}>
        <div className={orderStyles.wrapper}>
          <div className={orderStyles.infoGroup}>
            <h2>Order ID</h2>
            <p>{info._id}</p>
          </div>
          <div className={orderStyles.infoGroup}>
            <h2>Customer</h2>
            <p>{info.customer}</p>
          </div>
          <div className={orderStyles.infoGroup}>
            <h2>Address</h2>
            <p>{info.address.split(',')[0]}</p>
            {info.address.split(',')[1] && (
              <p>
                {info.address.split(',')[1]}, {info.address.split(',')[2]}
              </p>
            )}
          </div>
          <div className={orderStyles.infoGroup}>
            <h2>Total</h2>
            <p>{'$' + info.total.toFixed(2)}</p>
          </div>
        </div>
        <div className={`${orderStyles.wrapper} ${orderStyles.center}`}>
          <div className={statusClass(OrderStatusType.PAID)}>
            <Image src="/images/paid.png" alt="" width={48} height={48} />
            <p>Payment</p>
            <Image
              src="/images/checked.png"
              alt=""
              width={32}
              height={32}
              className={orderStyles.checkedIcon}
            />
          </div>
          <div className={statusClass(OrderStatusType.PREPARING)}>
            <Image src="/images/bake.png" alt="" width={48} height={48} />
            <p>Preparing</p>
            <Image
              src="/images/checked.png"
              alt=""
              width={32}
              height={32}
              className={orderStyles.checkedIcon}
            />
          </div>
          <div className={statusClass(OrderStatusType.ON_THE_WAY)}>
            <Image src="/images/bike.png" alt="" width={48} height={48} />
            <p>On the way</p>
            <Image
              src="/images/checked.png"
              alt=""
              width={32}
              height={32}
              className={orderStyles.checkedIcon}
            />
          </div>
          <div className={statusClass(OrderStatusType.DELIVERED)}>
            <Image src="/images/delivered.png" alt="" width={48} height={48} />
            <p>Delivering</p>
            <Image
              src="/images/checked.png"
              alt=""
              width={32}
              height={32}
              className={orderStyles.checkedIcon}
            />
          </div>
        </div>
      </section>
      <OrderSummary
        cart={false}
        paid={orderData.status >= OrderStatusType.PAID}
        orderStatus={orderData.status}
      />
    </div>
  );
};

export default Order;
