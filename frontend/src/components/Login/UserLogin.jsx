import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  // Handlers
  const handlePhoneSubmit = () => {
    if (phoneNumber.length >= 10) {
      setShowOtp(true);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const formatPhoneNumber = (value) => {
    const phone = value.replace(/\D/g, "");
    if (phone.length < 4) return phone;
    if (phone.length < 7) return `${phone.slice(0, 3)}-${phone.slice(3)}`;
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            bgcolor: "background.paper",
            boxShadow: 4,
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <IconButton
              onClick={() => navigate("/")}
              sx={{ mb: 2, color: "primary.main" }}
              aria-label="Back to Home"
            >
              <ArrowBackIcon /> Back to home
            </IconButton>
            <Typography variant="h4" fontWeight={700} mb={1}>
              {!showOtp ? "Welcome Back" : "Verify Your Phone"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {!showOtp
                ? "Enter your phone number to continue"
                : `We sent a code to ${phoneNumber}`}
            </Typography>
          </Box>
          {!showOtp ? (
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                value={formatPhoneNumber(phoneNumber)}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/\D/g, ""))
                }
                inputProps={{ maxLength: 12 }}
                sx={{ mb: 3 }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={phoneNumber.length < 10}
                onClick={handlePhoneSubmit}
                sx={{ borderRadius: 2, py: 1, fontWeight: 600, mb: 2 }}
              >
                Send OTP
              </Button>
              <Box sx={{ mt: 0.5, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate("/userRegister")}
                    sx={{ textTransform: "none", fontWeight: 600, fontSize: 16 }}
                  >
                    Register
                  </Button>
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                align="center"
                mb={2}
              >
                Enter the 6-digit code
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (otpRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", fontWeight: "bold", fontSize: 22 },
                    }}
                    sx={{
                      width: 48,
                      height: 56,
                      "& .MuiInputBase-root": {
                        borderRadius: 2,
                        bgcolor: "background.default",
                      },
                    }}
                  />
                ))}
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={otp.join("").length !== 6}
                onClick={() => alert("Login successful!")}
                sx={{ borderRadius: 2, py: 1.5, fontWeight: 600, mb: 2 }}
              >
                Verify & Continue
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => setShowOtp(false)}
                sx={{ borderRadius: 2, py: 1, fontWeight: 600, mb: 2 }}
              >
                Change Phone Number
              </Button>
              <Box sx={{ mt: 1, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate("/userRegister")}
                    sx={{ textTransform: "none", fontWeight: 600, fontSize: 16 }}
                  >
                    Register
                  </Button>
                </Typography>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default UserLogin;