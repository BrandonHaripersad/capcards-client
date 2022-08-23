import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import MenuBar from "./components/MenuBar";
import Container from "@mui/material/Container";

function App() {
  return (
    <BrowserRouter>
      <MenuBar />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
