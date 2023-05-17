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

const ProcessResult = () => {

    const api = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const [stepsAnswer, setStepsAnswer] = useState([]);

    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    const cookiesInfo = cookies.get('loginToken');

    var { processSelected } = useParams();

    useEffect(() => {
        if (cookiesInfo) {
            axios.get(`${api}/userProcess/getUserSteps`, { params: { process_title: processSelected, user_token: cookiesInfo.loginToken } })
                .then(res => {
                    console.log(res.data.response);
                    setStepsAnswer(res.data.response.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id));
                    stepsAnswer?.map((item: any) => {
                        if (item.is_done === true) {
                            document.getElementById(item.id)?.setAttribute("checked", "checked");
                        }
                    });
                }).catch(err => {
                    console.log(err);
                });
        }
    });

    const handleCheckboxClick = (id: any, is_done: any) => {
        var newStepsAnswer = [];
        newStepsAnswer = stepsAnswer;
        newStepsAnswer?.map((item: any) => {
            if (item.id === id) {
                item.is_done = !is_done;
            }
        })
        setStepsAnswer(newStepsAnswer);
        newStepsAnswer = stepsAnswer.map((item: any) => {
            return {
                step_id: item.step_id,
                is_done: item.is_done
            }
        })
        axios.post(`${api}/userProcess/update`, {
            user_token: cookiesInfo.loginToken,
            process_title: processSelected,
            step: newStepsAnswer
        }).then(res => {
            console.log(res.data.response);
            alert("Updated successfully!");
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <Header />

            <div className='ProcessResult'>
                <a href='/quiz' className='StartNewProcess-Btn'><FaLessThan className='StartNewProcess-Icon' size={16} />Start a new process</a>
                <div className='ProcessResult-Requires'>
                    <div className='ProcessResult-Title'>Result of the process for “{processSelected}”:</div>
                    <div className='ProcessResult-Checkbox-Container'>
                        <>
                            {
                                stepsAnswer?.map((item: any) => {
                                    return (
                                        <div>
                                            <input className='ProcessResult-Checkbox' type="checkbox" data-testid={item.id} id={item.id} onClick={() => handleCheckboxClick(item.id, item.is_done)}></input>
                                            <label htmlFor={item.id}> : {item.step_description}</label>
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