import { Grid, GridItem, Text } from '@chakra-ui/react';
import Header from '../components/Header';
import React from 'react';

const CalendarPage = () => {
    return (
        <>
            <Header/>
            <Grid h='600px' gap={2} templateRows='repeat(2, 1fr)' templateColumns='repeat(12, 1fr)' mt={6} >
                <GridItem w='100%' rowSpan={2} colSpan={5}>
                </GridItem>
                <Text fontSize='lg' fontWeight={'bold'}>Calendar</Text>
                <GridItem w='100%' rowSpan={1} colSpan={7} display={"flex"}>
                </GridItem>
                <GridItem w='100%' rowSpan={1} colSpan={7}>
                </GridItem>
            </Grid>
        </>
    );
}

export default CalendarPage;