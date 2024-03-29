import EditModal from '@/components/EditModal';
import { server } from '@/config';
import { OrderSchemaType, OrderType } from '@/models/Order';
import { ProductType } from '@/models/Product';
import adminStyles from '@/styles/Admin.module.scss';
import { OrderStatusType, PaymentMethodType } from '@/types/orderTypes';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

type AdminProps = {
  products: ProductType[];
  orders: OrderSchemaType[];
};

const Admin = ({ products, orders }: AdminProps) => {
  const orderStatusOptions = [
    'preparing',
    'on the way',
    'delivering',
    'order complete',
  ];
  const [showModal, setShowModal] = useState(false);
  const [productInfos, setProductInfos] = useState(products);
  const [orderInfos, setOrderInfos] = useState(orders);
  const editProductRef = useRef(products[0]);

  const handleEdit = (product: ProductType) => {
    editProductRef.current = product;
    setShowModal(true);
  };

  const handleProductDelete = async (delProduct: ProductType) => {
    try {
      const res = await axios.delete(
        `${server}/api/products/${delProduct._id}`
      );
      const newProducts = productInfos.filter(
        (product) => product._id !== delProduct._id
      );
      setProductInfos(newProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderDelete = async (delOrder: OrderSchemaType) => {
    try {
      const res = await axios.delete(`${server}/api/orders/${delOrder._id}`);
      const newOrders = orderInfos.filter(
        (order) => order._id !== delOrder._id
      );
      setOrderInfos(newOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextStage = async (updateOrder: OrderSchemaType) => {
    try {
      const res = await axios.put(`${server}/api/orders/${updateOrder._id}`, {
        status: updateOrder.status + 1,
      });
      const updateItemIdx = orderInfos.findIndex(
        (order) => order._id === updateOrder._id
      );

      let newOrderInfos = [];

      // remove the original item and replace with new updated one while keeping order
      if (updateItemIdx === 0) {
        newOrderInfos = [res.data, ...orderInfos.slice(1)];
      } else {
        newOrderInfos = [
          ...orderInfos.slice(0, updateItemIdx),
          res.data,
          ...orderInfos.slice(updateItemIdx + 1),
        ];
      }

      // original solution which puts updated item at top of table
      /* const newOrders = [
        res.data,
        ...orderInfos.filter((order) => updateOrder._id !== order._id),
      ]; */
      setOrderInfos(newOrderInfos);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={adminStyles.container}>
      <section className={adminStyles.section}>
        <h2 className={adminStyles.tableTitle}>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Prices</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productInfos.map((product, idx) => (
              <tr key={idx}>
                <td>
                  <div>
                    <Link href={`/product/${product._id}`}>
                      <Image
                        src={product.img}
                        alt=""
                        width={64}
                        height={64}
                        style={{ objectFit: 'contain' }}
                      />
                    </Link>
                  </div>
                </td>
                <td>
                  <div>{product._id.toString()}</div>
                </td>
                <td>
                  <div>{product.title}</div>
                </td>
                <td>
                  <div>
                    {product.prices.map((price, idx) => (
                      <p key={idx}>${price.toFixed(2)}</p>
                    ))}
                  </div>
                </td>
                <td>
                  <div className={adminStyles.tableBtns}>
                    <button
                      className={adminStyles.edit}
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className={adminStyles.delete}
                      onClick={() => handleProductDelete(product)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditModal
          editProductRef={editProductRef}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </section>
      <section className={adminStyles.section}>
        <h2 className={adminStyles.tableTitle}>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderInfos.map((order, idx) => (
              <tr key={idx}>
                <td>
                  <div>{order._id.toString()}</div>
                </td>
                <td>
                  <div>{order.customer}</div>
                </td>
                <td>
                  <div>${order.total.toFixed(2)}</div>
                </td>
                <td>
                  <div>
                    {order.method === PaymentMethodType.CASH
                      ? 'cash on delivery'
                      : 'paid online'}
                  </div>
                </td>
                <td>
                  <div>{orderStatusOptions[order.status]}</div>
                </td>
                <td>
                  <div className={adminStyles.tableBtns}>
                    {order.status < OrderStatusType.DELIVERED && (
                      <button
                        className={adminStyles.next}
                        onClick={() => handleNextStage(order)}
                      >
                        Next Stage
                      </button>
                    )}
                    <button
                      className={adminStyles.delete}
                      onClick={() => handleOrderDelete(order)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const myCookie = context.req?.cookies ?? '';
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  const [productsRes, ordersRes] = await Promise.all([
    axios.get(`${server}/api/products`),
    axios.get(`${server}/api/orders`),
  ]);
  return {
    props: { products: productsRes.data, orders: ordersRes.data },
  };
};

export default Admin;
