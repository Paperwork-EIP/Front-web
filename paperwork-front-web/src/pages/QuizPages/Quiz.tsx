// React Import
import React, { useState, useEffect } from 'react';

// Utils Import
import axios from "axios";
import Cookies from 'universal-cookie';

// Pages Import
import Header from '../../components/Header';
import "../../styles/Quiz.css";
import "../../styles/pages/Quiz.scss";

// Icon Import
import { AiOutlineSend } from 'react-icons/ai';

// Translation Import
import { getTranslation } from '../Translation';

const QuizPage = () => {

    const cookies = new Cookies();
    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    const cookiesInfo = cookies.get('loginToken');

    const api = process.env.REACT_APP_BASE_URL;

    const [posts, setPosts] = useState([{}]);


    // User informations
    const [language, setLanguage] = useState("");


    // Translation
    const translation = getTranslation(language, "quiz");


    useEffect(() => {
        axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } })
        .then(res => {
            setLanguage(res.data.language);
        }).catch(err => {
            console.log(err)
        });

        axios.get(`${api}/process/getAll`, { params: { language: language } })
            .then(res => {
                var procedures = [];
                console.log(res.data);
                for (var i = 0; i < res.data.response.length; i++)
                {
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
        }, [language, api, cookiesInfo.loginToken])

    const handleSubmit = () => {
        const quizSelect = document.getElementById('Quiz-Select') as HTMLSelectElement;
        if (quizSelect) {
            const selectedValue = quizSelect.value;
            window.location.href = `/quiz/${selectedValue}/0`;
        }
    }                     

    return (
        <>
            <Header/>

            <div className='Page-Title'>{translation.title}</div>
            <div className='Quiz'>
                <div className='Question-Style'>{translation.question}</div>
                <select defaultValue="Select a process" name="Quiz-Select" id="Quiz-Select" data-testid="select" className='Quiz-Select' placeholder='Select the Procedure'>
                    {
                        posts.map((post: any) => {
                            return (
                                <option data-testid="select-option" value={post.stocked_title}>{post.label}</option>
                            )
                        })
                    }
                </select>
                <button data-testid="submit-button" type="button" className='Submit-btn' onClick={() => handleSubmit()}>{translation.submit}<AiOutlineSend className='Submit-icon' /></button>
            </div>
        </>
    );
}

export default QuizPage;