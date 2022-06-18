import React, { useState } from "react";
import { Center, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../../styles/Profile.css";

const AccountModifications = () => {
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
            <Center>
                <img src='https://bit.ly/dan-abramov' alt='' className='Profile-UploadImage'></img>
            </Center>
            <Center>
                <InputGroup size='md' width={"auto"}>
                    <Input
                        type={'text'}
                        placeholder='Enter username'
                        variant="filled"
                        mb={4}
                        value={username}
                        onChange={({ target }) => setUsername(target.value)} />
                    <InputRightElement>
                        </InputRightElement>
                    </InputGroup>
                </Center><Center>
                    <InputGroup size='md' width={"auto"}>
                        <Input
                            type={'email'}
                            placeholder='Enter email'
                            variant="filled"
                            mb={4}
                            value={emailAdress}
                            onChange={({ target }) => setEmailAddress(target.value)} />
                        <InputRightElement>
                        </InputRightElement>
                    </InputGroup>
                </Center><Center>
                    <InputGroup size='md' width={"auto"}>
                        <Input
                            type={showEyePwd ? 'text' : 'password'}
                            placeholder='Enter password'
                            variant="filled"
                            mb={4}
                            value={password}
                            onChange={({ target }) => setPassword(target.value)} />
                        <InputRightElement>
                            <Button size='sm' onClick={handleClickEyePwd}>
                                {showEyePwd ? <AiFillEye className='Profile-Input-Icon' size={20} /> : <AiFillEyeInvisible className='Profile-Input-Icon' size={20} />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Center><Center>
                    <InputGroup size='md' width={"auto"}>
                        <Input
                            type={showEyeVerifPwd ? 'text' : 'password'}
                            placeholder='Verify password'
                            variant="filled"
                            mb={4}
                            value={verifPassword}
                            onChange={({ target }) => setVerifPassword(target.value)} />
                        <InputRightElement>
                            <Button size='sm' onClick={handleClickVerifEyePwd}>
                                {showEyeVerifPwd ? <AiFillEye className='Profile-Input-Icon' size={20} /> : <AiFillEyeInvisible className='Profile-Input-Icon' size={20} />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Center>
        </>
    );
}

export default AccountModifications;