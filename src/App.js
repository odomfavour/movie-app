import React from "react";
import { Route, Routes } from "react-router";
import Catalog from "./screens/Catalog";
import Detail from "./screens/Detail";
// import './index.scss';
import Home from "./screens/Index"
function App() {
  return (
    <Routes>
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category/:id" element={<Detail />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
