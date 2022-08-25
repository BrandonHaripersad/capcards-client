import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import TeamCard from "./pages/TeamCard";
import MenuBar from "./components/MenuBar";
import Container from "@mui/material/Container";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <BrowserRouter>
      <MenuBar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Teams />} />
          <Route path="/teams/:name" element={<TeamCard />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
