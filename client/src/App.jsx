import React, { useState } from "react";
import "./App.css";

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
