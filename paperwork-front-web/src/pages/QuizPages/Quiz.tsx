
import React, { useState, useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';

import axios from "axios";
import Cookies from 'universal-cookie';

import Header from '../../components/Header';
import { getTranslation } from '../Translation';

import "../../styles/Quiz.css";
import "../../styles/pages/Quiz.scss";

function QuizPage() {
    const cookies = new Cookies();
    const cookiesInfo = cookies.get('loginToken');

    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }

    const api = process.env.REACT_APP_BASE_URL;
    const [posts, setPosts] = useState([{}]);
    const [language, setLanguage] = useState("");
    const translation = getTranslation(language, "quiz");
    const { colorMode } = useColorMode();

    function handleSubmit(e: any) {
        e.preventDefault();

        const quizSelect = document.getElementById('Quiz-Select') as HTMLSelectElement;

        if (quizSelect) {
            const selectedValue = quizSelect.value;
            window.location.href = `/quiz/${selectedValue}/0`;
        }
    }

    async function getUserLanguage() {
        await axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } })
            .then(res => {
                setLanguage(res.data.language);
            }).catch(err => {
                console.error(err)
            });
    }

    async function getProcesses() {
        await axios.get(`${api}/process/getAll`, { params: { language: language } })
            .then(res => {
                let procedures = [];

                for (let i = 0; i < res.data.response.length; i++) {
                    procedures.push({
                        label: res.data.response[i]['title'],
                        stocked_title: res.data.response[i]['stocked_title'],
                        value: i
                    });
                }
                setPosts(procedures);
            }).catch(err => {
                console.error(err)
            });
    }

    useEffect(() => {
        getUserLanguage();
        getProcesses();
    }, [language, api, cookiesInfo.loginToken])

    return (
        <>
            <Header />
            <div className={colorMode === "light" ? "Quiz Quiz-light" : "Quiz Quiz-dark"}>
                <div className="Page-Title" data-testid="quiz-title">{translation.title}</div>
                <div className='Quiz-container'>
                    <div className='Question-Style' data-testid="quiz-question">{translation.question}</div>
                    <select defaultValue="Select a process" name="Quiz-Select" id="Quiz-Select" data-testid="select" className='Quiz-Select' placeholder='Select the Procedure'>
                        {
                            posts.map((post: any) => {
                                return (
                                    <option data-testid="select-option" value={post.stocked_title}>{post.label}</option>
                                )
                            })
                        }
                    </select>
                    <button data-testid="submit-button" type="button" className='Submit-btn' onClick={handleSubmit}>{translation.submit}<AiOutlineSend className='Submit-icon' /></button>
                </div>
            </div>
        </>
    );
}

export default QuizPage;