import {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function PopularLocations({
  locations = [],
}) {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isChanging, setIsChanging] =
    useState(false);

  useEffect(() => {
    if (locations.length <= 1) return;

    const interval = setInterval(() => {
      setIsChanging(true);

      setTimeout(() => {
        setActiveIndex(
          (prev) =>
            (prev + 1) %
            locations.length
        );

        setIsChanging(false);
      }, 350);
    }, 4500);

    return () =>
      clearInterval(interval);
  }, [locations.length]);

  if (locations.length === 0)
    return null;

  const location =
    locations[activeIndex];

  const changeSlide = (index) => {
    if (index === activeIndex) return;

    setIsChanging(true);

    setTimeout(() => {
      setActiveIndex(index);

      setIsChanging(false);
    }, 350);
  };

  return (
    <Box
      sx={{
        background: "#F7FAF8",

        py: {
          xs: 6,
          md: 8,
        },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: {
              xs: 34,
              sm: 40,
              md: 52,
            },

            fontWeight: 900,

            color: "#06281C",

            lineHeight: 1.05,

            mb: 1.5,
          }}
        >
          Популярные локации
        </Typography>

        <Typography
          sx={{
            color: "#667085",

            fontSize: {
              xs: 16,
              md: 18,
            },

            mb: 4,
          }}
        >
          Лучшие места для отдыха,
          фермерских туров и
          агротуризма по Казахстану
        </Typography>

        <Paper
          onClick={() =>
            navigate(
              `/locations/${location.id}`
            )
          }
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "1.2fr 1fr",
            },

            minHeight: {
              xs: "auto",
              md: 500,
            },

            borderRadius: 5,

            overflow: "hidden",

            cursor: "pointer",

            boxShadow:
              "0 18px 45px rgba(0,0,0,0.12)",

            transition: "0.25s ease",

            background: "white",

            "&:hover": {
              transform:
                "translateY(-6px)",

              boxShadow:
                "0 26px 60px rgba(0,0,0,0.18)",
            },
          }}
        >
          {/* 📸 IMAGE */}
          <Box
            sx={{
              overflow: "hidden",

              background: "#ddd",

              position: "relative",
            }}
          >
            <Box
              component="img"
              src={location.image}
              alt={location.title}
              sx={{
                width: "100%",

                height: {
                  xs: 260,
                  sm: 340,
                  md: "100%",
                },

                objectFit: "cover",

                display: "block",

                opacity: isChanging
                  ? 0
                  : 1,

                transform: isChanging
                  ? "scale(1.04)"
                  : "scale(1)",

                transition:
                  "opacity 0.35s ease, transform 0.5s ease",
              }}
            />

            <Box
              sx={{
                position: "absolute",

                inset: 0,

                background:
                  "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
              }}
            />
          </Box>

          {/* 📝 CONTENT */}
          <Box
            sx={{
              p: {
                xs: 3,
                sm: 4,
                md: 5,
              },

              display: "flex",

              flexDirection: "column",

              justifyContent: "center",

              background: "white",

              opacity: isChanging
                ? 0
                : 1,

              transform: isChanging
                ? "translateX(20px)"
                : "translateX(0)",

              transition:
                "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            <Chip
              label="Популярная локация"
              sx={{
                width: "fit-content",

                background: "#003b95",

                color: "white",

                fontWeight: 800,

                mb: 2,
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: 32,
                  sm: 38,
                  md: 52,
                },

                fontWeight: 900,

                lineHeight: 1.05,

                mb: 2,

                color: "#06281C",
              }}
            >
              {location.title}
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",

                fontSize: {
                  xs: 16,
                  md: 18,
                },

                mb: 2,
              }}
            >
              📍 {location.city}
            </Typography>

            <Typography
              sx={{
                color: "#333",

                fontSize: {
                  xs: 15,
                  md: 17,
                },

                lineHeight: 1.8,

                mb: 3,
              }}
            >
              {location.description}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 28,
                  md: 34,
                },

                fontWeight: 900,

                mb: 3,

                color: "#06281C",
              }}
            >
              от KZT {location.price}
            </Typography>

            <Button
              variant="contained"
              sx={{
                width: {
                  xs: "100%",
                  sm: "fit-content",
                },

                height: 50,

                px: 4,

                fontWeight: 900,

                borderRadius: 3,

                textTransform: "none",
              }}
            >
              Смотреть объект
            </Button>

            {/* 🔘 DOTS */}
            <Box
              sx={{
                display: "flex",

                gap: 1,

                mt: 4,

                justifyContent: {
                  xs: "center",
                  md: "flex-start",
                },
              }}
            >
              {locations.map(
                (item, index) => (
                  <Box
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();

                      changeSlide(index);
                    }}
                    sx={{
                      width:
                        index === activeIndex
                          ? 30
                          : 10,

                      height: 10,

                      borderRadius: 10,

                      background:
                        index ===
                        activeIndex
                          ? "#0D5C46"
                          : "rgba(0,0,0,0.2)",

                      cursor: "pointer",

                      transition:
                        "0.25s",
                    }}
                  />
                )
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default PopularLocations;