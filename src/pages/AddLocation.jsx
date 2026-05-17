import { useState } from "react";

import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useLocations } from "../contexts/LocationsContext";
import { supabase } from "../lib/supabase";

function AddLocation() {
  const { addLocation } = useLocations();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);

  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [features, setFeatures] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setIsUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("locations")
      .upload(fileName, file);

    if (error) {
      console.error("Ошибка загрузки:", error.message);
      setIsUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("locations")
      .getPublicUrl(fileName);

    setImage(publicUrl);

    setIsUploading(false);
  };

  const handleGalleryImagesChange = async (e) => {
    const files = Array.from(e.target.files);

    const uploadedImages = [];

    setIsUploading(true);

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("locations")
        .upload(fileName, file);

      if (error) {
        console.error("Ошибка загрузки:", error.message);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("locations")
        .getPublicUrl(fileName);

      uploadedImages.push(publicUrl);
    }

    setImages(uploadedImages);

    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLocation = {
      title,
      description,
      image,
      images,
      city,
      price,
      rating,
      features: features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const createdLocation = await addLocation(newLocation);

    if (createdLocation) {
      navigate("/locations");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #06281C 0%, #0D5C46 100%)",
        py: {
          xs: 4,
          md: 7,
        },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: {
              xs: 3,
              sm: 4,
              md: 5,
            },

            borderRadius: 5,

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.18)",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 34,
                md: 42,
              },

              fontWeight: 900,

              color: "#06281C",

              mb: 1,
            }}
          >
            Добавить локацию 🌿
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 4,

              fontSize: {
                xs: 15,
                md: 16,
              },

              lineHeight: 1.7,
            }}
          >
            Заполните информацию об объекте, добавьте фотографии и
            список доступных услуг.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Название"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <TextField
              label="Описание"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />

            <Box sx={{ mt: 3 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  mb: 1.2,
                  fontSize: 16,
                }}
              >
                Главное изображение
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
                {isUploading
                  ? "Загрузка..."
                  : "Загрузить главное фото"}

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={
                    handleMainImageChange
                  }
                />
              </Button>

              {image && (
                <Box
                  component="img"
                  src={image}
                  alt="preview"
                  sx={{
                    mt: 2,

                    width: "100%",

                    height: {
                      xs: 220,
                      md: 260,
                    },

                    objectFit: "cover",

                    borderRadius: 3,
                  }}
                />
              )}
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  mb: 1.2,
                  fontSize: 16,
                }}
              >
                Дополнительные фото
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
                {isUploading
                  ? "Загрузка..."
                  : "Загрузить несколько фото"}

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={
                    handleGalleryImagesChange
                  }
                />
              </Button>

              {images.length > 0 && (
                <Box
                  sx={{
                    mt: 2,

                    display: "grid",

                    gridTemplateColumns:
                      {
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(3, 1fr)",
                      },

                    gap: 1.2,
                  }}
                >
                  {images.map(
                    (img, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={img}
                        alt={`gallery-${index}`}
                        sx={{
                          width: "100%",

                          height: {
                            xs: 90,
                            md: 100,
                          },

                          objectFit:
                            "cover",

                          borderRadius: 2,
                        }}
                      />
                    )
                  )}
                </Box>
              )}
            </Box>

            <TextField
              label="Город"
              fullWidth
              margin="normal"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
            />

            <TextField
              label="Цена за посещение"
              fullWidth
              margin="normal"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />

            <TextField
              label="Рейтинг (0–10)"
              fullWidth
              margin="normal"
              value={rating}
              onChange={(e) =>
                setRating(e.target.value)
              }
            />

            <TextField
              label="Что доступно? Например: Экскурсия, Дегустация, Фотозоны"
              fullWidth
              margin="normal"
              value={features}
              onChange={(e) =>
                setFeatures(e.target.value)
              }
            />

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
              Добавить объект
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddLocation;