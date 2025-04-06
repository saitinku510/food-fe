import { Box, Skeleton } from "@mui/material";
import React from "react";

const SkeletonLoader = () => {
  return (
    <Box className="skeleton">
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Box p={2}>
        <Skeleton width="80%" />
        <Skeleton width="60%" />
        <Skeleton width="90%" />
        <Skeleton width="90%" />
        <Skeleton width="50%" />
        <Skeleton width="50%" />
      </Box>
    </Box>
  );
};

export default SkeletonLoader;
