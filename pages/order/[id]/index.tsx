import OrderSummary from '@/components/OrderSummary';
import { server } from '@/config';
import orderStyles from '@/styles/Order.module.scss';
import { OrderStatusType } from '@/types/orderTypes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export type OrderItemType = {
  id: number | string;
  customer: string;
  address: string;
  total: number;
  status: string;
};

const order = () => {
  const router = useRouter();
  const queryId = router.query.id;
  const [info, setInfo] = useState({ total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [orderStatus, setOrderStatus] = useState(0);

  /* status will be represented by number/enum, subtract it from the index 
  of each step, 
  if it is below a certain threshold then that means it will be done,
  if it is at threshold, then that means currently on that step,
  if it is above threshold, then that means step has not been completed yet */

  const statusClass = (idx: number) => {
    if (idx - orderStatus < 1)
      return `${orderStyles.complete} ${orderStyles.group}`;
    if (idx - orderStatus === 1)
      return `${orderStyles.progress} ${orderStyles.group}`;
    if (idx - orderStatus > 1)
      return `${orderStyles.incomplete} ${orderStyles.group}`;
  };

  useEffect(() => {
    if (!queryId) return;
    const fetcher = async () => {
      try {
        const res = await fetch(`${server}/api/orders/${queryId}`);
        const data = await res.json();
        const { status, ...rest } = data;
        if (status === 'paid') setOrderStatus(OrderStatusType.PAID);
        if (status === 'preparing') setOrderStatus(OrderStatusType.PREPARING);
        if (status === 'on the way') setOrderStatus(OrderStatusType.ON_THE_WAY);
        if (status === 'delivered') setOrderStatus(OrderStatusType.DELIVERED);

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
          {Object.entries(info).map(([key, val]: any) => (
            <div className={orderStyles.infoGroup} key={key}>
              <h2>{key === 'id' ? 'Order ID' : key}</h2>
              {key === 'address' ? (
                <div className={orderStyles.address}>
                  <p>{val.split('\n')[0]}</p>
                  <p>{val.split('\n')[1]}</p>
                </div>
              ) : (
                <p>{val}</p>
              )}
            </div>
          ))}
        </div>
        <div className={orderStyles.wrapper}>
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
            <p>Delivered</p>
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
        subtotal={info.total}
        cart={false}
        paid={orderStatus >= OrderStatusType.PAID}
      />
    </div>
  );
};

export default order;
