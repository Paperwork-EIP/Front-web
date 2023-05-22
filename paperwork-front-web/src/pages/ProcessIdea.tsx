import React, { useRef, useState } from 'react';
import { useDisclosure, useColorModeValue } from '@chakra-ui/react';
import Header from '../components/Header';
import Cookies from 'universal-cookie';
import axios from 'axios';
import "../styles/ProcessIdea.css";
import Modal from 'react-modal';

function ProcessIdea() {

    const cookies = new Cookies();

    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }

    const cookieList = cookies.get('loginToken');

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
    
    const api = process.env.REACT_APP_BASE_URL;

    const submitProcessIdea = () => {
        isTitleError.current = title === '';
        isDescriptionError.current = description === '';
        isContentError.current = content === '';
        onCloseSubmitModal();
        axios.post(`${api}/processProposal/add`, {
            title: title,
            description: description,
            content: content,
            user_token: cookieList.loginToken
        }).catch(err => {
          console.log(err);
        })
    }

    const adaptedColor = useColorModeValue("rgba(228,228,228,1)", "rgba(45,45,55,1)");

    return (
        <>
            <Header/>
            <div className="process-idea-image">
                <img src="assets/processidea-page/Webinar-cuate.svg" alt="processidea_cover_image" />
            </div>
            <div className="process-idea-main-box">
            
            {/* <FormControl isInvalid={isTitleError.current} isRequired> */}
            <label className='process-idea-label'> Title </label>
            <input className='process-idea-input' value={title} onChange={handleTitleChange} aria-label="title" placeholder='Title'/>
                {/* {!isTitleError ? (
                        <FormHelperText>
                        Title of the document.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Title is required.</FormErrorMessage>
                )}
            
            </FormControl> */}

            {/* <FormControl isInvalid={isDescriptionError.current} isRequired> */}
            <label className='process-idea-label'> Description </label>
            <input className='process-idea-input' value={description} onChange={handleDescriptionChange} aria-label="description" placeholder='Description'/>
                {/* {!isDescriptionError ? (
                    <FormHelperText>
                    Short description of the document.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Description is required.</FormErrorMessage>
                )}
            </FormControl> */}

            {/* <FormControl isInvalid={isContentError.current} isRequired> */}
            <label className='process-idea-label'> Content </label>
            <textarea className='process-idea-textarea-content' value={content} onChange={handleContentChange} aria-label="content" placeholder='Content'/>
                {/* {!isDescriptionError ? (
                    <FormHelperText>
                    Description of the document.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Content is required.</FormErrorMessage>
                )}
            </FormControl> */}

                <div className="process-idea-main-box-buttons">
                    <button className='process-idea-cancel-button' aria-label="cancel_button" onClick={onOpenCancelModal}>
                        Cancel
                    </button>

                    <button className='process-idea-submit-button' aria-label="submit_button" onClick={onOpenSubmitModal}>
                        Submit
                    </button>

                    

                    <Modal className='process-idea-modal-cancel' style={{content:{background: adaptedColor}}} overlayClassName='process-idea-modal-cancel-overlay' isOpen={isOpenCancelModal} onRequestClose={onCloseCancelModal}>
                        <div className='process-idea-modal-cancel-text'>Are you sure you want to cancel the process idea?</div>
                        <button className='process-idea-close-button' aria-label="cancel_close_button" onClick={onCloseCancelModal}>
                            Close
                        </button>
                        <button className='process-idea-continue-button' aria-label="cancel_continue_button" onClick={cancelProcessIdea}>
                            Continue
                        </button>
                    </Modal>

                    <Modal className='process-idea-modal-cancel' style={{content:{background: adaptedColor}}} overlayClassName='process-idea-modal-cancel-overlay' isOpen={isOpenSubmitModal} onRequestClose={onCloseSubmitModal}>
                        <div className='process-idea-modal-cancel-text'>Are you sure you want to submit the process idea?</div>
                        <button className='process-idea-close-button' aria-label="submit_close_button" onClick={onCloseSubmitModal}>
                                Close
                        </button>
                        <button className='process-idea-continue-button' aria-label="submit_continue_button" onClick={submitProcessIdea}>
                                Continue
                        </button>
                    </Modal>                    
                </div>
            </div>
        </>
    );
}

export default ProcessIdea;