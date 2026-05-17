import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  MenuItem,
} from "@mui/material";

import { useProducts } from "../contexts/ProductsContext";
import { supabase } from "../lib/supabase";

const productCategories = [
  "Молочная продукция",
  "Мёд и варенье",
  "Мясо и деликатесы",
  "Фермерские продукты",
];

function AddProduct() {
  const { addProduct } = useProducts();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(productCategories[0]);
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("кг");
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    setIsUploading(true);

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file);

      if (error) {
        console.error("Ошибка загрузки фото:", error.message);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("products").getPublicUrl(fileName);

      uploadedImages.push(publicUrl);
    }

    setImages(uploadedImages);
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      description,
      category,
      price,
      unit,
      phone,
      images,
    };

    const createdProduct = await addProduct(newProduct);

    if (createdProduct) {
      navigate("/products");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #06281C 0%, #0D5C46 100%)",
        py: { xs: 4, md: 7 },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 5,
            boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 34, md: 42 },
              fontWeight: 900,
              color: "#06281C",
              mb: 1,
            }}
          >
            Добавить продукцию 🧺
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 4,
              fontSize: { xs: 15, md: 16 },
              lineHeight: 1.7,
            }}
          >
            Добавьте фермерский товар: название, описание, фотографии, цену и
            номер продавца.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Название продукции"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Описание продукции"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              select
              label="Категория"
              fullWidth
              margin="normal"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {productCategories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Цена"
              fullWidth
              margin="normal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <TextField
              select
              label="Единица измерения"
              fullWidth
              margin="normal"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <MenuItem value="г">г</MenuItem>
              <MenuItem value="кг">кг</MenuItem>
              <MenuItem value="л">л</MenuItem>
              <MenuItem value="шт">шт</MenuItem>
            </TextField>

            <TextField
              label="Номер телефона"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 777 123 45 67"
            />

            <Box sx={{ mt: 3 }}>
              <Typography sx={{ fontWeight: 800, mb: 1.2, fontSize: 16 }}>
                Фото продукции
              </Typography>

              <Button
                variant="outlined"
                component="label"
                fullWidth
                disabled={isUploading}
                sx={{
                  height: 48,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 800,
                }}
              >
                {isUploading ? "Загрузка фото..." : "Загрузить несколько фото"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImagesChange}
                />
              </Button>

              {images.length > 0 && (
                <Box
                  sx={{
                    mt: 2,
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, 1fr)",
                      sm: "repeat(3, 1fr)",
                    },
                    gap: 1.2,
                  }}
                >
                  {images.map((img, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={img}
                      alt={`product-${index}`}
                      sx={{
                        width: "100%",
                        height: { xs: 90, md: 100 },
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isUploading}
              sx={{
                mt: 4,
                height: 52,
                fontWeight: 900,
                fontSize: 16,
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              Добавить продукцию
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddProduct;