import { useState } from "react";
import {
  Flex,
  FormControl,
  Heading,
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
import { ApiCall, callbackhandle } from "../../api/ApiCall";
import InputBase from "../../components/DS/Input";

const LoginContent = () => {
    const [emailAdress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const { colorMode, toggleColorMode } = useColorMode();
    const [color, setColor] = useState(false);


    const handleSubmit = async (event : any) => {
      event.preventDefault();
      const data = callbackhandle(ApiCall.SIGNIN, (await signIn(emailAdress, password))!, setColor);
      window.location.assign("/home");
    };

    
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
                boxShadow={'xl'} p={8} rounded={6} gap='6'>
                  <Heading mb={6}>Sign in to your account</Heading>
                  <InputBase
                    name="email"
                    placeholder="mama@gmail.com"
                    variant="filled"
                    type="email"
                    value={emailAdress}
                    onChange={( target ) => setEmailAddress(target.currentTarget.value)}
                  />
                  <InputBase
                    name="password"
                    placeholder="************"
                    variant="filled"
                    type="password"
                    value={password}
                    onChange={( target ) => setPassword(target.currentTarget.value)}
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
                      <Button colorScheme="white" variant="link" mb={2}>
                        Create an account
                      </Button>
                    </Link>
                  </Center>
                  <Center>
                    <Text mb={4}>
                      ---------------- Or
                      ----------------
                    </Text>
                  </Center>
                  <Button colorScheme="twitter" leftIcon={<FaFacebook />} >Facebook</Button>
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

export default LoginContent;