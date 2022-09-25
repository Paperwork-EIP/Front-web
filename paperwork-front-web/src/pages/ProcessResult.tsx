import React from 'react';
import { Box, Heading, Icon, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import Header from '../components/Header';
import { AiFillCheckSquare } from "react-icons/ai";
import { BsSquareFill } from "react-icons/bs";
import { FaLessThan } from "react-icons/fa";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function ProcessResult(props: any) {
    if(!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    return (
        <>
            <Header/>
            <Box p={5} m={50} color='black'>
                <Box pb={2}>
                    <Button variant='link' leftIcon={ <FaLessThan size={10} /> } size='lg'><Link to="/newProcessLink">Start a new process</Link></Button>
                </Box>
                <Box boxShadow='lg' p={5} bg='#E0FDF7' minH="60vh">
                    <Heading mb={12} as='u'>Result of the process for “{props.processInfo.type}”:</Heading>
                    <Box pt={9}>
                    {
                        props.processInfo.tasks?.map((item: any) => {
                            return (
                                item.state === true ?
                                <Box pb={1}><Icon as={ AiFillCheckSquare } size={50} color="#29C9B3"/> : {item.description}</Box>
                                :
                                <Box pb={1}><Icon as={ BsSquareFill } size={40} color="#FFFFFF" /> : {item.description}</Box>
                            );
                        })
                    }
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default ProcessResult;