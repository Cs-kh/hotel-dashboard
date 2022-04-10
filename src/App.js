import React from "react";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddHotel from "./pages/AddHotel";

import { AnimatePresence } from "framer-motion";


function App() {

  return (
    <BrowserRouter>
      <div className="flex ">
        <Menu />
        <div className="flex-1 bg-slate-500 ">
          <AnimatePresence exitBeforeEnter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="add" element={<AddHotel />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
