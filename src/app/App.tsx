import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "../lib/queryClient";
import { router } from "./routes/router";
import GlobalSpinner from "../shared/components/GlobalSpinner";
import GlobalErrorMessage from "../shared/components/GlobalErrorMessage";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalSpinner />
      <GlobalErrorMessage />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
