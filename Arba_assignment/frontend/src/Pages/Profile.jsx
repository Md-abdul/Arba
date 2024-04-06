

import React, { useState, useEffect } from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserData = async () => {
      try {
        const response = await fetch("https://tame-tan-coyote-boot.cyclic.app/user/singleusers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserData(userData);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); 
      }
    };

    fetchUserData();
  }, []); 

  return (
    <Center>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p="4"
        maxW="xl"
        w="100%"
        textAlign="center"
        mt={10}
      >
        <br />
        <br />

        {loading ? ( 
          <p>Loading...</p>
        ) : userData ? (
          <div>
            <Box>
              <Flex>
                <Box borderRadius="full" overflow="hidden">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/030/690/466/non_2x/office-worker-2d-cartoon-illustraton-on-white-background-h-free-photo.jpg"
                    alt=""
                    style={{width:'10rem'}}
                  />
                </Box>
                <Box ml={5}>
                  <Text fontSize={"2xl"}>Full Name: {userData.fullName}</Text>
                  <Text fontSize={"2xl"}>User Name: {userData.userName}</Text>
                  <Text fontSize={"2xl"}>Email: {userData.email}</Text>
                  <Text fontSize={"2xl"}>Password: {userData.password}</Text>
                </Box>
              </Flex>
            </Box>
          </div>
        ) : (
          <p>No user data available</p>
        )}
      </Box>
    </Center>
  );
};
