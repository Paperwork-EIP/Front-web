import React, { useState } from "react";
import { Center, Input, InputGroup, InputRightElement, Button, Avatar } from '@chakra-ui/react';
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
    const [file, setFile] = useState("");
    
    return (
        <>
            <Center>
                <Input
                type={'file'}
                placeholder='Choose a file'
                mb={6}
                value={file}
                onChange={({ target }) => setFile(target.value)}
                hidden
                />
                <Avatar size='2xl' name='Christian Nwamba' mb={6} mt={8} src='https://bit.ly/dan-abramov' border={"5px solid white"} boxShadow={"0px 5px 5px lightgray"} />{' '}
            </Center>
            <p className="ProfilTextLabel">Username</p>
            <Center>
                <InputGroup size='lg' width={"60%"}>
                    <Input
                        type={'text'}
                        placeholder='Enter username'
                        variant="filled"
                        mb={6}
                        value={username}
                        onChange={({ target }) => setUsername(target.value)} />
                    <InputRightElement>
                    </InputRightElement>
                </InputGroup>
            </Center>
            <p className="ProfilTextLabel">Email</p>
            <Center>
                <InputGroup size='lg' width={"60%"}>
                    <Input
                        type={'email'}
                        placeholder='Enter email'
                        variant="filled"
                        mb={6}
                        value={emailAdress}
                        onChange={({ target }) => setEmailAddress(target.value)} />
                    <InputRightElement>
                    </InputRightElement>
                </InputGroup>
            </Center>
            <p className="ProfilTextLabel">Username</p>
            <Center>
                <InputGroup size='lg' width={"60%"}>
                    <Input
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
            </Center>
            <p className="ProfilTextLabel">Verify password</p>
            <Center>
                <InputGroup size='lg' width={"60%"}>
                    <Input
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
            </Center>
        </>
    );
}

export default AccountModifications;