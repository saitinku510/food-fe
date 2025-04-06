import React, { useEffect, useRef, useState } from "react";
import { searchProducts } from "utils/api";
import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText
} from "@mui/material";
import ProductCard from "components/ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "hooks/useDebounce";
import SkeletonLoader from "components/SkeletonLoader";
import { Link } from "react-router-dom";

import "styles/home.scss";

const filterCategories = ["Beverages", "Dairy", "Snacks", "Cheese"];

const Home = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [lastFetchedIndex, setLastFetchedIndex] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const observerRef = useRef(null);

  const handleCategoryChange = (event) => {
    const {
      target: { value }
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading
  } = useInfiniteQuery({
    queryKey: ["productList", debouncedQuery, selectedCategories],
    queryFn: ({ pageParam = 1 }) =>
      searchProducts(debouncedQuery, pageParam, selectedCategories),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    retry: 1
  });

  const products = data?.pages.flat() || [];

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.product_name?.localeCompare(b.product_name || "") || 0;
      case "name-desc":
        return b.product_name?.localeCompare(a.product_name || "") || 0;
      case "nutri-asc":
        return (a.nutrition_grades || "z").localeCompare(
          b.nutrition_grades || "z"
        );
      case "nutri-desc":
        return (b.nutrition_grades || "z").localeCompare(
          a.nutrition_grades || "z"
        );
      case "calories-asc":
        return (
          (parseFloat(a.nutriments?.energy_kcal) || 0) -
          (parseFloat(b.nutriments?.energy_kcal) || 0)
        );
      case "calories-desc":
        return (
          (parseFloat(b.nutriments?.energy_kcal) || 0) -
          (parseFloat(a.nutriments?.energy_kcal) || 0)
        );
      default:
        return 0;
    }
  });

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lastProductIndex = products.length - 1;
        if (entries[0].isIntersecting && lastProductIndex > lastFetchedIndex) {
          setLastFetchedIndex(lastProductIndex);
          fetchNextPage();
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, products, lastFetchedIndex]);

  return (
    <main>
      <header className="header">
        <a href="/">Food FE</a>
        <Box className="headerTools">
          <TextField
            label="Search Products"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="name-asc">Product Name (A-Z)</MenuItem>
              <MenuItem value="name-desc">Product Name (Z-A)</MenuItem>
              <MenuItem value="nutri-asc">Nutrition Grade (A to E)</MenuItem>
              <MenuItem value="nutri-desc">Nutrition Grade (E to A)</MenuItem>
              <MenuItem value="calories-asc">Calories (Lowest First)</MenuItem>
              <MenuItem value="calories-desc">
                Calories (Highest First)
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter Categories</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
              label="Filter Categories"
              renderValue={(selected) => selected.join(", ")}
            >
              {filterCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  <Checkbox
                    checked={selectedCategories.indexOf(category) > -1}
                  />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </header>
      <Box className="products">
        {isLoading && (
          <Grid container className="loader">
            {Array.from(new Array(12)).map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </Grid>
        )}

        {isError && (
          <Box textAlign="center" mt={5}>
            <Typography variant="h6" color="error">
              Failed to load products. Please try again later.
            </Typography>
          </Box>
        )}

        {!isLoading && !isError && (
          <Grid container spacing={2}>
            {sortedProducts.map((product, i) => (
              <Link
                to={`/product/${product.code}`}
                size={{ xs: 12, sm: 6, md: 4 }}
                key={i}
                className="productsCard"
                ref={i === sortedProducts.length - 1 ? observerRef : null}
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </Grid>
        )}

        {/* Loading Indicator */}
        {isFetchingNextPage && (
          <Box textAlign="center" mt={3}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </main>
  );
};

export default Home;
