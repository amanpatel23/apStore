import React, { useContext } from "react";
import { productContext } from "../../context/productContext";
import styles from "./CartCard.module.css";
import TruncatedName from "../TruncatedName/TruncatedName";

function CartCard({ id, image, name, price, qty }) {
  const { addToCartHandler, decrementQtyHandler, removeFromCartHandler } =
    useContext(productContext);

  const addToCart = () => {
    addToCartHandler(id, image, name, price);
  };

  const decrementQty = () => {
    decrementQtyHandler(id);
  };

  const removeFromCart = () => {
    removeFromCartHandler(id);
  };

  return (
    <div className={styles.cartCard}>
      <img src={image} alt={name} className={styles.cartCardImage} />
      <div className={styles.product_desc}>
        <h4 className={styles.cartCardName}><TruncatedName maxLen={65} name={name} /></h4>
        <p className={styles.cartCardPrice}>₹{price}</p>
        <div className={styles.quantityControls}>
          <button onClick={decrementQty} className={styles.quantityButton}>
            -
          </button>
          <span className={styles.quantityCount}>{qty}</span>
          <button onClick={addToCart} className={styles.quantityButton}>
            +
          </button>
        </div>
        <button
          onClick={removeFromCart}
          className={styles.removeFromCartButton}
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
}

export default CartCard;
