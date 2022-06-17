import { Progress, Box, Center } from '@chakra-ui/react';
import "../../styles/Profile.css";

const ProcessBar = () => {
    
    return (
        <>
            <Box className='Profil-ProcessBox'>
                <p className='Profile-ProcessText'>Your current process</p>
                <Center>
                    <p className='Profile-ProcessDiagText'>Vital Card</p>
                    <Progress colorScheme='red' size='lg' value={20} className='Profil-ProcessBar'/>
                </Center>
                <p className='Profile-ProcessText'>Your current process</p>
                <Center>
                    <p className='Profile-ProcessDiagText'>Vital Card</p>
                    <Progress colorScheme='red' size='lg' value={90} className='Profil-ProcessBar'/>
                </Center>
            </Box>
        </>
    );
}

export default ProcessBar;