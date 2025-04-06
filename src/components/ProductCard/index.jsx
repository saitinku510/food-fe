import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, height: "100%", m: "0 auto" }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image_url}
        alt={product?.generic_name}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {product?.product_name_en || product?.product_name || "No Label"}
        </Typography>
        <Typography fontWeight="bold" variant="body2">
          Category:
        </Typography>{" "}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden"
          }}
        >
          {product?.categories || "N/A"}
        </Typography>
        <Box mt={1}>
          <Typography variant="body2">
            <strong>Ingredients:</strong>
          </Typography>
          <ul>
            {product?.ingredients?.length > 0 ? (
              product.ingredients
                .slice(0, 4)
                .map((vl, idx) => <li key={idx}>{vl?.id?.substring(3)}</li>)
            ) : (
              <li>No ingredients available</li>
            )}
          </ul>
        </Box>
        <Typography variant="body2" mt={1}>
          <strong>Nutrition grade:</strong>{" "}
          {product?.nutrition_grades?.toUpperCase() || "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
