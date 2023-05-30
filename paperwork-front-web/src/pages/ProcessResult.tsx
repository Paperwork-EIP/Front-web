// React Import
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// Utils Import
import axios from "axios";
import Cookies from 'universal-cookie';

// Pages Import
import Header from '../components/Header';
import "../styles/pages/ProcessResult.scss";

// Icons Import
import { FaLessThan } from "react-icons/fa";
import { BsLink } from "react-icons/bs";

// Translation Import
import { getTranslation } from './Translation';

// Color mode
import { useColorMode } from '@chakra-ui/react';

const ProcessResult = () => {

    const api = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const [stepsAnswer, setStepsAnswer] = useState([]);
    const [title, setTitle] = useState("");

    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    const cookiesInfo = cookies.get('loginToken');

    var { processSelected } = useParams();

    // User informations
    const [language, setLanguage] = useState("");


    // Translation
    const translation = getTranslation(language, "processResult");

    // Color mode
    const { colorMode } = useColorMode();

    useEffect(() => {
        axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } })
        .then(res => {
            setLanguage(res.data.language);
        }).catch(err => {
            console.log(err)
        });

        if (cookiesInfo) {
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
                    console.log(err);
                }
            );
        }
    }, [cookiesInfo, processSelected, api, stepsAnswer]);

    const handleCheckboxClick = (step_id: any, is_done: any) => {
        var newStepsAnswer = [];
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
            alert(translation.alertUpdate);
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <Header />

            <div className={colorMode === "light" ? "ProcessResult ProcessResult-light" : "ProcessResult ProcessResult-dark"}>
                <a href='/quiz' className='StartNewProcess-Btn'><FaLessThan className='StartNewProcess-Icon' size={16} />{ translation.startNewProcess }</a>
                <div className='ProcessResult-Requires'>
                    <div className='ProcessResult-Title'>{ translation.resultProcess }"{ title }":</div>
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