// src/Header.jsx
import { Button } from "@mui/material";
import { FaCloudSun, FaCloudMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header({ isDark, toggleTheme }) {
  const navigate = useNavigate();
  return (
    <header
      className="w-full flex items-center justify-between px-8 py-5 shadow-lg text-text transition-colors duration-300"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
        background: isDark ? "#1a202c" : "#fff", // solid background for light/dark mode
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      {/* Project Name with enhanced styling */}
      <div style={{ marginLeft: "6rem", display: "flex", alignItems: "center" }}>
        <h1 className="text-3xl font-bold font-primary tracking-tight text-primary ">
          AURORA
        </h1>
      </div>
      {/* Right Side: Theme Toggle + Login */}
      <div className="flex items-center gap-6">
        {/* Enhanced Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="relative w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary shadow-md hover:shadow-lg"
          aria-label="Toggle theme"
        >
          <div
            className={`absolute flex items-center justify-center w-5 h-5 rounded-full bg-white transition-all duration-300 transform ${
              isDark ? "translate-x-7" : "translate-x-0"
            }`}
          >
            {isDark ? (
              <FaCloudSun className="text-yellow-500 text-sm" />
            ) : (
              <FaCloudMoon className="text-gray-700 text-sm" />
            )}
          </div>
        </button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "12px",
            margin: "15px",
            padding: "6px 24px",
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "none",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            "&:hover": {
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
          onClick={() => navigate('/userlogin')}
        >
          Login
        </Button>
      </div>
    </header>
  );
}

export default Header;
