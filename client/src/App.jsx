import React, { useState } from "react";

// @MUI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// LOCAL COMPONENTS
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { Divider } from "@mui/material";

function App() {
  // RETURN
  return (
    <>
      {/* HEADER */}
      <Header />
      <Divider sx={{ margin: 1 }} />

      {/* USER DATA */}

      {/* CONTENT */}
      <Dashboard />
    </>
  );
}

export default App;
