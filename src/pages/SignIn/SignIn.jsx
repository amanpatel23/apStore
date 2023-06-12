import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import styles from "./SignIn.module.css";

function SignIn() {
  const { signInHandler, user } = useContext(userContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = (event) => {
    event.preventDefault();
    signInHandler(email, password);
  };

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
