import React, { useState } from "react";
import {
  Flex,
  FormControl,
  Heading,
  Input,
  Button,
  Image,
  Text,
  Stack,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Register = () => {
  const api = "http://localhost:8080";
  const [username, setUsername] = useState("");
  const [emailAdress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const submitForm = () => {
    if (password !== confirmPassword) {
      console.error('Your passwords are not the same');
      return
    }
    axios.post(`${api}/user/register`, {
      username: username,
      email: emailAdress,
      password: password
    }).then(response => {
      cookies.set('loginToken', response.data.jwt, {
        path:'/',
        secure:true,
        sameSite:'none'
    });
      window.location.assign("/home");
    }).catch(err => {
      window.location.assign("/register")
    })
  };
  const googleConnect = () => {
    axios.get(`http://localhost:8080/oauth/google/urlLogin`).then(res => {
      window.location.replace(res.data)
    })
  }
  const facebookConnect = () => {
    axios.get(`http://localhost:8080/oauth/facebook/url`).then(res => {
      window.location.replace(res.data)
    })
  }
  return (
      <FormControl as="fieldset">
          <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex alignItems="center" bg={useColorModeValue('gray.50', 'gray.800')} justifyContent="center">
              <Flex direction="column" bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'xl'} p={12} rounded={6}>
                <Heading mb={12}>Create your account</Heading>
                <Input
                  aria-label="username"
                  placeholder="username"
                  variant="filled"
                  mb={8}
                  type="text"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
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
                  placeholder="password"
                  variant="filled"
                  mb={8}
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
                <Input
                  aria-label="confirmPassword"
                  placeholder="Confirm password"
                  variant="filled"
                  mb={8}
                  type="password"
                  value={confirmPassword}
                  onChange={({ target }) => setConfirmPassword(target.value)}
                />      
                <Button
                  aria-label="submit_button"
                  colorScheme="purple"
                  mb={3}
                  type="submit"
                  onClick={submitForm}
                >
                  submit
                </Button>
                <Center>
                  <Link to="/">
                    <Button aria-label="signin_button" colorScheme="white" variant="link" mb={6}>
                      Sign in
                    </Button>
                  </Link>
                </Center>
                <Text mb={8}>
                  ----------------------------------- Or
                  -----------------------------------
                </Text>
                <Button aria-label="facebook_button" colorScheme="twitter" leftIcon={<FaFacebook />} mb={4} onClick={facebookConnect}>Facebook</Button>
                <Button aria-label="google_button" colorScheme="facebook" leftIcon={<FcGoogle />} onClick={googleConnect}>Google</Button>
              </Flex>
            </Flex>
            <Flex flex={1}>
              <Image
                alt={"Register Image"}
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

export default Register;