import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage"; // your existing page — unchanged
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import BrowsePage from "./pages/BrowsePage";

export default function App() {
  return (
    // AuthProvider MUST wrap every route, including "/" (Landing Page).
    // If it only wraps /browse, any component that calls useAuth()
    // outside that boundary throws immediately and the whole app
    // goes blank — this is the #1 cause of the crash you hit.
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/browse"
            element={
              <ProtectedRoute>
                <BrowsePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
