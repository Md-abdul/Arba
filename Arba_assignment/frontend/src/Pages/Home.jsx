import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Image,
  Text,
  Button,
  Flex,
  Center,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [showCookieNotification, setShowCookieNotification] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://tame-tan-coyote-boot.cyclic.app/product/get"
      );
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

  const handleAddToCart = (productId) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [productId]: (prevCartItems[productId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      if (updatedCartItems[productId] > 0) {
        updatedCartItems[productId]--;
      }
      return updatedCartItems;
    });
  };

  const acceptCookie = () => {
    setShowCookieNotification(false);
  };

  const rejectCookie = () => {
    window.location.reload();
  };

  return (
    <Box position="relative" overflow="hidden">
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={showCookieNotification ? 9998 : -1}
        backdropFilter={showCookieNotification ? "blur(800px)" : "none"}
        pointerEvents={showCookieNotification ? "auto" : "none"}
      >
        <Grid templateColumns="repeat(4, 1fr)" gap={6} mt={5} p={6}>
          {products.map((product) => (
            <Box
              key={product._id}
              p={4}
              py={20}
              shadow="md"
              borderWidth="1px"
              position="relative"
              mt={10}
            >
              <Image
                src={product.image}
                alt={product.name}
                style={{ zIndex: 0 }}
              />
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
                {getProductCount(product._id) === 0 && (
                  <Button
                    mt={2}
                    p={3}
                    colorScheme="teal"
                    size="lg"
                    onClick={() => handleAddToCart(product._id)}
                    backgroundColor="teal"
                  >
                    Add to Cart
                  </Button>
                )}
                {getProductCount(product._id) > 0 && (
                  <Flex mt={2} alignItems="center">
                    <Button
                      mr={2}
                      colorScheme="teal"
                      size="lg"
                      onClick={() => handleRemoveFromCart(product._id)}
                    >
                      -
                    </Button>
                    <Text>{getProductCount(product._id)}</Text>
                    <Button
                      ml={2}
                      colorScheme="teal"
                      size="lg"
                      onClick={() => handleAddToCart(product._id)}
                    >
                      +
                    </Button>
                  </Flex>
                )}
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
      {showCookieNotification && (
        <Center
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={9999}
        >
          <Box
            p={8}
            shadow="md"
            borderWidth="1px"
            backgroundColor="gray.200"
            borderRadius="md"
            textAlign="center"
            w="80%"
            maxW="900px"
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              This website uses cookies.
            </Text>
            <Text mb={4} p={10}>
              We use essential cookies to make our site work. With your consent,
              we may also use non-essential cookies to improve user experience
              and analyze website traffic. By clicking “Accept,” you agree to
              our website's cookie use as described in our Cookie Policy. You
              can change your cookie settings at any time by clicking
              “Preferences.”
            </Text>
            <Flex justifyContent="center">
              <Button
                onClick={acceptCookie}
                colorScheme="green"
                mr={2}
                py={5}
                p={2}
                style={{ border: "2px solid" }}
              >
                Accept
              </Button>
              <Button
                onClick={rejectCookie}
                colorScheme="red"
                py={5}
                p={2}
                style={{ border: "2px solid" }}
              >
                Reject
              </Button>
            </Flex>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default Home;
