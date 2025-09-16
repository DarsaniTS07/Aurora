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

const ChatbotFab = ({ isDark }) => {
  const [open, setOpen] = useState(false); // toggle chat window
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I'm your assistant. How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);

    // Fake bot reply (replace with real API later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `You said: "${input}"` },
      ]);
    }, 600);

    setInput("");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 90, sm: 24 }, // ✅ move up in mobile so it's not hidden
        right: { xs: 16, sm: 24 },  // ✅ give space on mobile edge
        zIndex: 2000, // ✅ ensure it's above everything
      }}
    >
      {/* Chat window */}
      {open && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            bottom: { xs: 70, sm: 80 }, // ✅ spacing from FAB
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
          {/* Chat messages */}
          <Box
            sx={{
              flex: 1,
              p: 1,
              overflowY: "auto",
            }}
          >
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
            {/* scroll anchor */}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input box */}
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

      {/* Floating Chatbot button */}
      <Fab
        sx={{
          bgcolor: isDark ? "#1976d2" : "#0a1929",
          color: "#fff",
          fontSize: "1.8rem",
          "&:hover": {
            bgcolor: isDark ? "#1565c0" : "#111827",
          },
        }}
        aria-label="chatbot"
        onClick={() => setOpen(!open)} // toggle window
      >
        🤖
      </Fab>
    </Box>
  );
};

export default ChatbotFab;