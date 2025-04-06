import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductSingle } from "utils/api";
import {
  Box,
  CircularProgress,
  Typography,
  Chip,
  Divider,
  Grid,
  IconButton
} from "@mui/material";
import { useContext } from "react";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "theme/colorModeContext";
import { ArrowBack } from "@mui/icons-material";

import "./product.scss";

const Product = () => {
  const { barcode } = useParams();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const {
    data: product,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["product", barcode],
    queryFn: () => fetchProductSingle(barcode),
    enabled: !!barcode,
    retry: 1
  });

  if (isLoading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !product) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6" color="error">
          Failed to load product. Please try again later.
        </Typography>
      </Box>
    );
  }

  const nutriments = product.nutriments || {};

  return (
    <Box p={4} className={theme.palette.mode}>
      <Link to={"/"} className="productDetail" style={{ marginBottom: "24px" }}>
        <ArrowBack />
      </Link>
      <IconButton
        onClick={colorMode.toggleColorMode}
        color="inherit"
        style={{ marginBottom: "16px" }}
      >
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <Typography variant="h4" gutterBottom>
        {product.product_name}
      </Typography>

      <Typography variant="subtitle1" color="textSecondary">
        Brand: {product.brands}
      </Typography>

      <Box className="imgWrapper">
        <img src={product.image_url} alt={product.product_name} />
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6">Ingredients</Typography>
      <Typography variant="body1" mt={1}>
        {product.ingredients_text || "No ingredient information available."}
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6">Nutritional Values (per 100g)</Typography>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={6} sm={4}>
          <strong>Energy:</strong> {nutriments["energy-kcal"] || "-"} kcal
        </Grid>
        <Grid item xs={6} sm={4}>
          <strong>Fat:</strong> {nutriments.fat || "-"} g
        </Grid>
        <Grid item xs={6} sm={4}>
          <strong>Saturated Fat:</strong> {nutriments["saturated-fat"] || "-"} g
        </Grid>
        <Grid item xs={6} sm={4}>
          <strong>Carbohydrates:</strong> {nutriments.carbohydrates || "-"} g
        </Grid>
        <Grid item xs={6} sm={4}>
          <strong>Sugars:</strong> {nutriments.sugars || "-"} g
        </Grid>
        <Grid item xs={6} sm={4}>
          <strong>Proteins:</strong> {nutriments.proteins || "-"} g
        </Grid>
        <Grid item xs={6} sm={4}>
          <strong>Salt:</strong> {nutriments.salt || "-"} g
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Labels & Tags
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {(product.labels_tags || []).map((label) => (
          <Chip key={label} label={label.replace(/en:/, "")} />
        ))}
        {(product.traces_tags || []).map((tag) => (
          <Chip key={tag} label={`Contains: ${tag.replace(/en:/, "")}`} />
        ))}
        {(product.ingredients_analysis_tags || []).map((tag) => (
          <Chip
            key={tag}
            label={tag
              .replace(/en:/, "")
              .replace("-", " ")
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
            color="success"
          />
        ))}
      </Box>
    </Box>
  );
};

export default Product;
