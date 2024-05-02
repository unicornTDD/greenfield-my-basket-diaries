import React, { useState } from "react";
import "./App.css";

// @MUI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Button from "@mui/material/Button";
import { CardHeader } from "@mui/material";

// LOCAL COMPONENTS
import Header from "./components/Header";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
  return (
    <>
      {/* HEADER */}
      <div className="header">
        <h1>GREEN FIELD MY BASKET DIARY</h1>
        <p>Username</p>
      </div>

      {/* CONTENT */}
    </>
  );
}

export default App;
