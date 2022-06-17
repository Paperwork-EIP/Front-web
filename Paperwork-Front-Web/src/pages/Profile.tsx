import { Grid, GridItem } from '@chakra-ui/react';
import "../styles/Profile.css"
import "../container/Profile/AccountModifications";
import AccountModifications from '../container/Profile/AccountModifications';
import CalendarButton from '../container/Profile/CalendarButton';
import ProcessBar from '../container/Profile/ProcessBar';

const ProfilePage = () => {
    return (
        <>
            <Grid h='600px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4} >
                <GridItem rowSpan={2} colSpan={2}>
                    <AccountModifications />
                </GridItem>
                <GridItem rowSpan={1} colSpan={3}>
                    <CalendarButton />
                </GridItem>
                <GridItem rowSpan={1} colSpan={3}>
                    <ProcessBar />
                </GridItem>
            </Grid>
        </>
    );
}

export default ProfilePage;