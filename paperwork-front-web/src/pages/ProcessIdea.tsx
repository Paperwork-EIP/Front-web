import React, { useRef, useState } from 'react';
import { Box, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Textarea, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import Header from '../components/Header';

function ProcessIdea() {
    const { isOpen: isOpenCancelModal, onOpen: onOpenCancelModal, onClose: onCloseCancelModal } = useDisclosure();
    const { isOpen: isOpenSubmitModal, onOpen: onOpenSubmitModal, onClose: onCloseSubmitModal } = useDisclosure();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    const isTitleError = useRef(false);
    const isDescriptionError = useRef(false);
    const isContentError = useRef(false);
    const handleTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(e.target.value);
        isTitleError.current = e.target.value === '';
    }
    const handleDescriptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(e.target.value);
        isDescriptionError.current = e.target.value === '';
    }
    const handleContentChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setContent(e.target.value);
        isContentError.current = e.target.value === '';
    }

    const cancelProcessIdea = () => {
        setTitle("");
        setDescription("");
        setContent("");
        onCloseCancelModal();
    }
    
    const submitProcessIdea = () => {
        isTitleError.current = title === '';
        isDescriptionError.current = description === '';
        isContentError.current = content === '';
        onCloseSubmitModal();
        var processIdeaContent = {
            title: title,
            description: description,
            content: content
        }
        // Back-end code to submit processIdeaContent variable here
    }

    return (
        <>
            <Header/>
            <Box p={16}>
                <FormControl isInvalid={isTitleError.current} isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                        aria-label="title"
                        placeholder='Title'
                        value={title}
                        onChange={handleTitleChange}
                    />
                    {!isTitleError ? (
                        <FormHelperText>
                        Title of the document.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Title is required.</FormErrorMessage>
                    )}
                </FormControl>
                <FormControl isInvalid={isDescriptionError.current} isRequired>
                    <FormLabel pt={4}>Description</FormLabel>
                    <Input
                        aria-label="description"
                        placeholder='Description'
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    {!isDescriptionError ? (
                        <FormHelperText>
                        Short description of the document.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Description is required.</FormErrorMessage>
                    )}
                </FormControl>
                <FormControl isInvalid={isContentError.current} isRequired>
                    <FormLabel pt={4}>Content</FormLabel>
                    <Textarea
                        aria-label="content"
                        placeholder='Content'
                        value={content}
                        onChange={handleContentChange}
                    />
                    {!isDescriptionError ? (
                        <FormHelperText>
                        Description of the document.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Content is required.</FormErrorMessage>
                    )}

                    <Box pt={8} display="flex" alignItems="center" justifyContent="space-between">
                        <Button
                            aria-label="cancel_button"
                            bgColor="#FC6976"
                            color={'white'}
                            size="lg"
                            minWidth={'95px'}
                            maxWidth={'200px'}
                            borderRadius={'5px'}
                            fontSize={"24px"}
                            onClick={onOpenCancelModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            aria-label="submit_button"
                            bgColor="#29C9B3"
                            color={'white'}
                            size="lg"
                            minWidth={'95px'}
                            maxWidth={'200px'}
                            borderRadius={'5px'}
                            fontSize={"24px"}
                            onClick={onOpenSubmitModal}
                        >
                            Submit
                        </Button>

                        <Modal
                            isCentered
                            onClose={onCloseCancelModal}
                            isOpen={isOpenCancelModal}
                            motionPreset='slideInBottom'
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Cancel</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>Are you sure you want to cancel the process idea?</ModalBody>
                                <ModalFooter>
                                    <Button
                                        aria-label="cancel_close_button"
                                        bgColor="#FC6976"
                                        color={'white'}
                                        mr={3}
                                        onClick={onCloseCancelModal}
                                    >
                                        Close
                                    </Button>
                                    <Button 
                                        aria-label="cancel_continue_button"
                                        bgColor="#29C9B3"
                                        color={'white'}
                                        onClick={cancelProcessIdea}
                                    >
                                        Continue
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                        <Modal
                            isCentered
                            onClose={onCloseSubmitModal}
                            isOpen={isOpenSubmitModal}
                            motionPreset='slideInBottom'
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Submit</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>Are you sure you want to submit the process idea?</ModalBody>
                                <ModalFooter>
                                    <Button
                                        aria-label="submit_close_button"
                                        bgColor="#FC6976"
                                        color={'white'}
                                        mr={3}
                                        onClick={onCloseSubmitModal}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        aria-label="submit_continue_button"
                                        bgColor="#29C9B3"
                                        color={'white'}
                                        onClick={submitProcessIdea}
                                    >
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