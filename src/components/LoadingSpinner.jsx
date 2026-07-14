export default function LoadingSpinner({ size = 18 }) {
  return (
    <span
      className="auth-spinner"
      style={{ width: size, height: size }}
      aria-label="Loading"
      role="status"
    />
  );
}
