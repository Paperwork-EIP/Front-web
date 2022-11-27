import { Box, Text, Center, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import Select from 'react-select';
import Header from '../../components/Header';
import React, { useState, useEffect } from 'react';
import "../../styles/Quiz.css";
import axios from "axios";

const QuizPage = () => {

    const [posts, setPosts] = useState([{}]);

    useEffect(() => {
      axios.get('http://localhost:8080/process/getAll')
      .then(res => {
        var procedures = [];
        for (var i = 0; i < res.data.response.length; i++)
        {
            procedures.push({
                label: res.data.response[i]['title'],
                source: res.data.response[i]['source'],
                value: i
            });
        }
        console.log(procedures);
        setPosts(procedures);
    }).catch(err => {
        console.log(err)
    });
    }, [])

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
                        
                    <Select className='quiz-select' placeholder={'Select the Procedure'} options={ posts } />

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