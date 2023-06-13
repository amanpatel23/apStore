import React, { useContext } from "react";
import Loading from "../../pages/Loading/Loading";
import { productContext } from "../../context/productContext";
import CartCard from "../../components/CartCard/CartCard";
import TotalCard from "../../components/TotalCard/TotalCard";
import styles from "./Cart.module.css";

function Cart() {
  // Accessing data from the product context
  const { cartItems, isCartItemsLoading } = useContext(productContext);

  // Function to calculate the total price of all items in the cart
  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (total, curr) => total + parseInt(curr.price) * parseInt(curr.qty),
      0
    );
    return totalPrice;
  };

  // If the cart items are still loading, display the Loading component
  if (isCartItemsLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.cartPage}>
      {/* If the cart is empty, display a message */}
      {cartItems.length === 0 ? (
        <div className={styles.cartEmpty}>
          <h3>Seriously! You Didn't Like Anything In The Store.</h3>
        </div>
      ) : (
        <>
          {/* Display the TotalCard component */}
          <div className={styles.totalCardSection}>
            <TotalCard total={getTotalPrice()} />
          </div>

          {/* Display the CartCard components for each item in the cart */}
          <div className={styles.cartCardSection}>
            {cartItems.map((item) => (
              <CartCard
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                qty={item.qty}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
