/* eslint-disable */
import axios from "axios";

const BASE_URL = `https://world.openfoodfacts.org`;

const searchProducts = async (
  query = "snacks",
  page = 1,
  selectedCategories = []
) => {
  const combinedSearchTerms = [query, ...selectedCategories]
    .filter(Boolean)
    .join(",");
  const response = await axios.get(
    `${BASE_URL}/cgi/search.pl?search_terms=${combinedSearchTerms}&page=${page}&page_size=20&json=true`
  );
  return response.data.products || [];
};

const fetchProductSingle = async (barcode) => {
  const response = await axios.get(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );
  return response.data.product; // Not products (it's a single object)
};

export { searchProducts, fetchProductSingle };
