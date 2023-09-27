import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/components/Layout";
import Home from "./pages/Home";
import StocksPage from "./pages/StocksPage";
import SearchStocksPage from "./pages/SearchStocksPage";
import NoPage from "./pages/NoPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="stocks" element={<StocksPage />} />
          <Route path="stocks-search" element={<SearchStocksPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
