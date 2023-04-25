// React Import
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// Utils Import
import axios from "axios";
import Cookies from 'universal-cookie';

// Pages Import
import Header from '../../components/Header';
import "../../styles/pages/Quiz.scss";

const QuizQuestion = () => {

    const cookies = new Cookies();
    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    const cookiesInfo = cookies.get('loginToken');

    var { processSelected } = useParams();
    var { step } = useParams();
    const nextStep = parseInt(step!) + 1;
    const api = process.env.REACT_APP_BASE_URL;
    const [currentId, setCurrentId] = useState();
    const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState();
    const [questions, setQuestions] = useState([{}]);

    useEffect(() => {
        axios.get(`${api}/processQuestions/get`, { params: { title: processSelected } })
        .then(res => {
            console.log(res.data.questions);
            setCurrentId(res.data.questions[nextStep - 1].step_id);
            setCurrentQuestionAnswer(res.data.questions[nextStep - 1].question);
            setQuestions(res.data.questions);
        }).catch(err => {
            console.log(err)
        });
    }, [nextStep, processSelected, api])

    function handleClick(currentQuestionAnswer: string) {
        // console.log("process_title = " + processSelected);
        // console.log("email = " + cookiesInfo.email);
        // console.log("currentQuestionAnswer");
        // console.log(currentQuestionAnswer);
        const urlAnswers = window.location.search.substring(1);
        // console.log("urlAnswers");
        // console.log(urlAnswers);
        if (nextStep < questions.length)
        {
            if (!urlAnswers)
                window.location.href = `/quiz/${processSelected}/${nextStep}?${currentId}=${currentQuestionAnswer}`;
            else
                window.location.href = `/quiz/${processSelected}/${nextStep}?${urlAnswers}&${currentId}=${currentQuestionAnswer}`;
        } else {
            // const questionsAnswer = queryString.parse(`?${urlAnswers}&${currentId}=${currentQuestionAnswer}`, {parseBooleans: true});
            // // querystring to array
            // console.log(questionsAnswer);

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

            // console.log("queryArr = ");
            // console.log(queryArr);
            const post = { process_title: processSelected, user_token: cookiesInfo.loginToken, questions: queryParams }
            // console.log("queryParams = ");
            // console.log(queryParams);
            axios.post(`${api}/userProcess/add`, post)
            .then(res => {
                console.log("res");
                console.log(res);
                window.location.href = `/processResult/${processSelected}`;
            }).catch(err => {
                console.log("err")
                console.log(err)
            });
        }
    }

    return (
        <>
            <Header/>

            <div className='Page-Title'>{ processSelected }</div>
            <div className='Quiz'>
                <div className='Question-Style'>{ currentQuestionAnswer! }</div>
                <div className='QuizQuestionBtn'>
                    <button type="button" className='No-btn' onClick={() => handleClick('false')}>No</button>
                    <button type="button" className='Yes-btn' onClick={() => handleClick('true')}>Yes</button>
                </div>
            </div>
        </>
    );
}

export default QuizQuestion;