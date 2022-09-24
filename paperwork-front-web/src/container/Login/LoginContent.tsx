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

const LoginContent = () => {
    const [emailAdress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const { colorMode, toggleColorMode } = useColorMode();


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        let res = await signIn(emailAdress, password);
        if (res) {
            window.location.assign("/home");
        } else {
            console.log(res);
        }

        // axios
        //   .post("/api/login", payload)
        //   .then((res) => {
        //     console.log(payload);
        //     //axios.post('/welcome', payload).then(res => {
        //     // printToast(res);
        //     // console.log(document.cookies);
        //     window.location.assign("/home");
        //   })
        //   .catch((err) => {
        //     if (err.response.status == 401) {
        //       window.location.assign("/signup")
        //     }
        //   });
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
                            aria-label="submit_button"
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
                                <Button
                                    aria-label="create_account_button"
                                    colorScheme="white"
                                    variant="link"
                                    mb={6}>
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
                        <Button
                            aria-label="facebook_button"
                            colorScheme="twitter"
                            leftIcon={<FaFacebook />}
                            mb={4}>
                            Facebook
                        </Button>
                        <Button
                            aria-label="google_button"
                            colorScheme="facebook"
                            leftIcon={<FcGoogle />}>
                            Google
                        </Button>
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