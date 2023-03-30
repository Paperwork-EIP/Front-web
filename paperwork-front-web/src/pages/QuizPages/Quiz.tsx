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

const QuizPage = () => {

    const cookies = new Cookies();
    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    const email = cookies.get('loginToken');
    console.log(email);

    const [posts, setPosts] = useState([{}]);

    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/process/getAll`)
        .then(res => {
            var procedures = [];
            for (var i = 0; i < res.data.response.length; i++)
            {
                procedures.push({
                    label: res.data.response[i]['title'],
                    source: res.data.response[i]['source'],
                    value: i
                });
            }
            // console.log(procedures);
            setPosts(procedures);
        }).catch(err => {
            console.log(err)
        });
    }, [])

    const handleSubmit = () => {
        // console.log(processSelected);
        const quizSelect = document.getElementById('Quiz-Select') as HTMLSelectElement;
        if (quizSelect) {
            const selectedValue = quizSelect.value;
            window.location.href = `/quiz/${selectedValue}/0`;
        }
    }                     

    return (
        <>
            <Header/>

            <div className='Page-Title'>New Process Quiz</div>
            <div className='Quiz'>
                <div className='Question-Style'>What type of procedure do you want to complete ?</div>
                <select defaultValue="Select a process" name="Quiz-Select" id="Quiz-Select" className='Quiz-Select' placeholder='Select the Procedure'>
                    {
                        posts.map((post: any) => {
                            return (
                                <option value={post.label}>{post.label}</option>
                            )
                        })
                    }
                </select>
                <button type="button" className='Submit-btn' onClick={() => handleSubmit()}>Submit<AiOutlineSend className='Submit-icon' /></button>
            </div>
        </>
    );
}

export default QuizPage;