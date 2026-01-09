import React, { useState, useEffect, useRef } from "react";
import {
  Fab,
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios"; // ✅ Import axios

const ChatbotFab = ({ isDark }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I'm your assistant. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message immediately
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Use Vite proxy to avoid CORS and hardcoding host
      const response = await axios.post("/api/ask", {
        query: input,
      });

      const botReply = response?.data?.answer || "I am not trained for that.";

      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error talking to backend:", error);
      const errMsg =
        error?.response?.data?.error ||
        (error?.message ? `Network error: ${error.message}` :
          "⚠️ Sorry, I couldn’t connect to the server.");
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: errMsg },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 90, sm: 24 },
        right: { xs: 16, sm: 24 },
        zIndex: 2000,
      }}
    >
      {/* Chat Window */}
      {open && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            bottom: { xs: 70, sm: 80 },
            right: 0,
            width: { xs: "90vw", sm: 300 },
            height: { xs: 300, sm: 380 },
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            bgcolor: isDark ? "#0a1929" : "#fff",
            color: isDark ? "#fff" : "#000",
          }}
        >
          {/* Messages */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.from === "user" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    maxWidth: "70%",
                    bgcolor:
                      msg.from === "user"
                        ? isDark
                          ? "#1976d2"
                          : "#0a1929"
                        : isDark
                        ? "rgba(255,255,255,0.1)"
                        : "#e0e0e0",
                    color:
                      msg.from === "user"
                        ? "#fff"
                        : isDark
                        ? "#fff"
                        : "#000",
                    fontSize: "0.85rem",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
            {loading && (
              <Typography
                sx={{ fontSize: "0.8rem", color: "gray", textAlign: "center" }}
              >
                Aura is typing...
              </Typography>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box sx={{ display: "flex", p: 1 }}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              sx={{
                bgcolor: isDark ? "#1e293b" : "#f5f5f5",
                borderRadius: 1,
                input: { color: isDark ? "#fff" : "#000" },
              }}
            />
            <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* Floating Button */}
      <Fab
        sx={{
          bgcolor: isDark ? "#1976d2" : "#0a1929",
          color: "#fff",
          fontSize: "1.8rem",
          "&:hover": { bgcolor: isDark ? "#1565c0" : "#111827" },
        }}
        onClick={() => setOpen(!open)}
      >
        🤖
      </Fab>
    </Box>
  );
};

export default ChatbotFab;
