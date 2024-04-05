import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { Signup } from "../Pages/Signup";
import { Profile } from "../Pages/Profile";
import { Store } from "../Pages/Store";
import { Category } from "../Pages/Category";
import { Product } from "../Pages/Product";
import AddProduct from "../Pages/AddProduct";
// import { AddToCart } from "../Pages/AddToCart";
import PrivateRoutes from "./PrivateRoutes";
export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/store" element={<PrivateRoutes><Store /></PrivateRoutes>} />
        <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
        <Route path="/category" element={<PrivateRoutes><Category /></PrivateRoutes>} />
        <Route path="/product" element={<PrivateRoutes><Product /></PrivateRoutes>} />
        <Route path="/addproduct" element={<AddProduct/>}/>
      </Routes>
    </>
  );
};
