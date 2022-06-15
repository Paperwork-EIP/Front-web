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

const Login = () => {
    const [emailAdress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <FormControl as="fieldset">
            <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
              <Flex alignItems="center" bg={useColorModeValue('gray.50', 'gray.800')} justifyContent="center">
                <Flex direction="column" bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'xl'} p={12} rounded={6}>
                  <Heading mb={12}>Sign in to your account</Heading>
                  <Input
                    placeholder="mama@gmail.com"
                    variant="filled"
                    mb={8}
                    type="email"
                    value={emailAdress}
                    onChange={({ target }) => setEmailAddress(target.value)}
                  />
                  <Input
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
                  >
                    submit
                  </Button>
                  <Center>
                    <Link to="/signup">
                      <Button colorScheme="white" variant="link" mb={6}>
                        Create an account
                      </Button>
                    </Link>
                  </Center>
                  <Text mb={8}>
                    ----------------------------------- Or
                    -----------------------------------
                  </Text>
                  <Button colorScheme="twitter" leftIcon={<FaFacebook />} mb={4}>Facebook</Button>
                  <Button colorScheme="facebook" leftIcon={<FcGoogle />}>Google</Button>
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

export default Login;