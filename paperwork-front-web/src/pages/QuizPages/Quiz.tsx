import { Box, Text, Center, Menu, MenuButton, MenuList, MenuItem, Image, Button, Icon } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TiBusinessCard } from "react-icons/ti";
import { MdDirectionsCar } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Select from 'react-select';
import Header from '../../components/Header';
import React, { useState } from 'react';
import "../../styles/Quiz.css";

const procedures = [
    { label: "VLS-TS", value: 1 },
    { label: "Residence permit", value: 2 },
    { label: "French nationality", value: 3 },
    { label: "Work permit", value: 4 },
    { label: "travel document", value: 5 },
    { label: "Visa", value: 6 },
    { label: "Vital Card", value: 7 },
    { label: "Driver license", value: 8 }
  ];

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
                        
                    <Select className='quiz-select' placeholder={'Select the Procedure'} options={ procedures } />

                    </Center>
                    </Box>
                    <Box pt={20}>
                    <Center>
                    <Link to="/vitalcard1">
                        <Button
                            bgColor="#29C9B3"
                            color={'white'}
                            size="lg"
                            borderRadius={'5px'}
                            mb={8}
                            fontSize={"24px"}>
                            Submit
                        </Button>
                    </Link>
                    </Center>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default QuizPage;