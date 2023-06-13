import React, { useContext } from "react";
import { userContext } from "../../context/userContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  // Context and navigation
  const { user, logOutHandler } = useContext(userContext);
  const navigate = useNavigate();

  // Logout function
  const logOut = () => {
    logOutHandler();
    navigate('/');
  };

  // JSX rendering
  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          apStore
        </Link>
        {/* Navigation links */}
        <ul className={styles.navbarList}>
          <li className={styles.navbarItem}>
            <Link to="/" className={styles.navbarLink}>
              Home
            </Link>
          </li>
          {/* Conditional rendering based on user */}
          {user ? (
            // If user is logged in
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
            // If user is not logged in
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
