import { Grid, GridItem } from '@chakra-ui/react';
import "../container/Profile/AccountModifications";
import AccountModifications from '../container/Profile/AccountModifications';
import CalendarButton from '../container/Profile/CalendarButton';
import ProcessBar from '../container/Profile/ProcessBar';
import Header from '../components/Header';
import React from 'react';

const ProfilePage = () => {
    return (
        <>
            <Header/>
            <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(12, 1fr)' mt={6} >
                <GridItem rowSpan={2} colSpan={5}>
                    <AccountModifications />
                </GridItem>
                <GridItem rowSpan={1} colSpan={7}>
                    <CalendarButton />
                </GridItem>
                <GridItem rowSpan={1} colSpan={7}>
                    <ProcessBar />
                </GridItem>
            </Grid>
        </>
    );
}

export default ProfilePage;