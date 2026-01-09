import { Button, Typography, Box } from "@mui/material";
import { FaCloudSun, FaCloudMoon } from "react-icons/fa";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useNavigate } from "react-router-dom";

function Header({ isDark, toggleTheme }) {
  const navigate = useNavigate();

  // Water safety tips for Aurora project
  const tips = [
    "Always check water sources before use.",
    "Report any unusual taste, color, or odor in water.",
    "Participate in community water quality awareness programs.",
    "Use clean containers for water storage.",
    "Stay updated with Aurora for safe water tips."
  ];

  return (
    <>
      {/* Scrolling tips bar */}
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          position: 'fixed',
          top: 0,
          zIndex: 1301,
          backgroundImage: isDark
            ? 'linear-gradient(to right, #1976d2, #1565c0, #0d47a1)'
            : 'linear-gradient(to right, #43cea2, #185a9d)',
          color: isDark ? '#fff' : '#001e3c',
          fontWeight: 'bold',
          fontSize: '18px',
          py: 1.2,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            whiteSpace: 'nowrap',
            py: 0.5,
            animation: 'scrollText 15s linear infinite',
            '@keyframes scrollText': {
              '0%': { transform: 'translateX(0%)' },
              '100%': { transform: 'translateX(-30%)' },
            },
          }}
        >
          {tips.map((text, index) => (
            <Typography key={index} sx={{ display: 'flex', alignItems: 'center', mx: 4 }}>
              <AutoAwesomeIcon sx={{ mr: 1, fontSize: '18px' }} />
              {text}
            </Typography>
          ))}
        </Box>
      </Box>
      {/* Main header */}
      <header
        className="w-full flex items-center justify-between px-8 py-5 shadow-lg text-text transition-colors duration-300"
        style={{
          position: "fixed",
          top: 36, // Height of the tips bar
          left: 0,
          width: "100%",
          zIndex: 1100,
          background: isDark ? "#1a202c" : "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ marginLeft: "2rem", display: "flex", alignItems: "center" }}>
          <h1 className="text-3xl font-bold font-primary tracking-tight text-primary ">
            AURORA
          </h1>
        </div>
        <div className="flex items-center gap-6">
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
    </>
  );
}

export default Header;