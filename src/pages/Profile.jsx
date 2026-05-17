import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Avatar,
  Button,
} from "@mui/material";

import LocationCard from "../components/locations/LocationCard";

import { useAuth } from "../contexts/AuthContext";
import { useLocations } from "../contexts/LocationsContext";
import { useFavorites } from "../contexts/FavoritesContext";

function Profile() {
  const { currentUser } = useAuth();
  const { locations, deleteLocation } = useLocations();
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteLocations = locations.filter((loc) =>
    favorites.includes(loc.id)
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 3, md: 5 },
        mb: { xs: 5, md: 6 },
      }}
    >
      <Paper
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: 4,
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2.5,
          }}
        >
          <Avatar
            sx={{
              width: { xs: 64, md: 72 },
              height: { xs: 64, md: 72 },
              bgcolor: "#F6B800",
              color: "#123D2A",
              fontSize: { xs: 28, md: 32 },
              fontWeight: 900,
            }}
          >
            {currentUser.name?.[0]?.toUpperCase()}
          </Avatar>

          <Box>
            <Typography
              sx={{
                fontSize: { xs: 30, md: 38 },
                fontWeight: 900,
                color: "#06281C",
                lineHeight: 1.1,
              }}
            >
              {currentUser.name}
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: 15, md: 16 },
                mt: 0.5,
                wordBreak: "break-word",
              }}
            >
              {currentUser.email}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Typography
        sx={{
          fontSize: { xs: 28, md: 32 },
          fontWeight: 900,
          mb: 2,
          color: "#06281C",
        }}
      >
        Избранные объекты ❤️
      </Typography>

      {favoriteLocations.length > 0 ? (
        <Grid container spacing={3}>
          {favoriteLocations.map((loc) => (
            <Grid item xs={12} key={loc.id}>
              <LocationCard
                location={loc}
                isFavorite={favorites.includes(loc.id)}
                toggleFavorite={toggleFavorite}
                currentUser={currentUser}
                deleteLocation={deleteLocation}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 22, md: 26 },
              fontWeight: 900,
              mb: 1,
            }}
          >
            Пока нет избранных объектов
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              mb: 3,
              fontSize: { xs: 15, md: 16 },
              lineHeight: 1.7,
            }}
          >
            Добавляйте понравившиеся локации в избранное, чтобы быстро
            возвращаться к ним позже.
          </Typography>

          <Button
            variant="contained"
            href="/locations"
            sx={{
              height: 48,
              px: 4,
              fontWeight: 900,
              borderRadius: 3,
            }}
          >
            Смотреть локации
          </Button>
        </Paper>
      )}
    </Container>
  );
}

export default Profile;