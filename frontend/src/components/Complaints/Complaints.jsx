import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const Complaints = () => {
  const theme = useTheme();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log to console as requested
    // eslint-disable-next-line no-console
    console.log("Complaint submitted:", message.trim());
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", px: { xs: 2, sm: 3 }, py: 2 }}>
      {/* Title above the card */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: "primary.main",
        }}
      >
        Complaints
      </Typography>

      <Card
        elevation={3}
        sx={{
          position: "relative",
          borderRadius: 3,
          bgcolor: theme.palette.mode === "dark" ? "background.paper" : "#0d1b2a08",
          border: "1px solid",
          borderColor: theme.palette.mode === "dark" ? "primary.dark" : "divider",
          minHeight: { xs: 420, sm: 480 },
        }}
      >
        {/* Chatbot icon in the top-right corner */}
        <IconButton
          aria-label="chatbot"
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log("Chatbot icon clicked");
          }}
        >
          <SmartToyIcon color="primary" />
        </IconButton>

        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
            Incident Report
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              placeholder="Describe the issue (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              minRows={11}
              variant="outlined"
              sx={{
                // Make only the text field scroll when content exceeds
                "& .MuiInputBase-root": {
                  alignItems: "flex-start",
                  maxHeight: 480,
                  overflowY: "auto",
                },
                // "& textarea": {
                //   minHeight: 280,
                // },
              }}
            />

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              sx={{ mt: 2.5, py: 1.2, fontWeight: 700, borderRadius: 2 }}
            >
              Submit Report
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Complaints;


