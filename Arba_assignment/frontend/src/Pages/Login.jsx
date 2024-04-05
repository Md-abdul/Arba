

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [email, setEmail] = useState("Jack@gmail.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const response = await fetch("https://arba-backend-1.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);

      setEmail("");
      setPassword("");

      navigate('/');

      toast.success("Login successful!");

    } catch (error) {
      console.error("Login failed:", error);

      // Show error toast
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Center h="100vh" mt={-10}>
      <Box
        maxW="1000px"
        width="100%"
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <HStack spacing={8}>
          <Box flex="1">
            <Image
              src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
              alt="GitHub logo"
            />
          </Box>
          <Box flex="1">
            <VStack spacing="4" maxW="400px" width="100%">
              <VStack as="header" spacing="6" mt="8">
                <Heading
                  as="h1"
                  fontWeight="300"
                  fontSize="24px"
                  letterSpacing="-0.5px"
                >
                  Sign In 
                </Heading>
              </VStack>
              <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4"  w={"25rem"}
                p={5}>
                <CardBody>
                  <form onSubmit={handleLogin}>
                    <Stack spacing="4">
                      <FormControl>
                        <FormLabel size="sm">
                          Email
                        </FormLabel>
                        <Input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          bg="white"
                          borderColor="#d8dee4"
                          // size="sm"
                          borderRadius="6px"
                          placeholder='Jhon thari' size='lg'
                          px={20}
                          py={2}
                          style={{
                            border: "2px solid #18b923",
                            
                          }}
                        />
                      </FormControl>
                      <FormControl>
                        <HStack justify="space-between">
                          <FormLabel size="sm">Password</FormLabel>
                          <Button
                            as="a"
                            href="#"
                            variant="link"
                            size="xs"
                            color="#0969da"
                            fontWeight="500"
                            
                          >
                            Forgot password?
                          </Button>
                        </HStack>
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          bg="white"
                          borderColor="#d8dee4"
                          // size="sm"
                          borderRadius="6px"
                          px={20}
                          py={2}
                          placeholder='*****---*****' size='lg'
                          style={{
                            border: "2px solid #17932b",
                            
                          }}
                        />
                      </FormControl>

                      <Button
                        type="submit"
                        bg="#2da44e"
                        color="white"
                        size="sm"
                        _hover={{ bg: "#2c974b" }}
                        _active={{ bg: "#298e46" }}
                        p={2}
                      >
                        Sign in
                        
                      </Button>
                    </Stack>
                  </form>
                </CardBody>
              </Card>

              <Card variant="outline" borderColor="#d0d7de">
                <CardBody>
                  <Center>
                    <HStack fontSize="sm" spacing="1">
                      <Text>New to Loign?</Text>
                      <Link to="/signup" isExternal color="#0969da" >
                        Create an account.
                      </Link>
                    </HStack>
                  </Center>
                </CardBody>
              </Card>
            </VStack>
          </Box>
        </HStack>
      </Box>
      <ToastContainer />
    </Center>
  );
};

