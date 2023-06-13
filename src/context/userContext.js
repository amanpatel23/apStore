import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const userContext = createContext();

function UserProvider({ children }) {
  // State variables
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sign up a new user
  const signUpHandler = async (name, email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("User Registered.");
      userCredential.user.displayName = name;
      setUser(userCredential.user);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        cartItems: [],
        purchases: [],
      });
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setUser(null);
      setIsLoading(false);
    }
  };

  // Sign in an existing user
  const signInHandler = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("You Are SignedIn.");
      setUser(userCredential.user);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setUser(null);
      toast.error(error.message);
    }
  };

  // Log out the current user
  const logOutHandler = async () => {
    try {
      signOut(auth);
      toast.success("Logged Out Successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Provide the user context value to child components
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        signUpHandler,
        signInHandler,
        logOutHandler,
        isLoading,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
export { userContext };
