import React, { useContext, useEffect } from "react";
import { productContext } from "../../context/productContext";
import styles from "./ProductCard.module.css";
import { toast } from "react-toastify";
import TruncatedName from "../TruncatedName/TruncatedName";

function ProductCard({ id, image, name, price, addToCartHandler }) {

  const { clickedItem } = useContext(productContext);

  const addToCart = () => {
    addToCartHandler(id, image, name, price);
  };

  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.product_desc}>
        <h3 className={styles.name}><TruncatedName maxLen={65} name={name} /></h3>
        <p className={styles.price}>₹ {price}</p>
        <button className={styles.addToCartButton} onClick={addToCart}>
          {clickedItem && clickedItem === id ? "Adding to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
