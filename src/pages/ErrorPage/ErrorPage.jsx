import React from "react";
import styles from "./ErrorPage.module.css";

function ErrorPage () {
  return (
    <div className={styles.errorPage}>
      <h1 className={styles.title}>Oops!</h1>
      <p className={styles.message}>It seems like you've entered a wrong URL.</p>
      <p className={styles.message}>Please check the URL and try again.</p>
      <img src="error.png" alt="Error" className={styles.image} />
    </div>
  );
};

export default ErrorPage;
