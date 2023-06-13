import {
  getDocs,
  collection,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./userContext";
import { db } from "../config/firebaseConfig";
import { toast } from "react-toastify";

const productContext = createContext();

function ProductProvider({ children }) {
  const [productsArray, setProductsArray] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [isCartItemsLoading, setIsCartItemsLoading] = useState(false);
  const [isOrderDetailsLoading, setIsOrderDetailsLoading] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [flashMessage, setFlashMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState(new Set());
  const [maxPrice, setMaxPrice] = useState(100000);
  const [placedOrder, setPlacedOrder] = useState(false);
  const [cartItemExists, setCartItemExists] = useState("");

  const { user } = useContext(userContext);

  const addToCartHandler = (id, image, name, price) => {
    setClickedItem(id);
    const existingItem = cartItems.find((item) => item.id === id);
    if (!existingItem) {
      setCartItemExists("no");
      const newCartItem = { id, image, name, price, qty: 1 };
      setCartItems((prevCartItems) => [newCartItem, ...prevCartItems]);
    } else {
      setCartItemExists("yes");
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    }
  };

  const decrementQtyHandler = (id) => {
    setClickedItem(id);
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        })
        .filter((item) => item.qty > 0)
    );

    setFlashMessage("Product Count Decremented Succesfully");
  };

  const removeFromCartHandler = (id) => {
    setClickedItem(id);
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id)
    );

    setFlashMessage("Product Removed From Your Cart");
  };

  const placeOrderHandler = () => {
    setPlacedOrder(true);
    const currOrder = [];
    cartItems.forEach((item) => currOrder.push(item));
    setOrders((prevOrders) => [
      { date: Date.now(), items: currOrder },
      ...prevOrders,
    ]);
    setCartItems([]);
    setFlashMessage("Your Order Was Placed Successfully");
  };

  useEffect(() => {
    if (!clickedItem) return;

    if (cartItemExists === "no") {
      setFlashMessage("Product Added Successfully");
    } else if (cartItemExists === "yes") {
      setFlashMessage("Product Count Incremented Successfully");
    }

    const updateCartItem = async () => {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          cartItems: cartItems,
        });
        setUpdateStatus("success");
        setClickedItem(null);
        setPlacedOrder(false);
        setCartItemExists("");
      } catch (error) {
        toast.error(error.message);
        setClickedItem(null);
        setPlacedOrder(false);
        setCartItemExists("");
      }
    };

    updateCartItem();
  }, [cartItems, clickedItem, cartItemExists]);

  useEffect(() => {
    if (!placedOrder) return;

    setIsOrderDetailsLoading(true);
    const updateOrders = async () => {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          purchases: orders,
          cartItems: cartItems,
        });
        setUpdateStatus("success");
        setPlacedOrder(false);
        setIsOrderDetailsLoading(false);
      } catch (error) {
        toast.error(error.message);
        setPlacedOrder(false);
        setIsOrderDetailsLoading(false);
      }
    };

    updateOrders();
  }, [orders]);

  useEffect(() => {
    const getCartItems = async () => {
      if (!user) return;
      setIsCartItemsLoading(true);
      try {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        setCartItems(snapshot.data().cartItems);
        setOrders(snapshot.data().purchases);
        setIsCartItemsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsCartItemsLoading(false);
      }
    };

    getCartItems();
  }, [user]);

  useEffect(() => {
    if (updateStatus === "success") {
      toast.success(flashMessage);
    }
    setUpdateStatus(null);
  }, [updateStatus]);

  useEffect(() => {
    const filteredItems = searchQuery
      ? productsArray.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : productsArray;

    const filteredByCategories =
      checkedCategories.size === 0
        ? filteredItems
        : filteredItems.filter((item) => checkedCategories.has(item.category));

    const filteredByMaxPrice = filteredByCategories.filter(
      (item) => parseInt(item.price) <= maxPrice
    );

    setFilteredProducts(filteredByMaxPrice);
  }, [searchQuery, checkedCategories, maxPrice]);

  useEffect(() => {
    const getProducts = async () => {
      setIsProductsLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "products"));
        snapshot.forEach((doc) => {
          const products = doc.data().products;
          setProductsArray(products);
          setFilteredProducts(products);
        });

        setIsProductsLoading(false);
      } catch (error) {
        toast.error(error.message);
        setIsProductsLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <productContext.Provider
      value={{
        productsArray,
        isProductsLoading,
        isCartItemsLoading,
        addToCartHandler,
        clickedItem,
        cartItems,
        decrementQtyHandler,
        removeFromCartHandler,
        searchQuery,
        setSearchQuery,
        filteredProducts,
        checkedCategories,
        setCheckedCategories,
        setMaxPrice,
        placeOrderHandler,
        orders,
        isOrderDetailsLoading,
      }}
    >
      {children}
    </productContext.Provider>
  );
}

export { productContext };
export default ProductProvider;
