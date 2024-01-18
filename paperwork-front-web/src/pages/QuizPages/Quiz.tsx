// React Import
import React, { useState, useEffect } from 'react';

// Utils Import
import axios from "axios";
import Cookies from 'universal-cookie';

// Pages Import
import Header from '../../components/Header';
import "../../styles/pages/Quiz.scss";

// Icon Import
import { AiOutlineSend } from 'react-icons/ai';

// Translation Import
import { getTranslation } from '../Translation';

// Color mode
import { useColorMode } from '@chakra-ui/react';

const QuizPage = () => {

    const cookies = new Cookies();

    const cookiesInfo = cookies.get('loginToken');
    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }

    const api = process.env.REACT_APP_BASE_URL;

    const [posts, setPosts] = useState([{}]);


    // User informations
    const [language, setLanguage] = useState("");


    // Translation
    const translation = getTranslation(language, "quiz");

    // Color mode
    const { colorMode } = useColorMode();

    async function getLanguageByToken() {
        await axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } })
            .then(res => {
                setLanguage(res.data.language);
            }).catch(err => {
                console.log(err)
            });
    }

    async function getAllProcess() {
        await axios.get(`${api}/process/getAll`, { params: { language: language } })
            .then(res => {
                var procedures = [];
                console.log(res.data);
                for (var i = 0; i < res.data.response.length; i++) {
                    procedures.push({
                        label: res.data.response[i]['title'],
                        stocked_title: res.data.response[i]['stocked_title'],
                        value: i
                    });
                }
                setPosts(procedures);
            }).catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        try {
            getLanguageByToken();
            getAllProcess();
        } catch (err) {
            console.log(err);
        }
    }, [language, api, cookiesInfo.loginToken])

    const handleSubmit = () => {
        const quizSelect = document.getElementById('Quiz-Select') as HTMLSelectElement;
        if (quizSelect) {
            const selectedValues = quizSelect.value;
            const valuesTable = selectedValues.split(',');
            const stocked_title = valuesTable[0];
            const title = valuesTable[1];
            window.location.href = `/quiz/${stocked_title}/${title}`;
        }
    }

    return (
        <>
            <Header />

            <div className={colorMode === "light" ? "Quiz Quiz-light" : "Quiz Quiz-dark"}>
                <div className="Page-Title" data-testid="quiz-title">{translation.title}</div>
                <div className='Quiz-container'>
                    <div className='Question-Style' data-testid="quiz-question">{translation.question}</div>
                    <select
                        defaultValue="Select a process"
                        name="Quiz-Select"
                        id="Quiz-Select"
                        data-testid="select"
                        className='Quiz-Select'
                    >
                        {
                            posts.map((post: any) => {
                                return (
                                    <option data-testid="select-option" value={[post.stocked_title, post.label]}>{post.label}</option>
                                )
                            })
                        }
                    </select>
                    <button data-testid="submit-button" type="button" className='Submit-btn' onClick={() => handleSubmit()}>{translation.submit}<AiOutlineSend className='Submit-icon' /></button>
                </div>
            </div>
        </>
    );
}

export default QuizPage;