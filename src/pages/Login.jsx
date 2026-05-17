import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

import { useAuth } from "../contexts/AuthContext";

function Login() {
  const { setCurrentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!foundUser) {
      setError("Неверный email или пароль");
      return;
    }

    setCurrentUser(foundUser);

    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #06281C 0%, #0D5C46 100%)",
        display: "flex",
        alignItems: "center",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 5,
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.18)",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 34, md: 42 },
              fontWeight: 900,
              color: "#06281C",
              mb: 1,
            }}
          >
            Вход 👋
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 4,
              fontSize: { xs: 15, md: 16 },
            }}
          >
            Войдите в аккаунт AgroTrip
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <TextField
              label="Пароль"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                height: 52,
                fontWeight: 900,
                fontSize: 16,
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              Войти
            </Button>
          </Box>

          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
              fontSize: { xs: 15, md: 16 },
            }}
          >
            Нет аккаунта?{" "}
            <Link
              to="/register"
              style={{
                color: "#0D5C46",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Зарегистрироваться
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;