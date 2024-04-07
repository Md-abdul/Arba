import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Text, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddCategory = () => {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    price: '',
    category: ''
  });

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3020/category/postcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to add category');
      }
      toast.success('Category added successfully');
setFormData({
    image: '',
    title: '',
    description: '',
    price: '',
    category: ''
})
    } catch (error) {
      toast.error('Failed to add Category');
    }
  };

  return (
    <>
      <Center>
        <Box maxW="md" mt="20px" p="20px" px={20} border="1px solid #ccc" borderRadius="md" bg="#fff">
          <Text fontSize={'2xl'} mb="20px">Add Products</Text>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                border="1px solid #ccc"
                borderRadius="md"
                bg="#f8f8f8"
                p="10px"
              />
            </FormControl>
            <FormControl mt="15px">
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                border="1px solid #ccc"
                borderRadius="md"
                bg="#f8f8f8"
                p="10px"
              />
            </FormControl>
            <FormControl mt="15px">
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                border="1px solid #ccc"
                borderRadius="md"
                bg="#f8f8f8"
                p="10px"
              />
            </FormControl>
            <FormControl mt="15px">
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                border="1px solid #ccc"
                borderRadius="md"
                bg="#f8f8f8"
                p="10px"
              />
            </FormControl>
            <FormControl mt="15px">
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                border="1px solid #ccc"
                borderRadius="md"
                bg="#f8f8f8"
                p="10px"
              />
            </FormControl>
            <Button colorScheme="teal" mt="20px" type="submit" style={{backgroundColor:'teal'}} p={2}>
              Add Category
            </Button>
          </form>
        </Box>
      </Center>
      <ToastContainer/>
    </>
  );
};

export default AddCategory;
