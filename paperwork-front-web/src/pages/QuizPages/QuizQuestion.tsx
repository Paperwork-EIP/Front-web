import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useColorMode } from '@chakra-ui/react';

import axios from "axios";
import Cookies from 'universal-cookie';

import { getTranslation } from '../Translation';
import Header from '../../components/Header';

import "../../styles/pages/Quiz.scss";

function QuizQuestion() {
    const cookies = new Cookies();
    const cookiesInfo = cookies.get('loginToken');

    var { processSelected } = useParams();
    var { processTitle } = useParams();
    const [nextStep, setNextStep] = useState(1);
    const api = process.env.REACT_APP_BASE_URL;
    
    const [currentId, setCurrentId] = useState<number>();
    const [currentQuestion, setCurrentQuestion] = useState<string>();
    const [questions, setQuestions] = useState<any>([]);
    const [answer, setAnswer] = useState([{}]);
    const [update, setUpdate] = React.useState(false);

    const [underAnswer, setUnderAnswer] = useState([{}]);
    const [nextUnder, setNextUnder] = useState(-1);

    const [language, setLanguage] = useState("");
    const translation = getTranslation(language, "quiz");
    const { colorMode } = useColorMode();

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
                setCurrentId(res.data.questions[nextStep - 1].step_id);
                setCurrentQuestion(res.data.questions[nextStep - 1].question);
                setQuestions(res.data.questions);
            }).catch(err => {
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

    function checkUpdate(responseTemp: any) {
        if (update === false) {
            addProcess(responseTemp);
        } else {
            updateProcess(responseTemp);
        }
    }

    async function addProcess(responseTemp : any) {
        const post = { process_title: processSelected, user_token: cookiesInfo.loginToken, questions: responseTemp }
        axios.post(`${api}/userProcess/add`, post)
                .then(() => {
                    window.location.href = `/processResult/${processSelected}`;
                }).catch(err => {
                    console.log(err)
                });
    }

    async function updateProcess( responseTemp: any) {
        const post = { process_title: processSelected, user_token: cookiesInfo.loginToken, questions: responseTemp }
        await axios.get(`${api}/userProcess/delete`, { params: { process_title: processSelected, user_token: cookiesInfo.loginToken } })
        await axios.post(`${api}/userProcess/add`, post)
        .then(() => {
            window.location.href = `/processResult/${processSelected}`;
        }).catch(err => {
            console.log(err)
        });
    }

    function handleClick(currentQuestionAnswer: string) {
        if (nextStep < questions.length) {
            if (nextStep === 1) {
                if (questions[nextStep - 1].underQuestions
                    && currentQuestionAnswer === 'true'
                    && nextUnder === -1) {
                    setAnswer([{ step_id: currentId, response: currentQuestionAnswer === 'true', underQuestions: questions[nextStep - 1].underQuestions.map((item: any, index: number) => {
                        return (
                            {id: item.step_id, response: true}
                        )
                    })}]);
                    setNextStep(nextStep + 1);
                    setCurrentQuestion(questions[nextStep].question);
                    setCurrentId(questions[nextStep].step_id);
                } else if (questions[nextStep - 1].underQuestions) {
                    if (nextUnder === -1) {
                        setNextUnder(nextUnder + 1);
                        setCurrentQuestion(questions[nextStep - 1].underQuestions[nextUnder + 1].question);
                    } else if (nextUnder === 0) {
                        setNextUnder(nextUnder + 1);
                        setCurrentQuestion(questions[nextStep - 1].underQuestions[nextUnder + 1].question);
                        setUnderAnswer([{ id: currentId, response: currentQuestionAnswer === 'true'}]);
                    } else if (nextUnder < questions[nextStep - 1].underQuestions.length - 1) {
                        setNextUnder(nextUnder + 1);
                        setCurrentQuestion(questions[nextStep - 1].underQuestions[nextUnder + 1].question);
                        setUnderAnswer(underAnswer => [...underAnswer, { id: currentId, response: currentQuestionAnswer === 'true'}]);
                    } else {
                        setNextUnder(-1);
                        var responseTemp = [...underAnswer, { id: currentId, response: currentQuestionAnswer === 'true'}];
                        setAnswer([{ id: currentId, response: false, underQuestions: responseTemp}]);
                        setNextStep(nextStep + 1);
                        setCurrentQuestion(questions[nextStep - 1].question);
                        setCurrentId(questions[nextStep - 1].step_id);
                    }
                } else {
                    setAnswer([{ step_id: currentId, response: currentQuestionAnswer === 'true'}]);
                    setNextStep(nextStep + 1);
                    setCurrentQuestion(questions[nextStep].question);
                    setCurrentId(questions[nextStep].step_id);
                }
            } else {
                if (questions[nextStep - 1]?.underQuestions && currentQuestionAnswer === 'true' && nextUnder === -1) {
                    setAnswer(answer => [...answer, { step_id: currentId, response: currentQuestionAnswer === 'true', underQuestions: questions[nextStep - 1].underQuestions.map((item: any, index: number) => {
                        return (
                            {id: item.step_id, response: true}
                        )
                    })}]);
                    setNextStep(nextStep + 1);
                    setCurrentQuestion(questions[nextStep].question);
                    setCurrentId(questions[nextStep].step_id);
                } else if (questions[nextStep - 1].underQuestions) {
                    if (nextUnder === -1) {
                        setNextUnder(nextUnder + 1);
                        setCurrentQuestion(questions[nextStep - 1].underQuestions[nextUnder + 1].question);
                    } else if (nextUnder === 0) {
                        setNextUnder(nextUnder + 1);
                        setCurrentQuestion(questions[nextStep - 1].underQuestions[nextUnder + 1].question);
                        setUnderAnswer([{ id: currentId, response: currentQuestionAnswer === 'true'}]);
                    } else if (nextUnder < questions[nextStep - 1].underQuestions.length - 1) {
                        setNextUnder(nextUnder + 1);
                        setCurrentQuestion(questions[nextStep - 1].underQuestions[nextUnder + 1].question);
                        setUnderAnswer(underAnswer => [...underAnswer, { id: currentId, response: currentQuestionAnswer === 'true'}]);
                    } else {
                        setNextUnder(-1);
                        var responseTemp = [...underAnswer, { step_id: currentId, response: currentQuestionAnswer === 'true'}];
                        setAnswer(answer => [...answer, { step_id: currentId, response: false, underQuestions: responseTemp}]);
                        setNextStep(nextStep + 1);
                        setCurrentQuestion(questions[nextStep].question);
                        setCurrentId(questions[nextStep].step_id);
                    }
                } else {
                    setAnswer(answer => [...answer, { step_id: currentId, response: currentQuestionAnswer === 'true'} ]);
                    setNextStep(nextStep + 1);
                    setCurrentQuestion(questions[nextStep - 1].question);
                    setCurrentId(questions[nextStep - 1].step_id);}
            }
        } else {
            if (questions[nextStep - 1]?.underQuestions && currentQuestionAnswer === 'true' && nextUnder === -1) {
                var responseTemp = [...answer, { step_id: currentId, response: currentQuestionAnswer === 'true', underQuestions: questions[nextStep - 1].underQuestions.map((item: any, index: number) => {
                    return (
                        {step_id: item.step_id, response: true}
                    )
                })}];
                checkUpdate(responseTemp);
            }  else if (questions[nextStep - 1]?.underQuestions) {
                if (nextUnder === -1) {
                    setNextUnder(nextUnder + 1);
                    setCurrentQuestion(questions[nextStep - 1].underQuestions[nextUnder + 1].question);
                } else if (nextUnder === 0) {
                    setNextUnder(nextUnder + 1);
                    setCurrentQuestion(questions[nextStep - 1].underQuestions[nextUnder + 1].question);
                    setUnderAnswer([{ id: currentId, response: currentQuestionAnswer === 'true'}]);
                } else if (nextUnder < questions[nextStep - 1].underQuestions.length - 1) {
                    setNextUnder(nextUnder + 1);
                    setCurrentQuestion(questions[nextStep - 1].underQuestions[nextUnder + 1].question);
                    setUnderAnswer(underAnswer => [...underAnswer, { id: currentId, response: currentQuestionAnswer === 'true'}]);
                } else {
                    setNextUnder(-1);
                    var underResponseTemp = [...underAnswer, { id: currentId, response: currentQuestionAnswer === 'true'}];
                    var responseTemp = [...answer, { step_id: currentId, response: false, underQuestions: underResponseTemp}];
                    checkUpdate(responseTemp);
                }
            } else {
                var responseTemp = [...answer, { step_id: currentId, response: currentQuestionAnswer === 'true'}];
                checkUpdate(responseTemp);
            }
        }
    }

    useEffect(() => {
        try {
            getUserProcesses();
            getUserLanguage();
            getProcessQuestions();
        } catch (err) {
            toast.error(translation.error);
            console.log(err);
        }
    }, [nextStep, processSelected, api, cookiesInfo.loginToken, language])

    return (
        <>
            <Header />
            <div className={colorMode === "light" ? "Quiz Quiz-light" : "Quiz Quiz-dark"}>
                <div className='Page-Title'>{processTitle}</div>
                <div className='Quiz-container'>
                    <div className='Question-Style'>{currentQuestion}</div>
                    <div className='QuizQuestionBtn'>
                        <button type="button" className='No-btn' data-testid="btn-no" onClick={(e) => handleClick('false')}>{translation.no}</button>
                        <button type="button" className='Yes-btn' data-testid="btn-yes" onClick={(e) => handleClick('true')}>{translation.yes}</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuizQuestion;