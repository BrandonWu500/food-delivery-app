import EditModal from '@/components/EditModal';
import { server } from '@/config';
import { OrderSchemaType, OrderType } from '@/models/Order';
import { ProductType } from '@/models/Product';
import adminStyles from '@/styles/Admin.module.scss';
import { PaymentMethodType } from '@/types/orderTypes';
import axios from 'axios';
import Image from 'next/image';
import { useRef, useState } from 'react';

type AdminProps = {
  products: ProductType[];
  orders: OrderSchemaType[];
};

const admin = ({ products, orders }: AdminProps) => {
  const orderStatusOptions = ['preparing', 'on the way', 'delivered'];
  const [showModal, setShowModal] = useState(false);

  const editProductRef = useRef(products[0]);

  const handleEdit = (product: ProductType) => {
    editProductRef.current = product;
    setShowModal(true);
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
            {products.map((product, idx) => (
              <tr key={idx}>
                <td>
                  <div>
                    <Image src={product.img} alt="" width={64} height={64} />
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
                    <button className={adminStyles.delete}>Delete</button>
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
            {orders.map((order, idx) => (
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
                    <button className={adminStyles.next}>Next Stage</button>
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

export const getServerSideProps = async () => {
  const [productsRes, ordersRes] = await Promise.all([
    axios.get(`${server}/api/products`),
    axios.get(`${server}/api/orders`),
  ]);
  return {
    props: { products: productsRes.data, orders: ordersRes.data },
  };
};

export default admin;
