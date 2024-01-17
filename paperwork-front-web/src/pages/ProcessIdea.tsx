import React, { useRef, useState } from 'react';
import { useDisclosure, useColorModeValue, FormHelperText, FormControl, FormErrorMessage } from '@chakra-ui/react';
import Header from '../components/Header';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Modal from 'react-modal';
import { getTranslation } from './Translation';

import "../styles/ProcessIdea.scss";

function ProcessIdea() {
    const cookies = new Cookies();
    const api = process.env.REACT_APP_BASE_URL;

    const cookieList = cookies.get('loginToken');
    const adaptedColor = useColorModeValue("#f5f5f5", "#303030");

    const { isOpen: isOpenCancelModal, onOpen: onOpenCancelModal, onClose: onCloseCancelModal } = useDisclosure();
    const { isOpen: isOpenSubmitModal, onOpen: onOpenSubmitModal, onClose: onCloseSubmitModal } = useDisclosure();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [language, setLanguage] = useState("");
    const translation = getTranslation(language, "processIdea");

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

    function cancelProcessIdea() {
        setTitle("");
        setDescription("");
        setContent("");
        onCloseCancelModal();
    }

    async function submitProcessIdea() {
        isTitleError.current = title === '';
        isDescriptionError.current = description === '';
        isContentError.current = content === '';
        onCloseSubmitModal();
        await axios.post(`${api}/processProposal/add`, {
            title: title,
            description: description,
            content: content,
            user_token: cookieList.loginToken
        }).catch(err => {
            console.error(err);
        })
    }

    return (
        <div style={{ background: adaptedColor, height: "100vh" }}>
            <Header />
            <div className="process-idea-image">
                <img src="assets/processidea-page/Webinar-cuate.svg" alt="processidea_cover_image" />
            </div>
            <div className="process-idea-main-box">

                <FormControl isInvalid={isTitleError.current} isRequired>
                    <label className='process-idea-label'> {translation.title} </label>
                    <input className='process-idea-input' value={title} onChange={handleTitleChange} aria-label="title" placeholder={translation.title} />
                    {!isTitleError ? (
                        <FormHelperText>
                            {translation.helperTitle}
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>{translation.errorTitle}</FormErrorMessage>
                    )}

                </FormControl>

                <FormControl isInvalid={isDescriptionError.current} isRequired>
                    <label className='process-idea-label'> {translation.description} </label>
                    <input className='process-idea-input' value={description} onChange={handleDescriptionChange} aria-label="description" placeholder={translation.description} />
                    {!isDescriptionError ? (
                        <FormHelperText>
                            {translation.helperDescription}
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>{translation.errorDescription}</FormErrorMessage>
                    )}
                </FormControl>

                <FormControl isInvalid={isContentError.current} isRequired>
                    <label className='process-idea-label'> {translation.content} </label>
                    <textarea className='process-idea-textarea-content' value={content} onChange={handleContentChange} aria-label="content" placeholder={translation.content} />
                    {!isDescriptionError ? (
                        <FormHelperText>
                            {translation.helperContent}
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>{translation.errorContent}</FormErrorMessage>
                    )}
                </FormControl>

                <div className="process-idea-main-box-buttons">
                    <button className='process-idea-cancel-button' aria-label="cancel_button" onClick={onOpenCancelModal}>
                        {translation.cancel}
                    </button>

                    <button className='process-idea-submit-button' aria-label="submit_button" onClick={onOpenSubmitModal}>
                        {translation.submit}
                    </button>



                    <Modal className='process-idea-modal-cancel' style={{ content: { background: adaptedColor } }} overlayClassName='process-idea-modal-cancel-overlay' isOpen={isOpenCancelModal} onRequestClose={onCloseCancelModal}>
                        <div className='process-idea-modal-cancel-text'>{translation.cancelMessage}</div>
                        <button className='process-idea-close-button' aria-label="cancel_close_button" onClick={onCloseCancelModal}>
                            {translation.close}
                        </button>
                        <button className='process-idea-continue-button' aria-label="cancel_continue_button" onClick={cancelProcessIdea}>
                            {translation.continue}
                        </button>
                    </Modal>

                    <Modal className='process-idea-modal-cancel' style={{ content: { background: adaptedColor } }} overlayClassName='process-idea-modal-cancel-overlay' isOpen={isOpenSubmitModal} onRequestClose={onCloseSubmitModal}>
                        <div className='process-idea-modal-cancel-text'>{translation.submitMessage}</div>
                        <button className='process-idea-close-button' aria-label="submit_close_button" onClick={onCloseSubmitModal}>
                            {translation.close}
                        </button>
                        <button className='process-idea-continue-button' aria-label="submit_continue_button" onClick={submitProcessIdea}>
                            {translation.continue}
                        </button>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default ProcessIdea;