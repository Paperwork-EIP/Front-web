import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useColorMode, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps, } from '@chakra-ui/react';

import axios from "axios";
import Cookies from 'universal-cookie';

import { getTranslation } from '../Translation';
import Header from '../../components/Header';

import "../../styles/pages/Quiz.scss";

function QuizQuestion() {
    const cookies = new Cookies();
    const cookiesInfo = cookies.get('loginToken');

    var { processSelected } = useParams();
    var { step } = useParams();
    const nextStep = parseInt(step!) + 1;
    const api = process.env.REACT_APP_BASE_URL;
    const [title, setTitle] = useState("");
    const [currentId, setCurrentId] = useState();
    const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState();
    const [questions, setQuestions] = useState([{}]);
    const [update, setUpdate] = React.useState(false);
    const [language, setLanguage] = useState("");
    const translation = getTranslation(language, "quiz");
    const { colorMode } = useColorMode();

    const { activeStep } = useSteps({
        index: parseInt(step!),
        count: questions.length,
    })

    async function getUserLanguage() {
        await axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } })
            .then(res => {
                setLanguage(res.data.language);
            }).catch(err => {
                toast.error(translation.error);
                console.log(err);
            });
    }

    async function getProcessQuestions() {
        await axios.get(`${api}/processQuestions/get`, { params: { title: processSelected, language: language } })
            .then(res => {
                setTitle(res.data.title);
                setCurrentId(res.data.questions[nextStep - 1].step_id);
                setCurrentQuestionAnswer(res.data.questions[nextStep - 1].question);
                setQuestions(res.data.questions);
            }).catch(err => {
                toast.error(translation.error);
                console.log(err);
            });
    }

    async function getUserProcesses() {
        await axios.get(`${api}/userProcess/getUserProcesses`, { params: { user_token: cookiesInfo.loginToken } })
            .then(res => {
                res.data.response.map((item: any) => {
                    if (item.userProcess.stocked_title === processSelected)
                        setUpdate(true);
                });
            }).catch(err => {
                toast.error(translation.error);
                console.log(err);
            });
    }

    async function handleClick(e: any, currentQuestionAnswer: string) {
        e.preventDefault();

        const urlAnswers = window.location.search.substring(1);

        if (nextStep < questions.length) {
            if (!urlAnswers)
                window.location.href = `/quiz/${processSelected}/${nextStep}?${currentId}=${currentQuestionAnswer}`;
            else
                window.location.href = `/quiz/${processSelected}/${nextStep}?${urlAnswers}&${currentId}=${currentQuestionAnswer}`;
        } else {
            let queryStr = `?${urlAnswers}&${currentId}=${currentQuestionAnswer}`;
            let queryArr = queryStr.replace('?', '').split('&');
            let queryParams = [];

            for (let q = 0; q < queryArr.length; q++) {
                let qArr = queryArr[q].split('=');

                if (qArr[1] === 'true')
                    queryParams.push({ step_id: parseInt(qArr[0]), response: true });
                else
                    queryParams.push({ step_id: parseInt(qArr[0]), response: false });
            }

            const post = { process_title: processSelected, user_token: cookiesInfo.loginToken, questions: queryParams }

            if (update === false) {
                await axios.post(`${api}/userProcess/add`, post)
                    .then(() => {
                        window.location.href = `/processResult/${processSelected}`;
                    }).catch(err => {
                        toast.error(translation.error);
                        console.error(err);
                    });
            } else {
                await axios.post(`${api}/userProcess/update`, post)
                    .then(() => {
                        window.location.href = `/processResult/${processSelected}`;
                    }).catch(err => {
                        toast.error(translation.error);
                        console.error(err);
                    });
            }
        }
    }

    useEffect(() => {
        getUserLanguage();
        getProcessQuestions();
        getUserProcesses();
    }, [nextStep, processSelected, api, cookiesInfo.loginToken, language])

    return (
        <>
            <Header />
            <div className={colorMode === "light" ? "Quiz Quiz-light" : "Quiz Quiz-dark"}>
                <Stepper index={activeStep}>
                    {questions.map((_: any, index: number) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>
                        </Step>
                    ))}
                </Stepper>
                <div className='Page-Title'>{title}</div>
                <div className='Quiz-container'>
                    <div className='Question-Style'>{currentQuestionAnswer!}</div>
                    <div className='QuizQuestionBtn'>
                        <button type="button" className='No-btn' data-testid="btn-no" onClick={(e) => handleClick(e, 'false')}>{translation.no}</button>
                        <button type="button" className='Yes-btn' data-testid="btn-yes" onClick={(e) => handleClick(e, 'true')}>{translation.yes}</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuizQuestion;