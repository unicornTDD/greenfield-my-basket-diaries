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

const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* USER DATA */}

      {/* CONTENT */}
      <Dashboard />
    </>
  );
}

export default App;
