import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function HeroSection({ locations = [] }) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();

  const cities = [
    ...new Set(locations.map((loc) => loc.city).filter(Boolean)),
  ];

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  const goToLocations = (cityValue = search) => {
    navigate(`/locations?city=${encodeURIComponent(cityValue)}`);
  };

  const handleSelectCity = (city) => {
    setSearch(city);
    setIsOpen(false);
    goToLocations(city);
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(rgba(0,40,25,0.82), rgba(0,40,25,0.88))",
        color: "white",

        pt: { xs: 7, md: 10 },
        pb: { xs: 8, md: 12 },

        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: { xs: 16, md: 20 },
            fontWeight: 700,
            mb: 2,
            color: "#F6B800",
          }}
        >
          AgroTrip — агротуризм по Казахстану
        </Typography>

        <Typography
          sx={{
            fontFamily: "Georgia, serif",

            fontSize: {
              xs: 40,
              sm: 52,
              md: 76,
            },

            lineHeight: 1,
            fontWeight: 700,
            maxWidth: 820,
            mb: 3,
          }}
        >
          Найдите ферму для новой поездки
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: 18,
              md: 24,
            },

            maxWidth: 760,
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.6,

            mb: { xs: 4, md: 5 },
          }}
        >
          Эко-дома, пасеки, конные прогулки, фермерские туры и отдых на природе
          — всё в одном месте.
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Paper
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                md: "2fr 1.8fr auto",
              },

              gap: "6px",

              p: "6px",

              borderRadius: 3,

              background: "#F6B800",

              maxWidth: 980,

              boxShadow: "0 16px 40px rgba(0,0,0,0.25)",

              position: "relative",
            }}
          >
            {/* 🔍 SEARCH */}
            <ClickAwayListener onClickAway={() => setIsOpen(false)}>
              <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  placeholder="Куда хотите поехать?"
                  value={search}
                  onFocus={() => setIsOpen(true)}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setIsOpen(true);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: "#1A73E8" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    background: "white",
                    borderRadius: 2,
                  }}
                />

                {isOpen && (
                  <Paper
                    sx={{
                      position: "absolute",

                      top: "60px",
                      left: 0,
                      right: 0,

                      zIndex: 10,

                      borderRadius: 3,

                      overflow: "hidden",

                      boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                    }}
                  >
                    <Typography
                      sx={{
                        p: 2,
                        fontWeight: 800,
                        color: "black",
                      }}
                    >
                      Популярные направления
                    </Typography>

                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <Box
                          key={city}
                          onClick={() => handleSelectCity(city)}
                          sx={{
                            display: "flex",
                            gap: 1.5,
                            alignItems: "center",
                            p: 2,
                            color: "black",
                            cursor: "pointer",
                            borderTop: "1px solid #eee",

                            "&:hover": {
                              background: "#f1f1f1",
                            },
                          }}
                        >
                          <LocationOnIcon
                            sx={{ color: "#1A73E8" }}
                          />

                          <Box>
                            <Typography fontWeight={800}>
                              {city}
                            </Typography>

                            <Typography
                              fontSize={14}
                              color="text.secondary"
                            >
                              Казахстан
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Typography
                        sx={{
                          p: 2,
                          color: "text.secondary",
                        }}
                      >
                        Пока нет добавленных направлений
                      </Typography>
                    )}
                  </Paper>
                )}
              </Box>
            </ClickAwayListener>

            {/* 📅 DATES */}
            <Box
              sx={{
                display: "grid",

                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },

                background: "white",

                borderRadius: 2,

                overflow: "hidden",
              }}
            >
              <DatePicker
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                format="DD MMM YYYY"
                slotProps={{
                  textField: {
                    placeholder: "Заезд",
                    fullWidth: true,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonthIcon />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />

              <DatePicker
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                format="DD MMM YYYY"
                minDate={startDate}
                slotProps={{
                  textField: {
                    placeholder: "Выезд",
                    fullWidth: true,
                  },
                }}
              />
            </Box>

            {/* 🔥 BUTTON */}
            <Button
              variant="contained"
              onClick={() => goToLocations()}
              sx={{
                px: 5,

                height: {
                  xs: 56,
                  md: "auto",
                },

                fontWeight: 800,

                fontSize: 16,

                background: "#1A73E8",

                borderRadius: 2,

                "&:hover": {
                  background: "#1765cc",
                },
              }}
            >
              Найти
            </Button>
          </Paper>
        </LocalizationProvider>
      </Container>
    </Box>
  );
}

export default HeroSection;