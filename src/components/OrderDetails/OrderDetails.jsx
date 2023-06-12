import React from 'react';
import styles from './OrderDetails.module.css';
import TruncatedName from '../TruncatedName/TruncatedName';
import FormattedDate from '../FormattedDate/FormattedDate';

function OrderDetails({ date, items }) {
  const calculateGrandTotal = () => {
    let grandTotal = 0;
    for (let item of items) {
      grandTotal += parseInt(item.price) * parseInt(item.qty);
    }
    return grandTotal;
  };

  return (
    <div className={styles.order}>
      <h3 className={styles.orderDate}>Order On: <FormattedDate date={date} /></h3>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td><TruncatedName maxLen={20} name={item.name} /></td>
              <td>₹{item.price}</td>
              <td>{item.qty}</td>
              <td>₹{parseInt(item.price) * parseInt(item.qty)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className={styles.grandTotalLabel}>
              Grand Total
            </td>
            <td className={styles.grandTotalAmount}>₹{calculateGrandTotal()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
