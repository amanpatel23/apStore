import React, { useContext } from "react";
import Loading from "../../pages/Loading/Loading";
import { productContext } from "../../context/productContext";
import CartCard from "../../components/CartCard/CartCard";
import TotalCard from "../../components/TotalCard/TotalCard";
import styles from "./Cart.module.css";

function Cart() {
  const { cartItems, isCartItemsLoading } = useContext(productContext);

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (total, curr) => total + parseInt(curr.price) * parseInt(curr.qty),
      0
    );
    return totalPrice;
  };

  if (isCartItemsLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.cartPage}>
      {cartItems.length == 0 ? (
        <div className={styles.cartEmpty}>
          <h3>Seriously! You Didn't Like Nothing In The Store.</h3>
        </div>
      ) : (
        <>
          <div className={styles.totalCardSection}>
            <TotalCard total={getTotalPrice()} />
          </div>

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
