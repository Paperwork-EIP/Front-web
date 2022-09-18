import React from 'react';
import { Progress, Box, Grid, Spacer, Text, GridItem } from '@chakra-ui/react';

const ProcessBar = () => {

    return (
        <Box w='90%' h={'70%'} p={8} borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Text fontSize='lg' fontWeight={'bold'}>Your current process</Text>
            <Grid templateColumns='repeat(4, 1fr)' templateRows='repeat(2, 1fr)' gap={0}>
            <Box transform="rotate(45deg)">
                <Text as='sub'>Vital Card</Text>
            </Box>
            <Box w='250%'>
                <Progress borderRadius={'10px'} colorScheme='red' size='lg' value={20} />
            </Box>
            </Grid>

            <Text fontSize='lg' fontWeight={'bold'}>Your current process</Text>
            <Grid templateColumns='repeat(4, 1fr)' gap={0}>
            <Box transform="rotate(45deg)">
                <Text as='sub'>Another document</Text>
            </Box>
            <Box w='250%'>
                <Progress borderRadius={'10px'} colorScheme='red' size='lg' value={90} />
            </Box>
            </Grid>
        </Box>
    );
}

export default ProcessBar;