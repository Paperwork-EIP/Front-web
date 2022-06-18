import { Progress, Box } from '@chakra-ui/react';
import "../../styles/Profile.css";

const ProcessBar = () => {
    
    return (
        <>
            <Box className='Profil-ProcessBox'>
                <br/>
                Your current process
                <Progress colorScheme='red' size='lg' value={20} className='Profil-ProcessBar'/>
                <br/>
                Your current process
                <Progress colorScheme='red' size='lg' value={80} className='Profil-ProcessBar'/>
                <br/>
            </Box>
        </>
    );
}

export default ProcessBar;