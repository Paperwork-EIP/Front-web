import { Grid, GridItem } from '@chakra-ui/react';
import "../styles/Profile.css"
import "../container/Profile/AccountModifications";
import AccountModifications from '../container/Profile/AccountModifications';
import CalendarButton from '../container/Profile/CalendarButton';
import ProcessBar from '../container/Profile/ProcessBar';
import Header from '../components/Header';

const ProfilePage = () => {
    return (
        <>
            <Header/>
            <Grid h='600px' gap={2} templateRows='repeat(2, 1fr)' templateColumns='repeat(12, 1fr)' mt={6} >
                <GridItem w='100%' rowSpan={2} colSpan={5}>
                    <AccountModifications />
                </GridItem>
                <GridItem w='100%' rowSpan={1} colSpan={7} display={"flex"}>
                    <CalendarButton />
                </GridItem>
                <GridItem w='100%' rowSpan={1} colSpan={7}>
                    <ProcessBar />
                </GridItem>
            </Grid>
        </>
    );
}

export default ProfilePage;