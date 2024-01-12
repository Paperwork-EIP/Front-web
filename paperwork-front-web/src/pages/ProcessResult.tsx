// React Import
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// Utils Import
import axios from "axios";
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

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
import { RxUpdate } from 'react-icons/rx';

const ProcessResult = () => {

    const api = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const [stepsAnswer, setStepsAnswer] = useState<any>([]);
    const [title, setTitle] = useState("");
    const [requeteSend, setRequeteSend] = useState(false);

    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    const cookiesInfo = cookies.get('loginToken');

    let { processSelected } = useParams();

    // User informations
    const [language, setLanguage] = useState("");


    // Translation
    const translation = getTranslation(language, "processResult");

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

    async function getUserSteps() {
        await axios.get(`${api}/userProcess/getUserSteps`, { params: { process_title: processSelected, user_token: cookiesInfo.loginToken } })
            .then(res => {
                console.log(res);
                setRequeteSend(true);
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

    useEffect(() => {
        getLanguageByToken();

        if (cookiesInfo && !requeteSend) {
            getUserSteps();
        }
    }, [cookiesInfo, processSelected, api, stepsAnswer]);

    async function handleUpdate() {
        var newStepsAnswer = [];
        newStepsAnswer = stepsAnswer.map((item: any) => {
            if (item.under_steps.length === 0) {
                return {
                    step_id: item.step_id,
                    response: item.is_done
                }
            } else {
                return {
                    step_id: item.step_id,
                    response: item.is_done,
                    underQuestions: item.under_steps.map((underStep: any) => {
                        return {
                            id: underStep.id,
                            response: underStep.is_done
                        }
                    })
                }
        }});
        axios.post(`${api}/userProcess/update`, {
            user_token: cookiesInfo.loginToken,
            process_title: processSelected,
            questions: newStepsAnswer
        }).then(res => {
            console.log(res.data.response);
            toast.success(translation.alertUpdate);
        }).catch(err => {
            console.log(err)
        })
    }

    const onUnderValueChange = (underStep: any, index: any, underIndex: any) => {
        const newData = [...stepsAnswer];
        newData[index].under_steps[underIndex].is_done = !underStep.is_done;
        if (newData[index].under_steps[underIndex].is_done === false) {
            newData[index].is_done = false;
        }
        if (newData[index].under_steps.every((item: any) => item.is_done === true)) {
            newData[index].is_done = true;
        }
        setStepsAnswer(newData);
    }

    const onMainValueChange = (item: any, index: any) => {
        const newData = [...stepsAnswer];
        newData[index].is_done = !item.is_done;
        newData[index].under_steps.map((underStep: any, underIndex: any) => {
            newData[index].under_steps[underIndex].is_done = item.is_done;
        });
        setStepsAnswer(newData);
    }

    const onValueChange = (item: any, index: any) => {
        const newData = [...stepsAnswer];
        newData[index].is_done = !item.is_done;
        setStepsAnswer(newData);
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
                    <div className='ProcessResult-Title' data-testid="processResult-title">{translation.resultProcess}"{title}":</div>
                    <div className='ProcessResult-Checkbox-Container'>
                        <>
                            {stepsAnswer?.map((item: any, index: any) => {
                                if (item.under_steps?.length === 0) {
                                    return (
                                        <div key={index} className='ProcessResult-output' data-testid="processResultOutput">
                                            <input
                                                className='ProcessResult-Checkbox'
                                                type="checkbox"
                                                title={item.description}
                                                checked={item.is_done}
                                                data-testid={item.step_id}
                                                id={item.step_id}
                                                onClick={() => onValueChange(item, index)}/>
                                            <label htmlFor={item.step_id}> : {item.description} </label>
                                            <a href={item.source} target='_blank'><BsLink /></a>
                                        </div>
                                    )
                                }
                                else if (item.under_steps) {
                                    return (
                                        <div key={index}>
                                            <div key={index}>
                                                <div className='ProcessResult-output' data-testid="processResultOutput">
                                                    <input
                                                        className='ProcessResult-Checkbox'
                                                        type="checkbox"
                                                        title={item.description}
                                                        checked={item.is_done}
                                                        data-testid={item.step_id}
                                                        id={item.step_id}
                                                        onClick={() => onMainValueChange(item, index)}/>
                                                    <label htmlFor={item.step_id}> : {item.description} </label>
                                                    <a href={item.source} target='_blank'><BsLink /></a>
                                                </div>
                                            </div>
                                            <div>
                                                {item.under_steps.map((underStep: any, underIndex: any) => {
                                                    return (
                                                        <div className="ProcessResult-underStep" key={underIndex}>
                                                            <div className='ProcessResult-output' data-testid="processResultOutput">
                                                                <input
                                                                    className='ProcessResult-Checkbox'
                                                                    type="checkbox"
                                                                    title={underStep.description}
                                                                    checked={underStep.is_done}
                                                                    data-testid={underStep.step_id}
                                                                    id={underStep.step_id}
                                                                    onClick={() => onUnderValueChange(underStep, index, underIndex)}/>
                                                                <label htmlFor={underStep.step_id}> : {underStep.description} </label>
                                                                <a href={item.source} target='_blank'><BsLink /></a>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </>
                    </div>
                    <div className="section-container">
                        <div className="update-btn-container" data-testid="updateBtnContainer">
                            <button
                                type="button"
                                className="update-personal-info-btn"
                                aria-label="update-personal-info-btn"
                                data-testid="updatePersonalInfoBtn"
                                onClick={() => handleUpdate()}
                            >
                                {translation.updateBtn}
                                <RxUpdate className="update-personal-info-icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProcessResult;