import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Product from "pages/Product";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColorModeProvider } from "theme/colorModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // Cache is considered fresh for 5 minutes
      cacheTime: 1000 * 60 * 5, // Cache will persist for 10 minutes after becoming stale
      refetchOnWindowFocus: false, // Disable refetching when the window gains focus
      refetchOnMount: false
    }
  }
});
const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:barcode" element={<Product />} />
          </Routes>
        </BrowserRouter>
      </ColorModeProvider>
    </QueryClientProvider>
  );
};

export default AppRoutes;
