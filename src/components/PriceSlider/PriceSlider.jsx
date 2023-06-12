import React, { useEffect, useState, useContext } from "react";
import { productContext } from "../../context/productContext";
import styles from "./PriceSlider.module.css";

const PriceSlider = ({ min, max }) => {
  const [selectedRange, setSelectedRange] = useState([min, max]);

  const { setMaxPrice } = useContext(productContext);

  const handleSliderChange = (event) => {
    const { value } = event.target;
    setSelectedRange([min, parseInt(value)]);
  };

  useEffect(() => {
    setMaxPrice(selectedRange[1]);
  }, [selectedRange]);

  return (
    <div className={styles.priceSlider}>
      <input
        type="range"
        min={min}
        max={max}
        value={selectedRange[1]}
        onChange={handleSliderChange}
        className={styles.rangeSlider}
      />
      <div className={styles.rangeLabel}>
        Price Range: ₹{min} - ₹{selectedRange[1]}
      </div>
    </div>
  );
};

export default PriceSlider;
