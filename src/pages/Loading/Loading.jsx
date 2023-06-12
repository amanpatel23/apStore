import React from "react";
import { GridLoader } from "react-spinners";
import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loader_page}>
      <GridLoader color="#007bff" size={15} />
    </div>
  );
}

export default Loading;
