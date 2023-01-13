import React, { useState } from "react";
import { Center, Input, InputGroup, InputRightElement, Button, Avatar, Text, Box, Grid, GridItem } from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const AccountModifications = () => {
    const [showEyePwd, setShowEyePwd] = React.useState(false)
    const handleClickEyePwd = () => setShowEyePwd(!showEyePwd)
    const [showEyeVerifPwd, setShowEyeVerifPwd] = React.useState(false)
    const handleClickVerifEyePwd = () => setShowEyeVerifPwd(!showEyeVerifPwd)
    const [username, setUsername] = useState("");
    const [emailAdress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [verifPassword, setVerifPassword] = useState("");
    const [file, setFile] = useState("");
    
    return (
        <>
            <Box>
                <Center>
                    <Input
                    type={'file'}
                    placeholder='Choose a file'
                    mb={6}
                    value={file}
                    onChange={({ target }) => setFile(target.value)}
                    hidden
                    />
                    <Avatar size='2xl' width="15vw" height="15vw" name='Christian Nwamba' mb={6} mt={8} src='https://bit.ly/dan-abramov' border={"5px solid white"} boxShadow={"0px 5px 5px lightgray"} />{' '}
                </Center>
                <Center>
                    <Grid w={"60%"}>
                        <GridItem>
                            <Text>Username</Text>
                        </GridItem>
                        <GridItem>
                            <InputGroup size='lg'>
                                <Input
                                    id="username"
                                    aria-label="username"
                                    type={'text'}
                                    placeholder='Enter username'
                                    variant="filled"
                                    mb={6}
                                    value={username}
                                    onChange={({ target }) => setUsername(target.value)} />
                                <InputRightElement>
                                </InputRightElement>
                            </InputGroup>
                        </GridItem>
                    </Grid>
                </Center>
                
                <Center>
                    <Grid w={"60%"}>
                        <GridItem>
                            <Text>Email</Text>
                        </GridItem>
                        <GridItem>
                            <InputGroup size='lg'>
                                <Input
                                    id="email"
                                    aria-label="email"
                                    type={'text'}
                                    placeholder='Enter email'
                                    variant="filled"
                                    mb={6}
                                    value={emailAdress}
                                    onChange={({ target }) => setEmailAddress(target.value)} />
                                <InputRightElement>
                                </InputRightElement>
                            </InputGroup>
                        </GridItem>
                    </Grid>
                </Center>
                
                <Center>
                    <Grid w={"60%"}>
                        <GridItem>
                            <Text>Password</Text>
                        </GridItem>
                        <GridItem>
                            <InputGroup size='lg'>
                                <Input
                                    id="password"
                                    aria-label="password"
                                    type={showEyePwd ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    variant="filled"
                                    mb={6}
                                    value={password}
                                    onChange={({ target }) => setPassword(target.value)} />
                                <InputRightElement>
                                    <Button size='sm' onClick={handleClickEyePwd}>
                                        {showEyePwd ? <AiFillEye className='Profile-Input-Icon' size={20} /> : <AiFillEyeInvisible className='Profile-Input-Icon' size={20} />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </GridItem>
                    </Grid>
                </Center>
                
                <Center>
                    <Grid w={"60%"}>
                        <GridItem>
                            <Text>Verify password</Text>
                        </GridItem>
                        <GridItem>
                            <InputGroup size='lg'>
                                <Input
                                    id="verifPassword"
                                    aria-label="verify_password"
                                    type={showEyeVerifPwd ? 'text' : 'password'}
                                    placeholder='Verify password'
                                    variant="filled"
                                    mb={6}
                                    value={verifPassword}
                                    onChange={({ target }) => setVerifPassword(target.value)} />
                                <InputRightElement>
                                    <Button size='sm' onClick={handleClickVerifEyePwd}>
                                        {showEyeVerifPwd ? <AiFillEye className='Profile-Input-Icon' size={20} /> : <AiFillEyeInvisible className='Profile-Input-Icon' size={20} />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </GridItem>
                    </Grid>
                </Center>
            </Box>
        </>
    );
}

export default AccountModifications;