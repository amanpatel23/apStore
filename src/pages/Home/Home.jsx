import React, { useEffect, useContext } from "react";
import { productContext } from "../../context/productContext";
import Checkbox from "../../components/Checkbox/Checkbox";
import styles from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import PriceSlider from "../../components/PriceSlider/PriceSlider";

function Home() {
  const { filteredProducts, addToCartHandler, searchQuery, setSearchQuery } =
    useContext(productContext);

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          type="text"
          placeholder="Search products..."
          className={styles.searchInput}
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.filterSection}>
          <h3>Filter</h3>
          <div className={styles.priceSlider}>
            {/* Price slider component */}
            <PriceSlider min={1} max={100000} />
          </div>
          <h3>Categories</h3>
          <div className={styles.categoryCheckboxes}>
            <Checkbox label="Men's Clothing" />
            <Checkbox label="Women's Clothing" />
            <Checkbox label="Jewelry" />
            <Checkbox label="Electronics" />
          </div>
        </div>
        <div className={styles.productSection}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              addToCartHandler={addToCartHandler}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
          {/* More product cards */}
        </div>
      </div>
    </div>
  );
}

export default Home;
