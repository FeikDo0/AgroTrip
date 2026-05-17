import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";

import { useLocations } from "../contexts/LocationsContext";
import { supabase } from "../lib/supabase";

function EditLocation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { locations, updateLocation } = useLocations();

  const location = locations.find((item) => String(item.id) === id);

  const [title, setTitle] = useState(location?.title || "");
  const [description, setDescription] = useState(location?.description || "");
  const [image, setImage] = useState(location?.image || "");
  const [images, setImages] = useState(location?.images || []);
  const [city, setCity] = useState(location?.city || "");
  const [price, setPrice] = useState(location?.price || "");
  const [rating, setRating] = useState(location?.rating || "");
  const [features, setFeatures] = useState(
    location?.features?.join(", ") || ""
  );
  const [isUploading, setIsUploading] = useState(false);

  if (!location) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight={900}>
          Локация не найдена 😔
        </Typography>
      </Container>
    );
  }

  const uploadFile = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("locations")
      .upload(fileName, file);

    if (error) {
      console.error("Ошибка загрузки фото:", error.message);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("locations").getPublicUrl(fileName);

    return publicUrl;
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const publicUrl = await uploadFile(file);

    if (publicUrl) {
      setImage(publicUrl);
    }

    setIsUploading(false);
  };

  const handleGalleryImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    setIsUploading(true);

    for (const file of files) {
      const publicUrl = await uploadFile(file);

      if (publicUrl) {
        uploadedImages.push(publicUrl);
      }
    }

    setImages(uploadedImages);
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedLocation = {
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

    const savedLocation = await updateLocation(location.id, updatedLocation);

    if (savedLocation) {
      navigate("/locations");
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
            Редактировать локацию ✏️
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
            Измените данные объекта и сохраните обновления.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Название"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Описание"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Box sx={{ mt: 3 }}>
              <Typography sx={{ fontWeight: 800, mb: 1.2 }}>
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
                {isUploading ? "Загрузка..." : "Заменить главное фото"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleMainImageChange}
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
                    height: { xs: 220, md: 260 },
                    objectFit: "cover",
                    borderRadius: 3,
                  }}
                />
              )}
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography sx={{ fontWeight: 800, mb: 1.2 }}>
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
                {isUploading ? "Загрузка..." : "Заменить дополнительные фото"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleGalleryImagesChange}
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
                      alt={`gallery-${index}`}
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

            <TextField
              label="Город"
              fullWidth
              margin="normal"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <TextField
              label="Цена за посещение"
              fullWidth
              margin="normal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <TextField
              label="Рейтинг (0–10)"
              fullWidth
              margin="normal"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />

            <TextField
              label="Что доступно? Например: Экскурсия, Дегустация"
              fullWidth
              margin="normal"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
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
              Сохранить изменения
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default EditLocation;