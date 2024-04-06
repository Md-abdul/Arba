import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';

const AddProduct = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    image:'',
    name: '',
    slug: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://tame-tan-coyote-boot.cyclic.app/product/postproduct', {
        //https://arba-backend-1.onrender.com/
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
       if (typeof onAdd === 'function') {
        onAdd();
      }
      toast.success('Product added successfully');

      setFormData({
        image:'',
        name: '',
        slug: '',
        price: '',
      })
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };



  return (
    <Center>
    <Box w={80} boxShadow={'md'} p={10} borderRadius={10}>
      <form onSubmit={handleSubmit}>
      <FormControl>
          <FormLabel>Image</FormLabel>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            p={2}
            style={{border:'2px solid teal'}}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            p={2}
            style={{border:'2px solid teal'}}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Slug</FormLabel>
          <Input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            p={2}
            style={{border:'2px solid teal'}}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            p={2}
            style={{border:'2px solid teal'}}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit" backgroundColor={'tomato'} p={2}>
          Add Product
        </Button>
      </form>
    </Box>
    <ToastContainer />
    </Center>
  );
};

export default AddProduct;
