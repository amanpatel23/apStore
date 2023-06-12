import React, { useContext } from 'react';
import { productContext } from '../../context/productContext';
import styles from './Order.module.css';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import Loading from '../Loading/Loading';

function Order() {

  const { orders, isOrderDetailsLoading } = useContext(productContext);

  if (isOrderDetailsLoading) {
    return <Loading />
  }

  return (
    <div className={styles.orderPage}>
      <h2 className={styles.orderHeading}>Your Orders</h2>
      {orders && orders.map((order, index) => (
        <OrderDetails key={index} date={order.date} items={order.items} />
      ))}
    </div>
  );
};

export default Order;
