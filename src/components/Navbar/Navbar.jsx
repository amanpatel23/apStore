import React, { useContext } from "react";
import { userContext } from "../../context/userContext";
import { Link, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, logOutHandler } = useContext(userContext);

  const logOut = () => {
    logOutHandler();
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          apStore
        </Link>
        <ul className={styles.navbarList}>
          <li className={styles.navbarItem}>
            <Link to="/" className={styles.navbarLink}>
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li className={styles.navbarItem}>
                <Link to="/orders" className={styles.navbarLink}>
                  My Orders
                </Link>
              </li>
              <li className={styles.navbarItem}>
                <Link to="/cart" className={styles.navbarLink}>
                  Cart
                </Link>
              </li>
              <li className={styles.navbarItem}>
                <button onClick={logOut} className={styles.navbarButton}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.navbarItem}>
                <Link to="/signIn" className={styles.navbarLink}>
                  SignIn
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
