import React, { useEffect, useState, useContext } from "react";
import { productContext } from "../../context/productContext";
import styles from "./Checkbox.module.css";

function Checkbox({ label }) {

  // checkedCategories set
  const { checkedCategories, setCheckedCategories } = useContext(productContext);
  // checked status
  const [isChecked, setIsChecked] = useState(() => checkedCategories.has(label));

  // toggle checkbox check function
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      setCheckedCategories((prevCategories) => new Set(prevCategories).add(label));
    } else {
      const updatedSet = new Set(checkedCategories);
      updatedSet.delete(label);
      setCheckedCategories(updatedSet);
    }
  }, [isChecked, label, setCheckedCategories]);

  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggleCheckbox}
        className={styles.checkboxInput}
      />
      <div className={styles.custome_box_container}>
        <span className={styles.checkboxCheckmark}></span>
        {label}
      </div>
    </label>
  );
}

export default Checkbox;
