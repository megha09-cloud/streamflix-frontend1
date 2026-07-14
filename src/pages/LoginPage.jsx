import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/auth.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const prefillEmail = location.state?.email || "";

  const [form, setForm] = useState({ email: prefillEmail, password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  }

  function validate() {
    const next = {};
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      next.password = "Please enter your password.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    setServerError("");

    const result = await loginUser({
      
      email: form.email.trim(),
      password: form.password,
    
    });
    console.log(result);

    setSubmitting(false);

    if (result.success) {
      // Adjust field names here if your Login API response shape differs.
      const { token, user } = result.data;
      login(token, user);
      setTimeout(() => {
        navigate("/browse");
      },200);
    } else {
      setServerError(result.message);
    }
  }

  return (
    <div className="auth-page">
      <Link to="/" className="auth-logo">STREAMFLIX</Link>
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Sign In</h1>

        {serverError && <div className="auth-banner-error">{serverError}</div>}

        <div className="auth-field">
          <input
            id="email"
            name="email"
            type="email"
            className={`${form.email ? "has-value" : ""} ${errors.email ? "has-error" : ""}`}
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            disabled={submitting}
          />
          <label htmlFor="email">Email</label>
        </div>
        {errors.email && <p className="auth-field-error">{errors.email}</p>}

        <div className="auth-field">
          <input
            id="password"
            name="password"
            type="password"
            className={`${form.password ? "has-value" : ""} ${errors.password ? "has-error" : ""}`}
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            disabled={submitting}
          />
          <label htmlFor="password">Password</label>
        </div>
        {errors.password && <p className="auth-field-error">{errors.password}</p>}

        <div className="auth-row">
          <label className="auth-checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <button type="button" className="auth-link">Forgot password?</button>
        </div>

        <button className="auth-submit" type="submit" disabled={submitting}>
          {submitting && <LoadingSpinner />}
          {submitting ? "Signing In…" : "Sign In"}
        </button>

        <p className="auth-footer">
          New to StreamFlix?{" "}
          <button type="button" onClick={() => navigate("/signup")}>
            Sign up now
          </button>
        </p>
      </form>
    </div>
  );
}
