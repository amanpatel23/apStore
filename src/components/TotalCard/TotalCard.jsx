import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { productContext } from '../../context/productContext';
import styles from './TotalCard.module.css';

function TotalCard ({ total }) {

  const { placeOrderHandler } = useContext(productContext);
  
  const navigate = useNavigate();

  const placeOrder = () => {
    placeOrderHandler();
    navigate('/orders');
  }

  return (
    <div className={styles.totalCard}>
      <h3 className={styles.totalLabel}>Total</h3>
      <p className={styles.totalPrice}>₹{total}</p>
      <button onClick={placeOrder} className={styles.purchaseButton}>Purchase</button>
    </div>
  );
};

export default TotalCard;
