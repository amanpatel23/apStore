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

// Create a product context
const productContext = createContext();

function ProductProvider({ children }) {
  // State variables
  const [productsArray, setProductsArray] = useState([]); // Array of all products
  const [cartItems, setCartItems] = useState([]); // Items in the cart
  const [orders, setOrders] = useState([]); // Placed orders
  const [isProductsLoading, setIsProductsLoading] = useState(false); // Loading state for products
  const [isCartItemsLoading, setIsCartItemsLoading] = useState(false); // Loading state for cart items
  const [isOrderDetailsLoading, setIsOrderDetailsLoading] = useState(false); // Loading state for order details
  const [clickedItem, setClickedItem] = useState(null); // Currently clicked item ID
  const [updateStatus, setUpdateStatus] = useState(null); // Status of update operation
  const [flashMessage, setFlashMessage] = useState(""); // Flash message to display
  const [searchQuery, setSearchQuery] = useState(""); // Search query for products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on search and filters
  const [checkedCategories, setCheckedCategories] = useState(new Set()); // Checked categories for filtering
  const [maxPrice, setMaxPrice] = useState(100000); // Maximum price for filtering
  const [placedOrder, setPlacedOrder] = useState(false); // Flag for placed order
  const [cartItemExists, setCartItemExists] = useState(""); // Flag for existing cart item

  const { user } = useContext(userContext); // Access user from user context

  // Add item to the cart
  const addToCartHandler = (id, image, name, price) => {
    if (!user) {
      setUpdateStatus("error");
      setFlashMessage("You Are Not LoggedIn.");
      return;
    }
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

  // Decrement the quantity of an item in the cart
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

    setFlashMessage("Product Count Decremented Successfully");
  };

  // Remove item from the cart
  const removeFromCartHandler = (id) => {
    setClickedItem(id);
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id)
    );

    setFlashMessage("Product Removed From Your Cart");
  };

  // Place an order
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
    } else if (updateStatus === "error") {
      toast.error(flashMessage);
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

  // Provide the product context value to the children
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
