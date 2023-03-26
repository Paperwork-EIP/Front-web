// React Import
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { Box, Heading, Icon, Button } from '@chakra-ui/react';

// Utils Import
import axios from "axios";
import Cookies from 'universal-cookie';

// Pages Import
import Header from '../components/Header';
import "../styles/pages/ProcessResult.scss";

// Icons Import
import { AiFillCheckSquare } from "react-icons/ai";
import { BsSquareFill } from "react-icons/bs";
import { FaLessThan } from "react-icons/fa";

const ProcessResult = () => {

    const api = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const [stepsAnswer, setStepsAnswer] = useState([]);

    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    const cookiesInfo = cookies.get('loginToken');

    var { processSelected } = useParams();
    // console.log(processSelected);
    
    useEffect(() => {
        axios.get(`${api}/userProcess/getUserSteps`, { params: { process_title: processSelected, user_email: cookiesInfo.email } })
        .then(res => {
            console.log(res.data.response);
            setStepsAnswer(res.data.response);
        }).catch(err => {
            console.log(err)
        });
    }, [cookiesInfo.email, processSelected, api])

    return (
        <>
            <Header/>
            
            <div className='ProcessResult'>
                <a href='/quiz' className='StartNewProcess-Btn'><FaLessThan className='StartNewProcess-Icon' size={25}/>Start a new process</a>
            </div>
            <Box p={5} m={50} color='black'>
                <Box pb={2}>
                    <Button
                        aria-label="start_a_new_process"
                        variant='link'
                        leftIcon={ <FaLessThan size={10} /> }
                        size='lg'
                    >
                        <Link to="/quiz">Start a new process</Link>
                    </Button>
                </Box>
                <Box boxShadow='lg' p={5} bg='#E0FDF7' minH="60vh">
                    <Heading mb={12} as='u'>Result of the process for “{processSelected}”:</Heading>
                    <Box pt={9}>
                    <>
                        {
                            stepsAnswer?.map((item: any) => {
                                return(
                                    <ListItem item={item} key={item.id} />
                                )
                            })
                        }
                    </>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default ProcessResult;

function ListItem({ item }: any) {
    if (item.is_done === true) {
        return (
            <Box pb={1}><Icon as={ AiFillCheckSquare } size={50} color="#29C9B3"/> : {item.step_description}</Box>
        );
    } else {
        return (
            <Box pb={1}><Icon as={ BsSquareFill } size={40} color="#FFFFFF" /> : {item.step_description}</Box>
        );
    }
}