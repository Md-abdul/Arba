import React from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
export default function PrivateRoutes({ children }) {
  const { isAuth } = useContext(AuthContext);
    console.log(isAuth);
  if (!isAuth) {
    return <Navigate to="/login"/>
    // return <Login />;
  }
  return children;
}
