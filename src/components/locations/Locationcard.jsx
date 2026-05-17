import {
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";

function LocationCard({
  location,
  isFavorite,
  toggleFavorite,
  currentUser,
  deleteLocation,
}) {
  const navigate = useNavigate();

  const isAdmin = currentUser?.role === "admin";

  const handleOpen = () => {
    navigate(`/locations/${location.id}`);
  };

  const handleDelete = () => {
    deleteLocation?.(location.id);
  };

  return (
    <Card
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "240px 1fr 230px",
        },
        gap: { xs: 1.5, md: 2 },
        p: { xs: 1.5, md: 2 },
        borderRadius: 3,
        border: "1px solid #d8d8d8",
        boxShadow: "none",
        background: "#fff",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={
            location.image ||
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
          }
          alt={location.title}
          sx={{
            width: "100%",
            height: { xs: 230, md: 220 },
            borderRadius: 2,
            objectFit: "cover",
            background: "#eee",
          }}
        />

        <IconButton
          onClick={() => toggleFavorite?.(location.id)}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "white",
            boxShadow: 1,
            "&:hover": { background: "#f5f5f5" },
          }}
        >
          {isFavorite ? (
            <FavoriteIcon sx={{ color: "#e53935" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>

      <Box sx={{ px: { xs: 0.5, md: 0 } }}>
        <Typography
          sx={{
            fontSize: { xs: 22, md: 24 },
            fontWeight: 900,
            lineHeight: 1.2,
            mb: 1,
            color: "#1a1a1a",
          }}
        >
          {location.title}
        </Typography>

        <Chip
          label="№1 по популярности"
          size="small"
          sx={{
            background: "#003b95",
            color: "white",
            fontWeight: 700,
            mb: 2,
          }}
        />

        <Typography sx={{ color: "#595959", mb: 1 }}>
          📍 {location.city}
        </Typography>

        <Typography
          sx={{
            lineHeight: 1.6,
            color: "#333",
            maxWidth: 560,
            fontSize: { xs: 15, md: 16 },
          }}
        >
          {location.description}
        </Typography>

        <Typography sx={{ mt: 1.5, color: "#333" }}>
          ⏱ Продолжительность: 3–5 ч.
        </Typography>

        {isAdmin && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
            <Button
              startIcon={<EditIcon />}
              onClick={() => navigate(`/edit-location/${location.id}`)}
              sx={{
                color: "#0D5C46",
                fontWeight: 900,
                textTransform: "none",
              }}
            >
              Редактировать
            </Button>

            <Button
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{
                color: "#d32f2f",
                fontWeight: 900,
                textTransform: "none",
              }}
            >
              Удалить объект
            </Button>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: {
            xs: "stretch",
            md: "flex-end",
          },
          justifyContent: "space-between",
          textAlign: {
            xs: "left",
            md: "right",
          },
          borderTop: {
            xs: "1px solid #eee",
            md: "none",
          },
          pt: {
            xs: 2,
            md: 0,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              xs: "space-between",
              md: "flex-end",
            },
            gap: 1,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 800 }}>Потрясающе</Typography>

            <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
              Рейтинг гостей
            </Typography>
          </Box>

          <Box
            sx={{
              background: "#003b95",
              color: "white",
              px: 1.2,
              py: 0.8,
              borderRadius: "6px 6px 6px 0",
              fontWeight: 800,
            }}
          >
            {location.rating}
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 2, md: 0 } }}>
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            От
          </Typography>

          <Typography sx={{ fontSize: 22, fontWeight: 900 }}>
            KZT {location.price}
          </Typography>

          <Typography sx={{ color: "success.main", fontSize: 14, mt: 1 }}>
            ✓ Доступна бесплатная отмена
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleOpen}
            endIcon={<ArrowForwardIosIcon sx={{ fontSize: 14 }} />}
            sx={{
              mt: 2,
              fontWeight: 800,
              borderColor: "#0071c2",
              color: "#0071c2",
              textTransform: "none",
              px: 2.5,
              py: 1,
              "&:hover": {
                borderColor: "#005999",
                background: "#f0f7ff",
              },
            }}
          >
            Посмотреть наличие мест
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default LocationCard;