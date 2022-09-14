import React from 'react';
import { Box, Heading, Icon } from '@chakra-ui/react';
import Header from '../components/Header';
import { AiFillCheckSquare } from "react-icons/ai";
import { BsSquareFill } from "react-icons/bs";

function ProcessResult(props: any) {
    return (
        <>
            <Header/>
            <Box bg='#E0FDF7' p={5} m={50} color='black'>
                <Heading mb={12} as='u'>Result of the process for “{props.processInfo.type}”:</Heading>
                {
                    props.processInfo.tasks?.map((item: any) => {
                        return (
                            item.state === true ?
                            <p className='ProcessResult-State'><Icon as={AiFillCheckSquare} size={50} color="#29C9B3"/> : {item.description}</p>
                            :
                            <p className='ProcessResult-State'><Icon as={BsSquareFill} size={40} color="#FFFFFF" /> : {item.description}</p>
                        );
                    })
                }
            </Box>
        </>
    );
}

export default ProcessResult;