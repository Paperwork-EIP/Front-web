import React, { useState } from 'react';
import { Center, Grid, GridItem, Input, InputGroup, InputRightElement, Button, Progress, Box } from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineCalendar } from "react-icons/ai";
import "../styles/Profile.css"

const ProfilePage = () => {
    const [showEyePwd, setShowEyePwd] = React.useState(false)
    const handleClickEyePwd = () => setShowEyePwd(!showEyePwd)
    const [showEyeVerifPwd, setShowEyeVerifPwd] = React.useState(false)
    const handleClickVerifEyePwd = () => setShowEyeVerifPwd(!showEyeVerifPwd)
    const [username, setUsername] = useState("");
    const [emailAdress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [verifPassword, setVerifPassword] = useState("");
 
    return (
        <>
            <Grid h='600px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4} >
                
            <GridItem rowSpan={2} colSpan={2}>
                    <Center>
                        <img src='https://bit.ly/dan-abramov' alt='' className='Profile-UploadImage'></img>
                    </Center>
                    <Center>
                        <InputGroup size='md' width={"auto"}>
                            <Input
                                type={'text'}
                                placeholder= 'Enter username'
                                variant= "filled"
                                mb={4}
                                value={username}
                                onChange={({ target }) => setUsername(target.value)}
                            />
                            <InputRightElement>
                            </InputRightElement>
                        </InputGroup>
                    </Center>
                    <Center>
                        <InputGroup size='md' width={"auto"}>
                            <Input
                                type={'email'}
                                placeholder= 'Enter email'
                                variant= "filled"
                                mb={4}
                                value={emailAdress}
                                onChange={({ target }) => setEmailAddress(target.value)}
                            />
                            <InputRightElement>
                            </InputRightElement>
                        </InputGroup>
                    </Center>
                    <Center>
                        <InputGroup size='md' width={"auto"}>
                            <Input
                                type={showEyePwd ? 'text' : 'password'}
                                placeholder= 'Enter password'
                                variant= "filled"
                                mb={4}
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                            />
                            <InputRightElement>
                                <Button size='sm' onClick={handleClickEyePwd}>
                                {
                                    showEyePwd ? <AiFillEye className='Profile-Input-Icon' size={20} /> : <AiFillEyeInvisible className='Profile-Input-Icon' size={20} />
                                }
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Center>
                    <Center>
                        <InputGroup size='md' width={"auto"}>
                            <Input
                                type={showEyeVerifPwd ? 'text' : 'password'}
                                placeholder='Verify password'
                                variant= "filled"
                                mb={4}
                                value={verifPassword}
                                onChange={({ target }) => setVerifPassword(target.value)}
                            />
                            <InputRightElement>
                                <Button size='sm' onClick={handleClickVerifEyePwd}>
                                {
                                    showEyeVerifPwd ? <AiFillEye className='Profile-Input-Icon' size={20} /> : <AiFillEyeInvisible className='Profile-Input-Icon' size={20} />
                                }
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Center>
                </GridItem>
                <GridItem rowSpan={1} colSpan={3}>
                <Center>
                    <Button leftIcon={<AiOutlineCalendar />} className='Profile-CalendarButton'>
                    Calendar 
                    </Button>
                </Center>
                </GridItem>
                <GridItem rowSpan={1} colSpan={3}>
                <Box className='Profil-ProcessBox'>
                <br/>
                Your current process
                <Progress colorScheme='red' size='lg' value={20} className='Profil-ProcessBar'/>
                <br/>
                Your current process
                <Progress colorScheme='red' size='lg' value={80} className='Profil-ProcessBar'/>
                <br/>
                </Box>
                </GridItem>
            </Grid>
        </>
    );
}

export default ProfilePage;