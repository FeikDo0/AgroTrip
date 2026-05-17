import {
  Card,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../contexts/ProductsContext";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { deleteProduct } = useProducts();

  const isAdmin = currentUser?.role === "admin";

  const mainImage = product.images?.[0] || product.image;

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "none",
        border: "1px solid #E5E7EB",
        background: "white",
        height: "100%",
        transition: "0.25s ease",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={mainImage}
        alt={product.title}
        sx={{
          height: 230,
          objectFit: "cover",
          background: "#eee",
        }}
      />

      <Box
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Chip
          label={product.category || "Фермерский продукт"}
          size="small"
          sx={{
            background: "#E9F7EF",
            color: "#0D5C46",
            fontWeight: 800,
            mb: 1.5,
            width: "fit-content",
          }}
        />

        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 900,
            mb: 1,
            color: "#06281C",
            lineHeight: 1.2,
          }}
        >
          {product.title}
        </Typography>

        <Typography
          sx={{
            color: "#667085",
            lineHeight: 1.6,
            mb: 2,
            fontSize: 15,
            flexGrow: 1,
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontSize: 26,
              fontWeight: 900,
              color: "#06281C",
              lineHeight: 1,
            }}
          >
            {product.price} ₸
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 14,
              mt: 0.7,
            }}
          >
            цена за {product.unit || "кг"}
          </Typography>
        </Box>

        {product.phone && (
          <Typography
            sx={{
              color: "#F6B800",
              fontWeight: 900,
              fontSize: 16,
              mb: 2,
            }}
          >
            📞 {product.phone}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate(`/products/${product.id}`)}
          sx={{
            fontWeight: 900,
            height: 44,
            textTransform: "none",
          }}
        >
          Подробнее
        </Button>

        {isAdmin && (
          <>
            <Button
              fullWidth
              startIcon={<EditIcon />}
              onClick={() => navigate(`/edit-product/${product.id}`)}
              sx={{
                mt: 1,
                color: "#0D5C46",
                fontWeight: 900,
                textTransform: "none",
              }}
            >
              Редактировать
            </Button>

            <Button
              fullWidth
              startIcon={<DeleteIcon />}
              onClick={() => deleteProduct(product.id)}
              sx={{
                color: "#d32f2f",
                fontWeight: 900,
                textTransform: "none",
              }}
            >
              Удалить продукцию
            </Button>
          </>
        )}
      </Box>
    </Card>
  );
}

export default ProductCard;