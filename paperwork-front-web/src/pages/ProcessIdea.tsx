import React from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import Header from '../components/Header';

function ProcessIdea() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Header/>
            <Box p={16}>
                <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input placeholder='Title' />
                    <FormLabel pt={4}>Description</FormLabel>
                    <Input placeholder='Description' />
                    <FormLabel pt={4}>Content</FormLabel>
                    <Textarea placeholder='Content' />
                    <Box pt={8} display="flex" alignItems="center" justifyContent="space-between">
                        <Button
                            bgColor="#FC6976"
                            color={'white'}
                            size="lg"
                            minWidth={'95px'}
                            maxWidth={'200px'}
                            borderRadius={'5px'}
                            fontSize={"24px"}
                            onClick={onOpen}>
                            Cancel
                        </Button>
                        <Button
                            bgColor="#29C9B3"
                            color={'white'}
                            size="lg"
                            minWidth={'95px'}
                            maxWidth={'200px'}
                            borderRadius={'5px'}
                            fontSize={"24px"}>
                            Submit
                        </Button>

                        <Modal
                            isCentered
                            onClose={onClose}
                            isOpen={isOpen}
                            motionPreset='slideInBottom'>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Cancel</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>Are you sure you want to cancel the process idea?</ModalBody>
                                <ModalFooter>
                                    <Button
                                        bgColor="#FC6976"
                                        color={'white'}
                                        mr={3}
                                        onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button 
                                        bgColor="#29C9B3"
                                        color={'white'}>
                                        Continue
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                    </Box>
                </FormControl>
            </Box>
        </>
    );
}

export default ProcessIdea;