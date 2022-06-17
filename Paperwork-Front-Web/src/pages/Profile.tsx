import { Grid, GridItem } from '@chakra-ui/react';
import "../styles/Profile.css"
import "../container/Profile/AccountModifications";
import AccountModifications from '../container/Profile/AccountModifications';
import CalendarButton from '../container/Profile/CalendarButton';
import ProcessBar from '../container/Profile/ProcessBar';

const ProfilePage = () => {
    return (
        <>
            <Grid h='600px' gap={2} templateRows='repeat(2, 1fr)' templateColumns='repeat(12, 1fr)' >
                <GridItem w='100%' rowSpan={2} colSpan={4}>
                    <AccountModifications />
                </GridItem>
                <GridItem w='100%' rowSpan={1} colSpan={8}>
                    <CalendarButton />
                </GridItem>
                <GridItem w='100%' rowSpan={1} colSpan={8}>
                    <ProcessBar />
                </GridItem>
            </Grid>
        </>
    );
}

export default ProfilePage;