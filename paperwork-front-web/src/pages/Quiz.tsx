import { Box, Text, Center, Menu, MenuButton, MenuList, MenuItem, Image, Button, Icon } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TiBusinessCard } from "react-icons/ti";
import { MdDirectionsCar } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";
import Header from '../components/Header';
import React from 'react';

const QuizPage = () => {
    return (
        <>
            <Header/>

            <Box p={15} m={50}>
                <Box pb={2}>
                    <Center>
                        <Text fontSize='lg' fontWeight={'bold'}>New Process Quiz</Text>
                    </Center>
                </Box>
                <Box borderRadius={'10px'} boxShadow='dark-lg' p={5} mx={20} minH="60vh">
                    <Box pt={9}>
                    <Center>
                        <Text fontSize='3xl' fontWeight={'bold'}>What type of procedure do you want to complete ?</Text>
                    </Center>
                    </Box>
                    <Box pt={20}>
                    <Center>
                        
                    <Menu>
                    <MenuButton size="lg" as={Button} rightIcon={<ChevronDownIcon />}>
                        Procédures
                    </MenuButton>
                    <MenuList>
                        <MenuItem minH='48px'>
                            <TiBusinessCard
                            color="#056900"
                            size={20}
                            />
                            <Text p={5} >Carte Vitale Française</Text>
                        </MenuItem>
                        <MenuItem minH='48px'>
                            <MdDirectionsCar
                            color="#FFBBF8"
                            size={20}
                            />
                            <Text p={5} >Permis de Conduire Français</Text>
                        </MenuItem>
                        <MenuItem minH='48px'>
                            <BsFillHouseFill
                            color="#58BAFF"
                            size={20}
                            />
                            <Text p={5} >Titre de Séjour</Text>
                        </MenuItem>
                    </MenuList>
                    </Menu>



                    </Center>
                    </Box>
                    <Box pt={20}>
                    <Center>
                        <Button
                            bgColor="#29C9B3"
                            color={'white'}
                            size="lg"
                            borderRadius={'5px'}
                            mb={8}
                            fontSize={"24px"}>
                            Submit
                        </Button>
                    </Center>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default QuizPage;