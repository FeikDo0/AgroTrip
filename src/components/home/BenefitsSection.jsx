import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

function BenefitsSection() {
  const benefits = [
    {
      icon: "🧳",
      title: "Бронируйте сейчас, платите на месте",
      text: "Обсуждайте условия поездки напрямую с владельцами объектов.",
    },
    {
      icon: "⭐",
      title: "Проверенные локации",
      text: "Фермы, пасеки, эко-дома и конные клубы в одном каталоге.",
    },
    {
      icon: "🌍",
      title: "Агротуризм по Казахстану",
      text: "Открывайте интересные места для отдыха в разных регионах.",
    },
    {
      icon: "👩‍💼",
      title: "Поддержка владельцев",
      text: "Помогаем агро-бизнесам привлекать новых гостей онлайн.",
    },
  ];

  return (
    <Box sx={{ py: 8, background: "#fff" }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: { xs: 32, md: 40 },
            fontWeight: 900,
            mb: 1,
            color: "#1a1a1a",
          }}
        >
          Почему AgroTrip?
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 18,
            mb: 4,
            maxWidth: 760,
          }}
        >
          Платформа помогает путешественникам находить настоящие агро-локации,
          а владельцам — получать новых гостей.
        </Typography>

        <Grid container spacing={2.5}>
          {benefits.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Paper
                sx={{
                  p: 3,
                  height: 230,
                  borderRadius: 2,
                  border: "1px solid #ddd",
                  background: "#f7f7f7",
                  boxShadow: "none",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Typography sx={{ fontSize: 42, mb: 2 }}>
                  {item.icon}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 800,
                    mb: 1.5,
                    lineHeight: 1.3,
                    color: "#1a1a1a",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 15,
                    color: "#444",
                    lineHeight: 1.5,
                  }}
                >
                  {item.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default BenefitsSection;