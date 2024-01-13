import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { FaLessThan } from "react-icons/fa";
import { BsLink } from "react-icons/bs";
import { useColorMode } from '@chakra-ui/react';

import { getTranslation } from './Translation';
import Header from '../components/Header';

import "../styles/pages/ProcessResult.scss";

function ProcessResult() {
    const api = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const [stepsAnswer, setStepsAnswer] = useState([]);
    const [title, setTitle] = useState("");

    const cookiesInfo = cookies.get('loginToken');

    let { processSelected } = useParams();
    const [language, setLanguage] = useState("");
    const translation = getTranslation(language, "processResult");
    const { colorMode } = useColorMode();

    function checkIfCookieExist() {
        if (!cookies) {
            window.location.replace("/login");
        } else {
            checkTokenInDatabase();
        }
    }

    async function checkTokenInDatabase() {
        await axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } }
        ).then((res) => {
            switch (res.status) {
                case 200:
                    break;
                default:
                    cookies.remove('loginToken');
                    window.location.replace("/login");
                    break;
            }
        }).catch(() => {
            cookies.remove('loginToken');
            window.location.replace("/login");
        });
    }

    async function getLanguage() {
        await axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } })
            .then(res => {
                setLanguage(res.data.language);
            }).catch(err => {
                console.error(err);
            });
    }

    async function getUserSteps() {
        axios.get(`${api}/userProcess/getUserSteps`, { params: { process_title: processSelected, user_token: cookiesInfo.loginToken } })
            .then(res => {
                setStepsAnswer(res.data.response);
                setTitle(res.data.title);
                stepsAnswer?.map((item: any) => {
                    if (item.is_done === true) {
                        document.getElementById(item.step_id)?.setAttribute("checked", "checked");
                    }
                });
            }).catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        checkIfCookieExist();
        getLanguage();
        getUserSteps();
    }, [cookiesInfo, processSelected, api, stepsAnswer]);

    const handleCheckboxClick = (step_id: any, is_done: any) => {
        let newStepsAnswer = [];
        newStepsAnswer = stepsAnswer;
        newStepsAnswer?.map((item: any) => {
            if (item.step_id === step_id) {
                item.is_done = !is_done;
            }
        })
        setStepsAnswer(newStepsAnswer);
        newStepsAnswer = stepsAnswer.map((item: any) => {
            return {
                step_id: item.step_id,
                response: item.is_done
            }
        })
        axios.post(`${api}/userProcess/update`, {
            user_token: cookiesInfo.loginToken,
            process_title: processSelected,
            questions: newStepsAnswer
        }).then(res => {
            console.log(res.data.response);
            toast.info(translation.alertUpdate);
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <Header />

            <div className={colorMode === "light" ? "ProcessResult ProcessResult-light" : "ProcessResult ProcessResult-dark"}>
                <a href='/quiz' className='StartNewProcess-Btn'>
                    <FaLessThan className='StartNewProcess-Icon' />
                    <span>
                        {translation.startNewProcess}
                    </span>
                </a>
                <div className='ProcessResult-Requires'>
                    <div className='ProcessResult-Title'>{translation.resultProcess}"{title}":</div>
                    <div className='ProcessResult-Checkbox-Container'>
                        <>
                            {
                                stepsAnswer?.map((item: any) => {
                                    return (
                                        <div className='ProcessResult-output'>
                                            <input className='ProcessResult-Checkbox' type="checkbox" data-testid={item.step_id} id={item.step_id} onClick={() => handleCheckboxClick(item.step_id, item.is_done)}></input>
                                            <label htmlFor={item.step_id}> : {item.description} </label>
                                            <a href={item.source} target='_blank'><BsLink /></a>
                                        </div>
                                    )
                                })
                            }
                        </>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProcessResult;