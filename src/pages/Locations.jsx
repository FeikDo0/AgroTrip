import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Grid, Typography, Paper, Box } from "@mui/material";

import LocationCard from "../components/locations/Locationcard";
import FiltersPanel from "../components/locations/FiltersPanel";

import { useLocations } from "../contexts/LocationsContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";

function Locations() {
  const { locations, deleteLocation } = useLocations();
  const { favorites, toggleFavorite } = useFavorites();
  const { currentUser } = useAuth();

  const [searchParams] = useSearchParams();

  const initialCity = searchParams.get("city") || "";

  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState(initialCity);

  const filteredLocations = locations.filter((loc) => {
    const title = (loc.title || "").toLowerCase();
    const city = (loc.city || "").toLowerCase();

    return (
      title.includes(search.toLowerCase()) &&
      city.includes(cityFilter.toLowerCase())
    );
  });

  return (
    <Box sx={{ background: "#f5f7fa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={800} gutterBottom sx={{ mb: 3 }}>
          Локации 🌿
        </Typography>

        <FiltersPanel
          search={search}
          setSearch={setSearch}
          cityFilter={cityFilter}
          setCityFilter={setCityFilter}
        />

        <Grid container spacing={2.5}>
          {filteredLocations.length > 0 ? (
            filteredLocations.map((loc) => (
              <Grid item xs={12} key={loc.id}>
                <LocationCard
                  location={loc}
                  isFavorite={favorites.includes(loc.id)}
                  toggleFavorite={toggleFavorite}
                  currentUser={currentUser}
                  deleteLocation={deleteLocation}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, borderRadius: 4, textAlign: "center" }}>
                <Typography fontWeight={800} sx={{ mb: 1 }}>
                  Ничего не найдено 😔
                </Typography>

                <Typography color="text.secondary">
                  Попробуйте изменить поиск или фильтры
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default Locations;