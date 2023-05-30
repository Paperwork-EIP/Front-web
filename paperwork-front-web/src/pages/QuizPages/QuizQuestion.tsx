// React Import
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// Utils Import
import axios from "axios";
import Cookies from 'universal-cookie';

// Pages Import
import Header from '../../components/Header';
import "../../styles/pages/Quiz.scss";

// Translation Import
import { getTranslation } from '../Translation';

// Color mode
import { useColorMode } from '@chakra-ui/react';

const QuizQuestion = () => {

    const cookies = new Cookies();

    const cookiesInfo = cookies.get('loginToken');
    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }

    var { processSelected } = useParams();
    var { step } = useParams();
    const nextStep = parseInt(step!) + 1;
    const api = process.env.REACT_APP_BASE_URL;
    const [title, setTitle] = useState("");
    const [currentId, setCurrentId] = useState();
    const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState();
    const [questions, setQuestions] = useState([{}]);
    const [update, setUpdate] = React.useState(false);

    // User informations
    const [language, setLanguage] = useState("");

    // Translation
    const translation = getTranslation(language, "quiz");

    // Color mode
    const { colorMode } = useColorMode();

    useEffect(() => {
        axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } })
        .then(res => {
            console.log(res.data.language);
            setLanguage(res.data.language);
        }).catch(err => {
            console.log(err)
        });

        axios.get(`${api}/processQuestions/get`, { params: { title: processSelected, language: language } })
        .then(res => {
            console.log(res.data.questions);
            setTitle(res.data.title);
            setCurrentId(res.data.questions[nextStep - 1].step_id);
            setCurrentQuestionAnswer(res.data.questions[nextStep - 1].question);
            setQuestions(res.data.questions);
        }).catch(err => {
            console.log(err)
        });

        axios.get(`${api}/userProcess/getUserProcesses`, { params: { user_token: cookiesInfo.loginToken } })
        .then(res => {
            console.log(res.data.response);
            res.data.response.map((item: any) => {
                if (item.userProcess.stocked_title === processSelected)
                    setUpdate(true);
            });
        }).catch(err => {
            console.log(err)
        });
    }, [nextStep, processSelected, api, cookiesInfo.loginToken, language])

    function handleClick(currentQuestionAnswer: string) {
        const urlAnswers = window.location.search.substring(1);
        if (nextStep < questions.length)
        {
            if (!urlAnswers)
                window.location.href = `/quiz/${processSelected}/${nextStep}?${currentId}=${currentQuestionAnswer}`;
            else
                window.location.href = `/quiz/${processSelected}/${nextStep}?${urlAnswers}&${currentId}=${currentQuestionAnswer}`;
        } else {

            var queryStr = `?${urlAnswers}&${currentId}=${currentQuestionAnswer}`;
            var queryArr = queryStr.replace('?','').split('&');
            var queryParams = [];

            for (var q = 0; q < queryArr.length; q++) {
                var qArr = queryArr[q].split('=');
                if (qArr[1] === 'true')
                    queryParams.push({ step_id: parseInt(qArr[0]), response: true});
                else
                    queryParams.push({ step_id: parseInt(qArr[0]), response: false});
            }

            const post = { process_title: processSelected, user_token: cookiesInfo.loginToken, questions: queryParams }
            if (update === false)
            {
                axios.post(`${api}/userProcess/add`, post)
                .then(res => {
                    console.log(res);
                    window.location.href = `/processResult/${processSelected}`;
                }).catch(err => {
                    console.log(err)
                });
            } else {
                axios.post(`${api}/userProcess/update`, post)
                .then(res => {
                    console.log(res);
                    window.location.href = `/processResult/${processSelected}`;
                }).catch(err => {
                    console.log(err)
                });
            }
        }
    }

    return (
        <>
            <Header/>

            <div className={colorMode === "light" ? "Quiz Quiz-light" : "Quiz Quiz-dark"}>
                <div className='Page-Title'>{title}</div>
                <div className='Quiz-container'>
                    <div className='Question-Style'>{currentQuestionAnswer!}</div>
                    <div className='QuizQuestionBtn'>
                        <button type="button" className='No-btn' data-testid="btn-no" onClick={() => handleClick('false')}>{translation.no}</button>
                        <button type="button" className='Yes-btn' data-testid="btn-yes" onClick={() => handleClick('true')}>{translation.yes}</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuizQuestion;