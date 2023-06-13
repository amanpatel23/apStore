import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import styles from "./SignIn.module.css";

function SignIn() {
  // Accessing data and functions from the user context
  const { signInHandler, user } = useContext(userContext);

  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigate object for programmatic navigation
  const navigate = useNavigate();

  // Sign in function
  const signIn = (event) => {
    event.preventDefault();
    signInHandler(email, password);
  };

  // Effect hook to redirect to home page if user is already signed in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={signIn} className={styles.signInForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className={styles.signInButton}>
          Sign In
        </button>
      </form>
      <div className={styles.signUpLink}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default SignIn;
