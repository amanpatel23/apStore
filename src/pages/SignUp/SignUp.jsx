import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";

function SignUp() {
  // State variables for name, email, password, and confirm password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Navigate object for programmatic navigation
  const navigate = useNavigate();

  // Accessing data and functions from the user context
  const { signUpHandler, user } = useContext(userContext);

  // Submit handler for the sign-up form
  const submitHandler = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords Don't Match.");
      return;
    }

    // Call the sign-up handler
    await signUpHandler(name, email, password);
  };

  // Effect hook to redirect to home page if user is already signed in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <form onSubmit={submitHandler} className={styles.signUpForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            onChange={(event) => setName(event.target.value)}
            value={name}
            type="text"
            id="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
            required
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
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            onChange={(event) => setConfirmPassword(event.target.value)}
            value={confirmPassword}
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className={styles.signUpButton}>
          Sign Up
        </button>
      </form>
      <div className={styles.signInLink}>
        Already have an account? <Link to="/signin">Sign in</Link>
      </div>
    </div>
  );
}

export default SignUp;
