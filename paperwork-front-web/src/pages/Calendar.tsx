import { Center, Grid, GridItem, Text, Box } from '@chakra-ui/react';
import Header from '../components/Header';
import React, { useState } from 'react';
import Calendar from 'react-calendar'
import "../styles/Calendar.css"

const CalendarPage = () => {
    const [value, onChange] = useState(new Date());
    return (
        <>
            <Header/>
            <Box p={15} m={50}>
                <Box pb={2}>
                    <Center>
                        <Text fontSize='lg' fontWeight={'bold'}>Calendar</Text>
                    </Center>
                </Box>
                <Box borderRadius={'10px'} boxShadow='dark-lg' p={5} mx={20} minH="60vh">
                    <Box pt={9}>
                    <Center>
                    <Calendar className={['c1','c2']} onChange={onChange} value={value} />
                    </Center>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default CalendarPage;