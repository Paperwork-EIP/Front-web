import React, { useState } from "react";
import { Center, Input, InputGroup, InputRightElement, Button, Avatar } from '@chakra-ui/react';
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
            <Center>
                <Input
                type={'file'}
                placeholder='Choose a file'
                mb={8}
                value={file}
                onChange={({ target }) => setFile(target.value)}
                hidden
                />
                <Avatar size='2xl' name='Christian Nwamba' mb={8} mt={8} src='https://bit.ly/dan-abramov' />{' '}
            </Center>
            <Center>
                <InputGroup size='lg' width={"55%"}>
                    <Input
                        type={'text'}
                        placeholder='Enter username'
                        variant="filled"
                        mb={8}
                        value={username}
                        onChange={({ target }) => setUsername(target.value)} />
                    <InputRightElement>
                    </InputRightElement>
                </InputGroup>
            </Center>
            <Center>
                <InputGroup size='lg' width={"55%"}>
                    <Input
                        type={'email'}
                        placeholder='Enter email'
                        variant="filled"
                        mb={8}
                        value={emailAdress}
                        onChange={({ target }) => setEmailAddress(target.value)} />
                    <InputRightElement>
                    </InputRightElement>
                </InputGroup>
            </Center>
            <Center>
                <InputGroup size='lg' width={"55%"}>
                    <Input
                        type={showEyePwd ? 'text' : 'password'}
                        placeholder='Enter password'
                        variant="filled"
                        mb={8}
                        value={password}
                        onChange={({ target }) => setPassword(target.value)} />
                    <InputRightElement>
                        <Button size='sm' onClick={handleClickEyePwd}>
                            {showEyePwd ? <AiFillEye className='Profile-Input-Icon' size={20} /> : <AiFillEyeInvisible className='Profile-Input-Icon' size={20} />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Center>
            <Center>
                <InputGroup size='lg' width={"55%"}>
                    <Input
                        type={showEyeVerifPwd ? 'text' : 'password'}
                        placeholder='Verify password'
                        variant="filled"
                        mb={8}
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