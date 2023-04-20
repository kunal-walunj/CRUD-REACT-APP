import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Contact from "./component/Contact";
import Myhome from "./component/Myhome";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Product from "./component/Products";

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
         <Route path="/" element={ <Myhome />} />
         <Route path="/Contact" element={ <Contact/>} />
         <Route path="/Product" element={  <Product />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
