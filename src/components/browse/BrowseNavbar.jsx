import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./BrowseNavbar.css";

const NAV_LINKS = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];

// NOTE: renamed from Navbar -> BrowseNavbar and moved into components/browse/
// specifically so it never collides with your existing Landing Page
// src/components/Navbar.jsx, which is untouched by this change.
export default function BrowseNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const initial = (user?.name || "U").charAt(0).toUpperCase();

  return (
    <header className={`sf-navbar ${scrolled ? "sf-navbar--scrolled" : ""}`}>
      <div className="sf-navbar__left">
        <span className="sf-logo">STREAMFLIX</span>
        <nav className="sf-nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" onClick={(e) => e.preventDefault()}>
              {link}
            </a>
          ))}
        </nav>
      </div>

      <div className="sf-navbar__right">
        <div className={`sf-search ${searchOpen ? "sf-search--open" : ""}`}>
          <button
            className="sf-icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <SearchIcon />
          </button>
          <input type="text" placeholder="Titles, people, genres" />
        </div>

        <button className="sf-icon-btn" aria-label="Notifications">
          <BellIcon />
        </button>

        <div className="sf-profile" onClick={() => setMenuOpen((m) => !m)}>
          <div className="sf-avatar">{initial}</div>
          <span className={`sf-caret ${menuOpen ? "sf-caret--open" : ""}`}>▾</span>

          {menuOpen && (
            <div className="sf-profile-menu">
              <div className="sf-profile-menu__item">
                <div className="sf-avatar sf-avatar--sm">{initial}</div>
                {user?.name || "Account"}
              </div>
              <hr />
              <button type="button">Account</button>
              <button type="button">Help Center</button>
              <hr />
              <button onClick={handleLogout}>Sign out of StreamFlix</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a5 5 0 00-5 5v3.2c0 .6-.2 1.2-.6 1.7L5 15h14l-1.4-2.1c-.4-.5-.6-1.1-.6-1.7V8a5 5 0 00-5-5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M10 18a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
