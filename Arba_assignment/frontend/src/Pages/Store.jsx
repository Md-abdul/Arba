


import React, { useState } from "react";
import { Category } from "./Category"; 
import { Product } from "./Product"; 
import { Button, Flex } from "@chakra-ui/react";
import AddProduct from "./AddProduct";

export const Store = () => {
  const [selectedTab, setSelectedTab] = useState("products");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div style={{ textAlign: "center", marginTop:'10px' }} >
      
      <Flex justifyContent="center" marginBottom="20px">
        <Button
          marginRight="10px"
          p={2} fontSize={'xl'} borderRadius={20}
          style={{backgroundColor:'teal',}}
          onClick={() => handleTabChange("categories")}
        >
          View Categories
        </Button>
        <Button
          p={3} fontSize={'xl'}
          style={{backgroundColor:'teal',}} borderRadius={20}
          onClick={() => handleTabChange("products")}
        >
          View Products
        </Button>
      </Flex>

      <Button style={{backgroundColor:'teal',}} borderRadius={20} p={2} onClick={() => handleTabChange('addproduct')}>Add Product</Button>
      {selectedTab === "categories" && <Category />}
      {selectedTab === "products" && <Product />}
      {selectedTab === "addproduct" && <AddProduct />}
    </div>
  );
};
