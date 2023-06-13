import React from 'react';
import styles from './OrderDetails.module.css';
import TruncatedName from '../TruncatedName/TruncatedName';
import FormattedDate from '../FormattedDate/FormattedDate';

function OrderDetails({ date, items }) {
  // Function to calculate the grand total of the order
  const calculateGrandTotal = () => {
    let grandTotal = 0;
    for (let item of items) {
      grandTotal += parseInt(item.price) * parseInt(item.qty);
    }
    return grandTotal;
  };

  // JSX rendering
  return (
    <div className={styles.order}>
      {/* Order date */}
      <h3 className={styles.orderDate}>Order On: <FormattedDate date={date} /></h3>
      {/* Order table */}
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
          {/* Render order items */}
          {items.map((item) => (
            <tr key={item.id}>
              {/* Item name */}
              <td><TruncatedName maxLen={20} name={item.name} /></td>
              {/* Item price */}
              <td>₹{item.price}</td>
              {/* Item quantity */}
              <td>{item.qty}</td>
              {/* Item total */}
              <td>₹{parseInt(item.price) * parseInt(item.qty)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {/* Grand total row */}
          <tr>
            <td colSpan="3" className={styles.grandTotalLabel}>
              Grand Total
            </td>
            {/* Grand total amount */}
            <td className={styles.grandTotalAmount}>₹{calculateGrandTotal()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
