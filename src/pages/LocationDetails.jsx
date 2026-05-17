import { useParams } from "react-router-dom";

import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Chip,
  IconButton,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useLocations } from "../contexts/LocationsContext";
import { useFavorites } from "../contexts/FavoritesContext";

function LocationDetails() {
  const { id } = useParams();

  const { locations } = useLocations();

  const { favorites, toggleFavorite } = useFavorites();

  const location = locations.find(
    (loc) => String(loc.id) === id
  );

  if (!location) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          fontWeight={800}
        >
          Объект не найден 😔
        </Typography>
      </Container>
    );
  }

  const isFavorite = favorites.includes(
    location.id
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 3, md: 4 },
        mb: { xs: 5, md: 6 },
      }}
    >
      {/* 🔝 HEADER */}
      <Box
        sx={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: {
            xs: "flex-start",
            md: "center",
          },

          gap: 2,

          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: 30,
                md: 34,
              },

              fontWeight: 900,

              lineHeight: 1.1,
            }}
          >
            {location.title}
          </Typography>

          <Typography
            sx={{
              color: "#666",

              mt: 1,

              fontSize: {
                xs: 15,
                md: 16,
              },
            }}
          >
            📍 {location.city} · ⭐{" "}
            {location.rating}
          </Typography>
        </Box>

        <IconButton
          onClick={() =>
            toggleFavorite(location.id)
          }
          sx={{
            border: "1px solid #ddd",

            width: 52,

            height: 52,

            flexShrink: 0,
          }}
        >
          {isFavorite ? (
            <FavoriteIcon
              sx={{ color: "#e53935" }}
            />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>

      {/* 📸 GALLERY */}
      <Grid
        container
        spacing={2}
        sx={{ mt: 2 }}
      >
        <Grid item xs={12} md={8}>
          <Box
            component="img"
            src={location.image}
            alt={location.title}
            sx={{
              width: "100%",

              height: {
                xs: 260,
                sm: 340,
                md: 420,
              },

              objectFit: "cover",

              borderRadius: 4,

              background: "#eee",
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid
            container
            spacing={1.5}
          >
            {location.images?.map(
              (img, i) => (
                <Grid
                  item
                  xs={6}
                  md={12}
                  key={i}
                >
                  <Box
                    component="img"
                    src={img}
                    alt={`gallery-${i}`}
                    sx={{
                      width: "100%",

                      height: {
                        xs: 110,
                        sm: 140,
                        md: 133,
                      },

                      objectFit: "cover",

                      borderRadius: 2,

                      background:
                        "#eee",
                    }}
                  />
                </Grid>
              )
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* 📊 CONTENT */}
      <Grid
        container
        spacing={{ xs: 3, md: 4 }}
        sx={{ mt: 1 }}
      >
        {/* 📝 LEFT */}
        <Grid item xs={12} md={8}>
          <Typography
            sx={{
              fontSize: {
                xs: 28,
                md: 32,
              },

              fontWeight: 900,

              mb: 2,
            }}
          >
            Описание
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.9,

              color: "#444",

              fontSize: {
                xs: 15,
                md: 16,
              },
            }}
          >
            {location.description}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 28,
                md: 32,
              },

              fontWeight: 900,

              mt: 5,

              mb: 2,
            }}
          >
            Что доступно
          </Typography>

          <Box
            sx={{
              display: "flex",

              gap: 1,

              flexWrap: "wrap",
            }}
          >
            {location.features?.map(
              (feature, i) => (
                <Chip
                  key={i}
                  label={feature}
                  sx={{
                    fontWeight: 700,

                    fontSize: 14,

                    py: 2.3,
                  }}
                />
              )
            )}
          </Box>
        </Grid>

        {/* 💰 RIGHT */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: {
                xs: 2.5,
                md: 3,
              },

              borderRadius: 4,

              border:
                "1px solid #ddd",

              boxShadow: "none",

              position: {
                xs: "static",
                md: "sticky",
              },

              top: 110,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 28,
                  md: 34,
                },

                fontWeight: 900,

                color: "#06281C",
              }}
            >
              {location.price} ₸
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mb: 3,

                fontSize: {
                  xs: 15,
                  md: 16,
                },
              }}
            >
              Цена за посещение
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                height: {
                  xs: 50,
                  md: 54,
                },

                fontWeight: 800,

                fontSize: {
                  xs: 15,
                  md: 16,
                },

                borderRadius: 3,
              }}
            >
              Забронировать
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LocationDetails;