import React, { useContext, useEffect } from "react";
import { productContext } from "../../context/productContext";
import styles from "./ProductCard.module.css";
import { toast } from "react-toastify";
import TruncatedName from "../TruncatedName/TruncatedName";

function ProductCard({ id, image, name, price, addToCartHandler }) {
  // Accessing product context
  const { clickedItem } = useContext(productContext);

  // Add to cart function
  const addToCart = () => {
    addToCartHandler(id, image, name, price);
  };

  // JSX rendering
  return (
    <div className={styles.card}>
      {/* Product image */}
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.product_desc}>
        {/* Product name */}
        <h3 className={styles.name}><TruncatedName maxLen={65} name={name} /></h3>
        {/* Product price */}
        <p className={styles.price}>₹ {price}</p>
        {/* Add to cart button */}
        <button className={styles.addToCartButton} onClick={addToCart}>
          {/* Conditional rendering based on clicked item */}
          {clickedItem && clickedItem === id ? "Adding to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

