import { useState } from "react";
import {
  Flex,
  FormControl,
  Heading,
  Input,
  Button,
  Image,
  Text,
  Stack,
  Box,
  Center,
  useColorModeValue,
  useColorMode
} from "@chakra-ui/react";
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link } from "react-router-dom";
import { signIn } from "../../api/Auth";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from "react";
import axios from "axios";
import { url } from "inspector";

const LoginContent = () => {
    const [emailAdress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const { colorMode, toggleColorMode } = useColorMode();


    const handleSubmit = async (event : any) => {
      event.preventDefault();
      let res = await signIn(emailAdress, password);
      if (res) {
        window.location.assign("/home");
      } else {
        console.log(res);
      }
    };
  const googleConnect = () => {
    const res = axios.get(`http://localhost:8080/oauth/google/urlLogin`).then(res => {
      window.location.replace(res.data)
    })
  }
  const facebookConnect = () => {
    const res = axios.get(`http://localhost:8080/oauth/facebook/url`).then(res => {
      window.location.replace(res.data)
    })
  }
    
    return (
        <FormControl as="fieldset">
            
            <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Box boxSize="30px">
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Box>
              <Flex alignItems="center" bg={useColorModeValue('gray.50', 'gray.800')} justifyContent="center">
                <Flex direction="column" bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'xl'} p={8} rounded={6}>
                  <Heading mb={12}>Sign in to your account</Heading>
                  <Input
                    aria-label="email"
                    placeholder="mama@gmail.com"
                    variant="filled"
                    mb={8}
                    type="email"
                    value={emailAdress}
                    onChange={({ target }) => setEmailAddress(target.value)}
                  />
                  <Input
                    aria-label="password"
                    placeholder="************"
                    variant="filled"
                    mb={8}
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />                
                  <Button
                    colorScheme="purple"
                    mb={3}
                    type="submit"
                    onClick={(e) => {
                      handleSubmit(e)
                    }}
                  >
                    submit
                  </Button>
                  <Center>
                    <Link to="/register">
                      <Button colorScheme="white" variant="link" mb={6}>
                        Create an account
                      </Button>
                    </Link>
                  </Center>
                  <Center>
                    <Text mb={8}>
                      ---------------- Or
                      ----------------
                    </Text>
                  </Center>
                  <Button colorScheme="twitter" leftIcon={<FaFacebook />} mb={4} onClick={facebookConnect}>Facebook</Button>
                  <Button colorScheme="facebook" leftIcon={<FcGoogle />} onClick={googleConnect}>Google</Button>
                </Flex>
              </Flex>
              <Flex flex={1}>
                <Image
                  alt={"Login Image"}
                  objectFit={"cover"}
                  src={
                    "https://smallbizclub.com/wp-content/uploads/2018/09/Types-of-Paperwork-Youll-Have-to-Create.jpg"
                  }
                />
              </Flex>
            </Stack>
        </FormControl>
    );
}

export default LoginContent;