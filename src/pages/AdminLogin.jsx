import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "./AdminLogin.module.css";

export const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Try Firebase Auth first
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
      return;
    } catch (firebaseErr) {
      // Firebase not configured — fallback to local password
      const localPass = localStorage.getItem("admin_password") || "admin123";
      if (password === localPass && (email === "admin@portfolio.com" || email === "teja@portfolio.com")) {
        onLogin();
        return;
      }
      setError("Invalid email or password. If Firebase is not set up, use admin@portfolio.com / admin123");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <div className={styles.logo}>TR</div>
        </div>
        <h1 className={styles.title}>Admin Panel</h1>
        <p className={styles.subtitle}>Sign in to manage your portfolio content</p>

        {error && (
          <div className={styles.error}>
            <i className="bi bi-exclamation-circle-fill" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className={styles.inputWrap}>
              <i className="bi bi-envelope" />
              <input
                type="email"
                className={`form-input ${styles.input}`}
                placeholder="admin@portfolio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className={styles.inputWrap}>
              <i className="bi bi-lock" />
              <input
                type="password"
                className={`form-input ${styles.input}`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className={`btn btn-primary w-full ${styles.submitBtn}`} disabled={loading}>
            {loading ? (
              <><i className="bi bi-arrow-repeat" style={{ animation: "spin 1s linear infinite" }} /> Signing in...</>
            ) : (
              <><i className="bi bi-shield-lock-fill" /> Sign In</>
            )}
          </button>
        </form>

        <div className={styles.hint}>
          <i className="bi bi-info-circle" />
          Default: admin@portfolio.com / admin123
        </div>

        <a href="/" className={styles.backLink}>
          <i className="bi bi-arrow-left" /> Back to Portfolio
        </a>
      </div>
    </div>
  );
};
