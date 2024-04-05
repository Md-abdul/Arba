import React, { useState, useEffect } from "react";
import { Grid, Box, Image, Text, Button, Flex, Center } from "@chakra-ui/react";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

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


  const getProductCount = (productId) => {
    return cartItems[productId] || 0;
  };

  // const isCartEmpty = () => {
  //   return Object.values(cartItems).every(count => count === 0);
  // };

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} mt={5}>
      {products.map((product) => (
        <Box
          key={product._id}
          p={4}
          py={20}
          shadow="md"
          borderWidth="1px"
          position="relative"
        >
          <Image src={product.image} alt={product.name} style={{ zIndex: 0 }} />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            backgroundColor="gray"
            padding={4}
            borderRadius={4}
            style={{ zIndex: 1 }}
            mt={20}
          >
            <Text fontSize="xl" fontWeight="semibold">
              {product.name}
            </Text>
            <Text>{product.slug}</Text>
            <Text>Price: ${product.price}</Text>
            {!getProductCount(product._id) && (
              <Button
                mt={2}
                p={3}
                colorScheme="teal"
                size="lg"
                // onClick={() => handleAddToCart(product._id)}
                backgroundColor="teal"
              >
                Add to Cart
              </Button>
            )}
            {!!getProductCount(product._id) && (
              <Flex mt={2} alignItems="center">
                <Button
                  mr={2}
                  colorScheme="teal"
                  size="lg"
                  // onClick={() => handleRemoveFromCart(product._id)}
                >
                  -
                </Button>
                <Text>{getProductCount(product._id)}</Text>
                <Button
                  ml={2}
                  colorScheme="teal"
                  size="lg"
                  // onClick={() => handleAddToCart(product._id)}
                >
                  +
                </Button>
              </Flex>
            )}
          </Box>
        </Box>
      ))}
      {/* {isCartEmpty() && <Text>No items in cart</Text>} */}
    </Grid>
  );
};

export default Home;
