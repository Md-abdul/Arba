

import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { FaEdit, FaTrash,FaTimes } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://arba-backend-1.onrender.com/product/get");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, isEditing: true } : product
      )
    );
  };

  const handleCancelEdit = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, isEditing: false } : product
      )
    );
  };

  const handleSaveEdit = async (productId, updatedData) => {
    try {
      const response = await fetch(
        `https://arba-backend-1.onrender.com/product/update/${productId}`,
        //http://localhost:3020/product/update/660eaf653cc94bac61f3c5fb
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      toast.success("Product updated successfully");
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, ...updatedData, isEditing: false }
            : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `https://arba-backend-1.onrender.com/product/delete/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleInputChange = (productId, fieldName, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, [fieldName]: value } : product
      )
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      backgroundColor="#f0f0f0"
      padding="20px"
    >
      <Table variant="striped" colorScheme="teal" width="80%">
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Slug</Th>
            <Th>Price</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product._id}>
              <Td>
                {product.isEditing ? (
                  <Input
                    value={product.image}
                    onChange={(e) =>
                      handleInputChange(product._id, "image", e.target.value)
                    }
                  />
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </Td>
              <Td>
                {product.isEditing ? (
                  <Input
                    value={product.name}
                    onChange={(e) =>
                      handleInputChange(product._id, "name", e.target.value)
                    }
                  />
                ) : (
                  product.name
                )}
              </Td>
              <Td>
                {product.isEditing ? (
                  <Input
                    value={product.slug}
                    onChange={(e) =>
                      handleInputChange(product._id, "slug", e.target.value)
                    }
                  />
                ) : (
                  product.slug
                )}
              </Td>
              <Td>
                {product.isEditing ? (
                  <Input
                    value={product.price}
                    onChange={(e) =>
                      handleInputChange(product._id, "price", e.target.value)
                    }
                  />
                ) : (
                  `$${product.price}`
                )}
              </Td>
              <Td>
                {product.isEditing ? (
                  <>
                    <IconButton
                      icon={<IoMdDoneAll />}
                      colorScheme="teal"
                      size="sm"
                      onClick={() =>
                        handleSaveEdit(product._id, {
                          image: product.image,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                        })
                      }
                    />
                    <IconButton
                      icon={<FaTimes />}
                      colorScheme="red"
                      size="sm"
                      ml="2"
                      onClick={() => handleCancelEdit(product._id)}
                    />
                  </>
                ) : (
                  <>
                    <IconButton
                      icon={<FaEdit />}
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleEdit(product._id)}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      size="sm"
                      ml="2"
                      onClick={() => handleDelete(product._id)}
                    />
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ToastContainer />
    </Box>
  );
};
