import React from 'react';
import { Center, Grid, GridItem, Input, InputGroup, InputRightElement, Button, Progress, Box } from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineCalendar } from "react-icons/ai";
import "../styles/Profile.css"

const ProfilePage = () => {
    const [showEyePwd, setShowEyePwd] = React.useState(false)
    const handleClickEyePwd = () => setShowEyePwd(!showEyePwd)
 
    return (
        <>
            <Grid h='600px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4} >
                <GridItem rowSpan={2} colSpan={2} bg='blue'>
                    <Center>
                        <img src='https://bit.ly/dan-abramov' alt='' className='Profile-UploadImage'></img>
                        <InputGroup size='md' width={"auto"}>
                            <Input
                                className='Profile-Input'
                                pr='4.5rem'
                                type={showEyePwd ? 'text' : 'password'}
                                placeholder='Enter password'
                                _placeholder={{ color: 'black' }}
                                bg='white'
                            />
                            <InputRightElement>
                                <Button className='Profile-ShowPwdBtn' size='sm' onClick={handleClickEyePwd}>
                                {
                                    showEyePwd ? <AiFillEye className='Profile-Input-Icon' size={20} /> : <AiFillEyeInvisible className='Profile-Input-Icon' size={20} />
                                }
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Center>
                </GridItem>
                <GridItem rowSpan={1} colSpan={3} bg='red'>
                <Center>
                    <Button leftIcon={<AiOutlineCalendar />} className='Profile-CalendarButton'>
                    Calendar 
                    </Button>
                </Center>
                </GridItem>
                <GridItem rowSpan={1} colSpan={3} bg='green'>
                <Box className='Profil-ProcessBox'>
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