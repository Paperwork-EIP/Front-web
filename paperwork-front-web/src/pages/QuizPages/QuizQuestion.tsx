// React Import
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Box, Text, Center, Button, Flex } from '@chakra-ui/react';

// Utils Import
import axios from "axios";
import Cookies from 'universal-cookie';

// Pages Import
import Header from '../../components/Header';

const QuizQuestion = () => {

    const cookies = new Cookies();
    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    const email = cookies.get('loginToken');

    var { processSelected } = useParams();
    var { step } = useParams();
    const nextStep = parseInt(step!) + 1;
    const api = "http://localhost:8080/";
    const [currentId, setCurrentId] = useState();
    const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState();
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        axios.get(`${api}processQuestions/get`, { params: { title: processSelected } })
        .then(res => {
            console.log(res.data.questions);
            setCurrentId(res.data.questions[nextStep - 1][0]);
            setCurrentQuestionAnswer(res.data.questions[nextStep - 1][1]);
            setQuestions(res.data.questions);
        }).catch(err => {
            console.log(err)
        });
    }, [nextStep, processSelected])

    function handleClick(currentQuestionAnswer: string) {
        // console.log("process_title = " + processSelected);
        // console.log("email = " + email.email);
        // console.log("currentQuestionAnswer");
        // console.log(currentQuestionAnswer);
        const urlAnswers = window.location.search.substring(1);
        // console.log("urlAnswers");
        // console.log(urlAnswers);
        if (nextStep < questions.length)
        {
            if (!urlAnswers)
                window.location.href = `/quiz/${processSelected}/${nextStep}?${currentId}=${currentQuestionAnswer}`;
            else
                window.location.href = `/quiz/${processSelected}/${nextStep}?${urlAnswers}&${currentId}=${currentQuestionAnswer}`;
        } else {
            // const questionsAnswer = queryString.parse(`?${urlAnswers}&${currentId}=${currentQuestionAnswer}`, {parseBooleans: true});
            // // querystring to array
            // console.log(questionsAnswer);

            var queryStr = `?${urlAnswers}&${currentId}=${currentQuestionAnswer}`;
            var queryArr = queryStr.replace('?','').split('&');
            var queryParams = [];

            for (var q = 0; q < queryArr.length; q++) {
                var qArr = queryArr[q].split('=');
                if (qArr[1] === 'true')
                    queryParams.push([parseInt(qArr[0]), true]);
                else
                    queryParams.push([parseInt(qArr[0]), false]);
            }

            // console.log("queryArr = ");
            // console.log(queryArr);
            const post = { process_title: processSelected, user_email: email.email, questions: queryParams }
            // console.log("queryParams = ");
            // console.log(queryParams);
            axios.post(`${api}userProcess/add`, post)
            .then(res => {
                console.log("res");
                console.log(res);
            }).catch(err => {
                console.log("err")
                console.log(err)
            });
            window.location.href = `/processResult/${processSelected}`;
        }
    }

    return (
        <>
            <Header/>
            <Box p={15} m={50}>
                <Box pb={2}>
                    <Center>
                        <Text fontSize='lg' fontWeight={'bold'}>{processSelected}</Text>
                    </Center>
                </Box>
                <Box borderRadius={'10px'} boxShadow='dark-lg' p={5} mx={20} minH="60vh">
                    <Box pt={9}>
                    <Center>
                        <Text fontSize='3xl' fontWeight={'bold'}>{ currentQuestionAnswer! }</Text>
                    </Center>
                    </Box>

                    <Center>  
                    <Flex m={20} width={'300px'} justifyContent={'space-between'}>
                    <Box p='4'>
                        <Button
                            bgColor="#FC6976"
                            color={'white'}
                            size="lg"
                            minWidth={'85px'}
                            maxWidth={'300px'}
                            borderRadius={'5px'}
                            fontSize={"24px"}
                            onClick={() => handleClick('false')}>
                            No
                        </Button>
                    </Box>
                    <Box p='4'>
                        <Button
                            bgColor="#29C9B3"
                            color={'white'}
                            size="lg"
                            minWidth={'85px'}
                            maxWidth={'300px'}
                            borderRadius={'5px'}
                            fontSize={"24px"}
                            onClick={() => handleClick('true')}>
                            Yes
                        </Button>
                    </Box>
                    </Flex>
                    </Center>
                </Box>
            </Box>
        </>
    );
}

export default QuizQuestion;