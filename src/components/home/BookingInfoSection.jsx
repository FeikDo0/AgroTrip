import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function BookingInfoSection() {
  const infoCards = [
    {
      icon: "🔒",
      title: "Никаких скрытых сборов",
      text: "Вы платите только ту цену, которую видите при бронировании.",
    },
    {
      icon: "⚡",
      title: "Мгновенное подтверждение",
      text: "Большинство объектов подтверждают бронирование сразу после заявки.",
    },
  ];

  const questions = [
    {
      title: "Как договориться о поездке?",
      text: "После бронирования вы сможете связаться с владельцем объекта, обсудить детали поездки, время приезда и дополнительные услуги.",
    },
    {
      title: "Как связаться?",
      text: "После отправки заявки вы получите контакты владельца и сможете обсудить все детали напрямую.",
    },
  ];

  return (
    <Box
      sx={{
        py: {
          xs: 6,
          md: 9,
        },

        background: "#F7FAF8",
      }}
    >
      <Container maxWidth="lg">
        {/* 🔥 TITLE */}
        <Typography
          sx={{
            fontSize: {
              xs: 32,
              sm: 38,
              md: 48,
            },

            fontWeight: 900,

            mb: {
              xs: 3,
              md: 4,
            },

            color: "#06281C",

            lineHeight: 1.1,
          }}
        >
          Бронировать поездки — просто
        </Typography>

        {/* 🟩 INFO CARDS */}
        <Grid
          container
          spacing={{
            xs: 2,
            md: 3,
          }}
        >
          {infoCards.map((card) => (
            <Grid
              item
              xs={12}
              md={6}
              key={card.title}
            >
              <Paper
                sx={{
                  p: {
                    xs: 3,
                    md: 4,
                  },

                  minHeight: {
                    xs: 220,
                    md: 240,
                  },

                  borderRadius: 5,

                  background: "#0D5C46",

                  color: "white",

                  boxShadow:
                    "0 12px 30px rgba(0,0,0,0.08)",

                  display: "flex",

                  flexDirection: "column",

                  justifyContent: "center",

                  cursor: "pointer",

                  overflow: "hidden",

                  transition: "0.25s ease",

                  "&:hover": {
                    transform:
                      "translateY(-8px)",

                    boxShadow:
                      "0 22px 45px rgba(0,0,0,0.18)",

                    background: "#0A4F3C",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 36,
                      md: 42,
                    },

                    mb: 2,
                  }}
                >
                  {card.icon}
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: 24,
                      md: 28,
                    },

                    fontWeight: 900,

                    mb: 1,

                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: 15,
                      md: 16,
                    },

                    lineHeight: 1.8,

                    opacity: 0.92,
                  }}
                >
                  {card.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* ❓ FAQ */}
        <Box
          sx={{
            mt: {
              xs: 6,
              md: 8,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 32,
                sm: 38,
                md: 48,
              },

              fontWeight: 900,

              mb: 3,

              color: "#06281C",

              lineHeight: 1.1,
            }}
          >
            Как это работает?
          </Typography>

          {questions.map((item) => (
            <Accordion
              key={item.title}
              sx={{
                mb: 2,

                borderRadius:
                  "18px !important",

                overflow: "hidden",

                boxShadow: "none",

                border:
                  "1px solid #DDE5DF",

                "&:before": {
                  display: "none",
                },

                transition: "0.2s ease",

                "&:hover": {
                  borderColor:
                    "#0D5C46",

                  boxShadow:
                    "0 8px 22px rgba(0,0,0,0.06)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon />
                }
                sx={{
                  px: {
                    xs: 2,
                    md: 3,
                  },

                  py: {
                    xs: 0.5,
                    md: 1,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,

                    fontSize: {
                      xs: 19,
                      md: 24,
                    },

                    color: "#06281C",

                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  px: {
                    xs: 2,
                    md: 3,
                  },

                  pb: {
                    xs: 2.5,
                    md: 3,
                  },
                }}
              >
                <Typography
                  sx={{
                    color: "#4B5563",

                    lineHeight: 1.9,

                    fontSize: {
                      xs: 15,
                      md: 16,
                    },

                    maxWidth: 780,

                    fontFamily:
                      "Arial, sans-serif",

                    fontWeight: 400,
                  }}
                >
                  {item.text}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default BookingInfoSection;