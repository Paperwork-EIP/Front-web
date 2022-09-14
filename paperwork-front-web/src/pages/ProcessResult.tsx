import React from 'react';
import { Box, Heading, Icon, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import Header from '../components/Header';
import { AiFillCheckSquare } from "react-icons/ai";
import { BsSquareFill } from "react-icons/bs";
import { FaLessThan } from "react-icons/fa";

function ProcessResult(props: any) {
    return (
        <>
            <Header/>
            <Box p={5} m={50} color='black'>
                <Button variant='link' leftIcon={ <FaLessThan size={10} /> } color="#000000" size='lg'><Link to="/newProcessLink">Start a new process</Link></Button>
                <Box p={5} bg='#E0FDF7'>
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