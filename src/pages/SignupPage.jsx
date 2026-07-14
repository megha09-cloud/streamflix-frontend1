import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/auth.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Email may arrive prefilled from the Landing Page (e.g. navigate("/signup", { state: { email } }))
  const prefillEmail = location.state?.email || "";

  const [form, setForm] = useState({
    name: "",
    email: prefillEmail,
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) {
      next.name = "Please enter your full name.";
    } else if (form.name.trim().length < 2) {
      next.name = "Name must be at least 2 characters.";
    }

    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      next.password = "Please create a password.";
    } else if (form.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    setServerError("");

    const result = await registerUser({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });

    setSubmitting(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/login", { state: { email: form.email.trim() } });
      }, 900);
    } else {
      setServerError(result.message);
    }
  }

  return (
    <div className="auth-page">
      <Link to="/" className="auth-logo">STREAMFLIX</Link>
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Create Account</h1>

        {serverError && <div className="auth-banner-error">{serverError}</div>}
        {success && <div className="auth-success">Account created! Redirecting to sign in…</div>}

        <div className="auth-field">
          <input
            id="name"
            name="name"
            type="text"
            className={`${form.name ? "has-value" : ""} ${errors.name ? "has-error" : ""}`}
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            disabled={submitting || success}
          />
          <label htmlFor="name">Full Name</label>
        </div>
        {errors.name && <p className="auth-field-error">{errors.name}</p>}

        <div className="auth-field">
          <input
            id="email"
            name="email"
            type="email"
            className={`${form.email ? "has-value" : ""} ${errors.email ? "has-error" : ""}`}
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            disabled={submitting || success}
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
            autoComplete="new-password"
            disabled={submitting || success}
          />
          <label htmlFor="password">Create Password</label>
        </div>
        {errors.password && <p className="auth-field-error">{errors.password}</p>}

        <button className="auth-submit" type="submit" disabled={submitting || success}>
          {submitting && <LoadingSpinner />}
          {submitting ? "Creating Account…" : "Create Account"}
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/login")}>
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
}
