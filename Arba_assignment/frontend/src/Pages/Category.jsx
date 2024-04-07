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
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://tame-tan-coyote-boot.cyclic.app/category/get");
      //https://tame-tan-coyote-boot.cyclic.app/category/get
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(
        data.map((category) => ({ ...category, isEditing: false }))
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === categoryId
          ? { ...category, isEditing: true }
          : { ...category, isEditing: false }
      )
    );
  };

  const handleCancelEdit = (categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === categoryId
          ? { ...category, isEditing: false }
          : category
      )
    );
  };

  const handleSaveEdit = async (categoryId, updatedData) => {
    try {
      const response = await fetch(
        `https://tame-tan-coyote-boot.cyclic.app/category/update/${categoryId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update category");
      }
      toast.success("Category updated successfully");
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === categoryId
            ? { ...category, ...updatedData, isEditing: false }
            : category
        )
      );
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await fetch(
        `https://tame-tan-coyote-boot.cyclic.app/category/delete/${categoryId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  const handleInputChange = (categoryId, fieldName, value) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === categoryId
          ? { ...category, [fieldName]: value }
          : category
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
      <Link to="/addcategory">
        <Button p={2} backgroundColor={"red"}>
          Add Category
        </Button>
      </Link>
      <Table variant="striped" colorScheme="teal" width="80%" mt={5}>
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category._id}>
              <Td>
                {category.isEditing ? (
                  <Input
                    value={category.image}
                    onChange={(e) =>
                      handleInputChange(category._id, "image", e.target.value)
                    }
                  />
                ) : (
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </Td>
              <Td>
                {category.isEditing ? (
                  <Input
                    value={category.title}
                    onChange={(e) =>
                      handleInputChange(category._id, "title", e.target.value)
                    }
                  />
                ) : (
                  category.title
                )}
              </Td>
              <Td>
                {category.isEditing ? (
                  <Input
                    value={category.description}
                    onChange={(e) =>
                      handleInputChange(
                        category._id,
                        "description",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  category.description
                )}
              </Td>
              <Td>
                {category.isEditing ? (
                  <Input
                    type="number"
                    value={category.price}
                    onChange={(e) =>
                      handleInputChange(
                        category._id,
                        "price",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                ) : (
                  category.price
                )}
              </Td>
              <Td>
                {category.isEditing ? (
                  <>
                    <IconButton
                      icon={<IoMdDoneAll />}
                      colorScheme="teal"
                      size="sm"
                      onClick={() =>
                        handleSaveEdit(category._id, {
                          image: category.image,
                          title: category.title,
                          description: category.description,
                          price: category.price,
                        })
                      }
                    />
                    <IconButton
                      icon={<FaTimes />}
                      colorScheme="red"
                      size="sm"
                      ml="2"
                      onClick={() => handleCancelEdit(category._id)}
                    />
                  </>
                ) : (
                  <>
                    <IconButton
                      icon={<FaEdit />}
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleEdit(category._id)}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      size="sm"
                      ml="2"
                      onClick={() => handleDelete(category._id)}
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
