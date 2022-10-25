import React from 'react';
import { Progress, Box, Text, Center } from '@chakra-ui/react';

const ProcessBar = () => {

    return (
        <>
            <Box mr={8} p={8} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box>
                    <Text fontSize='lg' fontWeight={'bold'}>Your current process</Text>
                </Box>
                <Box px={4} height={"auto"}>
                    <Center>
                        <Box w={"10%"} my={4} transform="rotate(45deg)">
                            <Text as='sub'>Vital Card</Text>
                        </Box>
                        <Box w={"100%"} justifyContent={"end"}>
                            <Progress w={"80%"} borderRadius={'10px'} colorScheme='red' size='lg' value={20} />
                        </Box>
                    </Center>
                </Box>

                <Box>
                    <Text fontSize='lg' fontWeight={'bold'}>Your current process</Text>
                </Box>
                <Box px={4} height={"auto"}>
                    <Center>
                        <Box w={"10%"} my={4} transform="rotate(45deg)">
                            <Text as='sub'>Another document</Text>
                        </Box>
                        <Box w={"100%"} justifyContent={"end"}>
                            <Progress w={"80%"} borderRadius={'10px'} colorScheme='red' size='lg' value={20} />
                        </Box>
                    </Center>
                </Box>
            </Box></>
    );
}

export default ProcessBar;