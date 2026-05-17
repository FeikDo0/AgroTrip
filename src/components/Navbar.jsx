import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { currentUser, logout } = useAuth();
  const isAdmin = currentUser?.role === "admin";

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseMenu();
    setMobileOpen(false);
    navigate("/");
  };

  const closeDrawer = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background:
            "linear-gradient(90deg, #06281C 0%, #0B3D2C 50%, #06281C 100%)",
          borderBottom: "1px solid rgba(246,184,0,0.2)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 76, md: 94 },
            px: { xs: 2, md: 5 },
          }}
        >
          {/* LOGO TEXT */}
          <Box
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "white",
                  fontSize: { xs: 30, md: 42 },
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-1px",
                }}
              >
                Agro
                <Box component="span" sx={{ color: "#9CCC3C" }}>
                  Trip
                </Box>
              </Typography>

              <Typography
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: "rgba(255,255,255,0.8)",
                  fontSize: { sm: 13, md: 15 },
                  mt: 0.7,
                }}
              >
                Агротуризм и фермерская продукция
              </Typography>
            </Box>
          </Box>

          {/* DESKTOP MENU */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1.4,
              alignItems: "center",
            }}
          >
            <Button component={Link} to="/" sx={navButtonStyle}>
              Главная
            </Button>

            <Button component={Link} to="/locations" sx={navButtonStyle}>
              Локации
            </Button>

            <Button component={Link} to="/products" sx={productButtonStyle}>
              Продукция
            </Button>

            {isAdmin && (
              <>
                <Button component={Link} to="/add" sx={navButtonStyle}>
                  Добавить объект
                </Button>

                <Button component={Link} to="/add-product" sx={navButtonStyle}>
                  Добавить продукцию
                </Button>
              </>
            )}

            {!currentUser ? (
              <>
                <Button component={Link} to="/login" sx={navButtonStyle}>
                  Войти
                </Button>

                <Button
                  component={Link}
                  to="/register"
                  sx={registerButtonStyle}
                >
                  Регистрация
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/profile")}
                  sx={navButtonStyle}
                >
                  Личный кабинет
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleOpenMenu}
                  startIcon={<AccountCircleOutlinedIcon />}
                  sx={{
                    color: "#F6B800",
                    borderColor: "rgba(246,184,0,0.7)",
                    fontWeight: 900,
                    borderRadius: 3,
                    px: 2.2,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#F6B800",
                      background: "rgba(246,184,0,0.08)",
                    },
                  }}
                >
                  {currentUser.name}
                </Button>
              </>
            )}
          </Box>

          {/* MOBILE MENU BUTTON */}
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              color: "white",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={mobileOpen} onClose={closeDrawer}>
        <Box
          sx={{
            width: 300,
            minHeight: "100%",
            p: 3,
            background: "#F7FAF8",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 900,
              color: "#06281C",
              lineHeight: 1,
            }}
          >
            Agro
            <Box component="span" sx={{ color: "#7FAE22" }}>
              Trip
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "#667085",
              mb: 2,
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            Агротуризм и фермерская продукция
          </Typography>

          <Button component={Link} to="/" onClick={closeDrawer}>
            Главная
          </Button>

          <Button component={Link} to="/locations" onClick={closeDrawer}>
            Локации
          </Button>

          <Button
            component={Link}
            to="/products"
            onClick={closeDrawer}
            sx={{
              background: "#F6B800",
              color: "#06281C",
              fontWeight: 900,
              borderRadius: 3,
              "&:hover": {
                background: "#E0A800",
              },
            }}
          >
            Продукция
          </Button>

          {isAdmin && (
            <>
              <Divider sx={{ my: 1 }} />

              <Button component={Link} to="/add" onClick={closeDrawer}>
                Добавить объект
              </Button>

              <Button
                component={Link}
                to="/add-product"
                onClick={closeDrawer}
              >
                Добавить продукцию
              </Button>
            </>
          )}

          <Divider sx={{ my: 1 }} />

          {!currentUser ? (
            <>
              <Button component={Link} to="/login" onClick={closeDrawer}>
                Войти
              </Button>

              <Button
                component={Link}
                to="/register"
                onClick={closeDrawer}
                variant="contained"
              >
                Регистрация
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  navigate("/profile");
                  closeDrawer();
                }}
              >
                Личный кабинет
              </Button>

              <Button color="error" onClick={handleLogout}>
                Выйти
              </Button>
            </>
          )}
        </Box>
      </Drawer>

      {/* USER MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography fontWeight={900}>
            {currentUser?.name}
          </Typography>

          <Typography fontSize={13} color="text.secondary">
            {currentUser?.email}
          </Typography>
        </Box>

        <Divider />

        {isAdmin && (
          <>
            <MenuItem
              onClick={() => {
                navigate("/add");
                handleCloseMenu();
              }}
            >
              Добавить объект
            </MenuItem>

            <MenuItem
              onClick={() => {
                navigate("/add-product");
                handleCloseMenu();
              }}
            >
              Добавить продукцию
            </MenuItem>

            <Divider />
          </>
        )}

        <MenuItem onClick={handleLogout}>
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
}

const navButtonStyle = {
  color: "white",
  fontWeight: 800,
  textTransform: "none",
  fontSize: 16,
  px: 1.6,
  borderRadius: 3,
  "&:hover": {
    background: "rgba(255,255,255,0.08)",
    color: "#F6B800",
  },
};

const productButtonStyle = {
  background: "#F6B800",
  color: "#06281C",
  fontWeight: 900,
  borderRadius: 3,
  px: 2.5,
  textTransform: "none",
  boxShadow: "0 6px 18px rgba(246,184,0,0.25)",
  "&:hover": {
    background: "#E0A800",
    transform: "translateY(-2px)",
  },
};

const registerButtonStyle = {
  background: "transparent",
  color: "#F6B800",
  border: "1px solid rgba(246,184,0,0.65)",
  fontWeight: 900,
  borderRadius: 3,
  px: 2.5,
  textTransform: "none",
  "&:hover": {
    background: "rgba(246,184,0,0.1)",
    borderColor: "#F6B800",
  },
};

export default Navbar;