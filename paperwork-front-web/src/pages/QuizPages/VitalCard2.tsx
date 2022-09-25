import { Box, Text, Center,Button, Flex, Spacer } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import Header from '../../components/Header';
import React from 'react';

const VitalCard2Page = () => {
    return (
        <>
            <Header/>
            <Box p={15} m={50}>
                <Box pb={2}>
                    <Center>
                        <Text fontSize='lg' fontWeight={'bold'}>“Carte Vitale Française” Process</Text>
                    </Center>
                </Box>
                <Box borderRadius={'10px'} boxShadow='dark-lg' p={5} mx={20} minH="60vh">
                    <Box pt={9}>
                    <Center>
                        <Text fontSize='3xl' fontWeight={'bold'}>Do you have the french nationality or a resident permit ?</Text>
                    </Center>
                    </Box>

                    <Center>  
                    <Flex m={20} width={'300px'} justifyContent={'space-between'}>
                    <Box p='4'>
                    <Link to="/processresult">
                        <Button
                            bgColor="#FC6976"
                            color={'white'}
                            size="lg"
                            minWidth={'85px'}
                            maxWidth={'300px'}
                            borderRadius={'5px'}
                            fontSize={"24px"}>
                            No
                        </Button>
                    </Link>
                    </Box>
                    <Box p='4'>
                    <Link to="/processresult">
                        <Button
                            bgColor="#29C9B3"
                            color={'white'}
                            size="lg"
                            minWidth={'85px'}
                            maxWidth={'300px'}
                            borderRadius={'5px'}
                            fontSize={"24px"}>
                            Yes
                        </Button>
                    </Link>
                    </Box>
                    </Flex>
                    </Center>
                </Box>
            </Box>
        </>
    );
}

export default VitalCard2Page;