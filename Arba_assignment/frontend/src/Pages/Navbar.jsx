
import React, { useContext } from "react";
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  HStack,
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Box bg={"gray.100"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Flex alignItems={"center"}>
            <Link to={"/"}>
              <Box>Logo</Box>
            </Link>
          </Flex>
          <Flex alignItems={"center"}>
            {isAuth ? (
              <>
                <Link to="/store">
                  <Button variant="ghost" ml={5}>MyStore</Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" ml={5}>Profile</Button>
                </Link>
                <Button variant="ghost" ml={5} onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} name="User" />
                </MenuButton>
                <MenuList>
                <MenuItem>
                    <Link to="/store">My Store</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/profile">Profile</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/login">Login</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Box>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <HStack spacing={4} justifyContent={"center"}>
            {isAuth ? (
              <>
                <Link to="/store">
                  <Button variant="ghost">MyStore</Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <MenuItem>
                <Link to="/login">Login</Link>
              </MenuItem>
            )}
          </HStack>
        </Box>
      )}
    </>
  );
};

export default Navbar;
