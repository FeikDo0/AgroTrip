import { Grid, Paper, TextField } from "@mui/material";

function FiltersPanel({
  search,
  setSearch,
  cityFilter,
  setCityFilter,
}) {
  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Поиск по названию"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Фильтр по городу"
            fullWidth
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FiltersPanel;