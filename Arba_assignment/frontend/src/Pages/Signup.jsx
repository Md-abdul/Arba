import React, { useState } from "react";
import { Link } from "react-router-dom";
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

export const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://tame-tan-coyote-boot.cyclic.app/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, userName, email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      toast.success("Signup successful!");

      setFullName("");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again later.");
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
                  Sign up for an account
                </Heading>
              </VStack>
              <Card
                bg="#f6f8fa"
                variant="outline"
                borderColor="#d8dee4"
                w={"25rem"}
                p={5}
              >
                <CardBody>
                  <form onSubmit={handleSignUp}>
                    <Stack spacing="4">
                      <FormControl>
                        <FormLabel size="sm">Full Name</FormLabel>
                        <Input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          bg="white"
                          placeholder="Jhon thari"
                          size="lg"
                          borderRadius="6px"
                          px={20}
                          py={2}
                          style={{
                            border: "2px solid #1890b9",
                          }}
                          required
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel size="sm">Username</FormLabel>
                        <Input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          bg="white"
                          borderRadius="6px"
                          placeholder="Jhon123"
                          size="lg"
                          px={20}
                          py={2}
                          style={{
                            border: "2px solid #1890b9",
                          }}
                          required
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel size="sm">Email Address</FormLabel>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          bg="white"
                          placeholder="Jhon@gmail.com"
                          size="lg"
                          borderRadius="6px"
                          px={20}
                          py={2}
                          style={{
                            border: "2px solid #1890b9",
                          }}
                          required
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel size="sm">Password</FormLabel>
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          bg="white"
                          borderColor=""
                          placeholder="****************"
                          size="lg"
                          // size="sm"
                          borderRadius="6px"
                          px={20}
                          py={2}
                          style={{
                            border: "2px solid #1890b9",
                          }}
                          required
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
                        Sign up
                      </Button>
                    </Stack>
                  </form>
                </CardBody>
              </Card>

              <Card variant="outline" borderColor="#d0d7de">
                <CardBody>
                  <Center>
                    <HStack fontSize="sm" spacing="1">
                      <Text>Already have an account?</Text>
                      <Link to="/login" isExternal color="#0969da">
                        Sign in here.
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

// export default SignUp;
