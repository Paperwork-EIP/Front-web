// React Import
import React, { useEffect, useState } from 'react';
import { Progress, Box, Text, Center } from '@chakra-ui/react';

// Utils Import
import axios from "axios";

const ProcessBar = (props: any) => {

    const api = process.env.REACT_APP_BASE_URL;

    const [userProcessInfo, setUserProcessInfo]= useState([{}]);

    // console.log("email");
    // console.log(props.email);
    
    useEffect(() => {
        axios.get(`${api}/userProcess/getUserProcesses`, { params: { user_email: props.email } })
        .then(res => {
            console.log("res.data.response getUserProcesses");
            console.log(res.data.response);
            setUserProcessInfo(res.data.response);
        }).catch(err => {
            console.log("err getUserProcesses")
            console.log(err)
        });
    }, [api, props.email])
    
    return (
        <>
            <Box mr={8} p={8} borderWidth='1px' borderRadius='lg' overflow='hidden'>

                <Box>
                    <Text fontSize='lg' fontWeight={'bold'}>Your current process</Text>
                </Box>

                <>
                    {
                        userProcessInfo?.map((item: any) => {
                            return(
                                item.pourcentage ?
                                    <Box px={4} height={"auto"} key={item.userProcess.id}>
                                        <Center>
                                            <Box w={"10%"} my={4} transform="rotate(45deg)">
                                                <Text as='sub'>{item.userProcess.process_title}</Text>
                                            </Box>
                                            <Box w={"100%"} justifyContent={"end"}>
                                                <Progress w={"80%"} borderRadius={'10px'} colorScheme='red' size='lg' value={item.pourcentage} />
                                            </Box>
                                        </Center>
                                    </Box>
                                : null
                            )
                        })
                    }
                </>

            </Box>
        </>
    );
}

export default ProcessBar;