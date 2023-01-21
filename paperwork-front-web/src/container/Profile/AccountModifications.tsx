import React, { useState, useEffect } from "react";
import { Center, Input, InputGroup, InputRightElement, Button, Avatar, Text, Box, Grid, GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import Cookies from 'universal-cookie';

const AccountModifications = () => {

    const cookies = new Cookies();

    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }

    const cookiesInfo = cookies.get('loginToken');

    const api = process.env.REACT_APP_BASE_URL;

    const { isOpen: isOpenSubmitModal, onOpen: onOpenSubmitModal, onClose: onCloseSubmitModal } = useDisclosure();
    const [showEyePwd, setShowEyePwd] = React.useState(false)
    const handleClickEyePwd = () => setShowEyePwd(!showEyePwd)
    const [showEyeVerifPwd, setShowEyeVerifPwd] = React.useState(false)
    const handleClickVerifEyePwd = () => setShowEyeVerifPwd(!showEyeVerifPwd)
    const [username, setUsername] = useState("");
    const [emailAdress, setEmailAddress] = useState("");
    const [profilPictureLink, setProfilPictureLink] = useState("");
    const [password, setPassword] = useState("");
    const [verifPassword, setVerifPassword] = useState("");
    const [file, setFile] = useState("");

    // const [userInfos, setUserInfos] = useState<any[]>([]);


    useEffect(() => {
        axios.get(`${api}/user/getbyemail`, { params: { email: cookiesInfo.email } })
        .then(res => {
            console.log(res.data);
            // setUserInfos(res.data);
            setUsername(res.data.username);
            setEmailAddress(res.data.email);
            setProfilPictureLink(res.data.profile_picture);
        }).catch(err => {
            console.log(err)
        });
    }, [cookiesInfo.email, api])

    const handleSubmit = async (event : any) => {
        onCloseSubmitModal();
        event.preventDefault();
        // console.log("username: " + username);
        // console.log("email: " + emailAdress);
        // console.log("password: " + password);
        // console.log("verifPassword: " + verifPassword);
        
        if (password === verifPassword) {
            axios.get(`${api}/user/modifyDatas`, { params: {
                email: cookiesInfo.email,
                profile_picture: profilPictureLink,
                username: username,
                new_email: emailAdress,
                ...(password.length > 0 ? { password: password } : {}) } })
            .then(res => {
                console.log(res.data);
                alert("Account modified");
                // On met à jour le cookie avec les nouvelles infos (gestion du changement d'email)
                if (cookiesInfo.email !== emailAdress) {
                    cookies.remove('loginToken', { path: '/' });
                    cookies.set('loginToken', { token: cookiesInfo.token, email: emailAdress }, {
                        path:'/',
                        secure:true,
                        sameSite:'none'
                    });
                    window.location.reload();
                }

            }).catch(err => {
                console.log(err)
                alert("Error during the modification of the account");
            });
        } else {
            alert("Password and verification password are not the same");
        }
    };
    
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
                    <Avatar size='2xl' width="15vw" height="15vw" name='Christian Nwamba' mb={6} mt={8} src={profilPictureLink} border={"5px solid white"} boxShadow={"0px 5px 5px lightgray"} />{' '}
                </Center>
                <Center>
                    <Grid w={"60%"}>
                        <GridItem>
                            <Text>Profil picture link</Text>
                        </GridItem>
                        <GridItem>
                            <InputGroup size='lg'>
                                <Input
                                    id="profile_picture_link"
                                    aria-label="profile_picture_link"
                                    type={'text'}
                                    placeholder={profilPictureLink}
                                    variant="filled"
                                    mb={6}
                                    value={profilPictureLink}
                                    onChange={({ target }) => setProfilPictureLink(target.value)} />
                                <InputRightElement>
                                </InputRightElement>
                            </InputGroup>
                        </GridItem>
                    </Grid>
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
                                    placeholder={username}
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
                                    placeholder={emailAdress}
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
                                    placeholder='***************'
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
                                    placeholder='***************'
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
                
                <Center>
                    <Grid w={"60%"}>
                        <GridItem>
                            <Button
                                colorScheme="purple"
                                mb={3}
                                type="submit"
                                onClick={onOpenSubmitModal}
                            >
                                Submit
                            </Button>
                        </GridItem>
                    </Grid>
                </Center>

                

                <Modal
                    isCentered
                    onClose={onCloseSubmitModal}
                    isOpen={isOpenSubmitModal}
                    motionPreset='slideInBottom'
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Submit</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>Are you sure you want to change this settings?</ModalBody>
                        <ModalFooter>
                            <Button
                                aria-label="submit_close_button"
                                bgColor="#FC6976"
                                color={'white'}
                                mr={3}
                                onClick={onCloseSubmitModal}
                            >
                                Close
                            </Button>
                            <Button
                                aria-label="submit_continue_button"
                                bgColor="#29C9B3"
                                color={'white'}
                                onClick={(e) => {
                                    handleSubmit(e)
                                }}
                            >
                                Continue
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Box>
        </>
    );
}

export default AccountModifications;