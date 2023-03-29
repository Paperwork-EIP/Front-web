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
    // console.log(processSelected);
    
    useEffect(() => {
        axios.get(`${api}/userProcess/getUserSteps`, { params: { process_title: processSelected, user_email: cookiesInfo.email } })
        .then(res => {
            console.log(res.data.response);
            setStepsAnswer(res.data.response);
            stepsAnswer?.map((item: any) => {
                if (item.is_done === true) {
                    document.getElementById(item.id)?.setAttribute("checked", "checked");
                }
                return null;
            })
        }).catch(err => {
            console.log(err)
        });
    }, [cookiesInfo.email, processSelected, api, stepsAnswer])  

    return (
        <>
            <Header/>
            
            <div className='ProcessResult'>
                <a href='/quiz' className='StartNewProcess-Btn'><FaLessThan className='StartNewProcess-Icon' size={16}/>Start a new process</a>
                <div className='ProcessResult-Requires'>
                    <div className='ProcessResult-Title'>Result of the process for “{processSelected}”:</div>
                    <div className='ProcessResult-Checkbox-Container'>
                        <>
                            {
                                stepsAnswer?.map((item: any) => {
                                    return(
                                        <div>
                                            <input className='ProcessResult-Checkbox' type="checkbox" id={item.id}></input>
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