import { useState } from "react";

import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

import ProductCard from "../components/products/ProductCard";
import { useProducts } from "../contexts/ProductsContext";

function Products() {
  const { products } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState("Все");

  const categories = [
    {
      title: "Молочная продукция",
      image:
        "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800",
    },
    {
      title: "Мёд и варенье",
      image:
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800",
    },
    {
      title: "Мясо и деликатесы",
      image:
        "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800",
    },
    {
      title: "Фермерские продукты",
      image:
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800",
    },
  ];

  const filteredProducts =
    selectedCategory === "Все"
      ? products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  return (
    <Box sx={{ background: "#F7FAF8", minHeight: "100vh" }}>
      {/* 🔥 HERO */}
      <Box
        sx={{
          py: { xs: 6, md: 9 },
          background: "white",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            alignItems="center"
          >
            {/* 📸 IMAGES */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",

                  height: {
                    xs: 320,
                    sm: 380,
                    md: 430,
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=900"
                  sx={{
                    width: {
                      xs: 180,
                      sm: 240,
                      md: 360,
                    },

                    height: {
                      xs: 180,
                      sm: 240,
                      md: 360,
                    },

                    objectFit: "cover",

                    borderRadius: 3,

                    boxShadow:
                      "0 18px 45px rgba(0,0,0,0.18)",
                  }}
                />

                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=700"
                  sx={{
                    position: "absolute",

                    right: {
                      xs: 0,
                      md: 60,
                    },

                    top: {
                      xs: 50,
                      md: 80,
                    },

                    width: {
                      xs: 150,
                      sm: 200,
                      md: 250,
                    },

                    height: {
                      xs: 140,
                      sm: 180,
                      md: 230,
                    },

                    objectFit: "cover",

                    borderRadius: 3,

                    boxShadow:
                      "0 18px 45px rgba(0,0,0,0.18)",
                  }}
                />

                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700"
                  sx={{
                    position: "absolute",

                    left: {
                      xs: 40,
                      sm: 70,
                      md: 110,
                    },

                    bottom: 0,

                    width: {
                      xs: 210,
                      sm: 290,
                      md: 360,
                    },

                    height: {
                      xs: 120,
                      sm: 160,
                      md: 210,
                    },

                    objectFit: "cover",

                    borderRadius: 3,

                    boxShadow:
                      "0 18px 45px rgba(0,0,0,0.18)",
                  }}
                />
              </Box>
            </Grid>

            {/* 📝 TEXT */}
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 34,
                    md: 52,
                  },

                  fontWeight: 900,

                  color: "#06281C",

                  mb: 3,

                  lineHeight: 1.1,
                }}
              >
                Наша миссия
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 17,
                    md: 19,
                  },

                  lineHeight: 1.9,

                  mb: 3,
                }}
              >
                AgroTrip помогает находить натуральные
                продукты напрямую от фермеров и владельцев
                агро-локаций Казахстана.
              </Typography>

              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: 20,
                  mb: 1,
                }}
              >
                Наши задачи:
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 16,
                    md: 18,
                  },

                  lineHeight: 2,
                }}
              >
                • Познакомить покупателей с настоящей
                фермерской продукцией
                <br />
                • Поддержать локальных производителей
                <br />
                • Сделать покупку мёда, молока, мяса,
                варенья и других продуктов удобной
                <br />
                • Продвигать честный агротуризм и
                фермерское хозяйство
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 16,
                    md: 18,
                  },

                  lineHeight: 1.9,

                  mt: 4,
                }}
              >
                Наша цель — создать доверие между
                покупателем и фермером.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 🧺 CATEGORIES */}
      <Box
        sx={{
          py: { xs: 6, md: 9 },
          background: "#F7FAF8",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{
              textAlign: "center",

              fontSize: {
                xs: 32,
                md: 46,
              },

              fontWeight: 900,

              color: "#06281C",

              mb: 2,
            }}
          >
            Категории продуктов
          </Typography>

          <Typography
            sx={{
              textAlign: "center",

              fontSize: {
                xs: 16,
                md: 19,
              },

              color: "#5B6470",

              mb: 5,
            }}
          >
            Выберите категорию и посмотрите подходящие
            фермерские товары
          </Typography>

          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={category.title}
              >
                <Paper
                  onClick={() =>
                    setSelectedCategory(category.title)
                  }
                  sx={{
                    height: {
                      xs: 220,
                      md: 260,
                    },

                    borderRadius: 4,

                    overflow: "hidden",

                    position: "relative",

                    backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url(${category.image})`,

                    backgroundSize: "cover",

                    backgroundPosition: "center",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    cursor: "pointer",

                    border:
                      selectedCategory === category.title
                        ? "4px solid #F6B800"
                        : "4px solid transparent",

                    transition: "0.25s ease",

                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow:
                        "0 20px 45px rgba(0,0,0,0.18)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",

                      fontSize: {
                        xs: 22,
                        md: 24,
                      },

                      fontWeight: 900,

                      textAlign: "center",

                      px: 2,
                    }}
                  >
                    {category.title}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 🛒 PRODUCTS */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: "white",
        }}
      >
        <Container maxWidth="xl">
          <Typography
            sx={{
              fontSize: {
                xs: 32,
                md: 46,
              },

              fontWeight: 900,

              color: "#06281C",

              mb: 1,
            }}
          >
            Каталог продукции
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
            Категория: {selectedCategory}
          </Typography>

          {filteredProducts.length > 0 ? (
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                  key={product.id}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper
              sx={{
                p: { xs: 4, md: 6 },

                borderRadius: 5,

                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 24,
                    md: 28,
                  },

                  fontWeight: 900,
                }}
              >
                В этой категории пока нет продукции 🌿
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Администратор ещё не добавил товары в
                эту категорию.
              </Typography>
            </Paper>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default Products;