import React, { useContext } from "react";
import { productContext } from "../../context/productContext";
import styles from "./CartCard.module.css";
import TruncatedName from "../TruncatedName/TruncatedName";

function CartCard({ id, image, name, price, qty }) {
  // Accessing product context
  const { addToCartHandler, decrementQtyHandler, removeFromCartHandler } =
    useContext(productContext);

  // Add to cart function
  const addToCart = () => {
    addToCartHandler(id, image, name, price);
  };

  // Decrement quantity function
  const decrementQty = () => {
    decrementQtyHandler(id);
  };

  // Remove from cart function
  const removeFromCart = () => {
    removeFromCartHandler(id);
  };

  // JSX rendering
  return (
    <div className={styles.cartCard}>
      {/* Product image */}
      <img src={image} alt={name} className={styles.cartCardImage} />
      <div className={styles.product_desc}>
        {/* Product name */}
        <h4 className={styles.cartCardName}><TruncatedName maxLen={65} name={name} /></h4>
        {/* Product price */}
        <p className={styles.cartCardPrice}>₹{price}</p>
        {/* Quantity controls */}
        <div className={styles.quantityControls}>
          {/* Decrement quantity button */}
          <button onClick={decrementQty} className={styles.quantityButton}>
            -
          </button>
          {/* Quantity count */}
          <span className={styles.quantityCount}>{qty}</span>
          {/* Increment quantity button */}
          <button onClick={addToCart} className={styles.quantityButton}>
            +
          </button>
        </div>
        {/* Remove from cart button */}
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
