import { useParams } from "react-router-dom";

import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Chip,
} from "@mui/material";

import { useProducts } from "../contexts/ProductsContext";

function ProductDetails() {
  const { id } = useParams();

  const { products } = useProducts();

  const product = products.find(
    (item) => String(item.id) === id
  );

  if (!product) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          fontWeight={900}
        >
          Продукция не найдена 😔
        </Typography>
      </Container>
    );
  }

  const images = product.images || [];

  const mainImage = images[0] || product.image;

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 3, md: 5 },
        mb: { xs: 5, md: 7 },
      }}
    >
      <Grid
        container
        spacing={{ xs: 3, md: 4 }}
      >
        {/* 📸 IMAGES */}
        <Grid item xs={12} md={7}>
          <Box
            component="img"
            src={mainImage}
            alt={product.title}
            sx={{
              width: "100%",

              height: {
                xs: 260,
                sm: 360,
                md: 460,
              },

              objectFit: "cover",

              borderRadius: 4,

              background: "#eee",
            }}
          />

          {images.length > 1 && (
            <Grid
              container
              spacing={1.5}
              sx={{ mt: 1.5 }}
            >
              {images
                .slice(1)
                .map((img, index) => (
                  <Grid
                    item
                    xs={4}
                    key={index}
                  >
                    <Box
                      component="img"
                      src={img}
                      alt={`product-${index}`}
                      sx={{
                        width: "100%",

                        height: {
                          xs: 80,
                          sm: 100,
                          md: 120,
                        },

                        objectFit: "cover",

                        borderRadius: 2,

                        background: "#eee",
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
        </Grid>

        {/* 🧾 INFO */}
        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              p: {
                xs: 2.5,
                md: 4,
              },

              borderRadius: 4,

              border:
                "1px solid #E5E7EB",

              boxShadow: "none",
            }}
          >
            <Chip
              label={
                product.category ||
                "Фермерский продукт"
              }
              sx={{
                background: "#E9F7EF",

                color: "#0D5C46",

                fontWeight: 900,

                mb: 2,
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: 30,
                  md: 46,
                },

                fontWeight: 900,

                lineHeight: 1.05,

                color: "#06281C",

                mb: 2,
              }}
            >
              {product.title}
            </Typography>

            <Typography
              sx={{
                color: "#5B6470",

                fontSize: {
                  xs: 16,
                  md: 18,
                },

                lineHeight: 1.8,

                mb: 4,
              }}
            >
              {product.description}
            </Typography>

            {/* 💰 PRICE */}
            <Box
              sx={{
                p: {
                  xs: 2,
                  md: 3,
                },

                borderRadius: 3,

                background: "#F7FAF8",

                mb: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: 15,

                  color: "#667085",

                  fontWeight: 700,

                  mb: 0.5,
                }}
              >
                Цена
              </Typography>

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
                {product.price} ₸
              </Typography>

              <Typography color="text.secondary">
                за {product.unit || "кг"}
              </Typography>
            </Box>

            {/* 📞 PHONE */}
            {product.phone && (
              <Box
                sx={{
                  p: {
                    xs: 2,
                    md: 3,
                  },

                  borderRadius: 3,

                  background: "#FFF4D6",

                  border:
                    "1px solid #F6B800",

                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 15,

                    color: "#8A6400",

                    fontWeight: 800,

                    mb: 0.5,
                  }}
                >
                  Номер продавца
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: 20,
                      md: 24,
                    },

                    fontWeight: 900,

                    color: "#06281C",

                    wordBreak: "break-word",
                  }}
                >
                  📞 {product.phone}
                </Typography>
              </Box>
            )}

            {/* 🔥 BUTTON */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                height: {
                  xs: 50,
                  md: 54,
                },

                fontWeight: 900,

                fontSize: {
                  xs: 15,
                  md: 16,
                },

                borderRadius: 3,
              }}
            >
              Связаться с продавцом
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetails;