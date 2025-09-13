import React, { useState } from "react";
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

const UserRegister = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const formatPhoneNumber = (value) => {
    const phone = value.replace(/\D/g, "");
    if (phone.length < 4) return phone;
    if (phone.length < 7) return `${phone.slice(0, 3)}-${phone.slice(3)}`;
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Phone Number:", phoneNumber);
    navigate("/userlogin");
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
              onClick={() => navigate("/userlogin")}
              sx={{ mb: 2, color: "primary.main" }}
              aria-label="Back to Login"
            >
              <ArrowBackIcon /> Back to login
            </IconButton>
            <Typography variant="h4" fontWeight={700} mb={1}>
              Register
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create your account by entering your name and phone number
            </Typography>
          </Box>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }} onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
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
              required
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={name.length < 2 || phoneNumber.length < 10}
              type="submit"
              sx={{ borderRadius: 2, py: 1.5, fontWeight: 600, mb: 2 }}
            >
              Register
            </Button>
            <Box sx={{ mt: 1, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => navigate("/userlogin")}
                  sx={{ textTransform: "none", fontWeight: 600, fontSize: 16 }}
                >
                  Login
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserRegister;